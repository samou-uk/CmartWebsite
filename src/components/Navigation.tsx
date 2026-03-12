import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'
import LanguageSwitcher from './LanguageSwitcher'
import { useLanguage } from '../contexts/LanguageContext'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass-card shadow-xl'
          : 'glass-strong'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20 relative">
          {/* Left Navigation */}
          <div className="hidden md:flex items-center space-x-7 flex-1">
            <Link
              to="/"
              className="nav-link-3d text-gray-700 font-medium transition-all duration-300 relative px-2 py-1"
            >
              {t('nav.home')}
            </Link>
            <Link
              to="/about"
              className="nav-link-3d text-gray-700 font-medium transition-all duration-300 relative px-2 py-1"
            >
              {t('nav.about')}
            </Link>
            <Link
              to="/recipes"
              className="nav-link-3d text-gray-700 font-medium transition-all duration-300 relative px-2 py-1"
            >
              {t('nav.recipes')}
            </Link>
          </div>

          {/* Logo - Centered */}
          <div className="absolute left-1/2 transform -translate-x-1/2 flex-shrink-0 nav-logo-3d">
            <Logo />
          </div>

          {/* Right Navigation */}
          <div className="hidden md:flex items-center space-x-7 flex-1 justify-end">
            <Link
              to="/location"
              className="nav-link-3d text-gray-700 font-medium transition-all duration-300 relative px-2 py-1"
            >
              {t('nav.location')}
            </Link>
            <Link
              to="/contact"
              className="bg-primary text-white px-6 py-2.5 rounded-lg font-medium hover:bg-primary-dark transition-all duration-300 relative"
            >
              {t('nav.contact')}
            </Link>
            <div className="nav-link-3d">
              <LanguageSwitcher />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-700 ml-auto"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-6 space-y-4">
            <Link
              to="/"
              className="block text-gray-900 hover:text-primary font-medium transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.home')}
            </Link>
            <Link
              to="/about"
              className="block text-gray-900 hover:text-primary font-medium transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.about')}
            </Link>
            <Link
              to="/recipes"
              className="block text-gray-900 hover:text-primary font-medium transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.recipes')}
            </Link>
            <Link
              to="/location"
              className="block text-gray-900 hover:text-primary font-medium transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.location')}
            </Link>
            <Link
              to="/contact"
              className="block bg-primary text-white px-6 py-2.5 rounded-lg font-medium hover:bg-primary-dark transition-colors text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.contact')}
            </Link>
            <div className="pt-4 border-t border-gray-200">
              <LanguageSwitcher />
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

