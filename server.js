import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const port = parseInt(process.env.PORT || '3000', 10)
const isProduction = process.env.NODE_ENV === 'production'

// Security headers middleware (moved from PHP)
app.use((req, res, next) => {
  // Clickjacking protection
  res.setHeader('X-Frame-Options', 'DENY')

  // XSS Protection
  res.setHeader('X-XSS-Protection', '1; mode=block')

  // Prevent MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff')

  // Cross-domain policies
  res.setHeader('X-Permitted-Cross-Domain-Policies', 'none')

  // Strict Transport Security (only when HTTPS is actually in use)
  const proto = req.headers['x-forwarded-proto'] || req.protocol
  if (isProduction && proto === 'https') {
    res.setHeader(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains; preload'
    )
  }

  // Referrer Policy
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')

  // Permissions Policy
  res.setHeader(
    'Permissions-Policy',
    'geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=(), interest-cohort=()'
  )

  // Content Security Policy
  // Includes Cloudflare Insights so the beacon script can load
  res.setHeader(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://tally.so https://www.google.com https://www.gstatic.com https://static.cloudflareinsights.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: https: blob:",
      "connect-src 'self' https://tally.so https://www.google.com",
      "frame-src 'self' https://tally.so https://www.google.com",
      'object-src none',
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      'upgrade-insecure-requests',
    ].join('; ') + ';'
  )

  next()
})

// Serve the built Vite app from /dist
const distPath = path.join(__dirname, 'dist')
app.use(express.static(distPath))

// SPA fallback to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'))
})

app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on http://0.0.0.0:${port}`)
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`)
})
