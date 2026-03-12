// Client-side recipe loading (for React components)
import { RecipeCategory, Difficulty, Allergy } from '../types/recipe'

export interface Recipe {
  id: number
  slug: string
  title: string
  category: RecipeCategory
  difficulty: Difficulty
  time: string
  description: string
  author?: string | null
  allergies: Allergy[]
  image?: string | null
  ingredients?: string[]
  instructions?: string[]
  createdAt: string
  updatedAt: string
}

/**
 * Fetch all recipes from the public/recipes folder
 * Uses recipes-manifest.json to know which recipe files to load
 */
export async function getAllRecipes(): Promise<Recipe[]> {
  try {
    // Fetch the manifest file that lists all recipe files
    // Add timestamp to bust cache
    const timestamp = new Date().getTime()
    const manifestResponse = await fetch(`/recipes/recipes-manifest.json?t=${timestamp}`, { 
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    })
    
    if (!manifestResponse.ok) {
      console.warn('recipes-manifest.json not found. Please create it with a list of recipe filenames.')
      return []
    }
    
    const manifest = await manifestResponse.json()
    const recipeEntries = manifest.recipes || []
    
    if (recipeEntries.length === 0) {
      console.warn('No recipes listed in manifest file.')
      return []
    }
    
    // Fetch all recipe files in parallel
    const recipePromises = recipeEntries.map(async (entry: { id: number; slug: string; filename: string }) => {
      try {
        const timestamp = new Date().getTime()
        const response = await fetch(`/recipes/${entry.filename}?t=${timestamp}`, { 
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          }
        })
        if (response.ok) {
          const recipe = await response.json()
          return recipe as Recipe
        }
        console.warn(`Failed to fetch recipe: ${entry.filename}`)
        return null
      } catch (error) {
        console.error(`Error fetching recipe ${entry.filename}:`, error)
        return null
      }
    })
    
    const recipes = await Promise.all(recipePromises)
    return recipes.filter((r): r is Recipe => r !== null).sort((a, b) => a.id - b.id)
    
  } catch (error) {
    console.error('Error loading recipes:', error)
    return []
  }
}

/**
 * Fetch a single recipe by slug
 */
export async function getRecipeBySlug(slug: string): Promise<Recipe | null> {
  try {
    // Try to fetch from manifest first
    const allRecipes = await getAllRecipes()
    const recipe = allRecipes.find(r => r.slug === slug)
    if (recipe) return recipe
    
    // Fallback: Try common filename patterns
    // This won't work without knowing the ID, so we need the manifest
    return null
  } catch (error) {
    console.error('Error loading recipe:', error)
    return null
  }
}

