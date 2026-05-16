import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion.js'
import { useWebGLSupported } from '../../hooks/useWebGLSupported.js'
import './LiquidMonogram.css'

const LiquidMetal = lazy(() =>
  import('@paper-design/shaders-react').then((m) => ({ default: m.LiquidMetal })),
)

/**
 * Renders the MK monogram as Paper Shaders LiquidMetal.
 * Reduced-motion / no-WebGL: shows static SVG inline (clean fallback).
 *
 * The wrapper observes its own size so the canvas is square + responsive.
 */
export default function LiquidMonogram({
  src = '/img/mk-monogram.svg',
  alt = 'MetaKitchen',
  size = 280,
  speed = 0.5,
  className = '',
}) {
  const reducedMotion = useReducedMotion()
  const webglOk = useWebGLSupported()
  const showShader = webglOk !== false && !reducedMotion
  const [containerSize, setContainerSize] = useState(size)
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    const ro = new ResizeObserver(([entry]) => {
      const { width } = entry.contentRect
      if (width > 0) setContainerSize(Math.round(width))
    })
    ro.observe(ref.current)
    return () => ro.disconnect()
  }, [])

  return (
    <div ref={ref} className={`liquid-mono ${className}`} style={{ width: size, height: size }}>
      {showShader ? (
        <Suspense fallback={<img src={src} alt={alt} className="liquid-mono__fallback" />}>
          <LiquidMetal
            width={containerSize}
            height={containerSize}
            image={src}
            colorBack="rgba(0,0,0,0)"
            colorTint="#C2702A"
            shape="circle"
            repetition={1.2}
            softness={0.18}
            shiftRed={0.25}
            shiftBlue={0.3}
            distortion={0.07}
            contour={0.35}
            angle={45}
            speed={speed}
            scale={0.62}
            fit="contain"
          />
        </Suspense>
      ) : (
        <img src={src} alt={alt} className="liquid-mono__fallback" />
      )}
    </div>
  )
}
