import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, AlertTriangle, TrendingDown, Clock } from 'lucide-react'
import Button from '../../components/Button/Button.jsx'
import CountUp from '../../components/CountUp/CountUp.jsx'
import SeoHead from '../../components/SeoHead/SeoHead.jsx'
import { VALUES, BRAND, PROOF } from '../../data/content.js'
import './Story.css'

const BREADCRUMB_LD = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://metakitchen.io/' },
    { '@type': 'ListItem', position: 2, name: 'Story', item: 'https://metakitchen.io/story' },
  ],
}

const STATS = [
  { num: '237M', label: 'Indians with diabetes or pre-diabetes', icon: <Users size={18} /> },
  { num: '76.6%', label: 'Of diagnosed diabetics, poorly controlled on medication', icon: <AlertTriangle size={18} /> },
  { num: `GI ${PROOF.gi}`, label: 'The Daily White, lab-tested', icon: <TrendingDown size={18} /> },
  { num: '48 hr', label: 'Slow ferment, every loaf', icon: <Clock size={18} /> },
]

export default function Story() {
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

  return (
    <>
      <SeoHead route="/story">
        <script type="application/ld+json">{JSON.stringify(BREADCRUMB_LD)}</script>
      </SeoHead>
      <motion.div
        className="page-wrapper"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <section className="story-hero">
          <div className="container story-hero__inner">
            <motion.div
              className="story-hero__text"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="tag tag--gold">The story</span>
              <h1>A chef's thesis on what bread should be.</h1>
              <p>
                MetaKitchen started where good food usually starts — in a kitchen, with chefs
                fed up with what was on the shelves.
              </p>
            </motion.div>
            <motion.div
              className="story-hero__visual"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                src="/img/packaging-mockup.webp"
                alt="MetaKitchen-style kraft packaging with sage monogram and a seeded multigrain loaf"
                loading="lazy"
              />
            </motion.div>
          </div>
        </section>

        <section className="story-why">
          <div className="container story-why__inner">
            <figure className="story-why__media reveal">
              <img
                src="/img/breakfast-spread.webp"
                alt="MetaKitchen multigrain bread on a real morning table"
                loading="lazy"
              />
              <figcaption>The breakfast we set out to fix</figcaption>
            </figure>
            <div className="story-why__text reveal reveal-delay-2">
              <span className="tag">The thesis</span>
              <h2>Bread itself, better.</h2>
              <p>
                237 million Indians have diabetes or pre-diabetes. Most of them eat bread every
                morning. The bread on the shelves spikes their blood sugar. The "diabetic-friendly"
                alternatives taste like cardboard, price like medicine, and come in packaging that
                signals illness.
              </p>
              <p>
                The chefs behind MetaKitchen have spent their careers feeding people at the level
                of India's most demanding kitchens — hotels, embassies, the rooms where what you
                eat is the point of the evening. They wanted a bread that did not punish the
                people eating it. Not a niche health product. Not a sad health-aisle compromise.
              </p>
              <p>
                Four versions later, the recipe was something a chef would happily serve at
                breakfast and a lab would happily certify as low-GI. That is the Daily White. The
                first loaf. The line follows.
              </p>
            </div>
          </div>
        </section>

        <section className="story-values">
          <div className="container">
            <div className="story-values__header reveal">
              <span className="tag">What we are building</span>
              <h2>Bread is the wedge. The line is the longer arc.</h2>
              <p>A line of daily staples that share one rule: a glycemic index a chef would not
                be ashamed of and a doctor would not argue with.</p>
            </div>
            <div className="story-values__grid">
              {VALUES.map((v, i) => (
                <div
                  key={v.title}
                  className="story-value reveal"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="story-value__num stat">{String(i + 1).padStart(2, '0')}</div>
                  <h4>{v.title}</h4>
                  <p>{v.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="story-stats">
          <div className="container">
            <div className="story-stats__header reveal">
              <span className="tag tag--light">The numbers we are up against</span>
              <h2>Why this exists.</h2>
              <p>
                Bread is a daily staple. So is diabetes, increasingly. Building a better loaf is
                overdue.
              </p>
            </div>
            <div className="story-stats__grid">
              {STATS.map((s, i) => (
                <div
                  key={s.label}
                  className="story-stat-block reveal"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="story-stat-block__icon">{s.icon}</div>
                  <div className="story-stat-block__num stat">
                    <CountUp value={s.num} duration={1.4} />
                  </div>
                  <p>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="story-cta">
          <div className="container story-cta__inner reveal">
            <div className="story-cta__text">
              <h2>A small team in India.</h2>
              <p>
                Chefs from the country's most senior kitchens on the food side. A technology team
                on the Dr. Aara side, building the conversation engine in-house — not a wrapper on
                someone else's model. No factory shortcuts. No outsourced loaves. No off-the-shelf
                chatbot.
              </p>
              <p>
                <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
                <br />© 2026 MetaKitchen
              </p>
            </div>
            <div className="story-cta__actions">
              <Button to="/our-bread#waitlist" variant="primary" size="lg">
                Get on the list
              </Button>
              <Button to="/science" variant="secondary" size="lg">
                How we test
              </Button>
            </div>
          </div>
        </section>
      </motion.div>
    </>
  )
}
