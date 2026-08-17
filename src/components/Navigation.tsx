import { useState, useEffect, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from './Logo'
import LanguageSwitcher from './LanguageSwitcher'
import { useLanguage } from '../contexts/LanguageContext'
import { HomeIcon, AboutIcon, RecipesIcon, LocationIcon, MailIcon } from './icons'

function useNavActive(to: string) {
  const { pathname } = useLocation()
  return pathname === to || (to !== '/' && pathname.startsWith(to))
}

function DesktopNavItem({
  to,
  label,
  icon,
}: {
  to: string
  label: string
  icon: ReactNode
}) {
  const active = useNavActive(to)

  return (
    <Link
      to={to}
      aria-label={label}
      title={label}
      className={`inline-flex items-center justify-center gap-2 h-full min-w-9 px-3 rounded-xl text-sm font-semibold tracking-tight border transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
        active
          ? 'bg-primary text-white border-primary shadow-soft'
          : 'text-primary-forest border-transparent hover:bg-primary/5 hover:text-primary hover:border-primary'
      }`}
    >
      <span className="shrink-0 w-4 h-4 inline-flex items-center justify-center">{icon}</span>
      <span className="whitespace-nowrap">{label}</span>
    </Link>
  )
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      {open ? (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.25} d="M6 18L18 6M6 6l12 12" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.25} d="M4 7h16M4 12h16M4 17h16" />
      )}
    </svg>
  )
}

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { t } = useLanguage()
  const { pathname } = useLocation()

  const links = [
    { to: '/', label: t('nav.home'), icon: <HomeIcon className="w-5 h-5" /> },
    { to: '/about', label: t('nav.about'), icon: <AboutIcon className="w-5 h-5" /> },
    { to: '/recipes', label: t('nav.recipes'), icon: <RecipesIcon className="w-5 h-5" /> },
    { to: '/location', label: t('nav.location'), icon: <LocationIcon className="w-5 h-5" /> },
    { to: '/contact', label: t('nav.contact'), icon: <MailIcon className="w-5 h-5" /> },
  ]

  const isHome = pathname === '/'
  const onLightSurface = !isHome || isScrolled || menuOpen

  const outerPill = `flex items-center justify-between gap-4 rounded-full shadow-elevated backdrop-blur-xl transition-all duration-300 ${
    onLightSurface
      ? 'bg-white/65 border border-gray-300'
      : 'bg-white/25 border border-white/30'
  }`

  const leftLinks = links.slice(0, 3)
  const rightLinks = links.slice(3)

  const clusterPill = `inline-flex items-stretch gap-0.5 h-11 p-1 rounded-2xl bg-white/15 backdrop-blur-md shadow-soft ${
    onLightSurface ? 'border border-transparent' : 'border border-white/25'
  }`

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!menuOpen) return

    const scrollY = window.scrollY
    const body = document.body
    const html = document.documentElement
    const scrollbar = Math.max(0, window.innerWidth - html.clientWidth)
    const prevBody = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
      paddingRight: body.style.paddingRight,
    }
    const prevHtmlOverflow = html.style.overflow
    const prevNavPad = html.style.getPropertyValue('--nav-scroll-lock-pad')

    html.style.overflow = 'hidden'
    html.style.setProperty('--nav-scroll-lock-pad', `${scrollbar}px`)
    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.left = '0'
    body.style.right = '0'
    body.style.width = '100%'
    body.style.overflow = 'hidden'
    body.style.paddingRight = `${scrollbar}px`

    return () => {
      html.style.overflow = prevHtmlOverflow
      if (prevNavPad) {
        html.style.setProperty('--nav-scroll-lock-pad', prevNavPad)
      } else {
        html.style.removeProperty('--nav-scroll-lock-pad')
      }
      body.style.position = prevBody.position
      body.style.top = prevBody.top
      body.style.left = prevBody.left
      body.style.right = prevBody.right
      body.style.width = prevBody.width
      body.style.overflow = prevBody.overflow
      body.style.paddingRight = prevBody.paddingRight
      window.scrollTo(0, scrollY)
    }
  }, [menuOpen])

  return (
    <>
      {menuOpen && (
        <button
          type="button"
          aria-label="Dismiss menu"
          className="lg:hidden fixed inset-0 z-40 bg-primary-forest/25 backdrop-blur-[2px]"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <nav
        className="fixed top-0 left-0 z-50 pointer-events-none overflow-x-clip"
        style={{
          right: menuOpen ? 'var(--nav-scroll-lock-pad, 0px)' : 0,
        }}
      >
        <div className="container-custom pt-3 lg:pt-4 pointer-events-auto min-w-0">
          {/* Desktop: left cluster | logo | right cluster */}
          <div
            className={`hidden lg:grid grid-cols-[1fr_auto_1fr] items-center gap-4 h-[4.25rem] px-2 ${outerPill}`}
          >
            <div className={`justify-self-start ${clusterPill}`}>
              {leftLinks.map((link) => (
                <DesktopNavItem key={link.to} {...link} />
              ))}
            </div>

            <div className="justify-self-center flex-shrink-0 nav-logo-3d px-1">
              <Logo />
            </div>

            <div className={`justify-self-end ${clusterPill}`}>
              {rightLinks.map((link) => (
                <DesktopNavItem key={link.to} {...link} />
              ))}
              <LanguageSwitcher embedded />
            </div>
          </div>

          {/* Mobile: outer glass pill + sheet */}
          <div className="lg:hidden min-w-0 w-full">
            <div className={`h-14 w-full max-w-full min-w-0 pl-3 pr-1.5 gap-2 ${outerPill}`}>
              <div className="flex-shrink-0 nav-logo-3d min-w-0">
                <Logo size="small" />
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <LanguageSwitcher />
                <button
                  type="button"
                  aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                  aria-expanded={menuOpen}
                  onClick={() => setMenuOpen((open) => !open)}
                  className={`inline-flex items-center justify-center h-11 w-11 rounded-full bg-white/15 backdrop-blur-md shadow-soft transition-colors hover:border-primary hover:text-primary text-primary-forest ${
                    onLightSurface ? 'border border-transparent' : 'border border-white/25'
                  }`}
                >
                  <MenuIcon open={menuOpen} />
                </button>
              </div>
            </div>

            <div
              className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${
                menuOpen ? 'max-h-[28rem] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
              }`}
            >
              <div className="pt-2 pb-1 min-w-0">
                <div className="rounded-3xl border border-gray-200 bg-white/95 backdrop-blur-xl shadow-elevated p-2 w-full max-w-full">
                  {links.map((link) => {
                    const active =
                      pathname === link.to || (link.to !== '/' && pathname.startsWith(link.to))
                    return (
                      <Link
                        key={link.to}
                        to={link.to}
                        onClick={() => setMenuOpen(false)}
                        className={`flex items-center gap-3 min-h-[3.25rem] px-4 rounded-2xl text-base font-semibold tracking-tight transition-colors ${
                          active
                            ? 'bg-primary text-white'
                            : 'text-primary-forest hover:bg-primary/5'
                        }`}
                      >
                        <span className={`shrink-0 ${active ? 'text-white' : 'text-primary'}`}>
                          {link.icon}
                        </span>
                        {link.label}
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
