import fs from 'fs'
import { createCanvas } from 'canvas'

// Create a simple icon with MiniDev branding
function generateIcon(size, isMaskable = false) {
  const canvas = createCanvas(size, size)
  const ctx = canvas.getContext('2d')
  
  // Background
  ctx.fillStyle = '#2563eb' // Blue background
  ctx.fillRect(0, 0, size, size)
  
  // Add padding for maskable icons
  const padding = isMaskable ? size * 0.1 : 0
  const innerSize = size - (padding * 2)
  const centerX = size / 2
  const centerY = size / 2
  
  // Main logo shape - simplified "M" for MiniDev
  ctx.fillStyle = '#ffffff'
  ctx.font = `bold ${innerSize * 0.6}px Arial`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('M', centerX, centerY)
  
  return canvas.toBuffer('image/png')
}

// Generate icons
try {
  // Standard icons
  fs.writeFileSync('public/pwa-192x192.png', generateIcon(192))
  fs.writeFileSync('public/pwa-512x512.png', generateIcon(512))
  
  // Maskable icons
  fs.writeFileSync('public/pwa-maskable-192x192.png', generateIcon(192, true))
  fs.writeFileSync('public/pwa-maskable-512x512.png', generateIcon(512, true))
  
  console.log('✅ PWA icons generated successfully!')
} catch (error) {
  console.error('❌ Error generating icons:', error.message)
  
  // Fallback: Create simple colored rectangles using SVG
  console.log('🔄 Creating fallback SVG-based icons...')
  
  const createSvgIcon = (size, color = '#2563eb') => `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" fill="${color}"/>
      <text x="50%" y="50%" text-anchor="middle" dy="0.35em" fill="white" font-family="Arial" font-size="${size * 0.6}" font-weight="bold">M</text>
    </svg>
  `
  
  // For now, create simple fallback files
  fs.writeFileSync('public/pwa-192x192.png', Buffer.from('')) // Empty file as placeholder
  fs.writeFileSync('public/pwa-512x512.png', Buffer.from(''))
  fs.writeFileSync('public/pwa-maskable-192x192.png', Buffer.from(''))
  fs.writeFileSync('public/pwa-maskable-512x512.png', Buffer.from(''))
  
  console.log('⚠️  Created placeholder icon files. Please replace with actual PNG icons.')
}