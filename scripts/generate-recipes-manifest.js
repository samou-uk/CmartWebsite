/**
 * Generate recipes-manifest.json from all recipe files in public/recipes/
 * Run this script after adding new recipe JSON files
 * 
 * Usage: node scripts/generate-recipes-manifest.js
 */

const fs = require('fs')
const path = require('path')

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

    if (recipeFiles.length === 0) {
      console.warn('No recipe JSON files found in public/recipes/')
      // Create empty manifest
      const emptyManifest = { recipes: [] }
      fs.writeFileSync(manifestPath, JSON.stringify(emptyManifest, null, 2))
      console.log('Created empty recipes-manifest.json')
      return
    }

    // Create manifest with list of recipe files
    const manifest = {
      recipes: recipeFiles.sort()
    }

    // Write manifest file
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2))
    
    console.log(`✅ Generated recipes-manifest.json with ${recipeFiles.length} recipe(s):`)
    recipeFiles.forEach(file => console.log(`   - ${file}`))
    
  } catch (error) {
    console.error('Error generating manifest:', error)
    process.exit(1)
  }
}

generateManifest()

