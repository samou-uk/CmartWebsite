'use client'

import Image from 'next/image'
import { LocationIcon, ClockIcon, CarIcon } from '@/components/icons'
import { useLanguage } from '@/contexts/LanguageContext'

export default function About() {
  const { t } = useLanguage()
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/bao.png"
            alt="Cmart Store"
            fill
            className="object-cover"
            priority
            quality={90}
          />
        </div>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="glass-strong text-white px-4 py-2 rounded-full text-sm font-medium mb-6 inline-block">
              {t('about.hero.badge')}
            </span>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6">
              {t('about.hero.title')}
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              {t('about.hero.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              {/* Store Image */}
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/store-exterior.png"
                  alt="Cmart Store Exterior"
                  width={1200}
                  height={800}
                  className="w-full h-auto object-cover"
                />
              </div>

              <div className="prose prose-lg max-w-none">
                <div className="space-y-6 text-gray-700 leading-relaxed">
                  <p className="text-lg">
                    {t('about.content.paragraph1')}
                  </p>

                  <p className="text-lg">
                    {t('about.content.paragraph2')}
                  </p>
                </div>
              </div>

              {/* Store Aisle Images */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="/store-aisle-products.png"
                    alt="Cmart Store Aisle with Products"
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="/store-aisle-noodles.png"
                    alt="Cmart Store Aisle with Noodles"
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>

              <div className="prose prose-lg max-w-none">
                <div className="space-y-6 text-gray-700 leading-relaxed">
                  <p className="text-lg">
                    {t('about.content.paragraph3')}
                  </p>

                  <p className="text-lg">
                    {t('about.content.paragraph4')}
                  </p>
                </div>
              </div>
            </div>

            {/* Store Info */}
            <div className="mt-16 bg-gray-50 rounded-2xl p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">{t('about.storeInfo.title')}</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <LocationIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{t('about.storeInfo.address')}</h4>
                    <p className="text-gray-600 text-sm">
                      Earley, Reading
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <ClockIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{t('about.storeInfo.hours')}</h4>
                    <p className="text-gray-600 text-sm">
                      Mon-Sat: 9:00 AM - 7:00 PM<br />
                      Sun: 10:00 AM - 4:00 PM
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <CarIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{t('about.storeInfo.parking')}</h4>
                    <p className="text-gray-600 text-sm">
                      {t('about.storeInfo.parkingDesc')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

