# API Endpoints Documentation

Complete list of all API endpoints in the Cmart website.

## Base URL
All endpoints are relative to your domain. For example:
- Development: `http://localhost:3000/api/...`
- Production: `https://yourdomain.com/api/...`

---

## Authentication Endpoints

### 1. POST `/api/auth/login`
**Description**: Authenticate admin user and create a session.

**Authentication**: None (public endpoint, but rate-limited)

**Request Body**:
```json
{
  "password": "your-admin-password"
}
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Login successful"
}
```

**Response** (401 Unauthorized):
```json
{
  "error": "Invalid password",
  "remaining": 4
}
```

**Response** (429 Too Many Requests):
```json
{
  "error": "Too many login attempts",
  "message": "Please try again in 15 minutes",
  "resetAt": 1234567890123
}
```

**Rate Limiting**: 
- 5 attempts per 15 minutes per IP address
- Rate limit is cleared on successful login

**Cookies Set**:
- `admin_session`: httpOnly cookie, expires in 24 hours

---

### 2. POST `/api/auth/logout`
**Description**: Logout admin user and clear session.

**Authentication**: None (public endpoint)

**Request Body**: None

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Logged out"
}
```

**Cookies Cleared**:
- `admin_session`

---

### 3. GET `/api/auth/check`
**Description**: Check if the current user is authenticated.

**Authentication**: None (public endpoint)

**Request Body**: None

**Response** (200 OK):
The response includes a JSON hijacking protection prefix `)]}'` before the JSON body. Clients must strip this prefix before parsing.

**Raw Response**:
```
)]}'{"authenticated":true}
```
or
```
)]}'{"authenticated":false}
```

**Parsed JSON**:
```json
{
  "authenticated": true
}
```
or
```json
{
  "authenticated": false
}
```

**Security Headers**:
- `Content-Type: application/json; charset=utf-8`
- `X-Content-Type-Options: nosniff`
- `Cache-Control: no-store, no-cache, must-revalidate, private`
- `Pragma: no-cache`
- `Expires: 0`

**JSON Hijacking Protection**:
- Response includes `)]}'` prefix to prevent inclusion in `<script>` tags
- Client code must strip the prefix before parsing: `text.startsWith(")]}'") ? text.slice(4) : text`

**Cookies Read**:
- `admin_session`: Checks if valid session exists

---

## Recipe Management Endpoints

### 4. GET `/api/recipes`
**Description**: Get all recipes.

**Authentication**: Required (admin session cookie)

**Request Body**: None

**Response** (200 OK):
```json
{
  "recipes": [
    {
      "id": 1,
      "slug": "classic-pad-thai",
      "title": "Classic Pad Thai",
      "category": "thai",
      "difficulty": "medium",
      "time": "30 min",
      "description": "Authentic Thai stir-fried noodles...",
      "author": "Chef Name",
      "allergies": ["gluten", "eggs", "shellfish", "fish"],
      "image": "/recipes/1234567890-image.jpg",
      "ingredients": ["200g rice noodles", "..."],
      "instructions": ["Soak noodles in warm water...", "..."],
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-12-12T20:39:17.214Z"
    }
  ]
}
```

**Response** (401 Unauthorized):
```json
{
  "error": "Unauthorized"
}
```

---

### 5. POST `/api/recipes`
**Description**: Create a new recipe.

**Authentication**: Required (admin session cookie)

**Request Body**:
```json
{
  "title": "Recipe Title",
  "slug": "recipe-slug",
  "category": "thai",
  "difficulty": "easy",
  "time": "30 min",
  "description": "Recipe description",
  "author": "Chef Name",
  "allergies": ["gluten", "dairy"],
  "image": "/recipes/image.jpg",
  "ingredients": ["Ingredient 1", "Ingredient 2"],
  "instructions": ["Step 1", "Step 2"],
  "createdAt": "2024-01-01T00:00:00Z"
}
```

**Response** (200 OK):
```json
{
  "recipe": { /* full recipe object with generated ID */ },
  "message": "Recipe created successfully"
}
```

**Response** (401 Unauthorized):
```json
{
  "error": "Unauthorized"
}
```

**Response** (500 Internal Server Error):
```json
{
  "error": "Failed to create recipe",
  "message": "Error details"
}
```

**Note**: Automatically triggers revalidation of `/recipes` and `/recipes/[slug]` pages.

---

### 6. PUT `/api/recipes`
**Description**: Update an existing recipe.

**Authentication**: Required (admin session cookie)

**Request Body**:
```json
{
  "id": 1,
  "slug": "recipe-slug",
  "title": "Updated Recipe Title",
  "category": "thai",
  "difficulty": "medium",
  "time": "45 min",
  "description": "Updated description",
  "author": "Chef Name",
  "allergies": ["gluten"],
  "image": "/recipes/image.jpg",
  "ingredients": ["Updated ingredients"],
  "instructions": ["Updated instructions"],
  "createdAt": "2024-01-01T00:00:00Z"
}
```

**Response** (200 OK):
```json
{
  "recipe": { /* updated recipe object */ },
  "message": "Recipe updated successfully"
}
```

**Response** (401 Unauthorized):
```json
{
  "error": "Unauthorized"
}
```

