import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, AlertCircle } from 'lucide-react'
import Button from '../Button/Button.jsx'
import { WAITLIST, BRAND } from '../../data/content.js'
import './WaitlistForm.css'

const categories = [
  { id: 'diabetes', label: 'I have diabetes' },
  { id: 'health', label: 'Health-conscious' },
  { id: 'doctor', label: "I'm a doctor" },
  { id: 'curious', label: 'Just curious' },
]

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function WaitlistForm({ theme = 'light' }) {
  const [selected, setSelected] = useState([])
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [form, setForm] = useState({ name: '', email: '', phone: '' })

  const toggle = (id) =>
    setSelected((p) => (p.includes(id) ? p.filter((c) => c !== id) : [...p, id]))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!EMAIL_RE.test(form.email)) {
      setStatus('error')
      setErrorMsg('Please enter a valid email address.')
      return
    }

    setStatus('submitting')
    setErrorMsg('')

    try {
      if (WAITLIST.endpoint) {
        const res = await fetch(WAITLIST.endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            ...form,
            categories: selected,
            source: 'metakitchen.io',
            submittedAt: new Date().toISOString(),
          }),
        })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
      } else {
        // Open the user's mail client as a guaranteed-delivery fallback.
        const body = encodeURIComponent(
          `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nProfile: ${selected.join(', ')}\n`,
        )
        window.location.href = `mailto:${BRAND.email}?subject=Waitlist&body=${body}`
        await new Promise((r) => setTimeout(r, 400))
      }
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setErrorMsg(WAITLIST.errorBody)
      // eslint-disable-next-line no-console
      console.error('Waitlist submit failed:', err)
    }
  }

  return (
    <div className={`waitlist waitlist--${theme}`}>
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            className="waitlist__success"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="waitlist__check">
              <Check size={28} />
            </div>
            <h3>{WAITLIST.successHeadline}</h3>
            <p>{WAITLIST.successBody}</p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            className="waitlist__form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="waitlist__categories">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={`waitlist__chip ${selected.includes(cat.id) ? 'waitlist__chip--active' : ''}`}
                  onClick={() => toggle(cat.id)}
                >
                  {selected.includes(cat.id) && <Check size={13} />}
                  {cat.label}
                </button>
              ))}
            </div>
            <div className="waitlist__fields">
              <input
                type="text"
                placeholder="Full name"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="waitlist__input"
                autoComplete="name"
              />
              <input
                type="email"
                placeholder="Email address *"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className="waitlist__input"
                autoComplete="email"
                required
              />
              <input
                type="tel"
                placeholder="Phone (optional)"
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                className="waitlist__input"
                autoComplete="tel"
              />
            </div>
            {status === 'error' && (
              <div className="waitlist__error" role="alert">
                <AlertCircle size={14} />
                <span>{errorMsg}</span>
              </div>
            )}
            <Button
              type="submit"
              variant={theme === 'dark' ? 'light' : 'primary'}
              size="lg"
              disabled={status === 'submitting'}
            >
              {status === 'submitting' ? 'Joining…' : 'Join the waitlist'}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
