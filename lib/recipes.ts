import fs from 'fs'
import path from 'path'
import { RecipeCategory, Difficulty, Allergy } from '@/types/recipe'

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

const recipesDirectory = path.join(process.cwd(), 'data/recipes')

export function getAllRecipes(): Recipe[] {
  try {
    const fileNames = fs.readdirSync(recipesDirectory)
    const recipes = fileNames
      .filter((fileName) => fileName.endsWith('.json'))
      .map((fileName) => {
        const filePath = path.join(recipesDirectory, fileName)
        const fileContents = fs.readFileSync(filePath, 'utf8')
        return JSON.parse(fileContents) as Recipe
      })
      .sort((a, b) => a.id - b.id)

    return recipes
  } catch (error) {
    console.error('Error reading recipes:', error)
    return []
  }
}

export function getRecipeBySlug(slug: string): Recipe | null {
  try {
    const fileNames = fs.readdirSync(recipesDirectory)
    const fileName = fileNames.find((f) => {
      if (f.endsWith('.json')) {
        const fileContents = fs.readFileSync(path.join(recipesDirectory, f), 'utf8')
        const recipe = JSON.parse(fileContents) as Recipe
        return recipe.slug === slug || f.replace('.json', '').endsWith(`-${slug}`)
      }
      return false
    })

    if (!fileName) return null

    const fileContents = fs.readFileSync(path.join(recipesDirectory, fileName), 'utf8')
    return JSON.parse(fileContents) as Recipe
  } catch (error) {
    console.error('Error reading recipe:', error)
    return null
  }
}

export function getRecipeById(id: number): Recipe | null {
  try {
    const fileNames = fs.readdirSync(recipesDirectory)
    const fileName = fileNames.find((f) => {
      if (f.endsWith('.json')) {
        const fileContents = fs.readFileSync(path.join(recipesDirectory, f), 'utf8')
        const recipe = JSON.parse(fileContents) as Recipe
        return recipe.id === id
      }
      return false
    })

    if (!fileName) return null

    const fileContents = fs.readFileSync(path.join(recipesDirectory, fileName), 'utf8')
    return JSON.parse(fileContents) as Recipe
  } catch (error) {
    console.error('Error reading recipe:', error)
    return null
  }
}

export function saveRecipe(recipe: Recipe): boolean {
  try {
    // Generate filename from ID and slug
    const fileName = `${recipe.id}-${recipe.slug}.json`
    const filePath = path.join(recipesDirectory, fileName)

    // If updating an existing recipe, find and delete all old files with the same ID
    if (recipe.id > 0) {
      const fileNames = fs.readdirSync(recipesDirectory)
      const filesToDelete: string[] = []

      // Find all files with the same ID but different slug
      for (const existingFileName of fileNames) {
        if (existingFileName.endsWith('.json')) {
          // Check if this file has the same ID
          const idMatch = existingFileName.match(/^(\d+)-/)
          if (idMatch && parseInt(idMatch[1]) === recipe.id) {
            // Check if it's not the file we're about to create
            if (existingFileName !== fileName) {
              filesToDelete.push(existingFileName)
            }
          }
        }
      }

      // Delete old files
      for (const oldFileName of filesToDelete) {
        const oldFilePath = path.join(recipesDirectory, oldFileName)
        if (fs.existsSync(oldFilePath)) {
          try {
            fs.unlinkSync(oldFilePath)
            console.log(`Deleted old recipe file: ${oldFileName}`)
          } catch (deleteError) {
            console.error(`Error deleting old recipe file ${oldFileName}:`, deleteError)
            // Continue anyway - we'll still save the new file
          }
        }
      }
    }

    // Update timestamp
    recipe.updatedAt = new Date().toISOString()

    fs.writeFileSync(filePath, JSON.stringify(recipe, null, 2), 'utf8')
    return true
  } catch (error) {
    console.error('Error saving recipe:', error)
    return false
  }
}

export function deleteRecipe(slug: string): boolean {
  try {
    const fileNames = fs.readdirSync(recipesDirectory)
    const fileName = fileNames.find((f) => {
      if (f.endsWith('.json')) {
        const fileContents = fs.readFileSync(path.join(recipesDirectory, f), 'utf8')
        const recipe = JSON.parse(fileContents) as Recipe
        return recipe.slug === slug || f.replace('.json', '').endsWith(`-${slug}`)
      }
      return false
    })

    if (!fileName) return false

    const filePath = path.join(recipesDirectory, fileName)
    fs.unlinkSync(filePath)
    return true
  } catch (error) {
    console.error('Error deleting recipe:', error)
    return false
  }
}

export function getNextRecipeId(): number {
  try {
    const recipes = getAllRecipes()
    if (recipes.length === 0) return 1
    return Math.max(...recipes.map((r) => r.id)) + 1
  } catch (error) {
    console.error('Error getting next recipe ID:', error)
    return 1
  }
}

