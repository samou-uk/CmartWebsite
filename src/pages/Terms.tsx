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
              {t('terms.lastUpdated')}
            </p>

            <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('terms.section1.title')}</h2>
                <p className="mb-4">{t('terms.section1.content')}</p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('terms.section2.title')}</h2>
                <p className="mb-3">{t('terms.section2.content')}</p>
                <p className="mb-3 font-medium">{t('terms.section2.subtitle')}</p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>{t('terms.section2.item1')}</li>
                  <li>{t('terms.section2.item2')}</li>
                  <li>{t('terms.section2.item3')}</li>
                  <li>{t('terms.section2.item4')}</li>
                </ul>
                <p className="text-sm text-gray-600 italic">{t('terms.section2.note')}</p>
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
                <p className="mb-3">{t('terms.section7.content')}</p>
                <p className="mb-3">{t('terms.section7.para2')}</p>
                <p className="mb-3">{t('terms.section7.para3')}</p>
                <p className="mb-3 font-medium">{t('terms.section7.subtitle')}</p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>{t('terms.section7.item1')}</li>
                  <li>{t('terms.section7.item2')}</li>
                  <li>{t('terms.section7.item3')}</li>
                </ul>
                <p className="text-sm text-gray-600 italic">{t('terms.section7.note')}</p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('terms.section8.title')}</h2>
                <p className="mb-4">{t('terms.section8.content')}</p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('terms.section9.title')}</h2>
                <p className="mb-4">{t('terms.section9.content')}</p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('terms.section10.title')}</h2>
                <p className="mb-4">{t('terms.section10.content')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

