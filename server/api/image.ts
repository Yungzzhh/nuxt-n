import fs from 'fs'
import path from 'path'

export default defineEventHandler((event) => {
  try {
    const config = useRuntimeConfig()
    const baseUrl = config.public.baseUrl


    const rootDir = process.cwd()
    const tempDir = path.join(rootDir, 'blog', 'public', 'temp'); // 注意服务器上的配置文件路径

    const files = fs.readdirSync(tempDir)
    console.log('Files found:', files);

    const images = files.filter((file) =>
      /\.(jpg|jpeg|png|gif|svg)$/i.test(file)
    );
    return images.map((image) => {

      return {
        id: image.split('.')[0],
        image: `${baseUrl}/temp/${image}`,
        imageName: image
      }
    })
  } catch (error: any) {
    console.error('Error in image API:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Server error',
      message: error.message
    })
  }
})