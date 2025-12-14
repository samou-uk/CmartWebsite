import { useLanguage } from '../contexts/LanguageContext'

export default function Privacy() {
  const { t } = useLanguage()

  return (
    <div className="pt-20">
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
              {t('privacy.title')}
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              {t('privacy.lastUpdated')}
            </p>

            <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('privacy.section1.title')}</h2>
                <p className="mb-4">{t('privacy.section1.content')}</p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('privacy.section2.title')}</h2>
                <p className="mb-4">{t('privacy.section2.content')}</p>
                <p className="mb-3 font-medium">{t('privacy.section2.subtitle')}</p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>{t('privacy.section2.item1')}</li>
                  <li>{t('privacy.section2.item2')}</li>
                </ul>
                <p className="text-sm text-gray-600 italic">{t('privacy.section2.note')}</p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('privacy.section3.title')}</h2>
                <p className="mb-3">{t('privacy.section3.content')}</p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>{t('privacy.section3.item1')}</li>
                  <li>{t('privacy.section3.item2')}</li>
                  <li>{t('privacy.section3.item3')}</li>
                </ul>
                <p className="text-sm text-gray-600 italic">{t('privacy.section3.note')}</p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('privacy.section4.title')}</h2>
                <p className="mb-4">{t('privacy.section4.content')}</p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('privacy.section5.title')}</h2>
                <p className="mb-4">{t('privacy.section5.content')}</p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('privacy.section6.title')}</h2>
                <p className="mb-3">{t('privacy.section6.content')}</p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>{t('privacy.section6.item1')}</li>
                  <li>{t('privacy.section6.item2')}</li>
                  <li>{t('privacy.section6.item3')}</li>
                </ul>
                <p className="text-sm text-gray-600">{t('privacy.section6.note')}</p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('privacy.section7.title')}</h2>
                <p className="mb-4">{t('privacy.section7.content')}</p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('privacy.section8.title')}</h2>
                <p className="mb-4">{t('privacy.section8.content')}</p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('privacy.section9.title')}</h2>
                <p className="mb-4">{t('privacy.section9.content')}</p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('privacy.section10.title')}</h2>
                <p className="mb-4">{t('privacy.section10.content')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

