import { useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

export default function Contact() {
  const { t } = useLanguage()

  useEffect(() => {
    const loadTally = () => {
      const w = 'https://tally.so/widgets/embed.js'
      const d = document

      const v = function () {
        if (typeof (window as any).Tally !== 'undefined') {
          ;(window as any).Tally.loadEmbeds()
        } else {
          d.querySelectorAll('iframe[data-tally-src]:not([src])').forEach((e: any) => {
            e.src = e.dataset.tallySrc
          })
        }
      }

      if (typeof (window as any).Tally !== 'undefined') {
        v()
      } else if (d.querySelector(`script[src="${w}"]`) === null) {
        const s = d.createElement('script')
        s.src = w
        s.onload = v
        s.onerror = v
        d.body.appendChild(s)
      }
    }

    loadTally()
  }, [])

  return (
    <div className="pt-nav">
      <section className="section-padding page-glow">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start max-w-6xl mx-auto">
            {/* Left: voice + quiet contact details */}
            <div className="lg:col-span-5 animate-fade-in-up">
              <h1 className="page-hero-title mb-4">
                {t('contact.hero.title')}
              </h1>
              <p className="marketing-lede mb-8">
                {t('contact.hero.description')}
              </p>

              <div className="space-y-5">
                <p className="text-sm text-primary-forest/55 leading-relaxed">
                  Unit 14a, Asda Mall<br />
                  Lower Earley, Earley<br />
                  Reading RG6 5GA
                </p>
                <a
                  href="mailto:cmart@fortunefoods.co.uk"
                  className="inline-block font-semibold text-primary hover:text-primary-hover transition-colors"
                >
                  cmart@fortunefoods.co.uk
                </a>
              </div>
            </div>

            {/* Right: form as the interactive surface */}
            <div className="lg:col-span-6 lg:col-start-7 animate-fade-in-up animate-delay-200">
              <div className="rounded-3xl border border-gray-200 bg-white shadow-card p-6 sm:p-8">
                <div className="tally-form-container rounded-2xl overflow-hidden">
                  <iframe
                    data-tally-src="https://tally.so/embed/MeXQO8?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
                    loading="lazy"
                    width="100%"
                    height="484"
                    frameBorder="0"
                    marginHeight={0}
                    marginWidth={0}
                    title="Contact Us"
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
