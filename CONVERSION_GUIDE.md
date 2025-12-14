# Next.js to React SPA Conversion Guide

## What's Been Done

✅ Vite configuration created
✅ React Router setup in App.tsx
✅ Home.tsx converted
✅ Navigation.tsx updated to use React Router
✅ Core structure created in `src/` directory

## What Needs to Be Done

### For Each Page File in `src/pages/`:

1. **Remove `'use client'` directive** (not needed in React)

2. **Update imports:**
   ```tsx
   // OLD
   import Link from 'next/link'
   import Image from 'next/image'
   import { useLanguage } from '@/contexts/LanguageContext'
   
   // NEW
   import { Link } from 'react-router-dom'
   import { useLanguage } from '../contexts/LanguageContext'
   ```

3. **Replace `next/image` with regular `img` tags:**
   ```tsx
   // OLD
   <Image
     src="/image.png"
     alt="Description"
     width={600}
     height={400}
     className="..."
   />
   
   // NEW
   <img
     src="/image.png"
     alt="Description"
     className="..."
   />
   
   // For fill images:
   // OLD: <Image src="..." fill className="..." />
   // NEW: <img src="..." className="absolute inset-0 w-full h-full object-cover ..." />
   ```

4. **Replace `Link` href with `to`:**
   ```tsx
   // OLD
   <Link href="/recipes">Recipes</Link>
   
   // NEW
   <Link to="/recipes">Recipes</Link>
   ```

5. **Update `useParams` for React Router:**
   ```tsx
   // OLD (Next.js)
   export default function Page({ params }: { params: { slug: string } }) {
     const slug = params.slug
   }
   
   // NEW (React Router)
   import { useParams } from 'react-router-dom'
   
   export default function Page() {
     const { slug } = useParams<{ slug: string }>()
   }
   ```

6. **Update `notFound()` redirect:**
   ```tsx
   // OLD
   import { notFound } from 'next/navigation'
   if (!recipe) notFound()
   
   // NEW
   import { useNavigate } from 'react-router-dom'
   const navigate = useNavigate()
   if (!recipe) navigate('/not-found')
   ```

### Files That Need Updates:

- [ ] `src/pages/About.tsx`
- [ ] `src/pages/Recipes.tsx`
- [ ] `src/pages/RecipesClient.tsx`
- [ ] `src/pages/RecipeDetail.tsx`
- [ ] `src/pages/Location.tsx`
- [ ] `src/pages/Contact.tsx`
- [ ] `src/pages/Privacy.tsx`
- [ ] `src/pages/Terms.tsx`
- [ ] `src/pages/RecipeBuilder.tsx`
- [ ] `src/pages/NotFound.tsx`
- [ ] All files in `src/components/`

### Component Updates Needed:

1. **Footer.tsx** - Update Link imports
2. **Logo.tsx** - Check for any Next.js dependencies
3. **All other components** - Update imports

## After Conversion

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run dev server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

## Notes

- All images should be in `public/` folder (they already are)
- Vite serves `public/` at root, so `/image.png` works
- React Router handles client-side routing
- No server-side rendering - pure SPA

