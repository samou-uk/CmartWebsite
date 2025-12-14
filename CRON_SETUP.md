# Cron Job Setup for Automatic Recipe Manifest Generation

This guide explains how to set up a daily cron job to automatically update the recipes manifest when you upload new recipe JSON files via cPanel.

## Option 1: Python Script (Recommended)

### Step 1: Upload the Python Script

1. Upload `scripts/generate-recipes-manifest.py` to your server
2. Make it executable (if needed):
   ```bash
   chmod +x scripts/generate-recipes-manifest.py
   ```

### Step 2: Find Python Path

In cPanel, go to **Cron Jobs** and check what Python version is available:
- Usually: `/usr/bin/python3` or `/usr/local/bin/python3`
- You can test by running: `which python3` in SSH

### Step 3: Set Up Cron Job in cPanel

1. Log into cPanel
2. Go to **Advanced** → **Cron Jobs**
3. Add a new cron job with these settings:
   - **Minute**: `0`
   - **Hour**: `2` (runs at 2 AM daily)
   - **Day**: `*` (every day)
   - **Month**: `*` (every month)
   - **Weekday**: `*` (every day of week)
   - **Command**: 
     ```bash
     /usr/bin/python3 /home/username/public_html/scripts/generate-recipes-manifest.py
     ```
     *(Replace `username` with your cPanel username and adjust the path if needed)*

### Step 4: Test the Script

You can test it manually first:
```bash
python3 /path/to/scripts/generate-recipes-manifest.py
```

Or via cPanel Cron Jobs, use the "Run Now" option if available.

## Option 2: PHP Script (Alternative)

If Python isn't available, you can use the PHP script instead:

1. Upload `public/recipes/generate-manifest.php` to your server
2. Set up a cron job that calls it via curl:
   ```bash
   curl -s https://cmartshop.co.uk/recipes/generate-manifest.php > /dev/null
   ```

### PHP Cron Job Setup

In cPanel Cron Jobs:
- **Command**: 
  ```bash
  curl -s https://cmartshop.co.uk/recipes/generate-manifest.php > /dev/null
  ```
- **Schedule**: Same as above (daily at 2 AM)

## Recommended Schedule

- **Daily at 2 AM**: Good for regular updates
- **Every 6 hours**: If you upload recipes frequently
- **Every hour**: For very active recipe management

## Manual Trigger

You can also manually trigger the manifest generation:

### Python:
```bash
python3 scripts/generate-recipes-manifest.py
```

### PHP:
Visit: `https://cmartshop.co.uk/recipes/generate-manifest.php`

## Troubleshooting

### Python Not Found
- Check Python path: `which python3`
- Try: `python3 --version`
- Some servers use: `/usr/local/bin/python3`

### Permission Issues
- Ensure the script has read access to `public/recipes/`
- Ensure the script has write access to create `recipes-manifest.json`
- Check file permissions: `chmod 644 public/recipes/recipes-manifest.json`

### Path Issues
- Use absolute paths in cron jobs
- The script automatically finds the project root
- Make sure the path to the script is correct

### Testing
- Run the script manually first to check for errors
- Check cron job logs in cPanel
- Verify the manifest file is updated after the cron runs

## Notes

- The cron job runs on the server, so it will work even if you're not logged in
- The manifest is updated automatically, so new recipes will appear on the site
- No need to rebuild the site - the manifest is read dynamically
- The script is safe to run multiple times - it regenerates the manifest from scratch each time


