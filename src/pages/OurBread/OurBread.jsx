import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Check, Wheat, Droplet, Leaf, Sprout, Flame, Clock } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import Button from '../../components/Button/Button.jsx'
import WaitlistForm from '../../components/WaitlistForm/WaitlistForm.jsx'
import GICounter from '../../components/GICounter/GICounter.jsx'
import { PROOF, INGREDIENTS, VALUES, SEO } from '../../data/content.js'
import './OurBread.css'

gsap.registerPlugin(ScrollTrigger)

const attributes = [
  'Zero maida',
  'No added sugar',
  'High fibre',
  'Stone-ground',
  'No preservatives',
  'Low glycemic',
]

// Visual icon for each ingredient role
const INGREDIENT_ICONS = {
  In: <Wheat size={20} />,
  'Not in': <Sprout size={20} />,
}

export default function OurBread() {
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
        .to(
          pathMKRef.current,
          { strokeDashoffset: 0, duration: 2.2, ease: 'power2.out' },
          0.4,
        )
      if (giDotRef.current && giLabelRef.current) {
        tl.to(
          giDotRef.current,
          { scale: 1, duration: 0.6, ease: 'back.out(2)' },
          1.6,
        ).to(
          giLabelRef.current,
          { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
          1.8,
        )
      }
    },
    { scope: chartRef },
  )

  return (
    <>
      <Helmet>
        <title>{SEO['/our-bread'].title}</title>
        <meta name="description" content={SEO['/our-bread'].description} />
      </Helmet>

      <motion.div
        className="page-wrapper"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* ============ Hero with video (no more 3D blob) ============ */}
        <section className="bread-hero">
          <div className="container bread-hero__inner">
            <div className="bread-hero__text">
              <motion.span
                className="tag"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                The bread
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                A staple upgrade.<br />
                <span className="bread-hero__accent">Built like a chef would build it.</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                The Daily White is the flagship — lab-tested at GI {PROOF.gi}. The rest of the line
                follows.
              </motion.p>
            </div>
            <motion.div
              className="bread-hero__visual"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                className="bread-hero__image"
                src="/img/hero-loaf.webp"
                alt="Whole seeded multigrain loaf on linen — top-down editorial shot"
                loading="eager"
              />
            </motion.div>
          </div>
        </section>

        {/* ============ GI 38 hero counter — the brand's single biggest stat, animated ============ */}
        <section className="gi-feature">
          <div className="container gi-feature__inner">
            <div className="gi-feature__copy reveal">
              <span className="tag">The proof</span>
              <h2>GI {PROOF.gi}, lab-tested.</h2>
              <p>
                Standard predictive glycemic index protocol, on the Daily White, at an accredited
                Indian lab. The result came back at {PROOF.gi} — below the FSSAI low-GI threshold
                of 55. White bread sits at {PROOF.giStandardWhiteBread}. Most "healthy multigrain"
                loaves on Indian shelves land between 55 and 70.
              </p>
              <Button to="/science" variant="primary" size="lg">
                How GI testing works
              </Button>
            </div>
            <div className="gi-feature__counter reveal reveal-delay-2">
              <GICounter from={70} to={PROOF.gi} />
            </div>
          </div>
        </section>

        {/* ============ Attribute pills ============ */}
        <section className="attributes">
          <div className="container">
            <div className="attributes__grid">
              {attributes.map((attr, i) => (
                <div
                  key={attr}
                  className="attribute reveal"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <div className="attribute__check">
                    <Check size={14} />
                  </div>
                  <span>{attr}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ Visual gallery — real bread photography ============ */}
        <section className="bread-gallery">
          <div className="container">
            <div className="bread-gallery__header reveal">
              <span className="tag tag--gold">The loaf, up close</span>
              <h2>A loaf that earns its place at breakfast.</h2>
              <p>Soft, springy crumb. A crust that holds butter. Toasts in ninety seconds. Carries
                an egg without falling apart. Lasts five days on the counter.</p>
            </div>
            <div className="bread-gallery__grid">
              <figure className="bread-gallery__cell bread-gallery__cell--lg reveal">
                <img
                  src="/img/crumb-cross-section.webp"
                  alt="Cross-section of multigrain bread showing open crumb and seeds"
                />
                <figcaption>Open-crumb structure</figcaption>
              </figure>
              <figure className="bread-gallery__cell reveal" style={{ transitionDelay: '80ms' }}>
                <img
                  src="/img/grains-macro.webp"
                  alt="Mixed whole grains and oats macro"
                />
                <figcaption>Stone-ground multigrain</figcaption>
              </figure>
              <figure className="bread-gallery__cell reveal" style={{ transitionDelay: '160ms' }}>
                <img
                  src="/img/hands-breaking-bread.webp"
                  alt="Hands gently tearing a slice of fresh multigrain bread"
                />
                <figcaption>Hand-formed, oven-baked</figcaption>
              </figure>
              <figure className="bread-gallery__cell reveal" style={{ transitionDelay: '240ms' }}>
                <img
                  src="/img/breakfast-spread.webp"
                  alt="Indian breakfast: bread, butter, eggs, masala chai"
                />
                <figcaption>Built for the meal</figcaption>
              </figure>
              <figure className="bread-gallery__cell reveal" style={{ transitionDelay: '320ms' }}>
                <img
                  src="/img/packaging-mockup.webp"
                  alt="Kraft-paper packaging with seeded multigrain loaf"
                />
                <figcaption>Coming soon</figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* ============ Ingredients ============ */}
        <section className="ingredients">
          <figure className="ingredients__banner reveal">
            <img
              src="/img/grains-macro.webp"
              alt="Macro of wheat berries, oats and flax seeds — the raw ingredients"
              loading="lazy"
            />
          </figure>
          <div className="container">
            <div className="ingredients__header reveal">
              <span className="tag tag--gold">The architecture of the loaf</span>
              <h2>What is in it. What is not.</h2>
              <p>Principles, not specifics — the exact blend depends on the loaf. The rules hold
                across the line.</p>
            </div>
            <div className="ingredients__grid">
              {INGREDIENTS.map((ing, i) => (
                <div
                  key={ing.name}
                  className="ingredient reveal"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="ingredient__icon">{INGREDIENT_ICONS[ing.role]}</div>
                  <div className="ingredient__role stat">{ing.role}</div>
                  <h4>{ing.name}</h4>
                  <p>{ing.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ Proof stats (dark) ============ */}
        <section className="bread-science-stats">
          <div className="container">
            <div className="bread-science-stats__header reveal">
              <span className="tag tag--light">The numbers</span>
              <h2>The numbers behind the loaf.</h2>
              <p>
                Lab-tested. Standard predictive GI protocol. <a href="/science">How we test →</a>
              </p>
            </div>
            <div className="bread-science-grid">
              {PROOF.metrics.map((m, i) => (
                <div
                  key={m.label}
                  className="bread-science-stat reveal"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="bread-science-stat__num stat">{m.value}</div>
                  <div className="bread-science-stat__label">{m.label}</div>
                  <div className="bread-science-stat__sub">{m.sublabel}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ Glucose chart — now with animated GI marker pop ============ */}
        <section className="bread-chart" ref={chartRef}>
          <div className="container">
            <div className="bread-chart__header reveal">
              <span className="tag">Blood glucose, two hours after a slice</span>
              <h2>Flatter curve. That is the whole point.</h2>
              <p>
                The orange line is the Daily White. The red line is regular white bread. Lower
                peak. Slower rise. Steadier finish.
              </p>
            </div>
            <div className="chart-wrapper reveal reveal-delay-2">
              <svg
                viewBox="0 0 700 300"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="chart-svg"
                role="img"
                aria-labelledby="chart-title chart-desc"
              >
                <title id="chart-title">
                  Post-meal glucose response: MetaKitchen vs regular wheat bread
                </title>
                <desc id="chart-desc">
                  MetaKitchen produces a flatter glucose curve over 2 hours, peaking 42% lower than
                  regular wheat bread.
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
                  <text
                    key={v}
                    x="48"
                    y={44 + i * 48}
                    textAnchor="end"
                    className="chart-label"
                  >
                    {v}
                  </text>
                ))}
                <text x="20" y="160" className="chart-axis-unit" transform="rotate(-90 20 160)">
                  Glucose (mg/dL)
                </text>

                {['0', '30', '60', '90', '120'].map((v, i) => (
                  <text
                    key={v}
                    x={60 + i * 150}
                    y="268"
                    textAnchor="middle"
                    className="chart-label"
                  >
                    {v} min
                  </text>
                ))}
                <text x="360" y="290" textAnchor="middle" className="chart-axis-unit">
                  Time after meal
                </text>

                <path
                  ref={pathRegRef}
                  d="M60,232 C110,232 130,60 210,52 C290,44 330,88 380,124 C430,160 480,200 660,224"
                  stroke="#C95F4A"
                  strokeWidth="2.5"
                  strokeLinecap="round"
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
                  fill="url(#ochreFill)"
                  opacity="0.18"
                />
                <defs>
                  <linearGradient id="ochreFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#C2702A" />
                    <stop offset="100%" stopColor="#C2702A" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Animated peak marker for MK */}
                <g ref={giDotRef}>
                  <circle cx="200" cy="136" r="6" fill="#C2702A" />
                  <circle cx="200" cy="136" r="11" fill="none" stroke="#C2702A" strokeOpacity="0.35" strokeWidth="2" />
                </g>
                <g ref={giLabelRef}>
                  <rect x="218" y="118" width="64" height="32" rx="6" fill="#1A1814" />
                  <text x="250" y="130" textAnchor="middle" className="chart-badge-label">GI</text>
                  <text x="250" y="144" textAnchor="middle" className="chart-badge-value">
                    {PROOF.gi}
                  </text>
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

        {/* ============ Brand story — paired with hands-tearing-bread imagery ============ */}
        <section className="bread-story">
          <div className="container bread-story__inner">
            <figure className="bread-story__media reveal">
              <img
                src="/img/hands-breaking-bread.webp"
                alt="Hands gently tearing a slice of fresh multigrain MetaKitchen bread"
                loading="lazy"
              />
              <figcaption>The bread you'd want, every day</figcaption>
            </figure>
            <div className="bread-story__text reveal reveal-delay-2">
              <span className="tag">The thesis</span>
              <h2>From the kitchen, then to the lab.</h2>
              <p>
                The recipe started in a chef's kitchen, not a food-science department. We knew
                what the bread had to taste like before we cared what the GI came back at.
              </p>
              <p>
                Built four versions. Fed them to people who eat bread every morning. Sent the one
                that did not taste like a compromise to the lab. The number came back at {PROOF.gi}.
              </p>
            </div>
          </div>
        </section>

        {/* ============ Values ============ */}
        <section className="bread-values">
          <div className="container">
            <div className="bread-values__header reveal">
              <span className="tag">The range</span>
              <h2>One loaf, then a kitchen.</h2>
              <p>Bread is where we start. The rest of the line is the same idea — staples that
                don't punish your blood sugar, made by chefs who care how they taste.</p>
            </div>
            <div className="bread-values__grid">
              {VALUES.map((v, i) => (
                <div
                  key={v.title}
                  className="bread-value reveal"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="bread-value__num stat">{String(i + 1).padStart(2, '0')}</div>
                  <h4>{v.title}</h4>
                  <p>{v.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ Waitlist ============ */}
        <section className="bread-waitlist" id="waitlist">
          <div className="container bread-waitlist__inner">
            <div className="bread-waitlist__text reveal">
              <h2>Get on the list.</h2>
              <p>Drop your email. We will get you a loaf in the first run.</p>
            </div>
            <div className="reveal reveal-delay-2">
              <WaitlistForm theme="light" />
            </div>
          </div>
        </section>
      </motion.div>
    </>
  )
}
