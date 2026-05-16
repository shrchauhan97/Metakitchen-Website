import { useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Zap,
  ChefHat,
  ShoppingBag,
  Wheat,
  Clock,
  TrendingDown,
  Sparkles,
  Heart,
  QrCode,
  MessageCircle,
  Activity,
} from 'lucide-react'
import Button from '../../components/Button/Button.jsx'
import WaitlistForm from '../../components/WaitlistForm/WaitlistForm.jsx'
import HeroShaderBackdrop from '../../components/HeroShaderBackdrop/HeroShaderBackdrop.jsx'
import GICounter from '../../components/GICounter/GICounter.jsx'
import SeoHead from '../../components/SeoHead/SeoHead.jsx'
import { BRAND, PROOF, AARA } from '../../data/content.js'
import './Home.css'

const FADE = {
  hidden: { opacity: 0, y: 32 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
}

const pillars = [
  {
    icon: <ChefHat size={20} />,
    title: 'Chefs first. Lab second.',
    desc: 'The recipe came out of kitchens that have fed people for generations. Built four versions before one made it past the people eating it every morning. The GI test came after, to confirm what taste already knew.',
    stat: 'Chef-led',
  },
  {
    icon: <Zap size={20} />,
    title: 'GI 38 — the lowest we have seen in India.',
    desc: 'Predictive Glycemic Index, accredited Indian lab. Below the FSSAI low-GI threshold of 55. White bread sits at 70. Most "multigrain" Indian loaves land in the 60s.',
    stat: 'GI 38',
  },
  {
    icon: <ShoppingBag size={20} />,
    title: 'Priced like the bread you already buy.',
    desc: 'A staple, not a luxury. The compromise was never supposed to be between taste, blood sugar, and rent.',
    stat: 'Daily',
  },
]

const loopSteps = [
  { num: '01', icon: <ShoppingBag size={22} />, text: 'Buy the loaf' },
  { num: '02', icon: <QrCode size={22} />, text: 'Scan the QR' },
  { num: '03', icon: <MessageCircle size={22} />, text: 'Talk to Aara' },
  { num: '04', icon: <Activity size={22} />, text: 'She learns you' },
]

export default function Home() {
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
      <SeoHead route="/" />

      <motion.div
        className="page-wrapper"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* ============ Hero — ShaderGradient backdrop + KJ's video + B2C chips ============ */}
        <section className="hero">
          <HeroShaderBackdrop
            color1="#C2702A"
            color2="#E8C66E"
            color3="#F5EFE2"
            speed={0.15}
            strength={2.6}
            className="hero__shader"
          />

          <div className="hero__content">
            <motion.span
              className="hero__eyebrow"
              variants={FADE}
              initial="hidden"
              animate="show"
              custom={0}
            >
              <Sparkles size={14} /> Stone-ground · Slow-fermented · Lab-verified GI 38
            </motion.span>

            <motion.h1
              className="hero__headline"
              variants={FADE}
              initial="hidden"
              animate="show"
              custom={1}
            >
              The bread you already eat.<br />
              <span className="hero__headline-accent">Behaves differently.</span>
            </motion.h1>

            <motion.p
              className="hero__sub"
              variants={FADE}
              initial="hidden"
              animate="show"
              custom={2}
            >
              The Daily White — a chef-led loaf lab-tested at GI 38. The first in a line of
              low-GI staples for the way India actually eats.
            </motion.p>

            <motion.div
              className="hero__chips"
              variants={FADE}
              initial="hidden"
              animate="show"
              custom={3}
            >
              <span className="chip chip--icon">
                <Wheat size={16} className="chip__icon" />
                <span className="chip__label">Stone-ground</span>
              </span>
              <span className="chip chip--icon chip--feature">
                <TrendingDown size={16} className="chip__icon" />
                <span className="chip__label-wrap">
                  <span className="chip__value">GI {PROOF.gi}</span>
                  <span className="chip__label">Lab-tested</span>
                </span>
              </span>
              <span className="chip chip--icon">
                <Clock size={16} className="chip__icon" />
                <span className="chip__label">48-hr ferment</span>
              </span>
              <span className="chip chip--icon">
                <Heart size={16} className="chip__icon" />
                <span className="chip__label">No preservatives</span>
              </span>
            </motion.div>

            <motion.div
              className="hero__actions"
              variants={FADE}
              initial="hidden"
              animate="show"
              custom={4}
            >
              <Button to="/our-bread" variant="primary" size="lg">
                See the loaf <ArrowRight size={16} />
              </Button>
              <Button to="/dr-aara" variant="ghost" size="lg">
                Meet Dr. Aara
              </Button>
            </motion.div>
          </div>

          <motion.div
            className="hero__visual"
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
              preload="metadata"
              poster="/img/bread-crosssection.webp"
              aria-label="MetaKitchen bread, slow-fermented multigrain loaf, in close-up"
            />
            <div className="hero__visual-mask" aria-hidden="true" />
          </motion.div>
        </section>

        {/* ============ Marquee strip — quick visual proof points ============ */}
        <section className="marquee">
          <div className="marquee__inner">
            <div className="marquee__track">
              {[
                { icon: <Wheat size={18} />, text: 'Stone-ground' },
                { icon: <Heart size={18} />, text: 'Zero maida' },
                { icon: <TrendingDown size={18} />, text: 'GI 38 lab-verified' },
                { icon: <Sparkles size={18} />, text: 'No added sugar' },
                { icon: <Heart size={18} />, text: 'No preservatives' },
                { icon: <Clock size={18} />, text: 'Slow-fermented' },
                { icon: <ChefHat size={18} />, text: 'Made in India' },
                { icon: <Wheat size={18} />, text: 'Stone-ground' },
                { icon: <Heart size={18} />, text: 'Zero maida' },
                { icon: <TrendingDown size={18} />, text: 'GI 38 lab-verified' },
                { icon: <Sparkles size={18} />, text: 'No added sugar' },
                { icon: <Heart size={18} />, text: 'No preservatives' },
                { icon: <Clock size={18} />, text: 'Slow-fermented' },
                { icon: <ChefHat size={18} />, text: 'Made in India' },
              ].map((item, i) => (
                <span className="marquee__item" key={i}>
                  <span className="marquee__icon">{item.icon}</span>
                  <span>{item.text}</span>
                  <span className="marquee__dot" aria-hidden="true">·</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ============ Pillars ============ */}
        <section className="pillars">
          <div className="container">
            <div className="pillars__header reveal">
              <span className="tag tag--gold">A staple, upgraded</span>
              <h2>Three things had to be true at once.</h2>
              <p className="pillars__lead">
                Or the loaf was not worth baking.
              </p>
            </div>
            <div className="pillars__grid">
              {pillars.map((p, i) => (
                <div
                  key={p.title}
                  className="pillar reveal"
                  style={{ transitionDelay: `${i * 120}ms` }}
                >
                  <div className="pillar__icon">{p.icon}</div>
                  <div className="pillar__stat stat">{p.stat}</div>
                  <h4>{p.title}</h4>
                  <p>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ Editorial strip — Higgsfield Indian breakfast spread ============ */}
        <section className="strip">
          <div className="strip__image">
            <img
              src="/img/breakfast-spread.webp"
              alt="Indian breakfast spread: sliced bread, butter, eggs, masala chai"
              className="strip__photo"
              loading="lazy"
            />
            <div className="strip__overlay">
              <span className="tag tag--light">The loaf, in the kitchen</span>
              <h3>Built for the way you actually eat.</h3>
              <p className="strip__caption">
                Toast and chai. The sandwich in the lunchbox. The Sunday French toast. Carries
                butter and egg, holds up under a heavy spread, lasts five days on the counter —
                no preservatives, no plastic-wrap tricks.
              </p>
            </div>
          </div>
        </section>

        {/* ============ Aara teaser with the actual portrait video ============ */}
        <section className="aara-teaser">
          <div className="container aara-teaser__inner reveal">
            <div className="aara-teaser__text">
              <span className="tag tag--clinical">Comes with the loaf</span>
              <h2>Dr. Aara. The conversation comes with the bread.</h2>
              <p>
                Scan the QR. Her face shows up on your phone. You talk, she talks back —
                in your language. She remembers what you ate last week, who shops in your
                house, how your morning has been going. Built on our own conversation engine,
                not a wrapper on someone else's model.
              </p>
              <Button to="/dr-aara" variant="primary" size="lg">
                See how she works <ArrowRight size={16} />
              </Button>
            </div>
            <div className="aara-teaser__portrait">
              <video
                className="aara-teaser__video"
                src="/draara.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                aria-label="Dr. Aara — multilingual AI nutrition avatar in conversation"
              />
            </div>
          </div>
        </section>

        {/* ============ The loop ============ */}
        <section className="loop">
          <div className="container">
            <div className="loop__header reveal">
              <h2>How it works.</h2>
              <p>Four steps. No app to download. The QR is on every pack.</p>
            </div>
            <div className="loop__steps">
              {loopSteps.map((s, i) => (
                <div
                  key={s.num}
                  className="loop__step reveal"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="loop__icon">{s.icon}</div>
                  <div className="loop__num stat">{s.num}</div>
                  <div className="loop__connector" />
                  <p>{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ Waitlist ============ */}
        <section className="home-waitlist" id="waitlist">
          <div className="container home-waitlist__inner">
            <div className="home-waitlist__text reveal">
              <span className="tag tag--light">First batches</span>
              <h2>Get on the list.</h2>
              <p>
                Drop your email. We will get you a loaf in the first run. That is all this list
                is for.
              </p>
            </div>
            <div className="reveal reveal-delay-2">
              <WaitlistForm theme="dark" />
            </div>
          </div>
        </section>
      </motion.div>
    </>
  )
}
