# Recipe Upload Guide

## Simple JSON-Based Recipe System

This site now uses a simple, file-based recipe system. Just upload JSON files and they'll appear automatically!

## How It Works

1. **Create a recipe JSON file** using the template
2. **Upload it** to `public/recipes/` folder
3. **Generate the manifest** to update the recipes list
4. **Refresh the site** - your recipe appears!

## Step-by-Step Instructions

### 1. Get the Template

Copy `public/recipes/recipe-template.json` to create a new recipe file.

### 2. Fill in Your Recipe

Edit the JSON file with your recipe information:

```json
{
  "id": 1,
  "slug": "my-recipe-name",
  "title": "My Recipe Title",
  "category": "chinese",
  "difficulty": "easy",
  "time": "30 min",
  "description": "A delicious recipe...",
  "author": "Chef Name",
  "allergies": ["gluten"],
  "image": "/recipes/my-image.jpg",
  "ingredients": ["Ingredient 1", "Ingredient 2"],
  "instructions": ["Step 1", "Step 2"],
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### 3. Name Your File

Use format: `{id}-{slug}.json`

Example: `1-classic-pad-thai.json`

### 4. Upload Files

Upload your JSON file (and any images) to `public/recipes/` folder via:
- FTP
- cPanel File Manager
- Git (if using version control)

### 5. Generate Manifest

After uploading, run:

```bash
npm run generate-manifest
```

This updates `public/recipes/recipes-manifest.json` with all your recipe files.

### 6. Done!

Refresh your website and the recipe will appear automatically.

## File Structure

```
public/recipes/
├── recipe-template.json      # Template for new recipes
├── recipes-manifest.json      # List of all recipe files (auto-generated)
├── README.md                  # Detailed documentation
├── 1-classic-pad-thai.json   # Recipe files
├── 2-beef-bulgogi.json
└── recipe-images/             # Recipe images (optional)
    ├── pad-thai.jpg
    └── bulgogi.jpg
```

## Quick Reference

### Categories
- `chinese`
- `japanese`
- `korean`
- `thai`
- `vietnamese`
- `indian`

### Difficulties
- `easy`
- `medium`
- `hard`

### Allergies
- `gluten`
- `dairy`
- `nuts`
- `shellfish`
- `eggs`
- `soy`
- `fish`

## Tips

- **Unique IDs**: Make sure each recipe has a unique `id` number
- **Slug format**: Use lowercase, hyphens only (e.g., `my-recipe-name`)
- **Images**: Upload images to `public/recipes/` and reference as `/recipes/filename.jpg`
- **Dates**: Use ISO 8601 format: `2024-01-01T00:00:00.000Z`
- **Manifest**: Always run `npm run generate-manifest` after adding/removing recipes

## Troubleshooting

**Recipe not showing?**
- Check that the file is in `public/recipes/` folder
- Run `npm run generate-manifest` to update the manifest
- Check browser console for errors
- Verify JSON is valid (use a JSON validator)

**Images not loading?**
- Make sure image path starts with `/recipes/`
- Check that image file exists in `public/recipes/` folder
- Verify file permissions

**Manifest not updating?**
- Make sure you're running the command from project root
- Check that `public/recipes/` folder exists
- Verify you have write permissions

