# Cmart Website

A modern, premium website for Cmart - an oriental grocery store in Earley, Reading.

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. **Add your images:**
   - Place your logo image file in the `public/` folder and name it `logo.png`
   - Place your store hero image in the `public/` folder and name it `hero-store.png`
   - The logo will be used in the navigation and footer
   - The hero image will be used as the background for the homepage hero section

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the website.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
cmart-site/
├── app/
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Homepage
├── components/
│   ├── Navigation.tsx   # Navigation bar
│   ├── Footer.tsx       # Footer component
│   ├── Hero.tsx         # Hero section
│   ├── About.tsx        # About section
│   ├── Products.tsx     # Products section
│   ├── Location.tsx     # Location section
│   └── Contact.tsx      # Contact section
└── public/              # Static assets
    ├── logo.png         # Your logo image file
    └── hero-store.png   # Store illustration for hero section
```

## Technologies Used

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **React** - UI library

## Customization

The color scheme can be customized in `tailwind.config.js`. The primary colors are:
- Primary: `#1B5E20` (Dark Green)
- Primary Dark: `#0D4A14`
- Primary Light: `#2E7D32`
- Accent: `#FFFFFF` (White)

## License

All rights reserved © Cmart

