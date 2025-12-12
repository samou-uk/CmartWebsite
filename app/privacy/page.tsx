'use client'

import { useLanguage } from '@/contexts/LanguageContext'

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
              {t('privacy.lastUpdated')}: {new Date().toLocaleDateString()}
            </p>

            <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('privacy.section1.title')}</h2>
                <p className="mb-4">{t('privacy.section1.content')}</p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('privacy.section2.title')}</h2>
                <p className="mb-4">{t('privacy.section2.content')}</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>{t('privacy.section2.item1')}</li>
                  <li>{t('privacy.section2.item2')}</li>
                  <li>{t('privacy.section2.item3')}</li>
                  <li>{t('privacy.section2.item4')}</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('privacy.section3.title')}</h2>
                <p className="mb-4">{t('privacy.section3.content')}</p>
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
                <p className="mb-4">{t('privacy.section6.content')}</p>
                <p className="text-sm text-gray-600">
                  {t('privacy.contact')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