**Response** (500 Internal Server Error):
```json
{
  "error": "Failed to update recipe",
  "message": "Error details"
}
```

**Note**: Automatically triggers revalidation of `/recipes` and `/recipes/[slug]` pages.

---

### 7. DELETE `/api/recipes?slug=recipe-slug`
**Description**: Delete a recipe by slug.

**Authentication**: Required (admin session cookie)

**Query Parameters**:
- `slug` (required): The slug of the recipe to delete

**Request Body**: None

**Response** (200 OK):
```json
{
  "message": "Recipe deleted successfully"
}
```

**Response** (400 Bad Request):
```json
{
  "error": "Slug is required"
}
```

**Response** (401 Unauthorized):
```json
{
  "error": "Unauthorized"
}
```

**Response** (500 Internal Server Error):
```json
{
  "error": "Failed to delete recipe",
  "message": "Error details"
}
```

**Note**: Automatically triggers revalidation of `/recipes` and `/recipes/[slug]` pages.

---

## File Upload Endpoint

### 8. POST `/api/upload`
**Description**: Upload an image file for recipes.

**Authentication**: Required (admin session cookie)

**Request**: `multipart/form-data`
- `file`: Image file (JPEG, PNG, WebP, or GIF)

**File Restrictions**:
- **Max size**: 5MB
- **Allowed types**: `image/jpeg`, `image/jpg`, `image/png`, `image/webp`, `image/gif`

**Response** (200 OK):
```json
{
  "success": true,
  "path": "/recipes/1703123456789-recipe-photo.jpg",
  "filename": "1703123456789-recipe-photo.jpg"
}
```

**Response** (400 Bad Request):
```json
{
  "error": "No file provided"
}
```
or
```json
{
  "error": "Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed."
}
```
or
```json
{
  "error": "File too large. Maximum size is 5MB."
}
```

**Response** (401 Unauthorized):
```json
{
  "error": "Unauthorized"
}
```

**Response** (500 Internal Server Error):
```json
{
  "error": "Failed to upload file",
  "message": "Error details"
}
```

**File Storage**:
- Files are saved to: `public/recipes/`
- Filenames are timestamped: `{timestamp}-{original-filename}`
- Files are accessible at: `/recipes/{filename}`

---

## Revalidation Endpoint

### 9. POST `/api/revalidate`
**Description**: Manually trigger Next.js on-demand revalidation (for cache clearing).

**Authentication**: Secret key (not session-based)

**Request Body**:
```json
{
  "secret": "your-revalidate-secret",
  "path": "/recipes" // optional
}
```
or
```json
{
  "secret": "your-revalidate-secret",
  "tag": "recipes" // optional
}
```

**Response** (200 OK):
```json
{
  "revalidated": true,
  "path": "/recipes",
  "now": 1234567890123
}
```

**Response** (401 Unauthorized):
```json
{
  "message": "Invalid secret"
}
```

**Response** (500 Internal Server Error):
```json
{
  "message": "Error revalidating",
  "error": "Error details"
}
```

**Note**: 
- Requires `REVALIDATE_SECRET` environment variable
- If no `path` or `tag` is provided, revalidates `/recipes` and `/recipes/[slug]` by default
- This endpoint is typically used by external services (e.g., webhooks)

---

## Summary Table

| Method | Endpoint | Auth Required | Purpose |
|--------|----------|---------------|---------|
| POST | `/api/auth/login` | No | Admin login |
| POST | `/api/auth/logout` | No | Admin logout |
| GET | `/api/auth/check` | No | Check auth status |
| GET | `/api/recipes` | Yes | Get all recipes |
| POST | `/api/recipes` | Yes | Create recipe |
| PUT | `/api/recipes` | Yes | Update recipe |
| DELETE | `/api/recipes?slug=...` | Yes | Delete recipe |
| POST | `/api/upload` | Yes | Upload image |
| POST | `/api/revalidate` | Secret | Revalidate cache |

---

## Authentication Method

All protected endpoints use **httpOnly cookies** for authentication:
- Cookie name: `admin_session`
- Set by: `/api/auth/login`
- Cleared by: `/api/auth/logout`
- Validated by: `validateSession()` function

**To authenticate**:
1. POST to `/api/auth/login` with password
2. Cookie is automatically set in response
3. Subsequent requests include cookie automatically (if `credentials: 'include'` is set)

---

## Error Codes

- **200**: Success
- **400**: Bad Request (missing/invalid parameters)
- **401**: Unauthorized (invalid credentials or no session)
- **429**: Too Many Requests (rate limit exceeded)
- **500**: Internal Server Error (server-side error)

---

## Rate Limiting

- **Login endpoint**: 5 attempts per 15 minutes per IP
- **Other endpoints**: No rate limiting (but require authentication)

---

## Notes

1. All recipe endpoints automatically trigger page revalidation after mutations
2. File uploads are stored in `public/recipes/` directory
3. Recipe data is stored in JSON files in `data/recipes/`
4. Session cookies are httpOnly, secure (in production), and sameSite: strict
5. All endpoints return JSON responses
6. `/api/auth/check` includes JSON hijacking protection via `)]}'` prefix - clients must strip this before parsing

