import fs from 'fs'
import path from 'path'

export default defineEventHandler((event) => {
  try {
    console.log(process.cwd());
    // const config: any = useRuntimeConfig()

    // const tempDir = path.join(config.public.tempDir, 'temp')
    // console.log(tempDir, 'tempDir');

    // const files = fs.readdirSync(tempDir)
    // console.log(files, 'files');

    // const images = files.filter(file => {
    //   const ext = path.extname(file).toLowerCase()
    //   return ['.jpg', '.jpeg', '.png', '.gif'].includes(ext)
    // })
    // return images
    const rootDir = process.cwd()
    const tempDir = path.join(rootDir, 'public', 'temp')
    console.log('Attempting to read from:', tempDir);

    if (!fs.existsSync(tempDir)) {
      console.error('Directory does not exist:', tempDir);
      return [];
    }

    const files = fs.readdirSync(tempDir)
    console.log('Files found:', files);

    const images = files.filter(file => {
      const ext = path.extname(file).toLowerCase()
      return ['.jpg', '.jpeg', '.png', '.gif'].includes(ext)
    })
    return images
  } catch (error: any) {
    console.error('Error in image API:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Server error',
      message: error.message
    })
  }
})