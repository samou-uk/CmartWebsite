import { getAllRecipes } from '@/lib/recipes'
import RecipesClient from './RecipesClient'

export const revalidate = 3600 // Revalidate every hour

export default async function Recipes() {
  const recipes = getAllRecipes()

  return <RecipesClient initialRecipes={recipes} />
}
