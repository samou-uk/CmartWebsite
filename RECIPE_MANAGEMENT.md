# Recipe Management System

This site uses a file-based recipe management system with On-Demand Revalidation. No database required!

## How It Works

1. **Recipes are stored as JSON files** in `data/recipes/`
2. **On-Demand Revalidation** - Only the changed recipe page rebuilds, no full site rebuild needed
3. **Admin Interface** - Simple web interface to add/edit/delete recipes

## Adding a New Recipe

### Option 1: Via Admin Interface (Recommended)

1. Go to `/admin/recipes`
2. Enter the admin password (set in environment variables)
3. Click "Add New Recipe"
4. Fill in the form and save
5. The recipe is automatically published - no build needed!

### Option 2: Manual JSON File

1. Create a new JSON file in `data/recipes/` with format: `{id}-{slug}.json`
2. Use the next available ID (check existing files)
3. Follow this structure:

```json
{
  "id": 11,
  "slug": "my-new-recipe",
  "title": "My New Recipe",
  "category": "chinese",
  "difficulty": "easy",
  "time": "30 min",
  "description": "A delicious recipe description",
  "allergies": ["gluten", "soy"],
  "image": null,
  "ingredients": ["Ingredient 1", "Ingredient 2"],
  "instructions": ["Step 1", "Step 2"],
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

4. Trigger revalidation by calling the API endpoint (or it will auto-revalidate on next request)

## Environment Variables

Add these to your `.env.local`:

```env
# Admin authentication
ADMIN_SECRET=your-secure-admin-password-here
NEXT_PUBLIC_ADMIN_SECRET=your-secure-admin-password-here

# Revalidation secret (should match)
REVALIDATE_SECRET=your-revalidation-secret-here

# Base URL for revalidation (production URL)
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
```

## API Endpoints

### Revalidate
`POST /api/revalidate`
- Body: `{ "secret": "your-secret", "path": "/recipes/slug" }`
- Triggers revalidation for specific recipe page

### Recipes CRUD
- `GET /api/recipes` - Get all recipes
- `POST /api/recipes` - Create recipe (requires auth)
- `PUT /api/recipes` - Update recipe (requires auth)
- `DELETE /api/recipes?slug=recipe-slug` - Delete recipe (requires auth)

## Benefits

✅ **No Database** - Simple file-based storage  
✅ **Fast** - Static pages, CDN-friendly  
✅ **No Full Rebuilds** - Only changed pages rebuild  
✅ **Simple Admin** - Web interface, no CLI needed  
✅ **Version Control** - Recipes tracked in git  

## Security Notes

- Change the `ADMIN_SECRET` and `REVALIDATE_SECRET` in production
- Consider adding proper authentication (OAuth, etc.) for production
- The current system uses simple password-based auth - suitable for small teams

