import { useEffect, useRef, useState } from 'react'
import { useInView, animate } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion.js'

/**
 * Animated number counter that fires when scrolled into view.
 *
 * - Parses the numeric portion of a string like "237M" or "76.6%" or "GI 38"
 *   and animates that portion only, preserving prefix/suffix.
 * - Honors prefers-reduced-motion: lands on the final value with no tween.
 */
export default function CountUp({ value, duration = 1.2, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const reduced = useReducedMotion()
  const [display, setDisplay] = useState(value)

  // Pull a number out of the string (handles 237M, 76.6%, GI 38, 48 hr, etc.)
  const match = value.match(/(.*?)(-?\d+(?:\.\d+)?)(.*)$/)
  const prefix = match ? match[1] : ''
  const target = match ? Number(match[2]) : null
  const suffix = match ? match[3] : ''
  const hasDecimal = match && match[2].includes('.')

  useEffect(() => {
    if (target === null) return
    if (reduced || !inView) {
      setDisplay(value)
      return
    }
    const controls = animate(0, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        const fixed = hasDecimal ? v.toFixed(1) : Math.round(v).toString()
        setDisplay(`${prefix}${fixed}${suffix}`)
      },
    })
    return () => controls.stop()
  }, [inView, target, value, prefix, suffix, hasDecimal, duration, reduced])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}
