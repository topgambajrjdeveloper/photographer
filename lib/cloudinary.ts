import { v2 as cloudinary } from "cloudinary"

// Configuración de Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

export interface CloudinaryUploadResult {
  public_id: string
  secure_url: string
  format: string
  width: number
  height: number
  bytes: number
  resource_type: string
}

/**
 * Sube una imagen a Cloudinary
 * @param file Archivo a subir
 * @param folder Carpeta donde guardar la imagen (opcional)
 * @returns Resultado de la subida
 */
export async function uploadImage(
  file: File | Buffer | string,
  folder = "photography",
): Promise<CloudinaryUploadResult> {
  try {
    if (typeof file === "string" && file.startsWith("data:")) {
      // Es un data URL
      const result = await cloudinary.uploader.upload(file, {
        folder,
        resource_type: "image",
      })
      return result as CloudinaryUploadResult
    } else if (typeof file === "string") {
      // Es una URL o path
      const result = await cloudinary.uploader.upload(file, {
        folder,
        resource_type: "image",
      })
      return result as CloudinaryUploadResult
    } else if (Buffer.isBuffer(file)) {
      // Es un buffer
      const result = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder,
              resource_type: "image",
            },
            (error, result) => {
              if (error) return reject(error)
              resolve(result as CloudinaryUploadResult)
            },
          )
          .end(file)
      })
      return result
    } else {
      // Es un File, necesitamos convertirlo a buffer o data URL
      const buffer = await file.arrayBuffer()
      const result = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder,
              resource_type: "image",
            },
            (error, result) => {
              if (error) return reject(error)
              resolve(result as CloudinaryUploadResult)
            },
          )
          .end(Buffer.from(buffer))
      })
      return result
    }
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error)
    throw new Error("Failed to upload image")
  }
}

/**
 * Elimina una imagen de Cloudinary
 * @param publicId ID público de la imagen
 * @returns Resultado de la eliminación
 */
export async function deleteImage(publicId: string): Promise<any> {
  try {
    return await cloudinary.uploader.destroy(publicId)
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error)
    throw new Error("Failed to delete image")
  }
}

/**
 * Genera una URL optimizada para una imagen de Cloudinary
 * @param publicId ID público de la imagen
 * @param options Opciones de transformación
 * @returns URL optimizada
 */
export function getImageUrl(
  publicId: string,
  options: {
    width?: number
    height?: number
    crop?: string
    quality?: number
    format?: string
  } = {},
): string {
  const { width, height, crop = "fill", quality = "auto", format = "auto" } = options

  let transformations = `f_${format},q_${quality}`

  if (width) transformations += `,w_${width}`
  if (height) transformations += `,h_${height}`
  if (crop) transformations += `,c_${crop}`

  return cloudinary.url(publicId, {
    secure: true,
    transformation: transformations,
  })
}
