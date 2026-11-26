import mongoose from 'mongoose'
import { WhatsAppMessage } from '../models/WhatsAppMessage.js'
import { sendWhatsAppTextMessage } from '../utils/whatsappApi.js'

const phoneRegex = /^[0-9+()\-\s]{7,20}$/

function normalizePhone(value = '') {
  return String(value).replace(/[^\d]/g, '')
}

function parseTimestamp(ts) {
  if (!ts) return undefined
  const num = Number(ts)
  if (!Number.isFinite(num)) return undefined
  // Meta timestamps are usually unix seconds
  const ms = num > 1e12 ? num : num * 1000
  const date = new Date(ms)
  return Number.isNaN(date.getTime()) ? undefined : date
}

function isDbConnected() {
  return mongoose.connection.readyState === 1
}

export function verifyWebhook(req, res) {
  const mode = req.query['hub.mode']
  const token = req.query['hub.verify_token']
  const challenge = req.query['hub.challenge']
  const verifyToken = process.env.META_WHATSAPP_VERIFY_TOKEN

  if (mode === 'subscribe' && verifyToken && token === verifyToken) {
    return res.status(200).send(challenge)
  }

  return res.sendStatus(403)
}

async function storeIncomingMessage({ messageId, from, to, type, text, timestamp, rawPayload }) {
  console.info('[whatsapp] Incoming webhook message:', {
    messageId: messageId || null,
    from: from || '',
    to: to || '',
    type: type || 'unknown',
    hasText: Boolean(text),
    timestamp: timestamp || null,
  })

  if (!isDbConnected()) {
    console.warn('[whatsapp] Incoming webhook received but database is not connected; message not stored.')
    return
  }

  const doc = {
    direction: 'incoming',
    from: from || '',
    to: to || '',
    type: type || 'unknown',
    text: text || '',
    timestamp: parseTimestamp(timestamp),
    status: 'received',
    rawPayload,
  }

  try {
    if (messageId) {
      const result = await WhatsAppMessage.updateOne(
        { messageId },
        { $setOnInsert: { messageId, ...doc } },
        { upsert: true },
      )
      if (result?.upsertedCount === 0 && result?.matchedCount > 0) {
        console.info('[whatsapp] Duplicate incoming webhook ignored:', { messageId })
      }
    } else {
      await WhatsAppMessage.create({ ...doc })
    }
  } catch (error) {
    if (error?.code === 11000) {
      console.info('[whatsapp] Duplicate incoming webhook ignored:', { messageId: messageId || null })
      return
    }
    console.error('[whatsapp] Failed to store incoming message:', error.message)
  }
}

async function handleStatusUpdate(statusEvent, phoneNumberId = '') {
  if (!isDbConnected()) {
    console.warn('[whatsapp] Status webhook received but database is not connected; status not stored.')
  }

  const messageId = statusEvent?.id || ''
  const status = statusEvent?.status || ''
  const recipient = statusEvent?.recipient_id || ''
  const timestamp = statusEvent?.timestamp || ''
  const conversationId = statusEvent?.conversation?.id || ''
  const conversationOrigin = statusEvent?.conversation?.origin?.type || ''
  const expirationTimestamp = statusEvent?.conversation?.expiration_timestamp || ''
  const pricingCategory = statusEvent?.pricing?.category || ''
  const pricingBillable = statusEvent?.pricing?.billable
  const errorsArray = Array.isArray(statusEvent?.errors) ? statusEvent.errors : []
  const firstError = errorsArray[0] || {}
  const parsedTimestamp = parseTimestamp(timestamp)

  const details = {
    messageId,
    status,
    recipient_id: recipient,
    timestamp,
    phone_number_id: phoneNumberId || '',
    conversation_id: conversationId,
    conversation_origin: conversationOrigin,
    expiration_timestamp: expirationTimestamp,
    pricing_category: pricingCategory,
    pricing_billable: pricingBillable,
    errors_array: errorsArray,
    error_code: firstError?.code,
    error_title: firstError?.title,
    error_message: firstError?.message,
    error_data: firstError?.error_data,
    error_href: firstError?.href,
  }

  console.info('[whatsapp] Status event details:', details)

  if (status === 'failed') {
    console.error('[WHATSAPP DELIVERY FAILED]', details)
  } else if (status === 'delivered') {
    console.info('[WHATSAPP DELIVERED]', { messageId, recipient_id: recipient, timestamp, phone_number_id: phoneNumberId || '' })
  } else if (status === 'read') {
    console.info('[WHATSAPP READ]', { messageId, recipient_id: recipient, timestamp, phone_number_id: phoneNumberId || '' })
  } else if (status === 'sent') {
    console.info('[WHATSAPP SENT]', { messageId, recipient_id: recipient, timestamp, phone_number_id: phoneNumberId || '' })
  }

  if (!isDbConnected() || !messageId) return

  try {
    const result = await WhatsAppMessage.updateOne(
      { messageId },
      {
        $set: {
          status,
          ...(parsedTimestamp ? { timestamp: parsedTimestamp } : {}),
          ...(recipient ? { to: recipient } : {}),
        },
      },
    )

    if (result?.matchedCount === 0) {
      console.warn('[whatsapp] Status event received for unknown messageId:', {
        messageId,
        status,
        recipient_id: recipient,
      })
    }
  } catch (error) {
    console.error('[whatsapp] Failed to process status update:', error.message)
  }
}

