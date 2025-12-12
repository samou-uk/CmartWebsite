'use client'

import { useEffect } from 'react'

export default function MobileWebAppMeta() {
  useEffect(() => {
    // Remove deprecated apple-mobile-web-app-capable if it exists
    const oldMeta = document.querySelector('meta[name="apple-mobile-web-app-capable"]')
    if (oldMeta) {
      oldMeta.remove()
    }

    // Add new mobile-web-app-capable meta tag
    if (!document.querySelector('meta[name="mobile-web-app-capable"]')) {
      const meta = document.createElement('meta')
      meta.name = 'mobile-web-app-capable'
      meta.content = 'yes'
      document.head.appendChild(meta)
    }
  }, [])

  return null
}

