import { useState } from 'react'
import { Phone, MapPin, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

const INITIAL = { firstName: '', lastName: '', email: '', phone: '', service: '', message: '' }

function validate(fields) {
  const errors = {}
  if (!fields.firstName.trim()) errors.firstName = 'First name is required'
  if (!fields.lastName.trim()) errors.lastName = 'Last name is required'
  if (!fields.email.trim()) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = 'Enter a valid email address'
  }
  if (!fields.message.trim()) errors.message = 'Please include a message'
  return errors
}

export default function ContactPage() {
  const [fields, setFields] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [serverError, setServerError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFields((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async () => {
    const validationErrors = validate(fields)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setStatus('loading')
    setServerError('')

    try {
      const API_BASE = import.meta.env.VITE_API_URL || '/api'
      const res = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: `${fields.firstName.trim()} ${fields.lastName.trim()}`,
          clientEmail: fields.email.trim(),
          clientPhone: fields.phone.trim(),
          service: fields.service || 'Not specified',
          notes: fields.message.trim(),
          preferredDate: new Date().toISOString(),
          preferredTime: 'Flexible',
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Submission failed')
      setStatus('success')
      setFields(INITIAL)
    } catch (err) {
      setServerError(err.message || 'Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  const fieldClass = (name) =>
    `w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-white/30 focus:outline-none transition-colors ${
      errors[name] ? 'border-red-400 focus:border-red-400' : 'border-white/20 focus:border-brand-amber'
    }`

  return (
    <div className="min-h-screen bg-brand-brown-dark pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-brand-amber font-semibold text-sm uppercase tracking-[0.3em] mb-4">Get In Touch</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">
            Contact <span className="gradient-text">Us</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Ready to grow your business online? Contact us for a free quote or consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="p-8 bg-white/5 border border-brand-amber/20 rounded-3xl">
              <h2 className="font-display text-2xl font-bold text-white mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-amber/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-brand-amber" />
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-1">Office 1</p>
                    <address className="not-italic text-white/60 text-sm">
                      106-7470 Sherbrooke St W.<br />Montreal, Quebec Canada H4B 1S5
                    </address>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-amber/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-brand-amber" />
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-1">Office 2</p>
                    <address className="not-italic text-white/60 text-sm">
                      6860 Chester Ave<br />Montreal, Quebec Canada H4V 1K6
                    </address>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-amber/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-brand-amber" />
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-1">Phone</p>
                    <a href="tel:514-655-6276" className="text-brand-amber hover:text-brand-amber-light transition-colors font-bold text-lg">(514) 655-6276</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 bg-white/5 border border-brand-amber/20 rounded-3xl">
            <h2 className="font-display text-2xl font-bold text-white mb-6">Request a Free Quote</h2>

            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
                <CheckCircle className="w-16 h-16 text-green-400" />
                <h3 className="text-white text-xl font-bold">Message Sent!</h3>
                <p className="text-white/60">Thank you! We'll be in touch within 24 hours.</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-4 px-6 py-2 border border-brand-amber text-brand-amber rounded-xl hover:bg-brand-amber/10 transition-colors text-sm font-semibold"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <div className="space-y-5" aria-label="Contact Form">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-white/70 mb-2">First Name *</label>
                    <input type="text" id="firstName" name="firstName" value={fields.firstName} onChange={handleChange}
                      className={fieldClass('firstName')} placeholder="John" />
                    {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-white/70 mb-2">Last Name *</label>
                    <input type="text" id="lastName" name="lastName" value={fields.lastName} onChange={handleChange}
                      className={fieldClass('lastName')} placeholder="Smith" />
                    {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>}
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-2">Email Address *</label>
                  <input type="email" id="email" name="email" value={fields.email} onChange={handleChange}
                    className={fieldClass('email')} placeholder="john@example.com" />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-white/70 mb-2">Phone Number</label>
                  <input type="tel" id="phone" name="phone" value={fields.phone} onChange={handleChange}
                    className={fieldClass('phone')} placeholder="(514) 000-0000" />
                </div>
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-white/70 mb-2">Service Interested In</label>
                  <select id="service" name="service" value={fields.service} onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-brand-amber transition-colors appearance-none">
                    <option value="" className="bg-[#432c1c]">Select a service</option>
                    <option value="web-design" className="bg-[#432c1c]">Web Design</option>
                    <option value="seo" className="bg-[#432c1c]">SEO / GEO</option>
                    <option value="google-ads" className="bg-[#432c1c]">Google Ads</option>
                    <option value="social-media" className="bg-[#432c1c]">Social Media</option>
                    <option value="digital-marketing" className="bg-[#432c1c]">Digital Marketing</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white/70 mb-2">Message *</label>
                  <textarea id="message" name="message" rows={5} value={fields.message} onChange={handleChange}
                    className={fieldClass('message')} placeholder="Tell us about your project..." />
                  {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    {serverError}
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={status === 'loading'}
                  className="w-full py-4 bg-brand-amber text-brand-brown font-bold text-base rounded-xl hover:bg-brand-amber-light transition-all duration-300 hover:scale-[1.02] amber-glow disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                >
                  {status === 'loading' ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Sending…</>
                  ) : 'Send Message'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
        }
