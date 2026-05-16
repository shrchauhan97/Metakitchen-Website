import { Suspense, lazy, useState, useEffect } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion.js'
import { useWebGLSupported } from '../../hooks/useWebGLSupported.js'
import './HeroShaderBackdrop.css'

/**
 * Lazy-load ShaderGradient — pulls in R3F + three.js (~250 KB gzip).
 * The component returns a static CSS gradient fallback while loading
 * and forever if WebGL is unsupported or reduced-motion is requested.
 */
const ShaderGradientCanvas = lazy(() =>
  import('@shadergradient/react').then((m) => ({ default: m.ShaderGradientCanvas })),
)
const ShaderGradient = lazy(() =>
  import('@shadergradient/react').then((m) => ({ default: m.ShaderGradient })),
)

export default function HeroShaderBackdrop({
  // Brand palette — warm dawn to cool clinical
  color1 = '#C2702A', // hearth ochre
  color2 = '#E8C66E', // wheat gold
  color3 = '#3A4A4F', // slate clinic
  speed = 0.2,
  strength = 3.5,
  type = 'plane',
  pixelDensity = 1,
  className = '',
}) {
  const reducedMotion = useReducedMotion()
  const webglOk = useWebGLSupported()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration / first-frame jank
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(id)
  }, [])

  const showShader = webglOk !== false && !reducedMotion && mounted

  return (
    <div className={`hero-backdrop ${className}`} aria-hidden="true">
      {/* Static CSS gradient always paints — covers loading + fallback */}
      <div
        className="hero-backdrop__fallback"
        style={{
          background: `radial-gradient(ellipse at 30% 20%, ${color2}55, transparent 60%),
                       radial-gradient(ellipse at 70% 80%, ${color3}33, transparent 55%),
                       linear-gradient(135deg, ${color1}22 0%, transparent 50%, ${color3}22 100%),
                       var(--crumb)`,
        }}
      />
      {showShader && (
        <Suspense fallback={null}>
          <ShaderGradientCanvas
            className="hero-backdrop__canvas"
            pixelDensity={pixelDensity}
            fov={45}
            pointerEvents="none"
            lazyLoad
          >
            <ShaderGradient
              control="props"
              animate="on"
              type={type}
              uSpeed={speed}
              uStrength={strength}
              uFrequency={5.5}
              uDensity={1.3}
              uTime={0}
              cAzimuthAngle={170}
              cPolarAngle={110}
              cDistance={3.6}
              color1={color1}
              color2={color2}
              color3={color3}
              positionX={0}
              positionY={0}
              positionZ={0}
              rotationX={0}
              rotationY={0}
              rotationZ={0}
              grain="off"
              lightType="3d"
              brightness={1.2}
              envPreset="city"
              reflection={0.1}
            />
          </ShaderGradientCanvas>
        </Suspense>
      )}
    </div>
  )
}
