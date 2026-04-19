import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mic, Brain, TrendingUp } from 'lucide-react'
import Button from '../../components/Button/Button.jsx'
import './DrAara.css'

const features = [
  { icon: <Mic size={22} />, title: 'Talks, not types', desc: 'Audio-visual AI that converses naturally in your language. No typing required.' },
  { icon: <Brain size={22} />, title: 'Remembers everything', desc: 'Your taste, your health goals, your progress. She never forgets.' },
  { icon: <TrendingUp size={22} />, title: 'Gets smarter with you', desc: 'The more you talk, the better she understands you. Continuously learning.' },
]

export default function DrAara() {
  useEffect(() => {
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }), { threshold: 0.15 })
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <motion.div className="page-wrapper" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>

      <section className="aara-hero">
        <div className="aara-hero__bg" />
        <div className="container aara-hero__inner">
          <motion.div className="aara-hero__avatar" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}>
            <div className="aara-avatar">
              <div className="aara-avatar__ring aara-avatar__ring--1" />
              <div className="aara-avatar__ring aara-avatar__ring--2" />
              <div className="aara-avatar__glow" />
              <div className="aara-avatar__frame">
                <video src="/draara.mp4" autoPlay loop muted playsInline className="aara-avatar__video" />
              </div>
            </div>
          </motion.div>
          <motion.div className="aara-hero__text" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}>
            <span className="tag tag--light">Your Health Companion</span>
            <h1>Meet <em>Dr. Aara.</em></h1>
            <p>Think of her as a million-dollar health advisor in your pocket.<br />Scan the QR on your loaf and start talking.<br />No app needed. No setup. Just talk, and feel better guided.</p>
            <Button to="/our-bread" variant="light" size="lg">Get Your Loaf + Aara</Button>
          </motion.div>
        </div>
      </section>

      <section className="aara-features">
        <div className="container">
          <div className="aara-features__header reveal">
            <span className="tag">How she works</span>
            <h2>Not an app.<br /><em>A companion.</em></h2>
          </div>
          <div className="aara-features__grid">
            {features.map((f, i) => (
              <div key={f.title} className="aara-feature reveal" style={{ transitionDelay: `${i * 120}ms` }}>
                <div className="aara-feature__icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="aara-access">
        <div className="container aara-access__inner">
          <div className="aara-access__text reveal">
            <span className="tag tag--gold">Zero friction</span>
            <h2>Scan. Talk.<br /><em>That's it.</em></h2>
            <p>Every MetaKitchen loaf has a QR code on the packaging. Scan it with any phone camera, and Aara opens instantly — no downloads, no accounts, no friction.</p>
            <div className="aara-access__steps">
              {['Buy your MetaKitchen loaf', 'Scan the QR on the pack', 'Talk to Dr. Aara'].map((step, i) => (
                <div key={step} className="aara-access__step">
                  <span className="aara-access__step-num stat">{String(i + 1).padStart(2, '0')}</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="aara-access__phone reveal reveal-delay-2">
            <div className="aara-phone">
              <div className="aara-phone__screen">
                <div className="aara-phone__chat">
                  <div className="aara-chat__bubble aara-chat__bubble--aara">Hi! I'm Aara. How are you feeling after breakfast today?</div>
                  <div className="aara-chat__bubble aara-chat__bubble--user">Pretty good, not too tired this time.</div>
                  <div className="aara-chat__bubble aara-chat__bubble--aara">That's the steady glucose working. Your pattern is improving — shall I suggest a lunch pairing?</div>
                  <div className="aara-phone__typing"><span /><span /><span /></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="aara-cta">
        <div className="container aara-cta__inner reveal">
          <h2>Ready to meet<br /><em>your companion?</em></h2>
          <p>Get your MetaKitchen loaf and Aara comes with it. No extra cost.</p>
          <Button to="/our-bread" variant="primary" size="lg">Join the Waitlist</Button>
        </div>
      </section>

    </motion.div>
  )
}
