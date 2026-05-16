import { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion.js'
import './GICounter.css'

/**
 * Animated GI counter — counts from `from` (e.g. 70 = white bread baseline)
 * DOWN to `to` (38 = MetaKitchen) when it scrolls into view.
 * The drop tells the brand story in motion.
 */
export default function GICounter({
  from = 70,
  to = 38,
  label = 'Glycemic Index',
  sublabel = 'White bread baseline → MetaKitchen',
  duration = 1.6,
}) {
  const ref = useRef(null)
  const numRef = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const reduced = useReducedMotion()
  const [displayValue, setDisplayValue] = useState(reduced ? to : from)

  useEffect(() => {
    if (!inView || reduced) {
      setDisplayValue(to)
      return
    }
    const controls = animate(from, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplayValue(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, from, to, duration, reduced])

  return (
    <div ref={ref} className="gi-counter">
      <div className="gi-counter__inner">
        <span className="gi-counter__prefix">GI</span>
        <motion.span
          ref={numRef}
          className="gi-counter__num"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {displayValue}
        </motion.span>
      </div>
      <div className="gi-counter__rule" aria-hidden="true">
        <motion.div
          className="gi-counter__rule-fill"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: (70 - to) / 70 } : {}}
          transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      <div className="gi-counter__meta">
        <span className="gi-counter__label">{label}</span>
        <span className="gi-counter__sublabel">{sublabel}</span>
      </div>
    </div>
  )
}
