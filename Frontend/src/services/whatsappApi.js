/**
 * Reusable frontend service for WhatsApp actions via the backend API.
 * Never include Meta access tokens or secrets in frontend code.
 */

export async function sendWhatsAppMessage({ to, message }) {
  const payload = { message }
  if (to) payload.to = to

  const res = await fetch('/api/whatsapp/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  const data = await res.json().catch(() => ({}))

  if (!res.ok || !data.success) {
    const error = new Error(data.message || 'Failed to send WhatsApp message.')
    error.status = res.status
    error.data = data
    throw error
  }

  return data
}
