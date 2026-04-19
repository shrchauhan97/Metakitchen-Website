import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Check } from 'lucide-react'
import Button from '../../components/Button/Button.jsx'
import WaitlistForm from '../../components/WaitlistForm/WaitlistForm.jsx'
import './OurBread.css'

gsap.registerPlugin(ScrollTrigger)

const attributes = ['Zero Maida', 'No Added Sugar', 'High Fibre', 'Plant-Based', 'No Preservatives', 'Blood Sugar Friendly']

const ingredients = [
  { name: 'Whole Wheat Flour', role: 'Base', desc: 'Stone-milled for maximum fibre retention.' },
  { name: 'Flax Seeds', role: 'Omega-3', desc: 'Rich in ALA and soluble fibre to slow glucose absorption.' },
  { name: 'Oats', role: 'Beta-glucan', desc: 'Clinically proven to reduce post-meal glucose spikes.' },
  { name: 'Psyllium Husk', role: 'Fibre', desc: 'Viscous fibre that forms a gel, slowing digestion.' },
  { name: 'Olive Oil', role: 'Fat', desc: 'Heart-healthy monounsaturated fats for satiety.' },
  { name: 'Fresh Herbs', role: 'Flavour', desc: 'Chef-selected for taste. No artificial flavouring.' },
]

const scienceStats = [
  { stat: '38', label: 'Glycemic Index', sub: 'vs 70+ for regular white bread' },
  { stat: '42%', label: 'Lower glucose spike', sub: 'vs standard wheat bread' },
  { stat: '3x', label: 'More dietary fibre', sub: 'than average market bread' },
  { stat: '0g', label: 'Added sugar', sub: 'naturally sweetened by ingredients' },
]

const values = [
  { title: 'Clinically honest', desc: "We publish our numbers. All of them. If the science doesn't back it, we don't say it." },
  { title: 'Chef-led', desc: "Health food that actually tastes good. Because deprivation isn't a strategy." },
  { title: 'Built for India', desc: "Not imported wellness. Bread made for Indian kitchens, Indian habits, Indian blood sugar patterns." },
  { title: 'Everyday accessible', desc: "If it's priced as a luxury, it won't change anything. We're building a daily staple." },
]

export default function OurBread() {
  const chartRef = useRef(null)
  const pathMKRef = useRef(null)
  const pathRegRef = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.15 }
    )
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

      {/* Hero */}
      <section className="bread-hero">
        <div className="container bread-hero__inner">
          <div className="bread-hero__text">
            <motion.span className="tag" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>The Metabolic Loaf</motion.span>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}>
              This isn't Diet Bread.<br />It's Just <em>Better Bread.</em>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
              Created by celebrated chefs from India's top hotel kitchens with over 30 years of culinary mastery. A chef's recipe that happens to be clinically sound.
            </motion.p>
          </div>
          <motion.div className="bread-hero__image" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}>
            <img src="https://metakitchen.io/wp-content/uploads/2026/02/freepik__closeup-crosssection-of-artisan-multigrain-bread-p__53471.png" alt="MetaKitchen bread cross-section" />
          </motion.div>
        </div>
      </section>

      {/* Attributes */}
      <section className="attributes">
        <div className="container">
          <div className="attributes__grid">
            {attributes.map((attr, i) => (
              <div key={attr} className="attribute reveal" style={{ transitionDelay: `${i * 60}ms` }}>
                <div className="attribute__check"><Check size={14} /></div>
                <span>{attr}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ingredients */}
      <section className="ingredients">
        <div className="container">
          <div className="ingredients__header reveal">
            <span className="tag tag--gold">What Goes In</span>
            <h2>Every ingredient<br /><em>earns its place.</em></h2>
            <p>No maida. No added sugar. No preservatives. Just ingredients that work.</p>
          </div>
          <div className="ingredients__grid">
            {ingredients.map((ing, i) => (
              <div key={ing.name} className="ingredient reveal" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="ingredient__role stat">{ing.role}</div>
                <h4>{ing.name}</h4>
                <p>{ing.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Science stats */}
      <section className="bread-science-stats">
        <div className="container">
          <div className="bread-science-stats__header reveal">
            <span className="tag">The Science</span>
            <h2>Not a claim.<br /><em>A proof.</em></h2>
            <p>Every number comes from independent clinical trials, not marketing copy.</p>
          </div>
          <div className="bread-science-grid">
            {scienceStats.map((f, i) => (
              <div key={f.label} className="bread-science-stat reveal" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="bread-science-stat__num stat">{f.stat}</div>
                <div className="bread-science-stat__label">{f.label}</div>
                <div className="bread-science-stat__sub">{f.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Glucose chart */}
      <section className="bread-chart" ref={chartRef}>
        <div className="container">
          <div className="bread-chart__header reveal">
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
              <path d="M60,232 C110,232 140,148 200,136 C260,124 300,148 360,168 C420,188 500,208 660,224 L660,240 L60,240 Z" fill="url(#greenFill2)" opacity="0.12" />
              <defs>
                <linearGradient id="greenFill2" x1="0" y1="0" x2="0" y2="1">
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

      {/* Brand story */}
      <section className="bread-story">
        <div className="container bread-story__inner">
          <div className="bread-story__headline reveal">
            <h2>India doesn't need another supplement.<br /><em>It needs better bread.</em></h2>
          </div>
          <div className="bread-story__body reveal reveal-delay-2">
            <p>Diabetes affects over 100 million Indians. Most of them eat bread every day. The bread they eat spikes their blood sugar — and the options that claim to be healthier taste like cardboard and cost like medicine.</p>
            <p>We built MetaKitchen because we believed there was a third path. A bread so good you'd choose it even if you didn't have diabetes. Clinically sound, chef-crafted, and priced as a real daily staple.</p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bread-values">
        <div className="container">
          <div className="bread-values__header reveal">
            <span className="tag">What We Believe</span>
            <h2>The principles<br /><em>we don't compromise on.</em></h2>
          </div>
          <div className="bread-values__grid">
            {values.map((v, i) => (
              <div key={v.title} className="bread-value reveal" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="bread-value__num stat">{String(i + 1).padStart(2, '0')}</div>
                <h4>{v.title}</h4>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist */}
      <section className="bread-waitlist">
        <div className="container bread-waitlist__inner">
          <div className="bread-waitlist__text reveal">
            <h2>Ready to taste it?</h2>
            <p>First batch dropping soon. Get your spot.</p>
          </div>
          <div className="reveal reveal-delay-2"><WaitlistForm theme="light" /></div>
        </div>
      </section>

    </motion.div>
  )
}
