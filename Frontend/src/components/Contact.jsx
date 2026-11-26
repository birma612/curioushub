import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, LoaderCircle } from 'lucide-react'
import { sendWhatsAppMessage } from '../services/whatsappApi'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const initial = { name: '', email: '', phone: '', message: '' }

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneRegex = /^[0-9+()\-\s]{7,20}$/

const Contact = () => {
  const [form, setForm] = useState(initial)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const validate = (values) => {
    const next = {}
    if (!values.name.trim()) next.name = 'Name is required.'
    if (!values.email.trim()) next.email = 'Email is required.'
    else if (!emailRegex.test(values.email.trim())) next.email = 'Enter a valid email address.'
    if (!values.phone.trim()) next.phone = 'Phone is required.'
    else if (!phoneRegex.test(values.phone.trim())) next.phone = 'Enter a valid phone number.'
    if (!values.message.trim()) next.message = 'Message is required.'
    return next
  }

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const onBlur = (e) => {
    const { name } = e.target
    const fieldErrors = validate(form)
    if (fieldErrors[name]) setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const validation = validate(form)
    setErrors(validation)
    if (Object.keys(validation).length > 0) {
      setStatus({ type: 'error', text: 'Please fix the highlighted fields and try again.' })
      return
    }

    setSubmitting(true)
    setStatus(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => ({}))

      if (!res.ok || !data.success) {
        if (data.errors) setErrors((prev) => ({ ...prev, ...data.errors }))
        setStatus({
          type: 'error',
          text: data.message || 'Unable to send your message right now. Please try again.',
        })
        return
      }

      setStatus({ type: 'success', text: data.message || 'Message sent successfully.' })
      setForm(initial)
      setErrors({})

      try {
        const notificationMessage = [
          'New Contact Inquiry',
          `Name: ${form.name}`,
          `Email: ${form.email}`,
          `Phone: ${form.phone}`,
          `Message: ${form.message}`,
        ].join('\n')
        await sendWhatsAppMessage({ message: notificationMessage })
      } catch (whatsappError) {
        console.error('[contact] WhatsApp notification failed:', whatsappError)
      }
    } catch {
      setStatus({
        type: 'error',
        text: 'Could not connect to the server. Start the backend API and try again.',
      })
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass = (hasError) =>
    `w-full rounded-xl border bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-neutral-500 outline-none backdrop-blur-md transition focus:border-accent/60 focus:bg-white/[0.07] ${
      hasError ? 'border-red-500/70' : 'border-white/10'
    }`

  return (
    <section id="contact" className="relative bg-[#070707] py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,45,45,0.12),transparent_30%),radial-gradient(circle_at_85%_70%,rgba(255,255,255,0.06),transparent_28%)]" aria-hidden="true" />
      <div className="container-max section-padding relative z-10">
        <SectionHeading
          eyebrow="Contact"
          title="GET IN TOUCH"
          description="Have questions or ready to start? Reach out and the IRONFORGE team will help you take the next step."
        />

        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <div className="glass-strong h-full rounded-3xl p-6 sm:p-8">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="mt-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-white">Address</p>
                    <p className="mt-1 text-sm leading-6 text-neutral-400">
                      Industrial Area, Baddi, Himachal Pradesh
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="mt-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-white">Phone</p>
                    <a href="tel:+91XXXXXXXXXX" className="mt-1 block text-sm text-neutral-400 transition hover:text-white">
                      +91 XXXXX XXXXX
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="mt-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-white">Email</p>
                    <a href="mailto:info@ironforgegym.com" className="mt-1 block text-sm text-neutral-400 transition hover:text-white">
                      info@ironforgegym.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="mt-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-white">Opening Hours</p>
                    <p className="mt-1 text-sm leading-6 text-neutral-400">
                      Monday - Saturday
                      <br />
                      5:00 AM - 10:00 PM
                    </p>
                    <p className="mt-2 text-sm leading-6 text-neutral-400">
                      Sunday
                      <br />
                      6:00 AM - 2:00 PM
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass mt-8 overflow-hidden rounded-2xl">
                <div className="relative h-48 sm:h-56">
                  <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:24px_24px]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,45,45,0.25),transparent_45%)]" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white shadow-lg shadow-red-900/40">
                      <MapPin size={22} />
                    </div>
                    <p className="font-display text-2xl uppercase text-white">Location Map</p>
                    <p className="mt-1 text-sm text-neutral-400">Industrial Area, Baddi, Himachal Pradesh</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.2em] text-neutral-500">Google Maps placeholder</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <form
              onSubmit={onSubmit}
              noValidate
              className="glass-strong rounded-3xl p-6 sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-neutral-200">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={onChange}
                    onBlur={onBlur}
                    autoComplete="name"
                    className={inputClass(errors.name)}
                    placeholder="Your name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name ? (
                    <p id="name-error" className="mt-2 text-xs text-red-400">{errors.name}</p>
                  ) : null}
                </div>

                <div className="sm:col-span-1">
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-neutral-200">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={onChange}
                    onBlur={onBlur}
                    autoComplete="email"
                    className={inputClass(errors.email)}
                    placeholder="you@example.com"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email ? (
                    <p id="email-error" className="mt-2 text-xs text-red-400">{errors.email}</p>
                  ) : null}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="phone" className="mb-2 block text-sm font-medium text-neutral-200">
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={onChange}
                    onBlur={onBlur}
                    autoComplete="tel"
                    className={inputClass(errors.phone)}
                    placeholder="+91 XXXXX XXXXX"
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                  />
                  {errors.phone ? (
                    <p id="phone-error" className="mt-2 text-xs text-red-400">{errors.phone}</p>
                  ) : null}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-neutral-200">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={form.message}
                    onChange={onChange}
                    onBlur={onBlur}
                    className={inputClass(errors.message)}
                    placeholder="Tell us about your goals..."
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                  />
                  {errors.message ? (
                    <p id="message-error" className="mt-2 text-xs text-red-400">{errors.message}</p>
                  ) : null}
                </div>
              </div>

              {status ? (
                <div
                  className={`mt-5 flex items-start gap-3 rounded-xl border p-4 text-sm ${
                    status.type === 'success'
                      ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200'
                      : 'border-red-500/30 bg-red-500/10 text-red-200'
                  }`}
                  role={status.type === 'error' ? 'alert' : 'status'}
                >
                  {status.type === 'success' ? <CheckCircle2 size={18} className="mt-0.5 shrink-0" /> : null}
                  <p>{status.text}</p>
                </div>
              ) : null}

              <button
                type="submit"
                disabled={submitting}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-accent-dark hover:shadow-[0_12px_30px_rgba(255,45,45,0.35)] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
              >
                {submitting ? (
                  <>
                    <LoaderCircle size={16} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={16} />
                  </>
                )}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default Contact
