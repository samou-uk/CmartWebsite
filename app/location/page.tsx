'use client'

import Image from 'next/image'
import { LocationIcon, ClockIcon, CarIcon, BusIcon, MapIcon } from '@/components/icons'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Location() {
  const { t } = useLanguage()
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/store-exterior.png"
            alt="Cmart Store Exterior"
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
              {t('location.hero.badge')}
            </span>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6">
              {t('location.hero.title')}
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              {t('location.hero.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Address and Map Section */}
      <section className="py-8 md:py-12 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Address and Opening Hours */}
              <div className="glass-card rounded-2xl p-8">
                {/* Address */}
                <div className="mb-8">
                  <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center mb-4">
                    <LocationIcon className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="text-2xl font-display font-semibold text-gray-900 mb-4">
                    {t('location.address.title')}
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed mb-2">
                    Unit 14a, Asda Mall<br />
                    Lower Earley, Earley<br />
                    Reading RG6 5GA
                  </p>
                  <p className="text-sm text-gray-600">
                    {t('location.address.description')}
                  </p>
                </div>

                {/* Opening Hours */}
                <div>
                  <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center mb-4">
                    <ClockIcon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-display font-semibold text-gray-900 mb-4">
                    {t('location.hours.title')}
                  </h3>
                  <div className="space-y-3 text-gray-700">
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="font-medium">{t('location.days.monThu')}</span>
                      <span className="text-gray-600">9:00 AM - 7:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="font-medium">{t('location.days.friday')}</span>
                      <span className="text-gray-600">9:00 AM - 7:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="font-medium">{t('location.days.saturday')}</span>
                      <span className="text-gray-600">9:00 AM - 7:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="font-medium">{t('location.days.sunday')}</span>
                      <span className="text-gray-600">10:00 AM - 4:00 PM</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-4">
                    {t('location.hours.description')}
                  </p>
                </div>
              </div>

              {/* Google Maps */}
              <div className="glass-card rounded-2xl p-8">
                <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center mb-4">
                  <MapIcon className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-2xl font-display font-semibold text-gray-900 mb-4">
                  {t('location.map.title')}
                </h2>
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2487.833371358405!2d-0.9361506228290744!3d51.42448747179463!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48769b173acd6c6d%3A0x40e895e32797b08b!2sAsian%20Supermarket%20Cmart%20Oriental%20Food%20Store!5e0!3m2!1sen!2sca!4v1765561042939!5m2!1sen!2sca"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transportation Methods */}
      <section className="py-8 md:py-12 bg-white">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
                {t('location.transport.title')}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {t('location.transport.description')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* By Bus */}
              <div className="glass-card rounded-2xl p-8">
                <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mb-6">
                  <BusIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-display font-semibold text-gray-900 mb-4">
                  {t('location.bus.title')}
                </h3>
                <div className="space-y-4">
                  <div className="bg-primary/5 rounded-lg p-4">
                    <p className="text-gray-700 mb-2">
                      <span className="font-semibold text-primary">{t('location.bus.routesLabel')}:</span> <strong>19b</strong> or <strong>21</strong>
                    </p>
                    <ul className="text-gray-600 text-sm space-y-2 mt-2">
                      <li>
                        <strong>19b:</strong> Get off at <strong>"Chalfont Way Asda"</strong>
                      </li>
                      <li>
                        <strong>21:</strong> Get off at <strong>"Chalfont Way Circle"</strong>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-primary/5 rounded-lg p-4">
                    <p className="text-gray-700">
                      <span className="font-semibold text-primary">{t('location.bus.walkingLabel')}:</span> <strong>{t('location.bus.walkingTime')}</strong> walk from bus stop
                    </p>
                  </div>
                </div>
              </div>

              {/* By Car */}
              <div className="glass-card rounded-2xl p-8">
                <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mb-6">
                  <CarIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-display font-semibold text-gray-900 mb-4">
                  {t('location.car.title')}
                </h3>
                <div className="space-y-4">
                  <div className="bg-primary/5 rounded-lg p-4">
                    <p className="text-gray-700 mb-2">
                      <span className="font-semibold text-primary">{t('location.car.parkingLabel')}:</span> <strong>ASDA Car Park</strong>
                    </p>
                    <p className="text-gray-600 text-sm">
                      {t('location.car.parkingDesc')}
                    </p>
                  </div>
                  <div className="bg-primary/5 rounded-lg p-4">
                    <p className="text-gray-700 mb-2">
                      <span className="font-semibold text-primary">{t('location.car.locationLabel')}:</span> {t('location.car.locationDesc')}
                    </p>
                    <p className="text-gray-600 text-sm">
                      Close to <strong>M4 Junction 11</strong>, just off <strong>B3270</strong>
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

