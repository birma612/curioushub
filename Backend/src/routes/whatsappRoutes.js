import { Router } from 'express'
import { receiveWebhook, sendMessage, verifyWebhook } from '../controllers/whatsappController.js'

const router = Router()

router.get('/webhook', verifyWebhook)
router.post('/webhook', receiveWebhook)
router.post('/send', sendMessage)

export default router
