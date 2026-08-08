import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    // Try to serve logo.png or favicon from public
    const logoPath = path.join(process.cwd(), 'public', 'logo.png')
    if (fs.existsSync(logoPath)) {
      const fileBuffer = fs.readFileSync(logoPath)
      return new NextResponse(fileBuffer, {
        headers: {
          'Content-Type': 'image/png',
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      })
    }
  } catch (e) {
    console.error('Error serving favicon:', e)
  }

  // Fallback 1x1 transparent PNG buffer to ensure no 404
  const transparentPng = Buffer.from(
    'iVBORw0KGgoAAAANSU5QMAAAABJRU5ErkJggg==',
    'base64'
  )
  return new NextResponse(transparentPng, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=86400',
    },
  })
}
