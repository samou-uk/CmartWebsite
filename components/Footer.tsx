'use client'

import Link from 'next/link'
import { LocationIcon, ClockIcon, InstagramIcon, LinkedInIcon, FacebookIcon, TikTokIcon } from './icons'
import Logo from './Logo'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()
  return (
    <footer className="bg-primary-dark text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div>
            <div className="mb-4">
              <Logo size="large" className="[&_a]:pointer-events-none" />
            </div>
            <p className="text-white/80 text-sm leading-relaxed mb-4">
              {t('footer.description')}
            </p>
            {/* Social Media Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://www.facebook.com/profile.php?id=61562271990098"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="Follow us on Facebook"
              >
                <FacebookIcon className="w-6 h-6" />
              </a>
              <a
                href="https://www.instagram.com/cmartorientaluk"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="Follow us on Instagram"
              >
                <InstagramIcon className="w-6 h-6" />
              </a>
              <a
                href="https://www.tiktok.com/@cmartorientaluk"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="Follow us on TikTok"
              >
                <TikTokIcon className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/company/cmart-oriental-foods"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="Follow us on LinkedIn"
              >
                <LinkedInIcon className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover-link text-white/80 hover:text-white transition-colors text-sm">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover-link text-white/80 hover:text-white transition-colors text-sm">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link href="/recipes" className="hover-link text-white/80 hover:text-white transition-colors text-sm">
                  {t('nav.recipes')}
                </Link>
              </li>
              <li>
                <Link href="/location" className="hover-link text-white/80 hover:text-white transition-colors text-sm">
                  {t('nav.location')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover-link text-white/80 hover:text-white transition-colors text-sm">
                  {t('nav.contact')}
                </Link>
              </li>
              <li>
                <Link href="/games/recipe-builder" className="hover-link text-white/80 hover:text-white transition-colors text-sm">
                  {t('nav.games')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">{t('footer.storeInfo')}</h3>
            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex items-start space-x-2">
                <LocationIcon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p>Unit 14a, Asda Mall</p>
                  <p>Lower Earley, Earley</p>
                  <p>Reading RG6 5GA</p>
                </div>
              </li>
              <li className="flex items-start space-x-2 mt-4">
                <ClockIcon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium mb-1">{t('footer.openingHours')}:</p>
                  <p>Mon - Sat: 9:00 AM - 7:00 PM</p>
                  <p>Sunday: 10:00 AM - 4:00 PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
            <p>&copy; {new Date().getFullYear()} Cmart Oriental Ltd. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="hover-link hover:text-white transition-colors">
                {t('footer.privacy')}
              </Link>
              <span>•</span>
              <Link href="/terms" className="hover-link hover:text-white transition-colors">
                {t('footer.terms')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

