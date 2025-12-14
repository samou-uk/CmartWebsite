/**
 * Script to update Next.js imports to React Router imports
 * Run: node scripts/update-imports.js
 */

const fs = require('fs')
const path = require('path')

const srcDir = path.join(process.cwd(), 'src')

function updateFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8')
  let changed = false

  // Remove 'use client'
  if (content.includes("'use client'")) {
    content = content.replace(/'use client'\s*\n\s*\n?/g, '')
    changed = true
  }

  // Replace next/link with react-router-dom
  if (content.includes("from 'next/link'") || content.includes('from "next/link"')) {
    content = content.replace(/from ['"]next\/link['"]/g, "from 'react-router-dom'")
    content = content.replace(/import Link from/g, 'import { Link } from')
    changed = true
  }

  // Replace next/image with regular img (we'll handle this manually for better control)
  // Replace @/ imports with relative or @/ imports (keep @/ for now, Vite will handle it)
  if (content.includes("from '@/")) {
    // Keep @/ imports - Vite alias handles this
    // Just ensure paths are correct
  }

  // Update useParams for React Router
  if (content.includes('useParams') && !content.includes('react-router-dom')) {
    // Will need manual update
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8')
    console.log(`Updated: ${filePath}`)
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir)
  files.forEach(file => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)
    if (stat.isDirectory()) {
      walkDir(filePath)
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      updateFile(filePath)
    }
  })
}

console.log('Updating imports in src directory...')
walkDir(srcDir)
console.log('Done!')

