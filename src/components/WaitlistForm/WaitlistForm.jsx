import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'
import Button from '../Button/Button.jsx'
import './WaitlistForm.css'

const categories = [
  { id: 'diabetes', label: 'I have diabetes' },
  { id: 'health', label: 'Health-conscious' },
  { id: 'doctor', label: "I'm a doctor" },
  { id: 'curious', label: 'Just curious' },
]

export default function WaitlistForm({ theme = 'light' }) {
  const [selected, setSelected] = useState([])
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '' })

  const toggle = (id) => setSelected(p => p.includes(id) ? p.filter(c => c !== id) : [...p, id])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.email) return
    setSubmitted(true)
  }

  return (
    <div className={`waitlist waitlist--${theme}`}>
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div key="success" className="waitlist__success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
            <div className="waitlist__check"><Check size={28} /></div>
            <h3>You're on the list.</h3>
            <p>We'll reach out the moment the first batch is ready.</p>
          </motion.div>
        ) : (
          <motion.form key="form" className="waitlist__form" onSubmit={handleSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="waitlist__categories">
              {categories.map(cat => (
                <button key={cat.id} type="button" className={`waitlist__chip ${selected.includes(cat.id) ? 'waitlist__chip--active' : ''}`} onClick={() => toggle(cat.id)}>
                  {selected.includes(cat.id) && <Check size={13} />}
                  {cat.label}
                </button>
              ))}
            </div>
            <div className="waitlist__fields">
              <input type="text" placeholder="Full Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="waitlist__input" />
              <input type="email" placeholder="Email address *" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="waitlist__input" required />
              <input type="tel" placeholder="Phone (optional)" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className="waitlist__input" />
            </div>
            <Button type="submit" variant={theme === 'dark' ? 'light' : 'primary'} size="lg">Join the Waitlist</Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
