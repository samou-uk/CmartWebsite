#!/usr/bin/env python3
"""
Auto-generate recipes-manifest.json
This script scans the recipes directory and generates the manifest file.
Designed to be run as a daily cron job.

Usage:
    python3 scripts/generate-recipes-manifest.py
    
Or set up as cron job:
    0 2 * * * /usr/bin/python3 /path/to/scripts/generate-recipes-manifest.py
"""

import json
import os
from pathlib import Path
from datetime import datetime

# Get the script directory
script_dir = Path(__file__).parent.absolute()

# Try to find public_html directory (cPanel structure)
# Script is outside public_html, recipes are in public_html/recipes/
project_root = script_dir.parent
public_html = project_root / 'public_html'

# If public_html doesn't exist, try 'public' (for local development)
if not public_html.exists():
    public_html = project_root / 'public'

recipes_dir = public_html / 'recipes'
manifest_path = recipes_dir / 'recipes-manifest.json'

# Log file goes outside public_html (in project root or scripts directory)
log_path = project_root / 'app.log'

def log(message):
    """Write message to app.log with timestamp."""
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    log_message = f"[{timestamp}] {message}\n"
    try:
        with open(log_path, 'a', encoding='utf-8') as f:
            f.write(log_message)
    except Exception as e:
        # Fallback to stderr if logging fails
        import sys
        sys.stderr.write(f"Failed to write to log: {e}\n")

def generate_manifest():
    """Generate recipes-manifest.json from all recipe files."""
    
    if not recipes_dir.exists():
        log(f"Error: Recipes directory not found: {recipes_dir}")
        return False
    
    recipe_entries = []
    
    # Get all JSON files in recipes directory
    for file_path in recipes_dir.glob('*.json'):
        file_name = file_path.name
        
        # Skip manifest and template files
        if file_name in ['recipes-manifest.json', 'recipe-template.json']:
            continue
        
        try:
            # Read and parse the recipe file
            with open(file_path, 'r', encoding='utf-8') as f:
                recipe = json.load(f)
            
            # Validate required fields
            if 'id' in recipe and 'slug' in recipe:
                recipe_entries.append({
                    'id': int(recipe['id']),
                    'slug': recipe['slug'],
                    'filename': file_name
                })
            else:
                log(f"Warning: Skipping invalid recipe file (missing id or slug): {file_name}")
                
        except json.JSONDecodeError as e:
            log(f"Error: Failed to parse {file_name}: {e}")
        except Exception as e:
            log(f"Error: Failed to process {file_name}: {e}")
    
    # Sort recipes by ID
    recipe_entries.sort(key=lambda x: x['id'])
    
    # Create manifest
    manifest = {
        'recipes': recipe_entries
    }
    
    # Write manifest file
    try:
        with open(manifest_path, 'w', encoding='utf-8') as f:
            json.dump(manifest, f, indent=2, ensure_ascii=False)
        
        log(f"Generated recipes-manifest.json with {len(recipe_entries)} recipe(s)")
        if recipe_entries:
            for entry in recipe_entries:
                log(f"  - {entry['filename']} (ID: {entry['id']}, Slug: {entry['slug']})")
        return True
        
    except Exception as e:
        log(f"Error: Failed to write manifest file: {e}")
        return False

if __name__ == '__main__':
    success = generate_manifest()
    exit(0 if success else 1)

