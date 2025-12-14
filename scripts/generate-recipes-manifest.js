/**
 * Generate recipes-manifest.json from all recipe files in public/recipes/
 * This script runs automatically during build
 * 
 * Usage: node scripts/generate-recipes-manifest.js
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const recipesDir = path.join(process.cwd(), 'public', 'recipes')
const manifestPath = path.join(recipesDir, 'recipes-manifest.json')

function generateManifest() {
  try {
    if (!fs.existsSync(recipesDir)) {
      console.error(`Recipes directory not found: ${recipesDir}`)
      process.exit(1)
    }

    // Read all files in recipes directory
    const files = fs.readdirSync(recipesDir)
    
    // Filter for JSON files (excluding manifest and template)
    const recipeFiles = files.filter(file => 
      file.endsWith('.json') && 
      file !== 'recipes-manifest.json' && 
      file !== 'recipe-template.json'
    )

    const recipeEntries = []

    // Parse each recipe file to get id, slug, and filename
    for (const fileName of recipeFiles) {
      const filePath = path.join(recipesDir, fileName)
      try {
        const fileContents = fs.readFileSync(filePath, 'utf8')
        const recipe = JSON.parse(fileContents)
        if (recipe.id && recipe.slug) {
          recipeEntries.push({ 
            id: recipe.id, 
            slug: recipe.slug, 
            filename: fileName 
          })
        } else {
          console.warn(`Skipping invalid recipe file (missing id or slug): ${fileName}`)
        }
      } catch (parseError) {
        console.error(`Error parsing recipe file ${fileName}:`, parseError)
      }
    }

    // Sort recipes by ID
    recipeEntries.sort((a, b) => a.id - b.id)

    if (recipeEntries.length === 0) {
      // Create empty manifest
      const emptyManifest = { recipes: [] }
      fs.writeFileSync(manifestPath, JSON.stringify(emptyManifest, null, 2))
      console.log('Created empty recipes-manifest.json')
      return
    }

    // Create manifest with list of recipe entries
    const manifest = {
      recipes: recipeEntries
    }

    // Write manifest file
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2))
    
    console.log(`✅ Generated recipes-manifest.json with ${recipeEntries.length} recipe(s)`)
    
  } catch (error) {
    console.error('Error generating manifest:', error)
    process.exit(1)
  }
}

generateManifest()
