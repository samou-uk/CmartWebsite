import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getAllRecipes, saveRecipe, getNextRecipeId, deleteRecipe } from '@/lib/recipes'
import { validateSession } from '@/lib/auth'
import { Recipe } from '@/lib/recipes'

function isAuthorized(request: NextRequest): boolean {
  const sessionCookie = request.cookies.get('admin_session')
  return validateSession(sessionCookie?.value)
}

export async function GET(request: NextRequest) {
  // Require authentication for GET requests too
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const recipes = getAllRecipes()
    return NextResponse.json({ recipes })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch recipes', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const data = await request.json()
    
    // For new recipes, ignore the id from client and generate a new one
    const nextId = getNextRecipeId()

    const recipe: Recipe = {
      id: nextId,
      slug: data.slug || data.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      title: data.title,
      category: data.category,
      difficulty: data.difficulty,
      time: data.time,
      description: data.description,
      allergies: data.allergies || [],
      image: data.image || null,
      ingredients: data.ingredients || [],
      instructions: data.instructions || [],
      createdAt: data.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const success = saveRecipe(recipe)
    if (!success) {
      return NextResponse.json({ error: 'Failed to save recipe' }, { status: 500 })
    }

    // Trigger revalidation directly (non-blocking)
    try {
      revalidatePath('/recipes')
      revalidatePath(`/recipes/${recipe.slug}`)
    } catch (revalidateError) {
      console.error('Revalidation error:', revalidateError)
      // Don't fail the request if revalidation fails
    }

    return NextResponse.json({ recipe, message: 'Recipe created successfully' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create recipe', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const data = await request.json()
    const recipe: Recipe = {
      ...data,
      updatedAt: new Date().toISOString(),
    }

    const success = saveRecipe(recipe)
    if (!success) {
      return NextResponse.json({ error: 'Failed to update recipe' }, { status: 500 })
    }

    // Trigger revalidation directly (non-blocking)
    try {
      revalidatePath('/recipes')
      revalidatePath(`/recipes/${recipe.slug}`)
    } catch (revalidateError) {
      console.error('Revalidation error:', revalidateError)
      // Don't fail the request if revalidation fails
    }

    return NextResponse.json({ recipe, message: 'Recipe updated successfully' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update recipe', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')

    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 })
    }

    const success = deleteRecipe(slug)
    if (!success) {
      return NextResponse.json({ error: 'Failed to delete recipe' }, { status: 500 })
    }

    // Trigger revalidation directly (non-blocking)
    try {
      revalidatePath('/recipes')
      revalidatePath(`/recipes/${slug}`)
    } catch (revalidateError) {
      console.error('Revalidation error:', revalidateError)
      // Don't fail the request if revalidation fails
    }

    return NextResponse.json({ message: 'Recipe deleted successfully' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete recipe', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

