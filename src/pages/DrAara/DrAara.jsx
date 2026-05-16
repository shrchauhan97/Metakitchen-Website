import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mic, Brain, TrendingUp, ShieldCheck } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import Button from '../../components/Button/Button.jsx'
import CaptionLoop from '../../components/CaptionLoop/CaptionLoop.jsx'
import AaraChatSim from '../../components/AaraChatSim/AaraChatSim.jsx'
import '../../components/AaraChatSim/AaraChatSim.css'
import { AARA, SEO } from '../../data/content.js'
import './DrAara.css'

const HERO_CAPTIONS = [
  "Hi, I'm Dr. Aara.",
  'Scan the QR on your loaf.',
  'My face shows up on your phone.',
  'Talk to me like a video call.',
  'In Hindi, English, Tamil, Bengali — whichever you actually use.',
  "Let's get to know your kitchen.",
]

const CALL_CAPTIONS = [
  "Tell me about lunch today — slow start or quick?",
  "Three weeks in, your bread is showing up in three meals out of seven. That is the right place to be.",
  "Your mother's daily bread question — let me check what works with metformin.",
  "You skipped breakfast yesterday — alright?",
  "The Daily White is hitting its stride for you. We could try the chia next.",
]

// Middle slot is a video (the HeyGen clip, silent loop) — gives the gallery motion + asset variety.
const AARA_PORTRAITS = [
  { type: 'image', src: '/img/aara-portrait.webp', caption: 'Morning brief' },
  { type: 'video', src: '/aara-clip.mp4', caption: 'In session' },
  { type: 'image', src: '/img/aara-portrait-3.webp', caption: 'After-meal review' },
]

const features = [
  {
    icon: <Mic size={22} />,
    title: 'A conversation, not a chatbot.',
    body: 'She listens, asks, reasons. She remembers what you said last week. Built on our own conversation engine — not a wrapper on someone else\'s model.',
  },
  {
    icon: <Brain size={22} />,
    title: 'The way India actually speaks.',
    body: 'Hindi, English, Tamil, Bengali, Marathi, Telugu — and the way you actually mix them. She follows the language you used last, not the one you picked in a dropdown.',
  },
  {
    icon: <TrendingUp size={22} />,
    title: 'She gets to know your eating, not just your bread.',
    body: 'She learns the patterns of your household — who shops, who decides, what your mother\'s morning has been doing. The household is the user, not just the individual.',
  },
]

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
})

