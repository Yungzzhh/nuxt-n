import fs from 'fs'
import path from 'path'

export default defineEventHandler((event) => {
  const tempDir = path.join(process.cwd(), 'public', 'temp')
  const files = fs.readdirSync(tempDir)

  const images = files.filter(file => {
    const ext = path.extname(file).toLowerCase()
    return ['.jpg', '.jpeg', '.png', '.gif'].includes(ext)
  })

  return images
})