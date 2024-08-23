import path from 'path'
import fs from 'fs'
export default defineEventHandler(async (event) => {
  const rootDir = process.cwd()
  const tempDir = path.join(rootDir, 'public', 'temp')
  const publicDir = path.join(rootDir, 'public')

  const files = fs.readdirSync(tempDir)
  return {
    rootDir,
    tempDir,
    publicDir, files
  }

})