import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Sora } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { LanguageProvider } from '@/contexts/LanguageContext'
import MobileWebAppMeta from '@/components/MobileWebAppMeta'

const sora = Sora({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-sora',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://cmart.co.uk'), // Update with your actual domain
  title: {
    default: 'Cmart - Oriental Grocery Store | Earley, Reading',
    template: '%s | Cmart Oriental Grocery Store',
  },
  description: 'Premium oriental grocery store in Earley, Reading. Offering authentic Asian ingredients, fresh produce, and specialty products. Visit us at Unit 14a, Asda Mall, Lower Earley.',
  keywords: [
    'oriental grocery store',
    'Asian supermarket',
    'Earley Reading',
    'Asian ingredients',
    'Chinese grocery',
    'Thai ingredients',
    'Japanese food',
    'Korean ingredients',
    'Vietnamese food',
    'Indian spices',
    'Asian produce',
    'Reading grocery store',
  ],
  authors: [{ name: 'Cmart Oriental Ltd.' }],
  creator: 'Cmart Oriental Ltd.',
  publisher: 'Cmart Oriental Ltd.',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://cmart.co.uk', // Update with your actual domain
    siteName: 'Cmart Oriental Grocery Store',
    title: 'Cmart - Oriental Grocery Store | Earley, Reading',
    description: 'Premium oriental grocery store in Earley, Reading. Offering authentic Asian ingredients, fresh produce, and specialty products.',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Cmart Oriental Grocery Store',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cmart - Oriental Grocery Store | Earley, Reading',
    description: 'Premium oriental grocery store in Earley, Reading. Offering authentic Asian ingredients, fresh produce, and specialty products.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
  },
  alternates: {
    canonical: 'https://cmart.co.uk', // Update with your actual domain
  },
  category: 'Grocery Store',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0a4d3a',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Cmart Oriental Grocery Store',
    image: 'https://cmart.co.uk/logo.png', // Update with your actual domain
    '@id': 'https://cmart.co.uk', // Update with your actual domain
    url: 'https://cmart.co.uk', // Update with your actual domain
    telephone: '', // Add phone number if available
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Unit 14a, Asda Mall',
      addressLocality: 'Lower Earley, Earley',
      addressRegion: 'Reading',
      postalCode: 'RG6 5GA',
      addressCountry: 'GB',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 51.424487,
      longitude: -0.936151,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '19:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '10:00',
        closes: '16:00',
      },
    ],
    sameAs: [
      // Add social media links if available
      // 'https://www.facebook.com/cmart',
      // 'https://www.instagram.com/cmart',
    ],
  }

  return (
    <html lang="en" className={sora.variable}>
      <body className="font-sans">
        <MobileWebAppMeta />
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <LanguageProvider>
          <Navigation />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}

