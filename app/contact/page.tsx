'use client'

import { useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { LocationIcon, ClockIcon, MailIcon } from '@/components/icons'

export default function Contact() {
  const { t } = useLanguage()
  useEffect(() => {
    const loadTally = () => {
      const w = 'https://tally.so/widgets/embed.js'
      const d = document
      
      const v = function() {
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
    <div className="pt-20">
      {/* Dark Green Accent Bar */}
      <div className="bg-primary-dark h-2 w-full"></div>
      
      {/* Main Content */}
      <section className="section-padding bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Intro Text */}
            <div className="text-center mb-12 animate-fade-in-up">
              <div className="inline-block mb-6">
                <div className="h-1 w-24 bg-primary-dark mx-auto mb-4"></div>
                <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
                  {t('contact.hero.title')}
                </h1>
              </div>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {t('contact.hero.description')}
              </p>
            </div>

            {/* Contact Form */}
            <div className="relative">
              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/10 rounded-full blur-xl"></div>
              
              <div className="glass-card rounded-2xl p-8 md:p-12 shadow-2xl relative border-2 border-primary-dark/20 animate-fade-in-up animate-delay-200">
                {/* Dark Green Top Accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-primary-dark rounded-t-2xl"></div>
                
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary-dark/5 rounded-full -mr-20 -mt-20 blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full -ml-16 -mb-16 blur-2xl"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-center mb-8">
                    <div className="w-16 h-16 bg-primary-dark rounded-2xl flex items-center justify-center shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-display font-semibold text-gray-900 mb-4 text-center">
                    {t('contact.form.title')}
                  </h2>
                  <p className="text-center text-gray-600 mb-8">
                    {t('contact.form.description')}
                  </p>
                  
                  <div className="tally-form-container rounded-lg overflow-hidden bg-white/50 backdrop-blur-sm border-2 border-primary-dark/20 shadow-inner p-2">
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

            {/* Additional Contact Options */}
            <div className="mt-12 grid md:grid-cols-3 gap-6 animate-fade-in-up animate-delay-400">
              <div className="glass-card rounded-xl p-6 text-center hover:shadow-xl transition-all transform hover:-translate-y-1 border-t-4 border-primary-dark">
                <div className="w-12 h-12 bg-primary-dark/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <LocationIcon className="w-6 h-6 text-primary-dark" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{t('contact.card.visit')}</h3>
                <p className="text-sm text-gray-600">
                  {t('contact.card.visitDesc')}
                </p>
              </div>

              <div className="glass-card rounded-xl p-6 text-center hover:shadow-xl transition-all transform hover:-translate-y-1 border-t-4 border-primary-dark">
                <div className="w-12 h-12 bg-primary-dark/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <ClockIcon className="w-6 h-6 text-primary-dark" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{t('contact.card.hours')}</h3>
                <p className="text-sm text-gray-600">
                  Mon-Sat: 9AM-7PM<br />
                  Sun: 10AM-4PM
                </p>
              </div>

              <div className="glass-card rounded-xl p-6 text-center hover:shadow-xl transition-all transform hover:-translate-y-1 border-t-4 border-primary-dark">
                <div className="w-12 h-12 bg-primary-dark/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <MailIcon className="w-6 h-6 text-primary-dark" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{t('contact.card.response')}</h3>
                <p className="text-sm text-gray-600">
                  {t('contact.card.responseDesc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

