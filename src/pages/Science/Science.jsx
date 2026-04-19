import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Button from '../../components/Button/Button.jsx'
import './Science.css'

gsap.registerPlugin(ScrollTrigger)

const facts = [
  { stat: '38', label: 'Glycemic Index', sub: 'vs 70+ for regular white bread' },
  { stat: '42%', label: 'Lower glucose spike', sub: 'vs standard wheat bread' },
  { stat: '3x', label: 'More dietary fibre', sub: 'than average market bread' },
  { stat: '0g', label: 'Added sugar', sub: 'naturally sweetened by ingredients' },
]

const timeline = [
  { year: '2023', event: 'Recipe Development', desc: 'Award-winning chefs begin formulating the metabolic loaf.' },
  { year: '2024', event: 'Clinical Trials', desc: 'Validated across 200+ subjects. GI confirmed at 38.' },
  { year: '2025', event: 'Dr. Aara Integration', desc: 'AI companion trained on nutrition science and user data.' },
  { year: '2026', event: 'First Batch', desc: "India's first clinically validated low-GI daily bread goes to market." },
]

export default function Science() {
  const chartRef = useRef(null)
  const pathMKRef = useRef(null)
  const pathRegRef = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }), { threshold: 0.15 })
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  useGSAP(() => {
    if (!pathMKRef.current || !pathRegRef.current) return
    const totalMK = pathMKRef.current.getTotalLength()
    const totalReg = pathRegRef.current.getTotalLength()
    gsap.set(pathMKRef.current, { strokeDasharray: totalMK, strokeDashoffset: totalMK })
    gsap.set(pathRegRef.current, { strokeDasharray: totalReg, strokeDashoffset: totalReg })
    const trigger = { trigger: chartRef.current, start: 'top 70%', once: true }
    gsap.to(pathRegRef.current, { strokeDashoffset: 0, duration: 1.8, ease: 'power2.out', scrollTrigger: trigger })
    gsap.to(pathMKRef.current, { strokeDashoffset: 0, duration: 1.8, delay: 0.3, ease: 'power2.out', scrollTrigger: trigger })
  }, { scope: chartRef })

  return (
    <motion.div className="page-wrapper" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>

      <section className="science-hero">
        <div className="container">
          <motion.div className="science-hero__text" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
            <span className="tag tag--light">The Science</span>
            <h1>Not a claim.<br /><em>A proof.</em></h1>
            <p>Every number on this page comes from independent clinical trials, not marketing copy. Here's what we know, and how we know it.</p>
          </motion.div>
        </div>
      </section>

      <section className="science-stats">
        <div className="container">
          <div className="science-stats__grid">
            {facts.map((f, i) => (
              <div key={f.label} className="science-stat reveal" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="science-stat__num stat">{f.stat}</div>
                <div className="science-stat__label">{f.label}</div>
                <div className="science-stat__sub">{f.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="chart-section" ref={chartRef}>
        <div className="container">
          <div className="chart-section__header reveal">
            <span className="tag tag--gold">Blood Glucose Response</span>
            <h2>The curve<br /><em>says everything.</em></h2>
            <p>Post-meal blood glucose measured over 2 hours. MetaKitchen vs regular wheat bread.</p>
          </div>
          <div className="chart-wrapper reveal reveal-delay-2">
            <svg viewBox="0 0 700 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="chart-svg">
              {[0,1,2,3,4].map(i => <line key={i} x1="60" y1={40 + i*48} x2="660" y2={40 + i*48} stroke="rgba(0,0,0,0.06)" strokeWidth="1" />)}
              {['180','150','120','90','60'].map((v, i) => <text key={v} x="48" y={44 + i*48} textAnchor="end" className="chart-label">{v}</text>)}
              {['0','30','60','90','120'].map((v, i) => <text key={v} x={60 + i*150} y="268" textAnchor="middle" className="chart-label">{v} min</text>)}
              <path ref={pathRegRef} d="M60,232 C110,232 130,60 210,52 C290,44 330,88 380,124 C430,160 480,200 660,224" stroke="#E8B4A0" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path ref={pathMKRef} d="M60,232 C110,232 140,148 200,136 C260,124 300,148 360,168 C420,188 500,208 660,224" stroke="#2D5016" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M60,232 C110,232 140,148 200,136 C260,124 300,148 360,168 C420,188 500,208 660,224 L660,240 L60,240 Z" fill="url(#greenFill)" opacity="0.12" />
              <defs>
                <linearGradient id="greenFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2D5016" />
                  <stop offset="100%" stopColor="#2D5016" stopOpacity="0" />
                </linearGradient>
              </defs>
              <rect x="580" y="48" width="72" height="36" rx="8" fill="#2D5016" />
              <text x="616" y="62" textAnchor="middle" className="chart-badge-label">GI</text>
              <text x="616" y="76" textAnchor="middle" className="chart-badge-value">38</text>
            </svg>
            <div className="chart-legend">
              <div className="chart-legend__item"><div className="chart-legend__line chart-legend__line--mk" /><span>MetaKitchen Loaf</span></div>
              <div className="chart-legend__item"><div className="chart-legend__line chart-legend__line--reg" /><span>Regular Wheat Bread</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="sci-timeline">
        <div className="container">
          <div className="sci-timeline__header reveal">
            <span className="tag">Our Journey</span>
            <h2>From kitchen<br /><em>to clinic.</em></h2>
          </div>
          <div className="sci-timeline__items">
            {timeline.map((t, i) => (
              <div key={t.year} className="sci-timeline__item reveal" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="sci-timeline__year stat">{t.year}</div>
                <div className="sci-timeline__content">
                  <h4>{t.event}</h4>
                  <p>{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="science-cta">
        <div className="container science-cta__inner reveal">
          <h2>Convinced?<br /><em>Get on the list.</em></h2>
          <Button to="/our-bread" variant="primary" size="lg">Join the Waitlist</Button>
        </div>
      </section>

    </motion.div>
  )
}
