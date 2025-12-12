'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Recipe } from '@/lib/recipes'
import { RecipeCategory, Difficulty, Allergy } from '@/types/recipe'

export default function AdminRecipes() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)
  const [rateLimitInfo, setRateLimitInfo] = useState<{ remaining: number; resetAt?: number } | null>(null)

  // Check authentication status on mount
  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/check')
      const data = await response.json()
      setIsAuthenticated(data.authenticated)
      if (data.authenticated) {
        fetchRecipes()
      }
    } catch (error) {
      console.error('Error checking auth:', error)
      setIsAuthenticated(false)
    } finally {
      setCheckingAuth(false)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchRecipes()
    }
  }, [isAuthenticated])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError(null)
    setRateLimitInfo(null)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      })

      const data = await response.json()

      if (response.ok) {
        setIsAuthenticated(true)
        setPassword('')
        await fetchRecipes()
      } else {
        if (response.status === 429) {
          const resetIn = data.resetAt ? Math.ceil((data.resetAt - Date.now()) / 1000 / 60) : 15
          setLoginError(`Too many login attempts. Please try again in ${resetIn} minutes.`)
        } else {
          setLoginError(data.error || 'Invalid password')
          if (data.remaining !== undefined) {
            setRateLimitInfo({ remaining: data.remaining })
          }
        }
      }
    } catch (error) {
      console.error('Login error:', error)
      setLoginError('An error occurred. Please try again.')
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      setIsAuthenticated(false)
      setRecipes([])
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const fetchRecipes = async () => {
    try {
      const response = await fetch('/api/recipes', {
        credentials: 'include', // Include cookies
      })
      const data = await response.json()
      setRecipes(data.recipes || [])
    } catch (error) {
      console.error('Error fetching recipes:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (recipe: Recipe) => {
    try {
      const method = recipe.id && recipe.id > 0 ? 'PUT' : 'POST'
      const response = await fetch('/api/recipes', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies
        body: JSON.stringify(recipe),
      })

      const data = await response.json()

      if (response.ok) {
        await fetchRecipes()
        setEditingRecipe(null)
        setShowForm(false)
        alert('Recipe saved successfully!')
      } else if (response.status === 401) {
        setIsAuthenticated(false)
        alert('Session expired. Please login again.')
      } else {
        const errorMsg = data.error || data.message || 'Error saving recipe'
        console.error('Save error:', data)
        alert(`Error saving recipe: ${errorMsg}`)
      }
    } catch (error) {
      console.error('Error saving recipe:', error)
      alert(`Error saving recipe: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this recipe?')) return

    try {
      const response = await fetch(`/api/recipes?slug=${slug}`, {
        method: 'DELETE',
        credentials: 'include', // Include cookies
      })

      if (response.ok) {
        await fetchRecipes()
        alert('Recipe deleted successfully!')
      } else if (response.status === 401) {
        setIsAuthenticated(false)
        alert('Session expired. Please login again.')
      } else {
        alert('Error deleting recipe')
      }
    } catch (error) {
      console.error('Error deleting recipe:', error)
      alert('Error deleting recipe')
    }
  }

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
        <div className="text-gray-600">Checking authentication...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
        <div className="glass-card rounded-2xl p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Login</h1>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg mb-4 focus:ring-2 focus:ring-primary-dark focus:border-primary-dark outline-none"
              required
              autoFocus
            />
            {loginError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{loginError}</p>
                {rateLimitInfo && rateLimitInfo.remaining > 0 && (
                  <p className="text-xs text-red-500 mt-1">
                    {rateLimitInfo.remaining} attempt{rateLimitInfo.remaining !== 1 ? 's' : ''} remaining
                  </p>
                )}
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-primary-dark text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-dark/90 transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
        <div className="text-gray-600">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container-custom py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Recipe Management</h1>
          <div className="flex gap-3">
            <button
              onClick={() => {
                setEditingRecipe(null)
                setShowForm(true)
              }}
              className="bg-primary-dark text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-dark/90 transition-colors"
            >
              Add New Recipe
            </button>
            <button
              onClick={handleLogout}
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {showForm && (
          <RecipeForm
            recipe={editingRecipe}
            onSave={handleSave}
            onCancel={() => {
              setShowForm(false)
              setEditingRecipe(null)
            }}
          />
        )}

        <div className="grid gap-4">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="glass-card rounded-xl p-6">
              <div className="flex justify-between items-start gap-4">
                {recipe.image && (
                  <div className="flex-shrink-0 w-24 h-24 relative rounded-lg overflow-hidden">
                    <Image
                      src={recipe.image}
                      alt={recipe.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{recipe.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{recipe.description}</p>
                  <div className="flex gap-2 text-xs text-gray-500">
                    <span>{recipe.category}</span>
                    <span>•</span>
                    <span>{recipe.difficulty}</span>
                    <span>•</span>
                    <span>{recipe.time}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingRecipe(recipe)
                      setShowForm(true)
                    }}
                    className="px-4 py-2 bg-primary-dark/10 text-primary-dark rounded-lg text-sm font-medium hover:bg-primary-dark/20 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(recipe.slug)}
                    className="px-4 py-2 bg-red-100 text-red-600 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function RecipeForm({
  recipe,
  onSave,
  onCancel,
}: {
  recipe: Recipe | null
  onSave: (recipe: Recipe) => Promise<void>
  onCancel: () => void
}) {
  const [formData, setFormData] = useState<Partial<Recipe>>({
    title: recipe?.title || '',
    slug: recipe?.slug || '',
    category: recipe?.category || 'chinese',
    difficulty: recipe?.difficulty || 'easy',
    time: recipe?.time || '',
    description: recipe?.description || '',
    allergies: recipe?.allergies || [],
    ingredients: recipe?.ingredients || [],
    instructions: recipe?.instructions || [],
    image: recipe?.image || null,
  })
  const [isSaving, setIsSaving] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageError, setImageError] = useState(false)

  // Update form data when recipe prop changes (e.g., when editing a different recipe)
  useEffect(() => {
    if (recipe) {
      setFormData({
        title: recipe.title || '',
        slug: recipe.slug || '',
        category: recipe.category || 'chinese',
        difficulty: recipe.difficulty || 'easy',
        time: recipe.time || '',
        description: recipe.description || '',
        allergies: recipe.allergies || [],
        ingredients: recipe.ingredients || [],
        instructions: recipe.instructions || [],
        image: recipe.image || null,
      })
      setImagePreview(null)
      setImageError(false)
    } else {
      // Reset form for new recipe
      setFormData({
        title: '',
        slug: '',
        category: 'chinese',
        difficulty: 'easy',
        time: '',
        description: '',
        allergies: [],
        ingredients: [],
        instructions: [],
        image: null,
      })
      setImagePreview(null)
      setImageError(false)
    }
  }, [recipe])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    // Validate required fields
    if (!formData.title || !formData.time || !formData.description) {
      alert('Please fill in all required fields (Title, Time, Description)')
      return
    }

    // Store scroll position before validation
    const scrollPosition = window.scrollY

    // Validate image only when saving (not while typing)
    if (formData.image) {
      setImagePreview(formData.image)
      // Check if image exists by trying to load it
      // Use window.Image to avoid conflict with Next.js Image component
      const img = new window.Image()
      img.onerror = () => {
        setImageError(true)
      }
      img.onload = () => {
        setImageError(false)
      }
      img.src = formData.image
    }

    // Restore scroll position after state updates
    requestAnimationFrame(() => {
      window.scrollTo(0, scrollPosition)
    })

    setIsSaving(true)

    try {
      const recipeData: Recipe = {
        id: recipe?.id || 0,
        slug: formData.slug || formData.title!.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
        title: formData.title!,
        category: formData.category as RecipeCategory,
        difficulty: formData.difficulty as Difficulty,
        time: formData.time!,
        description: formData.description!,
        allergies: formData.allergies || [],
        ingredients: formData.ingredients || [],
        instructions: formData.instructions || [],
        image: formData.image || null,
        createdAt: recipe?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      
      await onSave(recipeData)
    } catch (error) {
      console.error('Form submit error:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const toggleAllergy = (allergy: Allergy) => {
    setFormData((prev) => ({
      ...prev,
      allergies: prev.allergies?.includes(allergy)
        ? prev.allergies.filter((a) => a !== allergy)
        : [...(prev.allergies || []), allergy],
    }))
  }

  return (
    <div className="glass-card rounded-2xl p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{recipe ? 'Edit Recipe' : 'New Recipe'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-primary-dark outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">Slug (auto-generated if empty)</label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-primary-dark outline-none"
            placeholder="recipe-slug"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">Image URL</label>
          <input
            type="text"
            value={formData.image || ''}
            onChange={(e) => {
              const value = e.target.value || null
              setFormData({ ...formData, image: value })
              // Clear preview and error while typing
              setImagePreview(null)
              setImageError(false)
            }}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-primary-dark outline-none"
            placeholder="https://example.com/image.jpg or /recipe-image.jpg"
          />
          <p className="text-xs text-gray-500 mt-1">Enter a full URL or a path relative to /public (e.g., /recipe-image.jpg)</p>
          {imagePreview && !imageError && (
            <div className="mt-2 w-32 h-32 relative rounded-lg overflow-hidden border-2 border-gray-200">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={() => {
                  setImageError(true)
                }}
                onLoad={() => {
                  setImageError(false)
                }}
              />
            </div>
          )}
          {imageError && imagePreview && (
            <p className="text-xs text-red-500 mt-1">⚠️ Image not found. It will be saved but may not display correctly.</p>
          )}
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as RecipeCategory })}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-primary-dark outline-none"
            >
              <option value="chinese">Chinese</option>
              <option value="japanese">Japanese</option>
              <option value="korean">Korean</option>
              <option value="thai">Thai</option>
              <option value="vietnamese">Vietnamese</option>
              <option value="indian">Indian</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Difficulty</label>
            <select
              value={formData.difficulty}
              onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as Difficulty })}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-primary-dark outline-none"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">Time</label>
          <input
            type="text"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-primary-dark outline-none"
            placeholder="30 min"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-primary-dark outline-none"
            rows={3}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">Allergies</label>
          <div className="flex flex-wrap gap-2">
            {(['gluten', 'dairy', 'nuts', 'shellfish', 'eggs', 'soy', 'fish'] as Allergy[]).map((allergy) => (
              <button
                key={allergy}
                type="button"
                onClick={() => toggleAllergy(allergy)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  formData.allergies?.includes(allergy)
                    ? 'bg-primary-dark text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {allergy}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">Ingredients (one per line)</label>
          <textarea
            value={formData.ingredients?.join('\n') || ''}
            onChange={(e) => setFormData({ ...formData, ingredients: e.target.value.split('\n').filter(i => i.trim()) })}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-primary-dark outline-none"
            rows={5}
            placeholder="1 cup rice&#10;2 tbsp soy sauce&#10;..."
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">Instructions (one per line)</label>
          <textarea
            value={formData.instructions?.join('\n') || ''}
            onChange={(e) => setFormData({ ...formData, instructions: e.target.value.split('\n').filter(i => i.trim()) })}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-dark focus:border-primary-dark outline-none"
            rows={8}
            placeholder="Step 1: Heat the pan&#10;Step 2: Add ingredients&#10;..."
          />
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSaving}
            className="bg-primary-dark text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-dark/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSaving ? (
              <>
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              'Save Recipe'
            )}
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={isSaving}
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

