# Fortune Foods — Design Language

Paste this into **FortuneVantage** (or any Fortune Foods product) so UI stays aligned with **Fortune Commerce**.

Source of truth: Fortune Commerce (`tailwind.config.js`, `src/index.css`, Layout / AdminLayout / ProductCard).

---

## Brand

| Token | Value | Use |
|-------|-------|-----|
| Brand green | `#379f3c` | Primary actions, header/sidebar, focus rings, links |
| Forest / theme | `#14532d` | `theme-color`, deep accents (rare) |
| Hover green | `#2d8a31` | Primary button hover (slightly darker) |
| White | `#ffffff` | Page / card surfaces |
| Body text | `#1f2937` (`gray-800`) | Default copy |
| Muted text | `#6b7280` (`gray-500`) | Secondary labels, meta |
| Borders | `#e5e7eb` (`gray-200`) | Dividers, card borders |

**Do not** use purple gradients, warm cream “AI” themes, terracotta + serif, or heavy glow effects.

---

## Typography

- **Font:** [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) (weights 200–800), fallback `system-ui, sans-serif`
- **Root / body:** `html` and body at **15px** (`1rem`), line-height ~1.6, `antialiased` — keep this stable; do **not** shrink the root font by viewport width
- **UI headings (tools / admin):** semibold (600), tight line-height (~1.2), dark gray — not oversized display serifs
- **UI labels:** medium/semibold; uppercase section labels use `text-[10px–12px]`, `tracking-wider`, muted green/gray

```html
<link rel="stylesheet" href="/static/fonts/plus-jakarta-sans.css" />
```

```css
font-family: "Plus Jakarta Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

---

## Marketing site — titles & page voice

Source: `fortune-foods-site` (this repo). Use these rules for public marketing pages; Commerce/Vantage tool UI stays denser (see above).

### Display titles

- **Colour:** forest `#14532d` on white pages; white on forest panels / hero overlays
- **Weight:** bold → extrabold (`700–800`), not light display serifs
- **Shape:** short, punchy, often ending in a period (`Login.`, `Products`, `Cook with` + cycle)
- **Scale:** fluid clamp with a **modest cap** — prefer roughly:

```text
clamp(2.35rem, 5.5vw, 3.5rem)   /* page H1 */
clamp(2.5rem, 5vw, 3.75rem)     /* teaser / big marketing H1 (.fs-teaser-title) */
```

Avoid older maxes like `5rem` / aggressive `7–8vw` — they feel oversized on 1080p and scaled Windows displays.

- **Leading / tracking:** `leading-[0.92–1.05]`, `tracking-tight` (`-0.03em` on teaser titles)
- **Supporting line:** one short sentence under the title, `text-forest/70`, `text-base` → `sm:text-lg` — no second headline competing with the brand

### Cycling phrases (`FloatWordCycle`)

Use sparingly for energy (hero typewriter, Recipes, Fortune Select / Products teasers). **Do not** put a word-cycle on every page (e.g. Login stays static).

- Prefer **atmosphere / place / kitchen energy**, not bland “our range / our noodles / our sauces”
- Good: `Sichuan heat.` · `weeknight woks.` · `wholesale staples.` · city names · private-label traits
- Bad: repetitive “our X” loops, product SKU laundry lists, stereotypical “street food” tropes
- When the line should read as **two lines**, put the stem and the cycle on separate blocks (`block`), so every phrase lands on line two — don’t rely on accidental wrap

### Page surface

- **Default:** white page + soft green radial glow (not flat gray, not purple gradients, not cream-serif)
- **Accent panels:** forest `#14532d` blocks for featured media / primary destinations (e.g. recipe stage, login portal panel)
- **Type on white:** forest; **actions:** brand green `#379f3c`

### CTAs & chrome

- Few CTAs; chill — solid green `btn-primary` for the main action
- Skip decorative arrow flourishes unless the existing pattern already uses them
- **Cards:** only when they wrap a real interaction; no card-for-card’s-sake in heroes
- **Mobile nav:** light frosted glass sheet (white / translucent), forest links, soft green active — not a solid brand-green chrome panel
- Nav utility controls (search / language / login) share one height (`h-9`)

### Breakpoints (this site)

