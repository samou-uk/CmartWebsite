import { useLanguage } from '../contexts/LanguageContext'

export default function Terms() {
  const { t } = useLanguage()

  return (
    <div className="pt-20">
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
              {t('terms.title')}
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              {t('terms.lastUpdated')}: {new Date().toLocaleDateString()}
            </p>

            <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('terms.section1.title')}</h2>
                <p className="mb-4">{t('terms.section1.content')}</p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('terms.section2.title')}</h2>
                <p className="mb-4">{t('terms.section2.content')}</p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('terms.section3.title')}</h2>
                <p className="mb-4">{t('terms.section3.content')}</p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('terms.section4.title')}</h2>
                <p className="mb-4">{t('terms.section4.content')}</p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('terms.section5.title')}</h2>
                <p className="mb-4">{t('terms.section5.content')}</p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('terms.section6.title')}</h2>
                <p className="mb-4">{t('terms.section6.content')}</p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('terms.section7.title')}</h2>
                <p className="mb-4">{t('terms.section7.content')}</p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('terms.section8.title')}</h2>
                <p className="mb-4">{t('terms.section8.content')}</p>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                {t('terms.contact')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

