import mongoose from 'mongoose'
import { Contact } from '../models/Contact.js'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneRegex = /^[0-9+()\-\s]{7,20}$/

export async function createContact(req, res) {
  try {
    const { name = '', email = '', phone = '', message = '' } = req.body || {}

    const payload = {
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      phone: String(phone).trim(),
      message: String(message).trim(),
    }

    const errors = {}
    if (!payload.name) errors.name = 'Name is required.'
    if (!payload.email) errors.email = 'Email is required.'
    else if (!emailRegex.test(payload.email)) errors.email = 'Enter a valid email address.'
    if (!payload.phone) errors.phone = 'Phone is required.'
    else if (!phoneRegex.test(payload.phone)) errors.phone = 'Enter a valid phone number.'
    if (!payload.message) errors.message = 'Message is required.'

    if (Object.keys(errors).length) {
      return res.status(400).json({ success: false, message: 'Validation failed.', errors })
    }

    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'Database is not connected. Please try again later.',
      })
    }

    const contact = await Contact.create(payload)
    return res.status(201).json({
      success: true,
      message: 'Message received successfully. Our team will get back to you soon.',
      data: { id: contact._id },
    })
  } catch (error) {
    console.error('[contact] create error:', error)
    return res.status(500).json({ success: false, message: 'Failed to submit message.' })
  }
}
