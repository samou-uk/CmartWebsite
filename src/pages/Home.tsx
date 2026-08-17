import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRightIcon } from '../components/icons'
import CategoryTicker from '../components/CategoryTicker'
import FloatWordCycle from '../components/FloatWordCycle'
import { useLanguage } from '../contexts/LanguageContext'
import { Recipe, getAllRecipes } from '../lib/recipes-client'

function getRandomRecipes(recipes: Recipe[], count: number): Recipe[] {
  if (recipes.length === 0) return []
  const shuffled = [...recipes].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, Math.min(count, recipes.length))
}

export default function Home() {
  const [featuredRecipes, setFeaturedRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const { t } = useLanguage()

  useEffect(() => {
    async function loadRecipes() {
      try {
        const allRecipes = await getAllRecipes()
        setFeaturedRecipes(getRandomRecipes(allRecipes, 3))
      } catch (error) {
        console.error('Error loading recipes:', error)
        setFeaturedRecipes([])
      } finally {
        setLoading(false)
      }
    }
    loadRecipes()
  }, [])

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[85vh] xl:min-h-screen flex items-center justify-center pt-nav overflow-hidden">
        <div className="absolute inset-0 z-0 w-full h-full">
          <div className="relative w-full h-full min-h-[85vh] xl:min-h-screen">
            <img
              src="/hero-store.png"
              alt="C mart Store Entrance"
              className="absolute inset-0 w-full h-full object-cover object-center animate-fade-in"
            />
          </div>
        </div>
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />

        <div className="absolute bottom-0 left-0 z-10 w-full pb-28 sm:pb-24 md:pb-28 xl:pb-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-2xl space-y-6">
              <h1 className="teaser-title text-white max-w-4xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)] animate-fade-in-up">
                {t('home.hero.slogan')}
              </h1>
              <div className="flex flex-row gap-2 sm:gap-3 pt-2 animate-fade-in-up animate-delay-200">
                <Link
                  to="/recipes"
                  className="group hover-button flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 h-10 sm:h-11 px-4 sm:px-7 rounded-xl bg-white text-gray-800 text-sm font-medium hover:bg-gray-50 transition-colors shadow-soft border border-gray-200"
                >
                  <span>{t('home.hero.exploreRecipes')}</span>
                  <ArrowRightIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link
                  to="/location"
                  className="hover-button flex-1 sm:flex-none inline-flex items-center justify-center h-10 sm:h-11 px-4 sm:px-7 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-medium transition-colors shadow-soft"
                >
                  {t('home.hero.visitStore')}
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-5 sm:bottom-8 left-0 right-0 flex justify-center z-20">
          <button
            onClick={() => {
              const nextSection = document.querySelector('section:nth-of-type(2)')
              if (nextSection) nextSection.scrollIntoView({ behavior: 'smooth' })
            }}
            className="animate-bounce cursor-pointer w-11 h-11 rounded-full border border-white/50 bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 hover:border-white/70 transition-colors"
            aria-label="Scroll down"
          >
            <svg
              className="w-5 h-5 text-white/80"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>
      </section>

      {/* In store */}
      <section className="bg-primary-50">
        <div className="section-padding">
          <div className="container-custom">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              <div className="lg:col-span-5 animate-fade-in-up">
                <h2 className="section-title mb-4">{t('home.gallery.title')}</h2>
                <p className="marketing-lede mb-8">{t('home.gallery.description')}</p>
                <Link
                  to="/location"
                  className="inline-flex items-center justify-center h-11 px-6 rounded-xl bg-primary text-white font-medium hover:bg-primary-hover transition-colors shadow-soft"
                >
                  {t('home.gallery.cta')}
                </Link>
              </div>

              <div className="lg:col-span-7 relative animate-fade-in-up animate-delay-200">
                <div className="grid grid-cols-2 md:grid-cols-12 gap-3 md:gap-4 md:grid-rows-2">
                  <div className="col-span-2 md:col-span-7 md:row-span-2 rounded-3xl overflow-hidden shadow-elevated ring-1 ring-primary-forest/10">
                    <img
                      src="/store-exterior.png"
                      alt="Cmart Store Exterior"
                      className="w-full h-52 md:h-full md:min-h-[22rem] object-cover"
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-card ring-1 ring-primary-forest/10 md:col-span-5">
                    <img
                      src="/store-3.png"
                      alt="Cmart Store Interior"
                      className="w-full h-36 md:h-full object-cover"
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-card ring-1 ring-primary-forest/10 md:col-span-5">
                    <img
                      src="/store-aisle-noodles.png"
                      alt="Cmart noodles aisle"
                      className="w-full h-36 md:h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <CategoryTicker
          items={[
            t('home.ticker.noodles'),
            t('home.ticker.sauces'),
            t('home.ticker.rice'),
            t('home.ticker.snacks'),
            t('home.ticker.frozen'),
            t('home.ticker.drinks'),
            t('home.ticker.spices'),
            t('home.ticker.tea'),
          ]}
        />
      </section>

      {/* Cook with us */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            {loading ? (
              <>
                <div className="max-w-2xl mb-10 md:mb-12">
                  <h2 className="section-title mb-4">
                    <span className="block">{t('home.featuredRecipes.stem')}</span>
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
                  </h2>
                  <p className="marketing-lede">{t('home.featuredRecipes.description')}</p>
                </div>
                <p className="text-gray-500 text-sm">{t('home.featuredRecipes.loading')}</p>
              </>
            ) : featuredRecipes.length > 0 ? (
              <>
                <div className="max-w-2xl mb-10 md:mb-12">
                  <h2 className="section-title mb-4">
                    <span className="block">{t('home.featuredRecipes.stem')}</span>
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
                  </h2>
                  <p className="marketing-lede">{t('home.featuredRecipes.description')}</p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 mb-10">
                  {featuredRecipes.map((recipe) => (
                    <Link key={recipe.id} to={`/recipes/${recipe.slug}`} className="group block">
                      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-primary-forest/5 mb-4">
                        {recipe.image ? (
                          <img
                            src={recipe.image}
                            alt={recipe.title}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                          />
                        ) : null}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">
                          {recipe.category}
                        </span>
                        <span>{recipe.time}</span>
                      </div>
                      <h3 className="text-xl font-bold text-primary-forest mb-2 group-hover:text-primary transition-colors">
                        {recipe.title}
                      </h3>
                      <span className="inline-flex items-center gap-1.5 text-primary font-medium text-sm">
                        {t('recipes.card.viewRecipe')}
                        <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </Link>
                  ))}
                </div>
                <Link
                  to="/recipes"
                  className="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-primary text-white font-medium hover:bg-primary-hover transition-colors shadow-soft"
                >
                  {t('home.featuredRecipes.viewAll')}
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </>
            ) : (
              <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                <div className="lg:col-span-5">
                  <h2 className="section-title mb-4">
                    <span className="block">{t('home.featuredRecipes.stem')}</span>
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
                  </h2>
                  <p className="marketing-lede">{t('home.featuredRecipes.description')}</p>
                </div>
                <div className="lg:col-span-7">
                  <div className="rounded-3xl bg-primary-forest text-white px-8 py-10 md:px-10 md:py-12">
                    <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3">
                      {t('home.featuredRecipes.emptyTitle')}
                    </h3>
                    <p className="text-white/75 text-base sm:text-lg mb-6 max-w-xl">
                      {t('home.featuredRecipes.emptyDesc')}
                    </p>
                    <Link
                      to="/recipes"
                      className="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-primary text-white font-medium hover:bg-primary-hover transition-colors"
                    >
                      {t('home.featuredRecipes.viewAll')}
                      <ArrowRightIcon className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="section-padding bg-primary-forest">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-2xl mb-10 md:mb-12">
              <h2 className="section-title text-white mb-4">{t('home.exploreMore.title')}</h2>
              <p className="text-base sm:text-lg text-white/70">{t('home.exploreMore.description')}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 md:gap-5">
              <Link
                to="/about"
                className="group rounded-3xl bg-primary text-white p-8 md:p-10 hover:bg-primary-hover transition-colors"
              >
                <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3">
                  {t('home.exploreMore.about')}
                </h3>
                <p className="text-white/80 text-base mb-6 max-w-md">{t('home.exploreMore.aboutDesc')}</p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-white">
                  {t('home.exploreMore.learnMore')}
                  <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>

              <Link
                to="/location"
                className="group relative rounded-3xl overflow-hidden min-h-[12rem] p-8 md:p-10"
              >
                <img
                  src="/store-exterior.png"
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-forest/90 via-primary-forest/55 to-primary-forest/20" />
                <div className="relative text-white">
                  <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3">
                    {t('home.exploreMore.findUs')}
                  </h3>
                  <p className="text-white/80 text-base mb-6 max-w-md">{t('home.exploreMore.findUsDesc')}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary-200">
                    {t('home.exploreMore.getDirections')}
                    <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </Link>

              <Link
                to="/contact"
                className="group rounded-3xl bg-white p-8 md:p-10 hover:bg-primary-50 transition-colors"
              >
                <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-primary-forest mb-3">
                  {t('home.exploreMore.contact')}
                </h3>
                <p className="text-primary-forest/70 text-base mb-6 max-w-md">{t('home.exploreMore.contactDesc')}</p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  {t('home.exploreMore.sendMessage')}
                  <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>

              <Link
                to="/games/recipe-builder"
                className="group rounded-3xl bg-white/10 border border-white/15 text-white p-8 md:p-10 hover:bg-white/15 transition-colors"
              >
                <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3">
                  {t('home.exploreMore.games')}
                </h3>
                <p className="text-white/70 text-base mb-6 max-w-md">{t('home.exploreMore.gamesDesc')}</p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary-200">
                  {t('home.exploreMore.playNow')}
                  <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
