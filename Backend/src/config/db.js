import mongoose from 'mongoose'

export async function connectDB(uri) {
  if (!uri) {
    console.warn('[db] MONGODB_URI is not set. API will run without database persistence.')
    return
  }

  try {
    await mongoose.connect(uri)
    console.log('[db] MongoDB connected')
  } catch (error) {
    console.error('[db] MongoDB connection failed:', error.message)
    console.warn('[db] Continuing without database connection. Contact submissions will not be saved until DB is available.')
  }
}
