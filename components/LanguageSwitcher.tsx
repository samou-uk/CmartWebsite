'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center h-9 space-x-1 bg-white/20 backdrop-blur-sm rounded-lg p-1 border border-white/30">
      <button
        onClick={() => setLanguage('en')}
        className={`h-7 px-3 rounded-md text-sm font-medium transition-colors ${
          language === 'en'
            ? 'bg-primary text-white'
            : 'text-gray-700 hover:text-primary hover:bg-white/30'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('zh')}
        className={`h-7 px-3 rounded-md text-sm font-medium transition-colors ${
          language === 'zh'
            ? 'bg-primary text-white'
            : 'text-gray-700 hover:text-primary hover:bg-white/30'
        }`}
      >
        中文
      </button>
    </div>
  )
}
