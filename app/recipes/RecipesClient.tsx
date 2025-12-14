'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRightIcon, GlutenIcon, DairyIcon, NutsIcon, ShellfishIcon, EggsIcon, SoyIcon, FishIcon } from '@/components/icons'
import { useLanguage } from '@/contexts/LanguageContext'
import { Recipe } from '@/lib/recipes-client'
import { RecipeCategory, Difficulty, Allergy } from '@/types/recipe'

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
      prev.includes(allergy)
        ? prev.filter((a) => a !== allergy)
        : [...prev, allergy]
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
    const matchesSearch = searchQuery === '' || recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) || recipe.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesAllergies = selectedAllergies.length === 0 || !selectedAllergies.some((allergy) => recipe.allergies.includes(allergy))

    return matchesCategory && matchesDifficulty && matchesSearch && matchesAllergies
  })

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/recipes_hero.png"
            alt="Recipes Hero"
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
              {t('recipes.hero.badge')}
            </span>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6">
              {t('recipes.hero.title')}
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              {t('recipes.hero.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="section-padding bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="container-custom">
          {/* Sticky Active Filters Bar (Mobile only, when collapsed) */}
          {!isFiltersOpen && (
            <div className="lg:hidden sticky top-20 z-40 mb-4 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-200 shadow-sm">
              <div className="py-3">
                <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
                  {(selectedCategory !== 'all' || selectedDifficulty !== 'all' || searchQuery !== '' || selectedAllergies.length > 0) ? (
                    <>
                      {selectedCategory !== 'all' && (
                        <span className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-dark/10 text-primary-dark rounded-full text-xs font-medium">
                          <span>{categories.find(c => c.value === selectedCategory)?.label}</span>
                          <button
                            onClick={() => setSelectedCategory('all')}
                            className="ml-0.5 hover:text-primary-dark/80"
                            aria-label="Remove category filter"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </span>
                      )}
                      {selectedDifficulty !== 'all' && (
                        <span className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-dark/10 text-primary-dark rounded-full text-xs font-medium">
                          <span>{difficulties.find(d => d.value === selectedDifficulty)?.label}</span>
                          <button
                            onClick={() => setSelectedDifficulty('all')}
                            className="ml-0.5 hover:text-primary-dark/80"
                            aria-label="Remove difficulty filter"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </span>
                      )}
                      {searchQuery !== '' && (
                        <span className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-dark/10 text-primary-dark rounded-full text-xs font-medium">
                          <span className="truncate max-w-[120px]">"{searchQuery}"</span>
                          <button
                            onClick={() => setSearchQuery('')}
                            className="ml-0.5 hover:text-primary-dark/80"
                            aria-label="Clear search"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </span>
                      )}
                      {selectedAllergies.map((allergy) => {
                        const allergyData = allergies.find(a => a.value === allergy)
                        return (
                          <span
                            key={allergy}
                            className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-dark/10 text-primary-dark rounded-full text-xs font-medium"
                          >
                            <span className="w-3.5 h-3.5 flex items-center justify-center flex-shrink-0">{allergyData?.icon}</span>
                            <span className="whitespace-nowrap">{allergyData?.label}</span>
                            <button
                              onClick={() => toggleAllergy(allergy)}
                              className="ml-0.5 hover:text-primary-dark/80 flex-shrink-0 flex items-center justify-center"
                              aria-label={`Remove ${allergyData?.label} filter`}
                            >
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </span>
                        )
                      })}
                    </>
                  ) : (
                    <span className="text-xs text-gray-500 italic">No filters applied</span>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar - Filters */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="glass-card rounded-2xl p-6 shadow-xl border-2 border-primary-dark/10">
                  {/* Mobile Filter Toggle */}
                  <div className="lg:hidden mb-4">
                    <button
                      onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                      className="w-full flex items-center justify-between px-4 py-3 bg-primary-dark text-white rounded-lg font-semibold hover:bg-primary-dark/90 transition-colors"
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
                  </div>

                  {/* Filter Content - Hidden on mobile when closed, always visible on desktop */}
                  <div className={`${isFiltersOpen ? 'block' : 'hidden'} lg:block`}>
                    <h2 className="text-xl font-display font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-200 hidden lg:block">
                      {t('recipes.filters.title')}
                    </h2>

                    {/* Search Bar */}
                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        {t('recipes.filters.searchLabel')}
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                        <input
                          type="text"
                          placeholder={t('recipes.filters.search')}
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 bg-white border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-primary-dark outline-none text-sm"
                        />
                      </div>
                    </div>

                    {/* Category Filters */}
                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-gray-900 mb-3">
                        {t('recipes.filters.cuisine')}
                      </label>
                      <div className="space-y-2">
                        {categories.map((cat) => (
                          <button
                            key={cat.value}
                            onClick={() => setSelectedCategory(cat.value)}
                            className={`hover-filter w-full text-left px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
                              selectedCategory === cat.value
                                ? 'bg-primary-dark text-white shadow-md active'
                                : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-primary-dark/50 hover:bg-primary-dark/5'
                            }`}
                          >
                            {cat.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Difficulty Filters */}
                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-gray-900 mb-3">
                        {t('recipes.filters.difficulty')}
                      </label>
                      <div className="space-y-2">
                        {difficulties.map((diff) => (
                          <button
                            key={diff.value}
                            onClick={() => setSelectedDifficulty(diff.value)}
                            className={`hover-filter w-full text-left px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
                              selectedDifficulty === diff.value
                                ? 'bg-primary-dark text-white shadow-md active'
                                : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-primary-dark/50 hover:bg-primary-dark/5'
                            }`}
                          >
                            {diff.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Allergy Filters */}
                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-gray-900 mb-3">
                        {t('recipes.filters.allergies')}
                      </label>
                      <div className="space-y-2">
                        {allergies.map((allergy) => (
                          <button
                            key={allergy.value}
                            onClick={() => toggleAllergy(allergy.value)}
                            className={`hover-filter w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg border-2 transition-all ${
                              selectedAllergies.includes(allergy.value)
                                ? 'bg-primary-dark/10 border-primary-dark text-primary-dark shadow-md active'
                                : 'bg-white border-gray-200 text-gray-700 hover:border-primary-dark/50 hover:bg-primary-dark/5'
                            }`}
                          >
                            <div className={`flex-shrink-0 ${selectedAllergies.includes(allergy.value) ? 'text-primary-dark' : 'text-gray-400'}`}>
                              {allergy.icon}
                            </div>
                            <span className="text-sm font-medium flex-1">{allergy.label}</span>
                            {selectedAllergies.includes(allergy.value) && (
                              <svg className="w-4 h-4 text-primary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </button>
                        ))}
                      </div>
                      {selectedAllergies.length > 0 && (
                        <button
                          onClick={() => setSelectedAllergies([])}
                          className="mt-3 text-xs text-primary-dark hover:text-primary-dark/80 font-medium hover:underline w-full text-left"
                        >
                          {t('recipes.filters.clear')} ({selectedAllergies.length})
                        </button>
                      )}
                    </div>

                    {/* Clear All Filters */}
                    {(selectedCategory !== 'all' || selectedDifficulty !== 'all' || searchQuery !== '' || selectedAllergies.length > 0) && (
                      <div className="pt-6 border-t border-gray-200">
                        <button
                          onClick={() => {
                            setSelectedCategory('all')
                            setSelectedDifficulty('all')
                            setSearchQuery('')
                            setSelectedAllergies([])
                          }}
                          className="hover-button w-full bg-primary-dark text-white px-4 py-2.5 rounded-lg font-medium text-sm hover:bg-primary-dark/90 transition-colors"
                        >
                          {t('recipes.filters.clearAll')}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content - Recipes */}
            <div className="lg:col-span-3">
              {/* Results Count */}
              <div className="mb-6">
                <div className="inline-block glass-card px-6 py-3 rounded-full">
                  <p className="text-gray-700 font-medium">
                    <span className="text-primary-dark font-bold">{filteredRecipes.length}</span> {filteredRecipes.length === 1 ? t('recipes.results.found') : t('recipes.results.foundPlural')}
                  </p>
                </div>
              </div>

              {/* Recipes Grid */}
              {filteredRecipes.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredRecipes.map((recipe) => (
                    <Link
                      key={recipe.id}
                      href={`/recipes/${recipe.slug}`}
                      className="group hover-card glass-card rounded-xl p-6 hover:shadow-2xl transition-all transform hover:-translate-y-2 overflow-hidden"
                    >
                      <div className="flex flex-col h-full">
                        {recipe.image && (
                          <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                            <Image
                              src={recipe.image}
                              alt={recipe.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}
                        <div className="mb-4">
                          <h3 className="text-xl font-display font-semibold text-gray-900 mb-2 group-hover:text-primary-dark transition-colors">
                            {recipe.title}
                          </h3>
                          <p className="text-gray-600 text-sm line-clamp-2">{recipe.description}</p>
                          {recipe.author && (
                            <p className="text-xs text-gray-500 mt-2">By {recipe.author}</p>
                          )}
                        </div>
                        <div className="mt-auto pt-4 border-t border-gray-200">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {recipe.time}
                              </span>
                              <span className="px-2 py-1 bg-primary-dark/10 text-primary-dark rounded text-xs font-medium">
                                {recipe.difficulty}
                              </span>
                            </div>
                          </div>
                          {recipe.allergies && recipe.allergies.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-3">
                              {recipe.allergies.map((allergy) => {
                                const allergyData = allergies.find((a) => a.value === allergy)
                                return (
                                  <span key={allergy} className="flex items-center gap-1 text-xs text-gray-500">
                                    {allergyData?.icon && <span className="w-3 h-3">{allergyData.icon}</span>}
                                  </span>
                                )
                              })}
                            </div>
                          )}
                          <div className="flex items-center text-primary-dark font-medium text-sm group-hover:gap-2 transition-all">
                            <span>{t('recipes.card.viewRecipe')}</span>
                            <ArrowRightIcon className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="glass-card rounded-2xl p-12 max-w-md mx-auto">
                    <h3 className="text-2xl font-display font-semibold text-gray-900 mb-4">
                      {t('recipes.empty.title')}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {t('recipes.empty.description')}
                    </p>
                    <button
                      onClick={() => {
                        setSelectedCategory('all')
                        setSelectedDifficulty('all')
                        setSearchQuery('')
                        setSelectedAllergies([])
                      }}
                      className="hover-button bg-primary-dark text-white px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-primary-dark/90 transition-colors"
                    >
                      {t('recipes.filters.clearAll')}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

