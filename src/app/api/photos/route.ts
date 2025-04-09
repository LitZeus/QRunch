import fs from 'fs'
import { NextResponse } from 'next/server'
import path from 'path'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const directory = searchParams.get('directory')

  if (!directory) {
    return NextResponse.json({ error: 'Directory parameter is required' }, { status: 400 })
  }

  try {
    const publicDir = path.join(process.cwd(), 'public')
    const dirPath = path.join(publicDir, directory)
    
    // Check if directory exists
    if (!fs.existsSync(dirPath)) {
      return NextResponse.json({ photos: [] })
    }

    // Read directory and filter for image files
    const files = fs.readdirSync(dirPath)
    const photos = files
      .filter(file => {
        const ext = path.extname(file).toLowerCase()
        return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext)
      })
      .map(file => `/${directory}/${file}`)

    return NextResponse.json({ photos })
  } catch (error) {
    console.error('Error reading directory:', error)
    return NextResponse.json({ error: 'Failed to read directory' }, { status: 500 })
  }
} 