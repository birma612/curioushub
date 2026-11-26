import mongoose from 'mongoose'

const whatsappMessageSchema = new mongoose.Schema(
  {
    messageId: {
      type: String,
      trim: true,
      index: true,
      unique: true,
      sparse: true,
    },
    direction: {
      type: String,
      enum: ['incoming', 'outgoing'],
      required: true,
      index: true,
    },
    from: {
      type: String,
      trim: true,
      index: true,
    },
    to: {
      type: String,
      trim: true,
      index: true,
    },
    type: {
      type: String,
      trim: true,
      default: 'unknown',
    },
    text: {
      type: String,
      default: '',
    },
    timestamp: {
      type: Date,
      index: true,
    },
    status: {
      type: String,
      trim: true,
      default: '',
      index: true,
    },
    rawPayload: {
      type: mongoose.Schema.Types.Mixed,
    },
  },
  { timestamps: true },
)

export const WhatsAppMessage = mongoose.model('WhatsAppMessage', whatsappMessageSchema)
