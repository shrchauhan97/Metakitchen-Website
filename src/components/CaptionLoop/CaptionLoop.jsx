import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion.js'
import './CaptionLoop.css'

/**
 * Cycles through a list of caption lines with a typewriter-style fade transition.
 * Designed to overlay on a silent video — gives the brand a "speech track"
 * without the autoplay-audio constraint or AI-voiceover lip-sync risk.
 */
export default function CaptionLoop({
  lines = [],
  intervalMs = 3200,
  className = '',
}) {
  const [index, setIndex] = useState(0)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || lines.length <= 1) return
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % lines.length)
    }, intervalMs)
    return () => clearInterval(timer)
  }, [lines.length, intervalMs, reduced])

  if (lines.length === 0) return null

  return (
    <div className={`caption-loop ${className}`} aria-live="polite">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          className="caption-loop__line"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          {lines[index]}
        </motion.p>
      </AnimatePresence>
      <div className="caption-loop__dots" aria-hidden="true">
        {lines.map((_, i) => (
          <span
            key={i}
            className={`caption-loop__dot ${i === index ? 'is-active' : ''}`}
          />
        ))}
      </div>
    </div>
  )
}
