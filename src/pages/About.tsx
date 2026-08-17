import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'

export default function About() {
  const { t } = useLanguage()

  return (
    <div className="pt-nav">
      <section className="section-padding page-glow">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            {/* Intro split */}
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-14 md:mb-20">
              <div className="lg:col-span-5 animate-fade-in-up">
                <h1 className="page-hero-title mb-4">{t('about.hero.title')}</h1>
                <p className="marketing-lede mb-8">{t('about.hero.description')}</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/location"
                    className="inline-flex items-center justify-center h-11 px-6 rounded-xl bg-primary text-white font-medium hover:bg-primary-hover transition-colors shadow-soft"
                  >
                    {t('about.cta.findUs')}
                  </Link>
                  <Link
                    to="/recipes"
                    className="inline-flex items-center justify-center h-11 px-6 rounded-xl bg-white text-primary-forest font-medium border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    {t('about.cta.cook')}
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-7 animate-fade-in-up animate-delay-200">
                <div className="rounded-3xl overflow-hidden border border-gray-200 shadow-card">
                  <img
                    src="/store-3.png"
                    alt="Cmart Store Interior"
                    className="w-full h-auto object-cover aspect-[4/3] lg:aspect-[16/11]"
                  />
                </div>
              </div>
            </div>

            {/* Forest pull quote */}
            <div className="rounded-3xl bg-primary-forest text-white px-8 py-10 md:px-12 md:py-14 mb-14 md:mb-20 animate-fade-in-up">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary-200 mb-4">
                {t('about.quote.label')}
              </p>
              <p className="text-2xl md:text-3xl font-extrabold leading-tight tracking-tight max-w-4xl mb-4">
                <span className="block">{t('about.quote.line1')}</span>
                <span className="block">{t('about.quote.line2')}</span>
              </p>
              <p className="text-white/70 text-base sm:text-lg max-w-2xl">{t('about.quote.support')}</p>
            </div>

            {/* Story + aisles */}
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-14 md:mb-20">
              <div className="lg:col-span-6 space-y-5 text-primary-forest/80 leading-relaxed text-base sm:text-lg">
                <h2 className="section-title mb-2">{t('about.section.roots')}</h2>
                <p>{t('about.content.paragraph1')}</p>
                <p>{t('about.content.paragraph2')}</p>
              </div>
              <div className="lg:col-span-6 grid grid-cols-2 gap-4">
                <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-soft">
                  <img
                    src="/store-aisle-products.png"
                    alt="Cmart Store Aisle with Products"
                    className="w-full h-full object-cover min-h-[200px] md:min-h-[260px]"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-soft mt-6 md:mt-10">
                  <img
                    src="/store-aisle-noodles.png"
                    alt="Cmart Store Aisle with Noodles"
                    className="w-full h-full object-cover min-h-[200px] md:min-h-[260px]"
                  />
                </div>
              </div>
            </div>

            <div className="max-w-3xl space-y-5 text-primary-forest/80 leading-relaxed text-base sm:text-lg">
              <h2 className="section-title mb-2">{t('about.section.home')}</h2>
              <p>{t('about.content.paragraph3')}</p>
              <p>
                {t('about.content.paragraph4')}{' '}
                <strong className="font-bold text-primary-forest">{t('about.content.thanks')}</strong>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
