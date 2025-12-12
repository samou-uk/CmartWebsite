'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center space-x-1 bg-white/20 backdrop-blur-sm rounded-lg p-1 border border-white/30 nav-switcher-3d">
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
          language === 'en'
            ? 'bg-primary-dark text-white shadow-md'
            : 'text-gray-700 hover:text-primary hover:bg-white/30'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('zh')}
        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
          language === 'zh'
            ? 'bg-primary-dark text-white shadow-md'
            : 'text-gray-700 hover:text-primary hover:bg-white/30'
        }`}
      >
        中文
      </button>
    </div>
  )
}

