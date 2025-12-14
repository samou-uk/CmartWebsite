# cPanel Setup Guide for File Uploads

This guide helps you set up file uploads for recipes on cPanel hosting.

## Prerequisites

- Next.js application running on cPanel
- Node.js 18+ installed
- SSH access or cPanel File Manager access

## Setup Steps

### 1. Create the Upload Directory

**Important**: The `public/recipes/` directory should be created in your **Next.js project root**, NOT in `public_html/`.

**Directory Structure**:
```
your-project-root/
├── app/
├── public/
│   ├── recipes/          ← Create this folder here
│   ├── logo.png
│   └── ...
├── package.json
└── ...
```

**Steps**:
1. Log into cPanel
2. Open **File Manager**
3. Navigate to your **Next.js project root directory** (where `package.json` is located)
   - This might be in `public_html/`, `home/username/`, or a subdirectory
   - Look for the folder containing `app/`, `public/`, `package.json`
4. Go to the `public/` folder (should already exist)
5. Create a new folder named `recipes` inside `public/`
6. Set folder permissions to **755** (or **775** if needed):
   - Right-click the `recipes` folder
   - Select **Change Permissions**
   - Set to `755` (or `775` if your hosting requires group write access)

**Example Path**:
- If your project is at: `/home/username/my-nextjs-app/`
- Create: `/home/username/my-nextjs-app/public/recipes/`
- NOT: `/home/username/public_html/public/recipes/` ❌

### 2. Verify Directory Permissions

The `public/recipes/` directory should have:
- **Owner**: Read, Write, Execute (7)
- **Group**: Read, Execute (5)
- **Public**: Read, Execute (5)

This is typically `755` permissions.

### 3. Check Server Upload Limits

cPanel may have upload size limits. Check these settings:

#### PHP Settings (if applicable):
- In cPanel, go to **Select PHP Version** → **Options**
- Check `upload_max_filesize` (should be at least 5MB)
- Check `post_max_size` (should be at least 5MB)

#### Node.js/Next.js:
- The code limits uploads to 5MB
- If you need larger files, update the `maxSize` in `app/api/upload/route.ts`

### 4. Test the Upload

1. Log into your admin panel
2. Try uploading a small image (< 1MB) first
3. Check if the file appears in `public/recipes/`
4. Verify the image displays correctly on the recipe page

## Troubleshooting

### Error: "Failed to create upload directory"

**Solution**: Create the `public/recipes/` directory manually via cPanel File Manager with 755 permissions.

### Error: "Failed to save file"

**Possible causes**:
- Directory doesn't have write permissions
- Disk space is full
- File system is read-only

**Solutions**:
1. Check directory permissions (should be 755 or 775)
2. Verify you have disk space available
3. Contact your hosting provider if the file system is read-only

### Error: "File too large"

**Solutions**:
1. Reduce the image file size (compress the image)
2. Increase server upload limits (contact hosting provider)
3. Reduce the `maxSize` limit in the code if needed

### Images not displaying after upload

**Check**:
1. File exists in `public/recipes/` directory
2. File permissions are correct (644 for files)
3. Next.js is serving static files from `public/` correctly
4. Clear browser cache and try again

## Alternative: Use External Storage

If file uploads don't work on cPanel, you can:
1. Use the **Image URL** option instead
2. Upload images via cPanel File Manager to `public/recipes/`
3. Use the full path: `/recipes/your-image.jpg`

## Security Notes

- Uploaded files are stored in `public/recipes/` which is web-accessible
- Files are automatically renamed with timestamps to prevent conflicts
- Only authenticated admin users can upload files
- File types are restricted to images only (JPEG, PNG, WebP, GIF)
- Maximum file size is 5MB

## Need Help?

If you continue to have issues:
1. Check cPanel error logs
2. Check Next.js server logs
3. Verify Node.js has write permissions to the project directory
4. Contact your hosting provider for assistance with file permissions

