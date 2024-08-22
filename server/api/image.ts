import fs from 'fs'
import path from 'path'

export default defineEventHandler((event) => {
  console.log(process.cwd());

  const tempDir = path.join(process.cwd(), 'public', 'temp')
  console.log(tempDir, 'tempDir');

  const files = fs.readdirSync(tempDir)
  console.log(files, 'files');

  const images = files.filter(file => {
    const ext = path.extname(file).toLowerCase()
    return ['.jpg', '.jpeg', '.png', '.gif'].includes(ext)
  })

  return images
})