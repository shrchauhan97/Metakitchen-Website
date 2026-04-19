import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Zap, ChefHat, ShoppingBag } from 'lucide-react'
import Button from '../../components/Button/Button.jsx'
import WaitlistForm from '../../components/WaitlistForm/WaitlistForm.jsx'
import './Home.css'

const FADE = {
  hidden: { opacity: 0, y: 40 },
  show: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] } }),
}

const pillars = [
  { icon: <Zap size={20} />, title: 'Steady Blood Sugar', desc: 'Clinically tested to keep your blood sugar stable. No spikes, no crashes.', stat: 'GI: 38' },
  { icon: <ChefHat size={20} />, title: 'Chef-Crafted', desc: "Formulated by award-winning chefs from India's finest hotel kitchens.", stat: '30+ yrs' },
  { icon: <ShoppingBag size={20} />, title: 'Made for Every Day', desc: "Priced as a daily staple, not a luxury. Because health shouldn't be a privilege.", stat: 'Daily' },
]

const loopSteps = [
  { num: '01', text: 'Eat better bread' },
  { num: '02', text: 'Talk to Aara' },
  { num: '03', text: 'She learns you' },
  { num: '04', text: 'Better guidance, better you' },
]

export default function Home() {
  useEffect(() => {
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }), { threshold: 0.15 })
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <motion.div className="page-wrapper" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>

      {/* Hero */}
      <section className="hero">

        {/* Left — text */}
        <div className="hero__content">
          <motion.div variants={FADE} initial="hidden" animate="show" custom={0}>
            <span className="tag">India's First Low-GI Daily Staple</span>
          </motion.div>
          <motion.h1 className="hero__headline" variants={FADE} initial="hidden" animate="show" custom={1}>
            Bread That<br /><em>Loves You Back.</em>
          </motion.h1>
          <motion.p className="hero__sub" variants={FADE} initial="hidden" animate="show" custom={2}>
            Clinically validated. Chef-crafted. Keeps your blood sugar steady.
          </motion.p>
          <motion.div className="hero__actions" variants={FADE} initial="hidden" animate="show" custom={3}>
            <Button to="/our-bread" variant="primary" size="lg">Explore the Bread</Button>
            <Button to="/our-bread" variant="ghost" size="lg" className="hero__science-btn">See the Science <span className="hero__science-arrow"><ArrowRight size={16} /></span></Button>
          </motion.div>
        </div>

        {/* Right — video */}
        <motion.div
          className="hero__img-bleed"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <video
            className="hero__video"
            src="/bread-hero.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="hero__img-gradient" />


        </motion.div>

        </section>

      {/* Pillars */}
      <section className="pillars">
        <div className="container">
          <div className="pillars__header reveal">
            <span className="tag tag--gold">Health Without Compromise</span>
            <h2>This isn't Diet Bread.<br /><em>It's Just Better Bread.</em></h2>
          </div>
          <div className="pillars__grid">
            {pillars.map((p, i) => (
              <div key={p.title} className="pillar reveal" style={{ transitionDelay: `${i * 120}ms` }}>
                <div className="pillar__icon">{p.icon}</div>
                <div className="pillar__stat stat">{p.stat}</div>
                <h4>{p.title}</h4>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full-bleed strip */}
      <section className="strip">
        <div className="strip__image">
          <img src="https://metakitchen.io/wp-content/uploads/2026/02/freepik__the-style-is-candid-image-photography-with-natural__53474.png" alt="MetaKitchen in real life" />
          <div className="strip__overlay">
            <span className="tag tag--light">Created by celebrated chefs with over 30 years of culinary mastery</span>
            <h3>A chef's recipe that happens to be <em>clinically sound.</em></h3>
          </div>
        </div>
      </section>

      {/* Dr. Aara teaser */}
      <section className="aara-teaser">
        <div className="container aara-teaser__inner reveal">
          <div className="aara-teaser__text">
            <span className="tag">Meet Dr. Aara</span>
            <h2>Your personal<br /><em>health companion.</em></h2>
            <p>Think of her as a million-dollar health advisor in your pocket. Scan the QR on your loaf and start talking. No app needed.</p>
            <Button to="/dr-aara" variant="primary" size="lg">Meet Dr. Aara <ArrowRight size={16} /></Button>
          </div>
          <div className="aara-teaser__orb">
            <div className="orb">
              <div className="orb__ring orb__ring--1" />
              <div className="orb__ring orb__ring--2" />
              <div className="orb__ring orb__ring--3" />
              <div className="orb__core"><span className="stat">Aara</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Smarter Loop */}
      <section className="loop">
        <div className="container">
          <div className="loop__header reveal">
            <h2>She gets better.<br /><em>So does your health.</em></h2>
            <p>A companion that gets smarter the more you use it. Not a product that sits on a shelf.</p>
          </div>
          <div className="loop__steps">
            {loopSteps.map((s, i) => (
              <div key={s.num} className="loop__step reveal" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="loop__num stat">{s.num}</div>
                <div className="loop__connector" />
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist */}
      <section className="home-waitlist">
        <div className="container home-waitlist__inner">
          <div className="home-waitlist__text reveal">
            <span className="tag tag--light">Early Access</span>
            <h2>Be the first<br />to taste it.</h2>
            <p>Join the waitlist. We'll let you know the moment the first batch is ready.</p>
          </div>
          <div className="reveal reveal-delay-2">
            <WaitlistForm theme="dark" />
          </div>
        </div>
      </section>

    </motion.div>
  )
}
