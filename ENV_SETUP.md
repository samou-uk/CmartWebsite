# Environment Variables Setup

Create a `.env.local` file in the root directory with the following variables:

```env
# Admin Authentication (SERVER-SIDE ONLY - not exposed to client)
# This should be a bcrypt hash of your password (see Password Setup below)
ADMIN_PASSWORD_HASH=$2a$12$your-bcrypt-hash-here

# Revalidation Secret
# Should match for the revalidation API to work
REVALIDATE_SECRET=your-revalidation-secret-change-this

# Base URL for revalidation
# Update this to your production domain when deploying
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Optional: Session Secret (auto-generated if not set)
# SESSION_SECRET=your-random-session-secret-here
```

## Password Setup

The admin password is now hashed using bcrypt for security. To set up your password:

1. **Generate a password hash:**
   ```bash
   node scripts/hash-password.js "your-secure-password-here"
   ```

   This will automatically create `.config/admin.json` with your password hash (hidden directory, not web-accessible).

2. **Alternative: Manual Setup**
   
   If you prefer to use environment variables, add this to your `.env.local` file (must be quoted because of `$` characters):
   ```env
   ADMIN_PASSWORD_HASH="$2a$12$generated-hash-here"
   ```
   
   **Important**: The hash must be in quotes because it contains `$` characters which have special meaning in `.env` files.

3. **Use the plain password** when logging into the admin interface (the system will hash and compare it automatically)

**Note**: The system will first try to read from `.config/admin.json` (hidden directory, not web-accessible), then fall back to the `ADMIN_PASSWORD_HASH` environment variable if the config file doesn't exist.

## Quick Setup

1. Create a file named `.env.local` in the root directory (same level as `package.json`)
2. Generate your password hash using the script above
3. Copy the content template above into `.env.local` and add your hashed password
4. Change the other secrets to something secure
5. Restart your dev server if it's running

## Notes

- `.env.local` is already in `.gitignore` so it won't be committed to git
- For production, set these as environment variables in your hosting platform (Vercel, etc.)
- The `NEXT_PUBLIC_` prefix makes variables available in the browser (needed for admin auth)
- **Never commit your password hash to version control**
- The password hash uses bcrypt with 12 salt rounds for security