- `lg` starts at **1100px** (mobile nav below that)
- Don’t change global rem size at mid widths; fix density with title clamps and spacing instead

---

## CSS variables (copy into `:root`)

```css
:root {
  --fc-primary: #379f3c;
  --fc-primary-hover: #2d8a31;
  --fc-primary-50: #f0fdf4;
  --fc-primary-100: #dcfce7;
  --fc-primary-200: #bbf7d0;
  --fc-primary-500: #22c55e;
  --fc-primary-800: #379f3c;
  --fc-primary-900: #379f3c;
  --fc-forest: #14532d;

  --fc-gray-50: #f9fafb;
  --fc-gray-100: #f3f4f6;
  --fc-gray-200: #e5e7eb;
  --fc-gray-300: #d1d5db;
  --fc-gray-400: #9ca3af;
  --fc-gray-500: #6b7280;
  --fc-gray-600: #4b5563;
  --fc-gray-700: #374151;
  --fc-gray-800: #1f2937;
  --fc-gray-900: #111827;

  --fc-amber-50: #fffbeb;
  --fc-amber-100: #fef3c7;
  --fc-amber-600: #d97706;
  --fc-amber-800: #92400e;
  --fc-red-50: #fef2f2;
  --fc-red-600: #dc2626;
  --fc-green-600: #16a34a;

  --fc-shadow-soft: 0 1px 3px rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.06);
  --fc-shadow-card: 0 1px 3px rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.08);
  --fc-shadow-elevated: 0 4px 6px -1px rgb(0 0 0 / 0.07), 0 2px 4px -2px rgb(0 0 0 / 0.07);

  --fc-radius-xl: 1rem;      /* 16px — Tailwind xl in FC is 1rem */
  --fc-radius-2xl: 1.25rem;  /* 20px */
  --fc-radius-3xl: 1.5rem;   /* 24px */
  --fc-radius-4xl: 2rem;     /* 32px */

  --fc-touch-min: 44px;
}
```

> **Note:** In Fortune Commerce Tailwind, `primary-600` through `primary-950` are all `#379f3c` (flat brand green). Lighter greens (`50`–`500`) are for soft backgrounds / badges only.

---

## Radius & shadow

| Token | Value | Typical use |
|-------|-------|-------------|
| `rounded-xl` | 1rem | Inputs, small buttons, filter chips |
| `rounded-2xl` | 1.25rem | Panels, strips, tables, alerts |
| `rounded-3xl` | 1.5rem | Product cards, dropdowns, mobile sheets |
| `rounded-full` | pill | Icon buttons, qty steppers, badges |
| `shadow-soft` | soft | Light chrome (filters, qty bars) |
| `shadow-card` | card | Product cards, admin tables |
| `shadow-elevated` | elevated | Dropdowns, floating menus |

Prefer **one light shadow**, not stacked multi-layer glows.

---

## Surfaces & layout

- **Storefront page:** white / very light gray; content on white cards
- **Admin page body:** light gray (`gray-50` / `gray-100`); content in white `rounded-2xl` cards with `border-gray-200` + `shadow-card`
- **Primary chrome:** solid `#379f3c` — green header strip, green admin sidebar, green footer
- **Page strip (context bar):** green rounded-2xl bar with white title + muted green meta (see Commerce product page strip / Vantage labelling strip)

Avoid flat single-colour empty pages with no structure; prefer white cards on a soft gray canvas for tools.

---

## Components

### Primary button
- Background: `#379f3c`
- Text: white, medium weight
- Hover: slightly darker / `brightness-95`
- Radius: `rounded-xl` or `rounded-2xl` (full-width CTAs often `rounded-2xl`)
- Min height for touch: **44px** where tappable

### Secondary button
- White / light gray surface, `border-gray-300`, dark gray text
- Hover: `bg-gray-50`

### Destructive
- Red text / light red border / `bg-red-50` for confirm panels — not solid red for every action

### Inputs
- `rounded-xl`, `border-gray-300`, white fill
- Focus: `border` + `ring-1` in primary green (`#379f3c`)

### Cards
- White, `rounded-2xl` or `rounded-3xl`, `shadow-card`, optional `border-gray-200`
- Product tiles: `rounded-3xl`, compact padding, soft shadow — not heavy bordered “dashboard widgets”

