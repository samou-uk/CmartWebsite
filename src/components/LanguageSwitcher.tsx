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
        className={`h-full min-w-8 px-2.5 rounded-lg text-xs font-semibold tracking-wide border transition-colors ${
          language === 'en'
            ? 'bg-primary text-white border-primary shadow-soft'
            : 'border-transparent text-primary-forest/55 hover:text-primary-forest hover:bg-white/20'
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLanguage('zh')}
        className={`h-full min-w-8 px-2.5 rounded-lg text-xs font-semibold tracking-wide border transition-colors ${
          language === 'zh'
            ? 'bg-primary text-white border-primary shadow-soft'
            : 'border-transparent text-primary-forest/55 hover:text-primary-forest hover:bg-white/20'
        }`}
      >
        中文
      </button>
    </>
  )

  if (embedded) {
    return (
      <div className="inline-flex items-stretch h-full gap-0.5 ml-1.5 pl-1.5 border-l border-white/30">
        <div className="inline-flex items-stretch h-full gap-0.5 rounded-xl bg-white/10 backdrop-blur-sm p-0.5">
          {buttons}
        </div>
      </div>
    )
  }

  return (
    <div className="inline-flex items-stretch h-11 gap-0.5 bg-white/15 backdrop-blur-md rounded-2xl p-1 border border-transparent shadow-soft w-fit">
      {buttons}
    </div>
  )
}
