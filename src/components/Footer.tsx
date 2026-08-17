import { Link } from 'react-router-dom'
import { LocationIcon, ClockIcon, MailIcon, InstagramIcon, LinkedInIcon, FacebookIcon, TikTokIcon } from './icons'
import Logo from './Logo'
import { useLanguage } from '../contexts/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  const linkClass =
    'hover-link inline-flex items-center min-h-8 md:min-h-0 md:py-0.5 text-primary-forest/85 hover:text-primary transition-colors text-sm font-semibold'

  return (
    <footer className="bg-white/70 backdrop-blur-xl border-t border-white/50 text-primary-forest">
      <div className="container-custom py-8 md:py-12">
        <div className="max-w-md mx-auto md:max-w-none md:mx-0 grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-8 mb-0 md:mb-6 text-left">
          {/* About */}
          <div className="pb-6 md:pb-0 border-b border-primary-forest/10 md:border-0">
            <div className="mb-3">
              <Logo size="default" className="[&_a]:pointer-events-none" />
            </div>
            <p className="text-primary-forest/85 text-sm font-medium leading-relaxed mb-4">
              {t('footer.description')}
            </p>
            <div className="flex items-center gap-1 -ml-1">
              <a
                href="https://www.facebook.com/profile.php?id=61562271990098"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-xl text-primary-forest/80 hover:text-primary hover:bg-primary/5 transition-colors"
                aria-label="Follow us on Facebook"
              >
                <FacebookIcon className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/cmartorientaluk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-xl text-primary-forest/80 hover:text-primary hover:bg-primary/5 transition-colors"
                aria-label="Follow us on Instagram"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a
                href="https://www.tiktok.com/@cmartorientaluk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-xl text-primary-forest/80 hover:text-primary hover:bg-primary/5 transition-colors"
                aria-label="Follow us on TikTok"
              >
                <TikTokIcon className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/cmart-oriental-foods"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-xl text-primary-forest/80 hover:text-primary hover:bg-primary/5 transition-colors"
                aria-label="Follow us on LinkedIn"
              >
                <LinkedInIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links - desktop only */}
          <div className="hidden md:block">
            <h3 className="font-extrabold text-base tracking-tight mb-3 text-primary-forest">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-0.5">
              <li>
                <Link to="/" className={linkClass}>
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/about" className={linkClass}>
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link to="/recipes" className={linkClass}>
                  {t('nav.recipes')}
                </Link>
              </li>
              <li>
                <Link to="/location" className={linkClass}>
                  {t('nav.location')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className={linkClass}>
                  {t('nav.contact')}
                </Link>
              </li>
              <li>
                <Link to="/games/recipe-builder" className={linkClass}>
                  {t('nav.games')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Store info */}
          <div className="pt-6 md:pt-0">
            <h3 className="font-extrabold text-base tracking-tight mb-3 text-primary-forest">
              {t('footer.storeInfo')}
            </h3>
            <ul className="space-y-3 text-sm font-medium text-primary-forest/85">
              <li className="flex items-start gap-2.5">
                <LocationIcon className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                <div className="leading-snug">
                  <p>Unit 14a, Asda Mall</p>
                  <p>Lower Earley, Earley</p>
                  <p>Reading RG6 5GA</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <MailIcon className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                <a
                  href="mailto:cmart@fortunefoods.co.uk"
                  className="hover-link font-semibold hover:text-primary transition-colors break-all"
                >
                  cmart@fortunefoods.co.uk
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <ClockIcon className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                <div className="leading-snug">
                  <p className="font-extrabold text-primary-forest mb-1">
                    {t('footer.openingHours')}
                  </p>
                  <p>Mon - Sat: 9:00 AM - 7:00 PM</p>
                  <p>Sunday: 10:00 AM - 4:00 PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-forest/10 mt-6 md:mt-0 pt-5">
          <div className="max-w-md mx-auto md:max-w-none md:mx-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 text-sm font-medium text-primary-forest/70 text-left">
            <p>&copy; {new Date().getFullYear()} Cmart Oriental Ltd. All rights reserved.</p>
            <div className="flex items-center gap-4 font-semibold">
              <Link to="/privacy" className="hover-link hover:text-primary transition-colors">
                {t('footer.privacy')}
              </Link>
              <span className="text-primary-forest/30">•</span>
              <Link to="/terms" className="hover-link hover:text-primary transition-colors">
                {t('footer.terms')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
