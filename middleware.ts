import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if we're in production
  const isProduction = process.env.NODE_ENV === 'production'
  
  // Get the protocol and host
  const protocol = request.headers.get('x-forwarded-proto') || 
                   (request.nextUrl.protocol === 'https:' ? 'https' : 'http')
  const host = request.headers.get('host') || request.nextUrl.host

  // Enforce HTTPS in production
  if (isProduction && protocol !== 'https') {
    const httpsUrl = new URL(request.url)
    httpsUrl.protocol = 'https:'
    return NextResponse.redirect(httpsUrl, 301)
  }

  return NextResponse.next()
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


