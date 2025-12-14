import { useState, useEffect } from 'react'
import RecipesClient from './RecipesClient'
import { Recipe } from '../lib/recipes-client'

export default function Recipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadRecipes() {
      try {
        const { getAllRecipes } = await import('../lib/recipes-client')
        const loadedRecipes = await getAllRecipes()
        setRecipes(loadedRecipes)
      } catch (error) {
        console.error('Error loading recipes:', error)
      } finally {
        setLoading(false)
      }
    }
    loadRecipes()
  }, [])

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading recipes...</div>
      </div>
    )
  }

  return <RecipesClient initialRecipes={recipes} />
}
