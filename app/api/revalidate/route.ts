import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

// This should be a secret key to prevent unauthorized revalidation
const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET || 'your-secret-key-change-this'

export async function POST(request: NextRequest) {
  try {
    const { secret, path, tag } = await request.json()

    // Verify the secret
    if (secret !== REVALIDATE_SECRET) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
    }

    // Revalidate specific path
    if (path) {
      revalidatePath(path)
      return NextResponse.json({ revalidated: true, path, now: Date.now() })
    }

    // Revalidate by tag
    if (tag) {
      revalidateTag(tag)
      return NextResponse.json({ revalidated: true, tag, now: Date.now() })
    }

    // Revalidate recipes pages
    revalidatePath('/recipes')
    revalidatePath('/recipes/[slug]', 'page')

    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (err) {
    return NextResponse.json(
      { message: 'Error revalidating', error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