async function processWebhookPayload(body) {
  if (!body || body.object !== 'whatsapp' || !Array.isArray(body.entry)) {
    console.warn('[whatsapp] Ignored webhook payload: unexpected structure', {
      hasBody: Boolean(body),
      object: body?.object || null,
      hasEntryArray: Array.isArray(body?.entry),
    })
    return
  }

  for (const entry of body.entry) {
    const changes = Array.isArray(entry?.changes) ? entry.changes : []
    for (const change of changes) {
      const field = change?.field || null
      const value = change?.value
      if (!value || typeof value !== 'object') {
        console.warn('[whatsapp] Ignored webhook change: missing value', { field })
        continue
      }

      const messages = Array.isArray(value.messages) ? value.messages : []
      const statuses = Array.isArray(value.statuses) ? value.statuses : []
      console.info('[whatsapp] Webhook change received:', {
        field,
        phoneNumberId: value?.metadata?.phone_number_id || null,
        displayPhoneNumber: value?.metadata?.display_phone_number || null,
        messageCount: messages.length,
        statusCount: statuses.length,
      })

      const businessNumber = value?.metadata?.display_phone_number || ''

      for (const msg of messages) {
        const type = msg?.type || 'unknown'
        const text =
          type === 'text'
            ? msg?.text?.body || ''
            : type === 'button'
              ? msg?.button?.text || ''
              : type === 'interactive'
                ? msg?.interactive?.button_reply?.title ||
                  msg?.interactive?.list_reply?.title ||
                  ''
                : ''

        await storeIncomingMessage({
          messageId: msg?.id,
          from: msg?.from || '',
          to: businessNumber,
          type,
          text,
          timestamp: msg?.timestamp,
          rawPayload: body,
        })
      }

      for (const statusEvent of statuses) {
        await handleStatusUpdate(statusEvent, value?.metadata?.phone_number_id || '')
      }
    }
  }
}

export async function receiveWebhook(req, res) {
  // Always acknowledge webhook deliveries promptly with 200 to avoid retries/crashes.
  res.sendStatus(200)

  console.info('[whatsapp] Webhook POST received', {
    object: req.body?.object || null,
    entryCount: Array.isArray(req.body?.entry) ? req.body.entry.length : 0,
  })

  try {
    await processWebhookPayload(req.body)
  } catch (error) {
    console.error('[whatsapp] Webhook processing error:', error.message)
  }
}

export async function sendMessage(req, res) {
  try {
    const { to = '', message = '' } = req.body || {}
    const configuredTo = String(process.env.WHATSAPP_NOTIFICATION_TO || '').trim()
    const recipientInput = String(to || '').trim() || configuredTo
    const normalizedTo = normalizePhone(recipientInput)
    const text = String(message).trim()

    const errors = {}
    if (!normalizedTo) errors.to = 'Recipient phone number is required.'
    else if (!phoneRegex.test(recipientInput) || normalizedTo.length < 8 || normalizedTo.length > 15) {
      errors.to = 'Enter a valid recipient phone number with country code.'
    }
    if (!text) errors.message = 'Message is required.'
    else if (text.length > 4096) errors.message = 'Message is too long.'

    if (Object.keys(errors).length) {
      return res.status(400).json({ success: false, message: 'Validation failed.', errors })
    }

    if (!isDbConnected()) {
      return res.status(503).json({
        success: false,
        message: 'Database is not connected. Please try again later.',
      })
    }

    const data = await sendWhatsAppTextMessage({ to: normalizedTo, message: text })
    const metaMessageId = data?.messages?.[0]?.id || null
    const metaStatus = data?.messages?.[0]?.message_status || 'sent'

    let record = null
    try {
      record = await WhatsAppMessage.create({
        messageId: metaMessageId || undefined,
        direction: 'outgoing',
        from: process.env.META_WHATSAPP_PHONE_NUMBER_ID || '',
        to: normalizedTo,
        type: 'text',
        text,
        timestamp: new Date(),
        status: metaStatus,
        rawPayload: data,
      })
    } catch (error) {
      if (error?.code === 11000 && metaMessageId) {
        record = await WhatsAppMessage.findOne({ messageId: metaMessageId })
      } else {
        console.error('[whatsapp] Failed to store outgoing message:', error.message)
      }
    }

    return res.status(200).json({
      success: true,
      message: 'WhatsApp message sent successfully.',
      data: {
        to: normalizedTo,
        messageId: metaMessageId,
        status: record?.status || metaStatus,
        recordId: record?._id || null,
      },
    })
  } catch (error) {
    const status = error.status || 500
    const message =
      status >= 500
        ? 'Failed to send WhatsApp message.'
        : error.message || 'Failed to send WhatsApp message.'
    if (status >= 500) {
      console.error('[whatsapp] send error:', error.message)
    }
    return res.status(status).json({ success: false, message })
  }
}
