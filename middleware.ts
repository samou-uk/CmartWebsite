import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const isProduction = process.env.NODE_ENV === 'production'

  // Determine protocol and host (important for Railway / proxies)
  const protocol =
    request.headers.get('x-forwarded-proto') ||
    (request.nextUrl.protocol === 'https:' ? 'https' : 'http')

  // Enforce HTTPS in production
  if (isProduction && protocol !== 'https') {
    const httpsUrl = new URL(request.url)
    httpsUrl.protocol = 'https:'
    return NextResponse.redirect(httpsUrl, 301)
  }

  const response = NextResponse.next()

  // Mirror the old PHP security headers for all app responses
  // Clickjacking protection
  response.headers.set('X-Frame-Options', 'DENY')

  // XSS Protection
  response.headers.set('X-XSS-Protection', '1; mode=block')

  // Prevent MIME type sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff')

  // Cross-domain policies
  response.headers.set('X-Permitted-Cross-Domain-Policies', 'none')

  // Strict Transport Security (only when using HTTPS in production)
  if (isProduction && protocol === 'https') {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains; preload'
    )
  }

  // Referrer Policy
  response.headers.set(
    'Referrer-Policy',
    'strict-origin-when-cross-origin'
  )

  // Permissions Policy
  response.headers.set(
    'Permissions-Policy',
    'geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=(), interest-cohort=()'
  )

  // Content Security Policy
  // Note: we add static.cloudflareinsights.com so the Cloudflare beacon script can load
  response.headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://tally.so https://www.google.com https://www.gstatic.com https://static.cloudflareinsights.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: https: blob:",
      "connect-src 'self' https://tally.so https://www.google.com",
      "frame-src 'self' https://tally.so https://www.google.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      'upgrade-insecure-requests',
    ].join('; ') + ';'
  )

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - robots.txt, sitemap.xml (SEO files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
}

