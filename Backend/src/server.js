import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import contactRoutes from './routes/contactRoutes.js'
import whatsappRoutes from './routes/whatsappRoutes.js'
import { errorHandler, notFound } from './middleware/errorHandler.js'

const app = express()
const PORT = process.env.PORT || 5001
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173'

app.use(
  cors({
    origin: [CLIENT_ORIGIN, 'http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
  }),
)
app.use(express.json({ limit: '1mb' }))

app.get('/api/health', (req, res) => {

  res.json({ success: true, status: 'ok', service: 'ironforge-backend' })

})

app.use('/api/contact', contactRoutes)
app.use('/api/whatsapp', whatsappRoutes)
app.use(notFound)
app.use(errorHandler)

await connectDB(process.env.MONGODB_URI)

app.listen(PORT, () => {
  console.log(`[server] Running on http://localhost:${PORT}`)
})
