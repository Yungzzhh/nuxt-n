import path from 'path'

export default defineEventHandler(async (event) => {
  const rootDir = process.cwd()
  const tempDir = path.join(rootDir, 'public', 'temp')
  const publicDir = path.join(rootDir, 'public')
  return {
    rootDir,
    tempDir,
    publicDir
  }

})