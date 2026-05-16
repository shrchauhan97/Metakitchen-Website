import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Smart scroll-restoration on route change.
 *
 * - If the URL has a `#fragment`, scroll to the element with that id (smooth)
 * - Otherwise, scroll to top (instant — overrides the global smooth-scroll CSS)
 *
 * Mounted once inside <BrowserRouter>. Re-runs whenever pathname OR hash changes.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      // Give the page a beat to render the target element after a route change
      const id = hash.replace('#', '')
      const tryScroll = () => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          return true
        }
        return false
      }
      if (!tryScroll()) {
        // Element not in DOM yet (e.g., fresh route mount) — retry on next frame
        requestAnimationFrame(() => {
          if (!tryScroll()) setTimeout(tryScroll, 200)
        })
      }
      return
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}
