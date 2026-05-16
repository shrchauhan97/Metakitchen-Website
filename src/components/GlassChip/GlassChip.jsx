import { Suspense, lazy } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion.js'
import './GlassChip.css'

const LiquidGlass = lazy(() => import('liquid-glass-react'))

/**
 * Floating trust chip wrapped in iOS-26-style liquid glass.
 * Falls back to a tinted backdrop-filter blur if reduced-motion is requested
 * (the SVG-filter displacement is itself a motion artifact for some users).
 */
export default function GlassChip({
  children,
  value,
  label,
  elasticity = 0.2,
  cornerRadius = 999,
  padding = '10px 18px',
  className = '',
}) {
  const reducedMotion = useReducedMotion()

  const content = (
    <div className="glass-chip__content">
      {value && <span className="glass-chip__value">{value}</span>}
      {label && <span className="glass-chip__label">{label}</span>}
      {children}
    </div>
  )

  if (reducedMotion) {
    return (
      <div className={`glass-chip glass-chip--static ${className}`} style={{ borderRadius: cornerRadius, padding }}>
        {content}
      </div>
    )
  }

  return (
    <div className={`glass-chip ${className}`}>
      <Suspense fallback={
        <div className="glass-chip--static" style={{ borderRadius: cornerRadius, padding }}>
          {content}
        </div>
      }>
        <LiquidGlass
          displacementScale={36}
          blurAmount={0.08}
          saturation={140}
          aberrationIntensity={1.5}
          elasticity={elasticity}
          cornerRadius={cornerRadius}
          padding={padding}
          overLight={true}
          mode="standard"
        >
          {content}
        </LiquidGlass>
      </Suspense>
    </div>
  )
}
