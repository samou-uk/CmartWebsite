import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRightIcon, GlutenIcon, DairyIcon, NutsIcon, ShellfishIcon, EggsIcon, SoyIcon, FishIcon } from '../components/icons'
import FloatWordCycle from '../components/FloatWordCycle'
import { useLanguage } from '../contexts/LanguageContext'
import { Recipe } from '../lib/recipes-client'
import { RecipeCategory, Difficulty, Allergy } from '../types/recipe'

interface RecipesClientProps {
  initialRecipes: Recipe[]
}

export default function RecipesClient({ initialRecipes }: RecipesClientProps) {
  const { t } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState<RecipeCategory>('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedAllergies, setSelectedAllergies] = useState<Allergy[]>([])
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

  const allergies: { value: Allergy; label: string; icon: React.ReactNode }[] = [
    { value: 'gluten', label: t('recipes.allergies.gluten'), icon: <GlutenIcon className="w-5 h-5" /> },
    { value: 'dairy', label: t('recipes.allergies.dairy'), icon: <DairyIcon className="w-5 h-5" /> },
    { value: 'nuts', label: t('recipes.allergies.nuts'), icon: <NutsIcon className="w-5 h-5" /> },
    { value: 'shellfish', label: t('recipes.allergies.shellfish'), icon: <ShellfishIcon className="w-5 h-5" /> },
    { value: 'eggs', label: t('recipes.allergies.eggs'), icon: <EggsIcon className="w-5 h-5" /> },
    { value: 'soy', label: t('recipes.allergies.soy'), icon: <SoyIcon className="w-5 h-5" /> },
    { value: 'fish', label: t('recipes.allergies.fish'), icon: <FishIcon className="w-5 h-5" /> },
  ]

  const toggleAllergy = (allergy: Allergy) => {
    setSelectedAllergies((prev) =>
      prev.includes(allergy) ? prev.filter((a) => a !== allergy) : [...prev, allergy]
    )
  }

  const categories: { value: RecipeCategory; label: string }[] = [
    { value: 'all', label: t('recipes.categories.all') },
    { value: 'chinese', label: t('recipes.categories.chinese') },
    { value: 'japanese', label: t('recipes.categories.japanese') },
    { value: 'korean', label: t('recipes.categories.korean') },
    { value: 'thai', label: t('recipes.categories.thai') },
    { value: 'vietnamese', label: t('recipes.categories.vietnamese') },
    { value: 'indian', label: t('recipes.categories.indian') },
  ]

  const difficulties: { value: Difficulty; label: string }[] = [
    { value: 'all', label: t('recipes.difficulty.all') },
    { value: 'easy', label: t('recipes.difficulty.easy') },
    { value: 'medium', label: t('recipes.difficulty.medium') },
    { value: 'hard', label: t('recipes.difficulty.hard') },
  ]

  const filteredRecipes = initialRecipes.filter((recipe) => {
    const matchesCategory = selectedCategory === 'all' || recipe.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === 'all' || recipe.difficulty === selectedDifficulty
    const matchesSearch =
      searchQuery === '' ||
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesAllergies =
      selectedAllergies.length === 0 ||
      !selectedAllergies.some((allergy) => recipe.allergies.includes(allergy))

    return matchesCategory && matchesDifficulty && matchesSearch && matchesAllergies
  })

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedDifficulty !== 'all' ||
    searchQuery !== '' ||
    selectedAllergies.length > 0

  const clearAll = () => {
    setSelectedCategory('all')
    setSelectedDifficulty('all')
    setSearchQuery('')
    setSelectedAllergies([])
  }

  return (
    <div className="pt-nav">
      <section className="section-padding page-glow">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-2xl mb-10 md:mb-12 animate-fade-in-up">
              <h1 className="page-hero-title mb-4">
                <span className="block">{t('recipes.hero.stem')}</span>
                <span className="block min-h-[1.05em]">
                  <FloatWordCycle
                    className="text-primary"
                    words={[
                      t('recipes.cycle.1'),
                      t('recipes.cycle.2'),
                      t('recipes.cycle.3'),
                      t('recipes.cycle.4'),
                      t('recipes.cycle.5'),
                    ]}
                  />
                </span>
              </h1>
              <p className="marketing-lede">{t('recipes.hero.description')}</p>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 lg:gap-10">
              {/* Filters */}
              <aside className="lg:col-span-4 xl:col-span-3">
                <div className="lg:sticky lg:top-24 space-y-4">
                  <button
                    type="button"
                    onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                    className="lg:hidden w-full flex items-center justify-between h-11 px-4 rounded-xl bg-primary text-white font-medium hover:bg-primary-hover transition-colors"
                  >
                    <span>{t('recipes.filters.title')}</span>
                    <svg
                      className={`w-5 h-5 transition-transform ${isFiltersOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <div
                    className={`bg-white border border-gray-200 rounded-3xl p-5 shadow-card ${
                      isFiltersOpen ? 'block' : 'hidden lg:block'
                    }`}
                  >
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-primary mb-5 hidden lg:block">
                      {t('recipes.filters.title')}
                    </h2>

                    <div className="mb-5">
                      <label className="block text-sm font-semibold text-primary-forest mb-2">
                        {t('recipes.filters.searchLabel')}
                      </label>
                      <input
                        type="text"
                        placeholder={t('recipes.filters.search')}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-xl focus:ring-1 focus:ring-primary focus:border-primary outline-none text-sm"
                      />
                    </div>

                    <div className="mb-5">
                      <label className="block text-sm font-semibold text-primary-forest mb-2">
                        {t('recipes.filters.cuisine')}
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                          <button
                            key={cat.value}
                            type="button"
                            onClick={() => setSelectedCategory(cat.value)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                              selectedCategory === cat.value
                                ? 'bg-primary text-white'
                                : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
                            }`}
                          >
                            {cat.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mb-5">
                      <label className="block text-sm font-semibold text-primary-forest mb-2">
                        {t('recipes.filters.difficulty')}
                      </label>
                      <div className="inline-flex flex-wrap gap-1 p-1 rounded-xl border border-gray-200 bg-white shadow-soft">
                        {difficulties.map((diff) => (
                          <button
                            key={diff.value}
                            type="button"
                            onClick={() => setSelectedDifficulty(diff.value)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                              selectedDifficulty === diff.value
                                ? 'bg-primary text-white'
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                          >
                            {diff.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mb-2">
                      <label className="block text-sm font-semibold text-primary-forest mb-2">
                        {t('recipes.filters.allergies')}
                      </label>
                      <div className="space-y-1.5">
                        {allergies.map((allergy) => {
                          const active = selectedAllergies.includes(allergy.value)
                          return (
                            <button
                              key={allergy.value}
                              type="button"
                              onClick={() => toggleAllergy(allergy.value)}
                              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl border text-left text-sm transition-colors ${
                                active
                                  ? 'bg-primary/10 border-primary text-primary'
                                  : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                              }`}
                            >
                              <span className={active ? 'text-primary' : 'text-gray-400'}>{allergy.icon}</span>
                              <span className="font-medium flex-1">{allergy.label}</span>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {hasActiveFilters && (
                      <button
                        type="button"
                        onClick={clearAll}
                        className="mt-5 w-full h-10 rounded-xl border border-gray-200 text-sm font-medium text-primary-forest hover:bg-gray-50 transition-colors"
                      >
                        {t('recipes.filters.clearAll')}
                      </button>
                    )}
                  </div>
                </div>
              </aside>

              {/* Results */}
              <div className="lg:col-span-8 xl:col-span-9 animate-fade-in-up animate-delay-200">
                <p className="text-sm text-gray-500 mb-6">
                  <span className="font-semibold text-primary">{filteredRecipes.length}</span>{' '}
                  {filteredRecipes.length === 1 ? t('recipes.results.found') : t('recipes.results.foundPlural')}
                </p>

                {filteredRecipes.length > 0 ? (
                  <div className="grid sm:grid-cols-2 gap-5">
                    {filteredRecipes.map((recipe) => (
                      <Link
                        key={recipe.id}
                        to={`/recipes/${recipe.slug}`}
                        className="group hover-card bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-card flex flex-col"
                      >
                        {recipe.image && (
                          <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-100">
                            <img
                              src={recipe.image}
                              alt={recipe.title}
                              className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                            />
                          </div>
                        )}
                        <div className="p-5 flex flex-col flex-1">
                          <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">{recipe.category}</span>
                            <span>{recipe.time}</span>
                            <span className="px-1.5 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-medium">
                              {recipe.difficulty}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-primary-forest mb-2 group-hover:text-primary transition-colors">
                            {recipe.title}
                          </h3>
                          <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">{recipe.description}</p>
                          <div className="flex items-center gap-1 text-primary font-medium text-sm">
                            <span>{t('recipes.card.viewRecipe')}</span>
                            <ArrowRightIcon className="w-4 h-4" />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white border border-gray-200 rounded-3xl p-10 text-center shadow-card">
                    <h3 className="text-2xl font-extrabold text-primary-forest mb-2">{t('recipes.empty.title')}</h3>
                    <p className="marketing-lede mb-6">{t('recipes.empty.description')}</p>
                    <button
                      type="button"
                      onClick={clearAll}
                      className="inline-flex h-11 items-center px-6 rounded-xl bg-primary text-white font-medium hover:bg-primary-hover transition-colors"
                    >
                      {t('recipes.filters.clearAll')}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
