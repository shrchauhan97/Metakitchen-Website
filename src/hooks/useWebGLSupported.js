import { useEffect, useState } from 'react'

/**
 * Detects WebGL2 support. Returns null while detecting (use for SSR safety),
 * true if supported, false if not. Cache the result.
 */
let cached = null

function detect() {
  if (cached !== null) return cached
  if (typeof window === 'undefined') return null
  try {
    const canvas = document.createElement('canvas')
    cached = !!(window.WebGL2RenderingContext && canvas.getContext('webgl2'))
  } catch {
    cached = false
  }
  return cached
}

export function useWebGLSupported() {
  const [supported, setSupported] = useState(detect)

  useEffect(() => {
    if (supported === null) setSupported(detect())
  }, [supported])

  return supported
}
