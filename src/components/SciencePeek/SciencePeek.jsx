import { Suspense, lazy, useRef, useMemo } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion.js'
import { useWebGLSupported } from '../../hooks/useWebGLSupported.js'
import './SciencePeek.css'

// All R3F machinery is lazy — the chunk only pays its cost when this component renders.
const SceneCanvas = lazy(() => import('./SceneCanvas.jsx'))

/**
 * The recurring brand 3D motif for /our-bread:
 * a rotating organic crumb-structure form with environment lighting.
 * Falls back to a static SVG hero on no-WebGL or reduced-motion.
 */
export default function SciencePeek({
  size = 520,
  scheme = 'warm',
  className = '',
  fallbackSrc = '/img/bread-crosssection.png',
  fallbackAlt = 'MetaKitchen bread cross-section',
}) {
  const reducedMotion = useReducedMotion()
  const webglOk = useWebGLSupported()
  const showScene = webglOk !== false && !reducedMotion

  return (
    <div
      className={`science-peek science-peek--${scheme} ${className}`}
      style={{ width: size, height: size }}
    >
      {showScene ? (
        <Suspense fallback={<div className="science-peek__fallback" aria-hidden="true" />}>
          <SceneCanvas scheme={scheme} />
        </Suspense>
      ) : (
        <img
          src={fallbackSrc}
          alt={fallbackAlt}
          className="science-peek__image"
          loading="lazy"
        />
      )}
    </div>
  )
}
