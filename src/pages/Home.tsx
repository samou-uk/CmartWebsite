import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRightIcon } from '../components/icons'
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
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0 w-full h-full">
          <div className="relative w-full h-full min-h-screen">
            <img
              src="/hero-store.png"
              alt="C mart Store Entrance"
              className="absolute inset-0 w-full h-full object-cover object-center animate-fade-in"
            />
          </div>
        </div>
        
        {/* Fallback gradient background - only visible if image doesn't load */}
        <div className="absolute inset-0 gradient-bg z-0 opacity-0"></div>

        <div className="absolute bottom-0 left-0 z-10 w-full pb-20 md:pb-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-2xl">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-semibold text-white leading-tight tracking-tight max-w-4xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] animate-fade-in-up">
                  {t('home.hero.slogan')}
                </h1>
                
                <div className="flex flex-col sm:flex-row gap-3 pt-2 animate-fade-in-up animate-delay-200">
                  <Link
                    to="/recipes"
                    className="group hover-button glass-card bg-white/90 backdrop-blur-md text-gray-900 px-8 py-3.5 rounded-md font-semibold text-sm hover:bg-white/95 transition-all flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                  >
                    <span>{t('home.hero.exploreRecipes')}</span>
                    <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to="/location"
                    className="hover-button glass-dark bg-primary/90 hover:bg-primary backdrop-blur-md text-white px-8 py-3.5 rounded-md font-semibold text-sm transition-all text-center shadow-lg hover:shadow-xl"
                  >
                    {t('home.hero.visitStore')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center z-20">
          <button
            onClick={() => {
              const nextSection = document.querySelector('section:nth-of-type(2)')
              if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' })
              }
            }}
            className="animate-bounce cursor-pointer hover:scale-110 transition-transform"
            aria-label="Scroll down"
          >
            <svg
              className="w-6 h-6 text-white/70 hover:text-white transition-colors"
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

      {/* Divider */}
      <div className="relative">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-px bg-primary/30"></div>
      </div>

      {/* Store Gallery Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 mb-4">
              {t('home.gallery.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('home.gallery.description')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-16">
            {/* Large featured image - Exterior */}
            <div className="md:col-span-2 lg:col-span-2 rounded-2xl overflow-hidden shadow-xl group hover:shadow-2xl transition-all cursor-pointer relative animate-fade-in-up">
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0">
                  <div className="glass-card bg-white/90 backdrop-blur-xl px-6 py-3 rounded-lg">
                    <p className="text-gray-900 font-semibold">Store Exterior</p>
                  </div>
                </div>
              </div>
              <img
                src="/store-exterior.png"
                alt="Cmart Store Exterior"
                className="w-full h-full min-h-[400px] md:min-h-[500px] object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            
            {/* Top right image - Store Interior */}
            <div className="rounded-2xl overflow-hidden shadow-xl group hover:shadow-2xl transition-all cursor-pointer relative animate-fade-in-up animate-delay-200">
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0">
                  <div className="glass-card bg-white/90 backdrop-blur-xl px-4 py-2 rounded-lg">
                    <p className="text-gray-900 font-semibold text-sm">Store Interior</p>
                  </div>
                </div>
              </div>
              <img
                src="/store-3.png"
                alt="Cmart Store Interior"
                className="w-full h-full min-h-[250px] object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            
            {/* Bottom right image */}
            <div className="rounded-2xl overflow-hidden shadow-xl group hover:shadow-2xl transition-all cursor-pointer relative animate-fade-in-up animate-delay-400">
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0">
                  <div className="glass-card bg-white/90 backdrop-blur-xl px-4 py-2 rounded-lg">
                    <p className="text-gray-900 font-semibold text-sm">Products Aisle</p>
                  </div>
                </div>
              </div>
              <img
                src="/store-aisle-products.png"
                alt="Cmart Store Products Aisle"
                className="w-full h-full min-h-[250px] object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            
            {/* Bottom left image - spans full width on mobile, half on desktop */}
            <div className="md:col-span-2 lg:col-span-1 rounded-2xl overflow-hidden shadow-xl group hover:shadow-2xl transition-all cursor-pointer relative animate-fade-in-up animate-delay-200">
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0">
                  <div className="glass-card bg-white/90 backdrop-blur-xl px-4 py-2 rounded-lg">
                    <p className="text-gray-900 font-semibold text-sm">Noodles Aisle</p>
                  </div>
                </div>
              </div>
              <img
                src="/store-aisle-noodles.png"
                alt="Cmart Store Noodles Aisle"
                className="w-full h-full min-h-[300px] object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="relative">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-px bg-primary/30"></div>
      </div>

      {/* Featured Recipes Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 mb-4">
              {t('home.featuredRecipes.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('home.featuredRecipes.description')}
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="text-gray-600">Loading recipes...</div>
            </div>
          ) : featuredRecipes.length > 0 ? (
            <>
              <div className="grid md:grid-cols-3 gap-8">
                {featuredRecipes.map((recipe) => (
                  <Link
                    key={recipe.id}
                    to={`/recipes/${recipe.slug}`}
                    className="group hover-card glass-card rounded-xl overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-2"
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                          {recipe.category}
                        </span>
                        <span className="text-sm text-gray-600">{recipe.time}</span>
                      </div>
                      <h3 className="text-2xl font-semibold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                        {recipe.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-4">{recipe.description}</p>
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs font-medium px-3 py-1 rounded-full ${
                            recipe.difficulty === 'easy'
                              ? 'bg-green-100 text-green-700'
                              : recipe.difficulty === 'medium'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {recipe.difficulty}
                        </span>
                        <div className="flex items-center space-x-1 text-primary font-medium text-sm group-hover:space-x-2 transition-all">
                          <span>{t('recipes.card.viewRecipe')}</span>
                          <ArrowRightIcon className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="text-center mt-12">
                <Link
                  to="/recipes"
                  className="hover-button inline-flex items-center space-x-2 glass-dark bg-primary/90 hover:bg-primary text-white px-8 py-4 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl backdrop-blur-md"
                >
                  <span>{t('home.featuredRecipes.viewAll')}</span>
                  <ArrowRightIcon className="w-5 h-5" />
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="glass-card rounded-xl p-12 max-w-2xl mx-auto">
                <div className="mb-6">
                  <svg
                    className="w-16 h-16 mx-auto text-primary/60"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 className="text-3xl font-display font-bold text-gray-900 mb-4">
                  Recipes Coming Soon!
                </h3>
                <p className="text-lg text-gray-600 mb-6">
                  We're working on adding delicious recipes for you. Check back soon!
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Divider */}
      <div className="relative">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-px bg-primary/30"></div>
      </div>

      {/* Quick Links Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 mb-4">
              {t('home.exploreMore.title')}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            <Link
              to="/about"
              className="group hover-card relative glass-card rounded-xl p-8 hover:shadow-2xl transition-all transform hover:-translate-y-2 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary-dark/20 rounded-full -mr-20 -mt-20 group-hover:bg-primary-dark/30 transition-colors blur-xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/10 rounded-full -ml-16 -mb-16 group-hover:bg-primary/20 transition-colors blur-xl"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-primary-dark/90 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-dark transition-colors">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-dark transition-colors">
                  {t('home.exploreMore.about')}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {t('home.exploreMore.aboutDesc')}
                </p>
                <div className="flex items-center space-x-1 text-primary-dark font-medium text-sm group-hover:space-x-2 transition-all">
                  <span>{t('home.exploreMore.learnMore')}</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </div>
              </div>
            </Link>

            <Link
              to="/recipes"
              className="group hover-card relative glass-card rounded-xl p-8 hover:shadow-2xl transition-all transform hover:-translate-y-2 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary-dark/20 rounded-full -mr-20 -mt-20 group-hover:bg-primary-dark/30 transition-colors blur-xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/10 rounded-full -ml-16 -mb-16 group-hover:bg-primary/20 transition-colors blur-xl"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-primary-dark/90 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-dark transition-colors">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-dark transition-colors">
                  {t('home.exploreMore.recipes')}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {t('home.exploreMore.recipesDesc')}
                </p>
                <div className="flex items-center space-x-1 text-primary-dark font-medium text-sm group-hover:space-x-2 transition-all">
                  <span>{t('home.exploreMore.viewRecipes')}</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </div>
              </div>
            </Link>

            <Link
              to="/location"
              className="group hover-card relative glass-card rounded-xl p-8 hover:shadow-2xl transition-all transform hover:-translate-y-2 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary-dark/20 rounded-full -mr-20 -mt-20 group-hover:bg-primary-dark/30 transition-colors blur-xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/10 rounded-full -ml-16 -mb-16 group-hover:bg-primary/20 transition-colors blur-xl"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-primary-dark/90 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-dark transition-colors">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-dark transition-colors">
                  {t('home.exploreMore.findUs')}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {t('home.exploreMore.findUsDesc')}
                </p>
                <div className="flex items-center space-x-1 text-primary-dark font-medium text-sm group-hover:space-x-2 transition-all">
                  <span>{t('home.exploreMore.getDirections')}</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </div>
              </div>
            </Link>

            <Link
              to="/contact"
              className="group hover-card relative glass-card rounded-xl p-8 hover:shadow-2xl transition-all transform hover:-translate-y-2 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary-dark/20 rounded-full -mr-20 -mt-20 group-hover:bg-primary-dark/30 transition-colors blur-xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/10 rounded-full -ml-16 -mb-16 group-hover:bg-primary/20 transition-colors blur-xl"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-primary-dark/90 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-dark transition-colors">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-dark transition-colors">
                  {t('home.exploreMore.contact')}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {t('home.exploreMore.contactDesc')}
                </p>
                <div className="flex items-center space-x-1 text-primary-dark font-medium text-sm group-hover:space-x-2 transition-all">
                  <span>{t('home.exploreMore.sendMessage')}</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </div>
              </div>
            </Link>

            <Link
              to="/games/recipe-builder"
              className="group hover-card relative glass-card rounded-xl p-8 hover:shadow-2xl transition-all transform hover:-translate-y-2 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary-dark/20 rounded-full -mr-20 -mt-20 group-hover:bg-primary-dark/30 transition-colors blur-xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/10 rounded-full -ml-16 -mb-16 group-hover:bg-primary/20 transition-colors blur-xl"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-primary-dark/90 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-dark transition-colors">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-dark transition-colors">
                  {t('home.exploreMore.games')}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {t('home.exploreMore.gamesDesc')}
                </p>
                <div className="flex items-center space-x-1 text-primary-dark font-medium text-sm group-hover:space-x-2 transition-all">
                  <span>{t('home.exploreMore.playNow')}</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