export default function DrAara() {
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
      <Helmet>
        <title>{SEO['/dr-aara'].title}</title>
        <meta name="description" content={SEO['/dr-aara'].description} />
      </Helmet>

      <motion.div
        className="page-wrapper"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* ============ Hero — KJ's video portrait restored ============ */}
        <section className="aara-hero">
          <div className="aara-hero__bg" />
          <div className="container aara-hero__inner">
            <motion.div
              className="aara-hero__avatar"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="aara-avatar">
                <div className="aara-avatar__ring aara-avatar__ring--1" />
                <div className="aara-avatar__ring aara-avatar__ring--2" />
                <div className="aara-avatar__glow" />
                <div className="aara-avatar__frame">
                  <video
                    className="aara-avatar__video"
                    src="/draara.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster="/img/aara-portrait.jpg"
                  />
                  <CaptionLoop lines={HERO_CAPTIONS} intervalMs={3200} />
                </div>
                <div className="aara-avatar__badge">
                  <ShieldCheck size={14} />
                  <span>AI Avatar</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="aara-hero__text"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="aara-hero__disclosure">
                <ShieldCheck size={14} /> {AARA.shortDisclosure}
              </span>
              <h1>Meet Dr. Aara.</h1>
              <p>{AARA.oneLiner}</p>
              <p className="aara-hero__small">
                Dr. Aara is an AI. She is trained for nutrition and food conversations. She is not
                a physician. For prescriptions and personal medical decisions, talk to a human one.
              </p>
              <Button to="/our-bread" variant="light" size="lg">
                See the loaf she comes with
              </Button>
            </motion.div>
          </div>
        </section>

        {/* ============ How she works ============ */}
        <section className="aara-features">
          <div className="container">
            <div className="aara-features__header reveal">
              <span className="tag tag--clinical">How she works</span>
              <h2>Three things her engine actually does.</h2>
            </div>
            <div className="aara-features__grid">
              {features.map((f, i) => (
                <div
                  key={f.title}
                  className="aara-feature reveal"
                  style={{ transitionDelay: `${i * 120}ms` }}
                >
                  <div className="aara-feature__icon">{f.icon}</div>
                  <h3>{f.title}</h3>
                  <p>{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ Aara portrait strip — different moments ============ */}
        <section className="aara-gallery">
          <div className="container">
            <div className="aara-gallery__header reveal">
              <span className="tag tag--clinical">Throughout the day</span>
              <h2>Aara, on the line.</h2>
              <p>
                Open the pack. Scan the QR. Her face shows up on your phone. Talk to her like a
                video call — morning, mid-bite, after dinner. Same Aara, picking up where you
                left off.
              </p>
            </div>
            <div className="aara-gallery__strip">
              {AARA_PORTRAITS.map((p, i) => (
                <figure
                  key={p.src}
                  className="aara-gallery__cell reveal"
                  style={{ transitionDelay: `${i * 120}ms` }}
                >
                  {p.type === 'video' ? (
                    <video src={p.src} autoPlay loop muted playsInline />
                  ) : (
                    <img src={p.src} alt={`Dr. Aara — ${p.caption}`} loading="lazy" />
                  )}
                  <figcaption>{p.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ============ Video-call phone scaffold — what talking to her looks like ============ */}
        <section className="aara-access">
          <div className="container aara-access__inner">
            <div className="aara-access__text reveal">
              <span className="tag tag--gold">How to start</span>
              <h2>Open the bread. See her face. Start talking.</h2>
              <p>
                Audio and video. Scan the QR, her face shows up on your phone, you talk to her
                like a video call. No app to download. No account to make. The QR is on every
                pack.
              </p>
              <div className="aara-access__steps">
                {[
                  'Open the pack of MetaKitchen bread',
                  'Scan the QR with your phone camera',
                  'Start talking — in your language',
                ].map((step, i) => (
                  <div key={step} className="aara-access__step">
                    <span className="aara-access__step-num stat">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="aara-access__phone reveal reveal-delay-2">
              <div className="iphone">
                {/* Side buttons */}
                <span className="iphone__btn iphone__btn--silent" aria-hidden="true" />
                <span className="iphone__btn iphone__btn--vol-up" aria-hidden="true" />
                <span className="iphone__btn iphone__btn--vol-down" aria-hidden="true" />
                <span className="iphone__btn iphone__btn--power" aria-hidden="true" />

                {/* Screen */}
                <div className="iphone__screen">
                  {/* Dynamic island */}
                  <div className="iphone__island" aria-hidden="true" />

                  {/* Status bar */}
                  <div className="iphone__statusbar">
                    <span className="iphone__time">9:41</span>
                    <span className="iphone__icons">
                      <span className="iphone__bar" />
                      <span className="iphone__wifi" />
                      <span className="iphone__battery" />
                    </span>
                  </div>

                  {/* Chat header */}
                  <div className="iphone__chat-header">
                    <span className="iphone__avatar">
                      <img src="/img/aara-portrait.webp" alt="" aria-hidden="true" />
                    </span>
                    <div className="iphone__chat-meta">
                      <span className="iphone__chat-name">{AARA.name}</span>
                      <span className="iphone__chat-status">
                        <span className="iphone__online" /> AI avatar · on the line
                      </span>
                    </div>
                  </div>

                  {/* Interactive chat sim */}
                  <AaraChatSim />

                  {/* Home indicator */}
                  <div className="iphone__home-indicator" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ What she is not — honest about edges ============ */}
        <section className="aara-features">
          <div className="container">
            <div className="aara-features__header reveal">
              <span className="tag tag--clinical">Honest about edges</span>
              <h2>What she is not.</h2>
            </div>
            <div className="aara-features__grid">
              <div className="aara-feature reveal">
                <h3>Not a friend.</h3>
                <p>A reliable assistant who earns the right to know you.</p>
              </div>
              <div className="aara-feature reveal" style={{ transitionDelay: '120ms' }}>
                <h3>Not a doctor.</h3>
                <p>Not a replacement for one. For prescriptions and medical decisions, talk to a human physician.</p>
              </div>
              <div className="aara-feature reveal" style={{ transitionDelay: '240ms' }}>
                <h3>Not a glucose tracker.</h3>
                <p>Pairing with continuous glucose monitors is on the roadmap, not in your hand today.</p>
              </div>
              <div className="aara-feature reveal" style={{ transitionDelay: '360ms' }}>
                <h3>Not a wrapper on a generic model.</h3>
                <p>Her conversation engine, her voice, her memory — all in-house.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ============ CTA ============ */}
        <section className="aara-cta">
          <div className="container aara-cta__inner reveal">
            <h2>She comes with the loaf.</h2>
            <p>No extra cost. No subscription. No app to download. The QR is on every pack.</p>
            <Button to="/our-bread" variant="primary" size="lg">
              See the bread
            </Button>
          </div>
        </section>
      </motion.div>
    </>
  )
}
