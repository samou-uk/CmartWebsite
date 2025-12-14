# Migrating to bcrypt Password Hashing

This guide helps you migrate from plain text password storage to bcrypt hashing.

## What Changed

- **Old**: Password stored as plain text in `ADMIN_SECRET` environment variable
- **New**: Password hash stored in `ADMIN_PASSWORD_HASH` environment variable

## Migration Steps

### 1. Generate Your Password Hash

Run the password hashing script:

```bash
node scripts/hash-password.js "your-current-password"
```

This will output a bcrypt hash that looks like:
```
$2a$12$abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUV
```

### 2. Update Your Environment Variables

In your `.env.local` file:

**Remove:**
```env
ADMIN_SECRET=your-plain-text-password
```

**Add:**
```env
ADMIN_PASSWORD_HASH=$2a$12$your-generated-hash-here
```

### 3. Restart Your Server

After updating the environment variable, restart your development server:

```bash
npm run dev
```

### 4. Test Login

Try logging into the admin interface with your **plain text password** (the system will hash it and compare it with the stored hash automatically).

## Backward Compatibility

The system will still check for `ADMIN_SECRET` if `ADMIN_PASSWORD_HASH` is not set, but this is only for backward compatibility during migration. You should migrate to `ADMIN_PASSWORD_HASH` as soon as possible.

## Security Benefits

✅ **Password hash cannot be reversed** - Even if environment variables are compromised, the original password cannot be recovered  
✅ **Timing-safe comparison** - Prevents timing attacks  
✅ **Industry standard** - bcrypt is a proven, secure password hashing algorithm  
✅ **Salt rounds** - Uses 12 salt rounds for optimal security/performance balance

## Troubleshooting

### "ADMIN_PASSWORD_HASH environment variable is not set"
- Make sure you've added `ADMIN_PASSWORD_HASH` to your `.env.local` file
- Restart your server after adding the variable
- Check that the hash starts with `$2a$12$`

### "Invalid password" after migration
- Make sure you're using the **plain text password** when logging in (not the hash)
- Verify the hash was copied correctly (no extra spaces or line breaks)
- Try generating a new hash and updating your `.env.local`

### Script not found
- Make sure you're running the command from the project root directory
- The script should be at `scripts/hash-password.js`


