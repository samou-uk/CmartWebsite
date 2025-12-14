import fs from 'fs'
import path from 'path'
import { getAllRecipes, getRecipeById } from './recipes'

/**
 * Cleanup duplicate recipe files
 * Keeps the most recent version of each recipe (by updatedAt)
 */
export function cleanupDuplicateRecipes(): { removed: string[]; kept: string[] } {
  const recipesDirectory = path.join(process.cwd(), 'data/recipes')
  const removed: string[] = []
  const kept: string[] = []

  try {
    const recipes = getAllRecipes()
    
    // Group recipes by ID
    const recipesById = new Map<number, typeof recipes>()
    
    for (const recipe of recipes) {
      if (!recipesById.has(recipe.id)) {
        recipesById.set(recipe.id, [])
      }
      recipesById.get(recipe.id)!.push(recipe)
    }

    // For each ID with multiple recipes, keep the most recent one
    for (const [id, duplicateRecipes] of Array.from(recipesById.entries())) {
      if (duplicateRecipes.length > 1) {
        // Sort by updatedAt (most recent first)
        duplicateRecipes.sort((a, b) => 
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        )

        // Keep the first (most recent), remove the rest
        const toKeep = duplicateRecipes[0]
        const toRemove = duplicateRecipes.slice(1)

        for (const recipe of toRemove) {
          const fileName = `${recipe.id}-${recipe.slug}.json`
          const filePath = path.join(recipesDirectory, fileName)
          
          if (fs.existsSync(filePath)) {
            try {
              fs.unlinkSync(filePath)
              removed.push(fileName)
              console.log(`Removed duplicate: ${fileName}`)
            } catch (error) {
              console.error(`Error removing ${fileName}:`, error)
            }
          }
        }

        kept.push(`${toKeep.id}-${toKeep.slug}.json`)
        console.log(`Kept most recent: ${toKeep.id}-${toKeep.slug}.json`)
      }
    }

    return { removed, kept }
  } catch (error) {
    console.error('Error cleaning up duplicates:', error)
    return { removed, kept }
  }
}

