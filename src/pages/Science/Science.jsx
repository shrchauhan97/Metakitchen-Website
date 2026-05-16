import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Button from '../../components/Button/Button.jsx'
import SeoHead from '../../components/SeoHead/SeoHead.jsx'
import { PROOF, BRAND } from '../../data/content.js'
import './Science.css'

const FAQ_LD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the glycemic index of MetaKitchen bread?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "The Daily White, MetaKitchen's flagship loaf, is lab-tested at GI 38 — below the FSSAI low-GI threshold of 55. White bread sits at 70.",
      },
    },
    {
      '@type': 'Question',
      name: 'How was the glycemic index measured?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The standard predictive Glycemic Index protocol at an accredited Indian lab, using the Goñi et al. regression — the methodology used by the FAO and food research bodies worldwide.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does this compare to regular bread?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "White bread sits around GI 70. Most 'healthy multigrain' loaves on Indian shelves land between 55 and 70. Watermelon is 76. An apple is 36. Lentils are around 30. The Daily White came back at 38.",
      },
    },
    {
      '@type': 'Question',
      name: 'Is this bread safe for diabetics?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "It is bread that has been lab-tested for its glycemic index — useful for blood-sugar-aware eating, not a treatment. For diabetics on medication, your physician's guidance is what matters.",
      },
    },
    {
      '@type': 'Question',
      name: 'Where is MetaKitchen bread made?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Made in India, by chefs from the country’s most senior kitchens. The line starts with the Daily White, with chia ciabatta, sourdough variants, and jalapeño cheese to follow.',
      },
    },
  ],
}

const BREADCRUMB_LD = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://metakitchen.io/' },
    { '@type': 'ListItem', position: 2, name: 'Science', item: 'https://metakitchen.io/science' },
  ],
}

gsap.registerPlugin(ScrollTrigger)

const timeline = [
  { year: 'V1', event: 'First draft', desc: 'A chef-led loaf, stone-ground, slow-fermented. Pulled from the oven and tasted.' },
  { year: 'V2', event: 'Refined', desc: 'Crumb tightened. Crust adjusted. Closer to a daily loaf, not yet there.' },
  { year: 'V3', event: 'Fed to people', desc: 'Tested on the people who eat bread every morning. Notes came back. The recipe got cut down further.' },
  { year: 'V4', event: 'Sent to the lab', desc: 'The one that did not taste like a compromise. The number came back at 38.' },
]

