import { useLanguage } from '../contexts/LanguageContext'

export default function LanguageSwitcher({
  embedded = false,
}: {
  embedded?: boolean
}) {
  const { language, setLanguage } = useLanguage()

  const buttons = (
    <>
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`h-full min-w-9 px-3 rounded-full text-xs font-bold tracking-wide border transition-colors ${
          language === 'en'
            ? 'bg-primary text-white border-primary shadow-soft'
            : 'bg-white/40 text-primary-forest/70 border-primary-forest/25 hover:text-primary-forest hover:border-primary-forest/45 hover:bg-white/55'
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLanguage('zh')}
        className={`h-full min-w-9 px-3 rounded-full text-xs font-bold tracking-wide border transition-colors ${
          language === 'zh'
            ? 'bg-primary text-white border-primary shadow-soft'
            : 'bg-white/40 text-primary-forest/70 border-primary-forest/25 hover:text-primary-forest hover:border-primary-forest/45 hover:bg-white/55'
        }`}
      >
        中文
      </button>
    </>
  )

  if (embedded) {
    return (
      <div className="inline-flex items-stretch h-full gap-0.5 ml-1.5 pl-1.5 border-l border-primary-forest/20">
        <div className="inline-flex items-stretch h-full gap-1 rounded-full bg-white/20 backdrop-blur-sm p-0.5 border border-primary-forest/15">
          {buttons}
        </div>
      </div>
    )
  }

  return (
    <div className="inline-flex items-stretch h-11 gap-1 bg-white/25 backdrop-blur-md rounded-full p-1 border border-primary-forest/20 shadow-soft w-fit">
      {buttons}
    </div>
  )
}
