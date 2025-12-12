import { NextRequest, NextResponse } from 'next/server'
import { validateSession } from '@/lib/auth'

export async function GET(request: NextRequest) {
  const sessionCookie = request.cookies.get('admin_session')
  const isAuthenticated = validateSession(sessionCookie?.value)
  
  return NextResponse.json({ authenticated: isAuthenticated })
}
