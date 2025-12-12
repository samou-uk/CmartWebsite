# SEO Implementation

This document outlines the SEO features implemented on the Cmart website.

## SEO Features Implemented

### 1. Meta Tags
- Comprehensive title tags with templates
- Meta descriptions for all pages
- Keywords meta tags
- Open Graph tags for social media sharing
- Twitter Card tags
- Canonical URLs

### 2. Structured Data (JSON-LD)
- LocalBusiness schema with:
  - Business name, address, and contact information
  - Opening hours
  - Geographic coordinates
  - Price range

### 3. Sitemap
- Dynamic sitemap generated at `/sitemap.xml`
- Includes all major pages with priorities and change frequencies

### 4. Robots.txt
- Located at `/robots.txt`
- Allows all search engines
- Points to sitemap location

### 5. Technical SEO
- Semantic HTML structure
- Proper heading hierarchy (H1, H2, etc.)
- Alt text for images
- Fast page load times
- Mobile-responsive design
- Clean URLs

## Next Steps

1. **Update Domain URLs**: Replace `https://cmart.co.uk` with your actual domain in:
   - `app/layout.tsx`
   - `app/sitemap.ts`
   - `public/robots.txt`

2. **Add Verification Codes**: Add search engine verification codes in `app/layout.tsx`:
   - Google Search Console
   - Bing Webmaster Tools
   - Yandex Webmaster

3. **Submit Sitemap**: Submit your sitemap to:
   - Google Search Console
   - Bing Webmaster Tools

4. **Add Phone Number**: Update the telephone field in structured data if available

5. **Add Social Media**: Add social media links to structured data if available

6. **Create Open Graph Images**: Create 1200x630px images for better social sharing

7. **Page-Specific Metadata**: Add unique metadata for each page (About, Recipes, Location, Contact)

8. **Local SEO**: 
   - Claim Google Business Profile
   - Add business to local directories
   - Encourage customer reviews

## Monitoring

Use these tools to monitor SEO performance:
- Google Search Console
- Google Analytics
- Bing Webmaster Tools
- PageSpeed Insights
- Lighthouse


