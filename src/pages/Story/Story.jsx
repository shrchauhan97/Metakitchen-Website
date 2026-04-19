import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Button from '../../components/Button/Button.jsx'
import './Story.css'

const values = [
  { title: 'Clinically honest', desc: "We publish our numbers. All of them. If the science doesn't back it, we don't say it." },
  { title: 'Chef-led', desc: "Health food that actually tastes good. Because deprivation isn't a strategy." },
  { title: 'Built for India', desc: "Not imported wellness. Bread made for Indian kitchens, Indian habits, Indian blood sugar patterns." },
  { title: 'Everyday accessible', desc: "If it's priced as a luxury, it won't change anything. We're building a daily staple." },
]

export default function Story() {
  useEffect(() => {
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }), { threshold: 0.15 })
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <motion.div className="page-wrapper" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>

      <section className="story-hero">
        <div className="container story-hero__inner">
          <motion.div className="story-hero__text" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
            <span className="tag tag--gold">Our Story</span>
            <h1>Making metabolic<br />health<br /><em>effortless.</em></h1>
          </motion.div>
        </div>
        <motion.div className="story-hero__image" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}>
          <img src="https://metakitchen.io/wp-content/uploads/2026/02/freepik__the-style-is-candid-image-photography-with-natural__53474.png" alt="MetaKitchen kitchen" />
          <div className="story-hero__caption">
            <span className="stat">30+</span>
            <span>years of culinary mastery</span>
          </div>
        </motion.div>
      </section>

      <section className="story-why">
        <div className="container story-why__inner">
          <div className="story-why__headline reveal">
            <h2>India doesn't need another supplement.<br /><em>It needs better bread.</em></h2>
          </div>
          <div className="story-why__body reveal reveal-delay-2">
            <p>Diabetes affects over 100 million Indians. Most of them eat bread every day. The bread they eat spikes their blood sugar. And the options that claim to be healthier taste like cardboard and cost like medicine.</p>
            <p>We started MetaKitchen because we believed there was a third path — a bread so good you'd choose it even if you didn't have diabetes. Clinically sound, chef-crafted, and priced to be a real daily staple.</p>
            <p>After three years of R&D, clinical trials across 200+ subjects, and collaborations with some of India's finest chefs — we built it.</p>
          </div>
        </div>
      </section>

      <section className="story-values">
        <div className="container">
          <div className="story-values__header reveal">
            <span className="tag">What we believe</span>
            <h2>The principles<br /><em>we don't compromise on.</em></h2>
          </div>
          <div className="story-values__grid">
            {values.map((v, i) => (
              <div key={v.title} className="story-value reveal" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="story-value__num stat">{String(i + 1).padStart(2, '0')}</div>
                <h4>{v.title}</h4>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="story-stats">
        <div className="container story-stats__inner">
          {[['100M+', 'Indians living with diabetes'], ['200+', 'Clinical trial subjects'], ['GI 38', 'Clinically confirmed'], ['30+', 'Years chef expertise']].map(([num, label], i) => (
            <>
              <div key={num} className="story-stat-block reveal" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="story-stat-block__num stat">{num}</div>
                <p>{label}</p>
              </div>
              {i < 3 && <div key={`div-${i}`} className="story-stat-divider" />}
            </>
          ))}
        </div>
      </section>

      <section className="story-cta">
        <div className="container story-cta__inner reveal">
          <div className="story-cta__text">
            <h2>Built by EVAA Pte. Ltd.<br /><em>Singapore · India</em></h2>
            <p>hello@evva.enterprises<br />© 2026 EVAA Pte. Ltd.</p>
          </div>
          <div className="story-cta__actions">
            <Button to="/our-bread" variant="primary" size="lg">Join the Waitlist</Button>
            <Button to="/science" variant="secondary" size="lg">Read the Science</Button>
          </div>
        </div>
      </section>

    </motion.div>
  )
}
