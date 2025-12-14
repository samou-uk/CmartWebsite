import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * ScrollToTop component that scrolls to the top of the page
 * whenever the route changes.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Force instant scroll to top on route change (no animation)
    // Temporarily disable smooth scrolling, then restore it
    const html = document.documentElement
    const originalScrollBehavior = html.style.scrollBehavior
    
    // Disable smooth scrolling
    html.style.scrollBehavior = 'auto'
    
    // Instant scroll
    window.scrollTo(0, 0)
    
    // Restore original scroll behavior after a tiny delay
    // Use requestAnimationFrame to ensure the scroll happens first
    requestAnimationFrame(() => {
      html.style.scrollBehavior = originalScrollBehavior || ''
    })
  }, [pathname])

  return null
}

