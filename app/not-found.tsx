import Link from 'next/link'
import { ArrowRightIcon } from '@/components/icons'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white flex items-center justify-center pt-20">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center">
          <div className="glass-card rounded-2xl p-12 md:p-16">
            <div className="mb-8">
              <h1 className="text-9xl font-display font-bold text-primary-dark mb-4">404</h1>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
                Page Not Found
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
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

            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-4">Popular Pages:</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/about" className="text-primary-dark hover:text-primary-dark/80 text-sm font-medium transition-colors">
                  About Us
                </Link>
                <Link href="/location" className="text-primary-dark hover:text-primary-dark/80 text-sm font-medium transition-colors">
                  Location
                </Link>
                <Link href="/contact" className="text-primary-dark hover:text-primary-dark/80 text-sm font-medium transition-colors">
                  Contact
                </Link>
                <Link href="/recipes" className="text-primary-dark hover:text-primary-dark/80 text-sm font-medium transition-colors">
                  Recipes
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