export default function Science() {
  const chartRef = useRef(null)
  const pathMKRef = useRef(null)
  const pathRegRef = useRef(null)
  const giDotRef = useRef(null)
  const giLabelRef = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible')
        }),
      { threshold: 0.15 },
    )
    document.querySelectorAll('.reveal').forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  useGSAP(
    () => {
      if (!pathMKRef.current || !pathRegRef.current) return
      const totalMK = pathMKRef.current.getTotalLength()
      const totalReg = pathRegRef.current.getTotalLength()
      gsap.set(pathMKRef.current, { strokeDasharray: totalMK, strokeDashoffset: totalMK })
      gsap.set(pathRegRef.current, { strokeDasharray: totalReg, strokeDashoffset: totalReg })
      if (giDotRef.current) gsap.set(giDotRef.current, { scale: 0, transformOrigin: 'center' })
      if (giLabelRef.current) gsap.set(giLabelRef.current, { opacity: 0, y: -8 })

      const trigger = { trigger: chartRef.current, start: 'top 70%', once: true }
      const tl = gsap.timeline({ scrollTrigger: trigger })
      tl.to(pathRegRef.current, { strokeDashoffset: 0, duration: 2.2, ease: 'power2.out' }, 0)
        .to(pathMKRef.current, { strokeDashoffset: 0, duration: 2.2, ease: 'power2.out' }, 0.4)
      if (giDotRef.current && giLabelRef.current) {
        tl.to(giDotRef.current, { scale: 1, duration: 0.6, ease: 'back.out(2)' }, 1.6)
          .to(giLabelRef.current, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 1.8)
      }
    },
    { scope: chartRef },
  )

  return (
    <>
      <SeoHead route="/science">
        <script type="application/ld+json">{JSON.stringify(FAQ_LD)}</script>
        <script type="application/ld+json">{JSON.stringify(BREADCRUMB_LD)}</script>
      </SeoHead>
      <motion.div
        className="page-wrapper"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <section className="science-hero">
          <div className="container">
            <motion.div
              className="science-hero__text"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="tag tag--light">How we test</span>
              <h1>One loaf. One lab. One number.</h1>
              <p>
                The Daily White was sent to an accredited Indian lab. The standard predictive
                glycemic index protocol. The number came back at {PROOF.gi}.
              </p>
              <div className="science-hero__meta">
                <span className="science-hero__meta-item">Predictive GI</span>
                <span className="science-hero__meta-item">Accredited lab</span>
                <span className="science-hero__meta-item">Goñi et al. regression</span>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="science-stats">
          <div className="container">
            <div className="science-stats__grid">
              {PROOF.metrics.map((f, i) => (
                <div
                  key={f.label}
                  className="science-stat reveal"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="science-stat__num stat">{f.value}</div>
                  <div className="science-stat__label">{f.label}</div>
                  <div className="science-stat__sub">{f.sublabel}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="chart-section" ref={chartRef}>
          <div className="container">
            <div className="chart-section__header reveal">
              <span className="tag tag--gold">What the curve looks like</span>
              <h2>Lower peak. Slower rise. Steadier finish.</h2>
              <p>The orange line is the Daily White. The red line is regular white bread.</p>
            </div>
            <div className="chart-wrapper reveal reveal-delay-2">
              <svg
                viewBox="0 0 700 300"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="chart-svg"
                role="img"
                aria-labelledby="sci-chart-title sci-chart-desc"
              >
                <title id="sci-chart-title">Post-meal glucose response curves</title>
                <desc id="sci-chart-desc">
                  MetaKitchen produces a flatter glucose curve over 2 hours.
                </desc>

                {[0, 1, 2, 3, 4].map((i) => (
                  <line
                    key={i}
                    x1="60"
                    y1={40 + i * 48}
                    x2="660"
                    y2={40 + i * 48}
                    stroke="rgba(26, 24, 20, 0.06)"
                    strokeWidth="1"
                  />
                ))}
                {['180', '150', '120', '90', '60'].map((v, i) => (
                  <text key={v} x="48" y={44 + i * 48} textAnchor="end" className="chart-label">
                    {v}
                  </text>
                ))}
                {['0', '30', '60', '90', '120'].map((v, i) => (
                  <text key={v} x={60 + i * 150} y="268" textAnchor="middle" className="chart-label">
                    {v} min
                  </text>
                ))}

                <path
                  ref={pathRegRef}
                  d="M60,232 C110,232 130,60 210,52 C290,44 330,88 380,124 C430,160 480,200 660,224"
                  stroke="#5A6373"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="6 4"
                  fill="none"
                />
                <path
                  ref={pathMKRef}
                  d="M60,232 C110,232 140,148 200,136 C260,124 300,148 360,168 C420,188 500,208 660,224"
                  stroke="#C2702A"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M60,232 C110,232 140,148 200,136 C260,124 300,148 360,168 C420,188 500,208 660,224 L660,240 L60,240 Z"
                  fill="url(#ochreFillSci)"
                  opacity="0.18"
                />
                <defs>
                  <linearGradient id="ochreFillSci" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#C2702A" />
                    <stop offset="100%" stopColor="#C2702A" stopOpacity="0" />
                  </linearGradient>
                </defs>

                <g ref={giDotRef}>
                  <circle cx="200" cy="136" r="6" fill="#C2702A" />
                  <circle cx="200" cy="136" r="11" fill="none" stroke="#C2702A" strokeOpacity="0.35" strokeWidth="2" />
                </g>
                <g ref={giLabelRef}>
                  <rect x="218" y="118" width="64" height="32" rx="6" fill="#1A1814" />
                  <text x="250" y="130" textAnchor="middle" className="chart-badge-label">GI</text>
                  <text x="250" y="144" textAnchor="middle" className="chart-badge-value">{PROOF.gi}</text>
                </g>
              </svg>
              <div className="chart-legend">
                <div className="chart-legend__item">
                  <div className="chart-legend__line chart-legend__line--mk" />
                  <span>MetaKitchen (low GI, {PROOF.gi})</span>
                </div>
                <div className="chart-legend__item">
                  <div className="chart-legend__line chart-legend__line--reg" />
                  <span>Regular wheat bread (high GI, ~{PROOF.giStandardWhiteBread})</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="sci-timeline">
          <div className="container">
            <div className="sci-timeline__header reveal">
              <span className="tag">From the kitchen, then to the lab</span>
              <h2>Four versions to get here.</h2>
            </div>
            <div className="sci-timeline__items">
              {timeline.map((t, i) => (
                <div
                  key={t.year}
                  className="sci-timeline__item reveal"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
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

        <section className="science-citations">
          <div className="container">
            <div className="science-citations__inner reveal">
              <span className="tag">FAQ</span>
              <h3>What the lab does, and what it means.</h3>
              <div className="science-faq">
                <details className="science-faq__item">
                  <summary>What is the glycemic index of MetaKitchen bread?</summary>
                  <p>
                    The Daily White, MetaKitchen's flagship loaf, is lab-tested at GI {PROOF.gi} —
                    below the FSSAI low-GI threshold of 55. White bread sits at 70.
                  </p>
                </details>

                <details className="science-faq__item">
                  <summary>How was the glycemic index measured?</summary>
                  <p>
                    The standard predictive Glycemic Index protocol at an accredited Indian lab,
                    using the Goñi et al. regression — the methodology used by the FAO and food
                    research bodies worldwide.
                  </p>
                </details>

                <details className="science-faq__item">
                  <summary>How does this compare to regular bread?</summary>
                  <p>
                    White bread sits around GI 70. Most "healthy multigrain" loaves on Indian
                    shelves land between 55 and 70. Watermelon is 76. An apple is 36. Lentils are
                    around 30. The Daily White came back at {PROOF.gi}.
                  </p>
                </details>

                <details className="science-faq__item">
                  <summary>Is this bread safe for diabetics?</summary>
                  <p>
                    It is bread that has been lab-tested for its glycemic index — useful for
                    blood-sugar-aware eating, not a treatment. For diabetics on medication, your
                    physician's guidance is what matters.
                  </p>
                </details>

                <details className="science-faq__item">
                  <summary>Where is MetaKitchen bread made?</summary>
                  <p>
                    Made in India, by chefs from the country's most senior kitchens. The line
                    starts with the Daily White, with chia ciabatta, sourdough variants, and
                    jalapeño cheese to follow.
                  </p>
                </details>
              </div>

              <p className="science-citations__context">
                India context: roughly 237M people with diabetes or pre-diabetes (ICMR-INDIAB,
                Lancet 2023). 76.6% of diagnosed diabetics have poor glycemic control despite
                medication (TIGHT Study, BMJ 2019).
              </p>

              <p className="science-citations__note">
                Want the lab report? Email{' '}
                <a href={`mailto:${BRAND.email}?subject=MetaKitchen%20Lab%20Report`}>
                  {BRAND.email}
                </a>.
              </p>
            </div>
          </div>
        </section>

        <section className="science-cta">
          <div className="container science-cta__inner reveal">
            <h2>Convinced? Get on the list.</h2>
            <Button to="/our-bread#waitlist" variant="primary" size="lg">
              Get on the list
            </Button>
          </div>
        </section>
      </motion.div>
    </>
  )
}
