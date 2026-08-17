import { LocationIcon, ClockIcon, CarIcon, BusIcon } from '../components/icons'
import { useLanguage } from '../contexts/LanguageContext'

export default function Location() {
  const { t } = useLanguage()

  return (
    <div className="pt-nav">
      <section className="section-padding page-glow">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-2xl mb-10 md:mb-14 animate-fade-in-up">
              <h1 className="page-hero-title mb-4">
                {t('location.hero.title')}
              </h1>
              <p className="marketing-lede">
                {t('location.hero.description')}
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              {/* Details */}
              <div className="lg:col-span-5 space-y-10 animate-fade-in-up">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <LocationIcon className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-xl font-bold text-primary-forest">
                      {t('location.address.title')}
                    </h2>
                  </div>
                  <p className="text-primary-forest leading-relaxed mb-2">
                    Unit 14a, Asda Mall<br />
                    Lower Earley, Earley<br />
                    Reading RG6 5GA
                  </p>
                  <p className="text-sm text-primary-forest/55">
                    {t('location.address.description')}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <ClockIcon className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-xl font-bold text-primary-forest">
                      {t('location.hours.title')}
                    </h2>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between gap-4 py-2 border-b border-gray-200">
                      <span className="font-medium text-primary-forest">{t('location.days.monThu')}</span>
                      <span className="text-gray-500">9:00 AM - 7:00 PM</span>
                    </div>
                    <div className="flex justify-between gap-4 py-2 border-b border-gray-200">
                      <span className="font-medium text-primary-forest">{t('location.days.friday')}</span>
                      <span className="text-gray-500">9:00 AM - 7:00 PM</span>
                    </div>
                    <div className="flex justify-between gap-4 py-2 border-b border-gray-200">
                      <span className="font-medium text-primary-forest">{t('location.days.saturday')}</span>
                      <span className="text-gray-500">9:00 AM - 7:00 PM</span>
                    </div>
                    <div className="flex justify-between gap-4 py-2">
                      <span className="font-medium text-primary-forest">{t('location.days.sunday')}</span>
                      <span className="text-gray-500">10:00 AM - 4:00 PM</span>
                    </div>
                  </div>
                </div>

                <a
                  href="https://maps.app.goo.gl/Fhki63qGHgDwsaN77"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-11 px-6 rounded-xl bg-primary text-white font-medium hover:bg-primary-hover transition-colors shadow-soft"
                >
                  {t('location.map.openMaps')}
                </a>
              </div>

              {/* Map */}
              <div className="lg:col-span-7 animate-fade-in-up animate-delay-200">
                <div className="rounded-3xl border border-gray-200 bg-white shadow-card overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2487.833371358405!2d-0.9361506228290744!3d51.42448747179463!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48769b173acd6c6d%3A0x40e895e32797b08b!2sAsian%20Supermarket%20Cmart%20Oriental%20Food%20Store!5e0!3m2!1sen!2sca!4v1765561042939!5m2!1sen!2sca"
                    width="100%"
                    height="480"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={t('location.map.title')}
                    className="w-full min-h-[320px] lg:min-h-[480px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Getting here */}
      <section className="pb-16 md:pb-24 page-glow">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-2xl mb-10">
              <h2 className="section-title mb-3">
                {t('location.transport.title')}
              </h2>
              <p className="marketing-lede">
                {t('location.transport.description')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <BusIcon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-primary-forest">
                    {t('location.bus.title')}
                  </h3>
                </div>
                <div className="space-y-4 text-sm leading-relaxed">
                  <p className="text-primary-forest">
                    <span className="font-semibold text-primary">{t('location.bus.routesLabel')}:</span>{' '}
                    <strong>19b</strong> or <strong>21</strong>
                  </p>
                  <ul className="space-y-2 text-gray-500">
                    <li>
                      <strong className="text-primary-forest">19b:</strong> Get off at{' '}
                      <strong className="text-primary-forest">Chalfont Way Asda</strong>
                    </li>
                    <li>
                      <strong className="text-primary-forest">21:</strong> Get off at{' '}
                      <strong className="text-primary-forest">Chalfont Way Circle</strong>
                    </li>
                  </ul>
                  <p className="text-gray-500">
                    <span className="font-semibold text-primary">{t('location.bus.walkingLabel')}:</span>{' '}
                    {t('location.bus.walkingTime')} walk from the stop
                  </p>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <CarIcon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-primary-forest">
                    {t('location.car.title')}
                  </h3>
                </div>
                <div className="space-y-4 text-sm leading-relaxed">
                  <p className="text-primary-forest">
                    <span className="font-semibold text-primary">{t('location.car.parkingLabel')}:</span>{' '}
                    ASDA Car Park
                  </p>
                  <p className="text-gray-500">{t('location.car.parkingDesc')}</p>
                  <p className="text-gray-500">
                    {t('location.car.locationDesc')}. Close to{' '}
                    <strong className="text-primary-forest">M4 Junction 11</strong>, just off{' '}
                    <strong className="text-primary-forest">B3270</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
