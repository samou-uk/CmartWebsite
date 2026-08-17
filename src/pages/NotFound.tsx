import { Link } from 'react-router-dom'
import { ArrowRightIcon } from '../components/icons'

export default function NotFound() {
  return (
    <div className="min-h-screen page-glow flex items-center justify-center pt-nav">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white border border-gray-200 rounded-2xl p-12 md:p-16 shadow-card">
            <div className="mb-8">
              <h1 className="teaser-title text-primary mb-4">404</h1>
              <h2 className="page-hero-title mb-4">
                Page Not Found
              </h2>
              <p className="marketing-lede mb-8">
                Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-3 rounded-xl font-medium hover:bg-primary-hover transition-colors"
              >
                Go Home
                <ArrowRightIcon className="w-5 h-5" />
              </Link>
              <Link
                to="/recipes"
                className="inline-flex items-center justify-center gap-2 bg-primary/10 text-primary px-8 py-3 rounded-xl font-medium hover:bg-primary/15 transition-colors"
              >
                Browse Recipes
                <ArrowRightIcon className="w-5 h-5" />
              </Link>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-4">Popular Pages:</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/about" className="text-primary hover:text-primary-hover text-sm font-medium transition-colors">
                  About Us
                </Link>
                <Link to="/location" className="text-primary hover:text-primary-hover text-sm font-medium transition-colors">
                  Location
                </Link>
                <Link to="/contact" className="text-primary hover:text-primary-hover text-sm font-medium transition-colors">
                  Contact
                </Link>
                <Link to="/recipes" className="text-primary hover:text-primary-hover text-sm font-medium transition-colors">
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