### Tables (admin)
- White container `rounded-2xl border border-gray-200 shadow-card`
- Sticky header `bg-gray-50`, uppercase micro labels in `gray-500`
- Row hover: `bg-gray-50/80`

### Filter / segment control
- `inline-flex` white pill group: `rounded-xl border border-gray-200 p-1 shadow-soft`
- Active segment: `bg-primary-900 text-white rounded-lg`
- Inactive: `text-gray-600 hover:bg-gray-50`

### Badges
- Small, `rounded` (not oversized pills): e.g. offer = red, new = green `#16a34a`, top mover = amber
- Prefer compact `text-[10px] font-medium`

### Icon buttons
- Circular or `rounded-2xl`, min 44×44 on mobile
- Quiet: gray-100 / gray-700
- Brand: primary fill + white icon

### Alerts
- Error: `border-red-200 bg-red-50 text-red-800`
- Success: `border-green-200 bg-green-50 text-green-800`
- Warning: amber tint (`amber-50` / `amber-800`)
- Info / process: light primary (`primary-50` / primary text)

---

## Navigation patterns

### Storefront header
- White top bar + brand logo
- Optional **green search / mobile sheet** (`bg-primary-900`, rounded bottom)
- Footer: solid primary green, light text

### Admin sidebar
- Full-height **primary green** panel
- Active item: solid darker green + white text
- Inactive: light green / white-ish muted text, hover soft green
- Section labels: tiny uppercase, low-opacity green

---

## Interaction & motion

- Transitions: short (`~150–200ms`), ease — colour / opacity / transform only
- Respect `prefers-reduced-motion`
- Touch: `touch-action: manipulation`; tap highlight subtle dark, not blue flash
- Prefer **2–3 intentional motions** max on a page (e.g. slide-over, soft fade) — no decorative noise

---

## Density & copy

- Admin: compact (`text-sm` / `text-[13px]` in nav)
- Customer: readable, roomy product cards, clear price hierarchy (primary green for price)
- One job per section: one heading + short supporting line
- Avoid pill clusters, stat strips, and card-on-card nesting unless needed for interaction

---

## Tailwind mapping (Fortune Commerce)

```js
// tailwind.config.js (excerpt)
colors: {
  primary: {
    DEFAULT: '#379f3c',
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#379f3c',
    700: '#379f3c',
    800: '#379f3c',
    900: '#379f3c',
    950: '#379f3c',
  },
},
fontFamily: {
  sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
},
boxShadow: {
  soft: '0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.06)',
  card: '0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.08)',
  elevated: '0 4px 6px -1px rgb(0 0 0 / 0.07), 0 2px 4px -2px rgb(0 0 0 / 0.07)',
},
borderRadius: {
  xl: '1rem',
  '2xl': '1.25rem',
  '3xl': '1.5rem',
  '4xl': '2rem',
},
```

---

## Checklist for FortuneVantage screens

- [ ] Plus Jakarta Sans loaded
- [ ] Primary actions use `#379f3c` (not Bootstrap default blue)
- [ ] Cards/panels use soft radius (16–24px) + light shadow
- [ ] Admin chrome / key strips use brand green
- [ ] Focus rings / active filters use brand green
- [ ] Touch targets ≥ 44px where relevant
- [ ] No purple / cream-serif / terracotta “generic AI” look

## Checklist for marketing pages (fortune-foods-site)

- [ ] Page H1 is forest, bold, clamp-capped (not 5rem display)
- [ ] One supporting sentence under the title
- [ ] Word-cycle only where it earns its keep; atmospheric copy, not “our X”
- [ ] White + soft green glow (or intentional forest panel) — no solid green chrome sheets
- [ ] Few CTAs; primary green for the main action
- [ ] Root font stays 15px across breakpoints

---

## File placement (FortuneVantage)

Suggested path after paste:

`FortuneVantage/DESIGN_LANGUAGE.md`

Already wired in Vantage:

- `static/style.css` — `:root` tokens referencing this doc  
- `static/fc-labelling.css` — labelling UX aligned to these tokens  
- `static/fc-login.css` — login aligned to Commerce  

Keep this file updated when Commerce tokens change.
