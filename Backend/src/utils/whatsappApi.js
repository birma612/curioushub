const DEFAULT_GRAPH_API_VERSION = 'v25.0'

function getMetaConfig() {
  const accessToken = process.env.META_WHATSAPP_ACCESS_TOKEN
  const phoneNumberId = process.env.META_WHATSAPP_PHONE_NUMBER_ID
  const graphApiVersion = process.env.META_GRAPH_API_VERSION || DEFAULT_GRAPH_API_VERSION

  if (!accessToken || !phoneNumberId) {
    const err = new Error('WhatsApp Cloud API is not configured on the server.')
    err.status = 503
    throw err
  }

  return { accessToken, phoneNumberId, graphApiVersion }
}

export async function sendWhatsAppTextMessage({ to, message }) {
  const { accessToken, phoneNumberId, graphApiVersion } = getMetaConfig()
  const url = `https://graph.facebook.com/${graphApiVersion}/${phoneNumberId}/messages`

  const payload = {
    messaging_product: 'whatsapp',
    to,
    type: 'text',
    text: { body: message },
  }

  let response
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
  } catch (error) {
    console.error('[whatsapp] Meta API network error:', error.message)
    const err = new Error('Failed to reach WhatsApp Cloud API.')
    err.status = 502
    throw err
  }

  let data = {}
  try {
    data = await response.json()
  } catch {
    data = {}
  }

  if (!response.ok) {
    const metaMessage =
      data?.error?.message || data?.error?.error_user_msg || 'WhatsApp Cloud API request failed.'
    console.error('[whatsapp] Meta API error:', {
      status: response.status,
      code: data?.error?.code,
      type: data?.error?.type,
      subcode: data?.error?.error_subcode,
      message: metaMessage,
    })
    const err = new Error(metaMessage)
    err.status = response.status >= 400 && response.status < 500 ? response.status : 502
    err.meta = {
      code: data?.error?.code,
      type: data?.error?.type,
      subcode: data?.error?.error_subcode,
    }
    throw err
  }

  return data
}
