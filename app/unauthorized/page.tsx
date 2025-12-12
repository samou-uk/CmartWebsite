import Link from 'next/link'
import { ArrowRightIcon } from '@/components/icons'

export default function Unauthorized() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white flex items-center justify-center pt-20">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center">
          <div className="glass-card rounded-2xl p-12 md:p-16">
            <div className="mb-8">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h1 className="text-6xl md:text-7xl font-display font-bold text-gray-900 mb-4">401</h1>
              <h2 className="text-3xl md:text-4xl font-display font-semibold text-gray-900 mb-4">
                Unauthorized Access
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                You don't have permission to access this resource. Please log in with valid credentials.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 bg-primary-dark text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-dark/90 transition-colors"
              >
                Go Home
                <ArrowRightIcon className="w-5 h-5" />
              </Link>
              <Link
                href="/recipes"
                className="inline-flex items-center justify-center gap-2 bg-primary-dark/10 text-primary-dark px-8 py-3 rounded-lg font-medium hover:bg-primary-dark/20 transition-colors"
              >
                Browse Recipes
                <ArrowRightIcon className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

