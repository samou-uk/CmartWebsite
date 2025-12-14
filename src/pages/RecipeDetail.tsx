import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Recipe } from '../lib/recipes-client'

export default function RecipeDetail() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadRecipe() {
      try {
        if (!slug) {
          navigate('/not-found')
          return
        }
        const { getRecipeBySlug } = await import('../lib/recipes-client')
        const loadedRecipe = await getRecipeBySlug(slug)
        if (!loadedRecipe) {
          navigate('/not-found')
          return
        }
        setRecipe(loadedRecipe)
      } catch (error) {
        console.error('Error loading recipe:', error)
        navigate('/not-found')
      } finally {
        setLoading(false)
      }
    }
    loadRecipe()
  }, [slug, navigate])

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading recipe...</div>
      </div>
    )
  }

  if (!recipe) {
    return null
  }

  return (
    <div className="pt-20">
      <div className="container-custom py-8">
        <Link
          to="/recipes"
          className="inline-flex items-center gap-2 text-primary-dark hover:text-primary-dark/80 font-medium mb-6 transition-colors"
        >
          <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
          Back to Recipes
        </Link>

        <article className="max-w-4xl mx-auto">
          <div className="glass-card rounded-2xl p-8 md:p-12">
            {recipe.image && (
              <div className="mb-8 -mx-8 -mt-8 md:-mx-12 md:-mt-12">
                <div className="relative w-full h-64 md:h-96 rounded-t-2xl overflow-hidden">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
            <div className="mb-6">
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <span className="px-3 py-1 bg-primary-dark/10 text-primary-dark rounded-full font-medium">
                  {recipe.category}
                </span>
                <span className="px-3 py-1 bg-primary-dark/10 text-primary-dark rounded-full font-medium">
                  {recipe.difficulty}
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {recipe.time}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
                {recipe.title}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                {recipe.description}
              </p>
              {recipe.author && (
                <p className="text-sm text-gray-500 mt-3">
                  By {recipe.author}
                </p>
              )}
            </div>

            {recipe.allergies && recipe.allergies.length > 0 && (
              <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm font-semibold text-yellow-800 mb-2">Contains:</p>
                <div className="flex flex-wrap gap-2">
                  {recipe.allergies.map((allergy) => (
                    <span key={allergy} className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                      {allergy}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {recipe.ingredients && recipe.ingredients.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-display font-semibold text-gray-900 mb-4">Ingredients</h2>
                <ul className="space-y-2">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-700">
                      <span className="text-primary-dark mt-1">•</span>
                      <span>{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {recipe.instructions && recipe.instructions.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-display font-semibold text-gray-900 mb-4">Instructions</h2>
                <ol className="space-y-4">
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index} className="flex gap-4">
                      <span className="flex-shrink-0 w-8 h-8 bg-primary-dark text-white rounded-full flex items-center justify-center font-semibold">
                        {index + 1}
                      </span>
                      <p className="text-gray-700 leading-relaxed pt-1">{instruction}</p>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {(!recipe.ingredients || recipe.ingredients.length === 0) && (!recipe.instructions || recipe.instructions.length === 0) && (
              <div className="text-center py-12 text-gray-500">
                <p>Recipe details coming soon!</p>
              </div>
            )}
          </div>
        </article>
      </div>
    </div>
  )
}

