import fs from 'fs'
import path from 'path'

/**
 * Generate sitemap.xml from recipes manifest and static routes
 * This script should be run before building to include all recipe pages
 */

const baseUrl = 'https://cmartshop.co.uk'
const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml')

// Static routes with their priorities and change frequencies
const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/recipes', priority: '0.9', changefreq: 'weekly' },
  { path: '/location', priority: '0.8', changefreq: 'monthly' },
  { path: '/contact', priority: '0.7', changefreq: 'monthly' },
  { path: '/privacy', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms', priority: '0.3', changefreq: 'yearly' },
  { path: '/games/recipe-builder', priority: '0.6', changefreq: 'monthly' },
]

// Get current date in YYYY-MM-DD format
const getCurrentDate = () => {
  return new Date().toISOString().split('T')[0]
}

// Load recipes from manifest
function loadRecipes() {
  try {
    const manifestPath = path.join(process.cwd(), 'public', 'recipes', 'recipes-manifest.json')
    if (!fs.existsSync(manifestPath)) {
      console.warn('recipes-manifest.json not found, skipping recipe pages')
      return []
    }
    
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
    return manifest.recipes || []
  } catch (error) {
    console.error('Error loading recipes manifest:', error)
    return []
  }
}

// Generate sitemap XML
function generateSitemap() {
  const recipes = loadRecipes()
  const currentDate = getCurrentDate()
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
`

  // Add static routes
  staticRoutes.forEach(route => {
    xml += `  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>
`
  })

  // Add recipe pages
  recipes.forEach(recipe => {
    xml += `  <url>
    <loc>${baseUrl}/recipes/${recipe.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
`
  })

  xml += `</urlset>
`

  // Write sitemap
  fs.writeFileSync(sitemapPath, xml, 'utf8')
  console.log(`✅ Generated sitemap.xml with ${staticRoutes.length} static routes and ${recipes.length} recipe pages`)
}

generateSitemap()

