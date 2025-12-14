# Admin Access Information

## Admin URL

Your admin interface is located at:

**`/admin-vJWIU8yIa8OU4IEVVrOE/recipes`**

Or the dashboard at:

**`/admin-vJWIU8yIa8OU4IEVVrOE`**

## Security

- The admin path is **not** linked anywhere on the public site
- It's blocked from search engines in `robots.txt`
- Access requires a password (set in `.env.local`)
- Keep this path secret!

## Changing the Admin Path

To change the admin path:

1. Generate a new random path:
   ```bash
   node -e "const chars='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'; console.log('admin-'+Array.from({length:20},()=>chars[Math.floor(Math.random()*chars.length)]).join(''))"
   ```

2. Update `lib/admin-path.ts` with the new path

3. Rename the directory `app/admin-vJWIU8yIa8OU4IEVVrOE` to the new path

4. Update `public/robots.txt` to disallow the new path

## Image Support

Recipes now support images! In the admin form:

- Enter a full URL: `https://example.com/image.jpg`
- Or a path relative to `/public`: `/recipe-image.jpg`

Images will display:
- On recipe cards in the list
- At the top of recipe detail pages
- In the admin interface


