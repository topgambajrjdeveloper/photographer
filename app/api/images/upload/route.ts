import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { uploadImage } from "@/lib/cloudinary"
import { prisma } from "@/lib/prisma"

export const config = {
  api: {
    bodyParser: false,
  },
}

// Función para parsear el formData
async function parseFormData(request: Request) {
  const formData = await request.formData()
  const file = formData.get("file") as File | null
  const alt = formData.get("alt") as string | null
  const galleryId = formData.get("galleryId") as string | null

  return { file, alt, galleryId }
}

// POST /api/images/upload - Subir una imagen a Cloudinary
export async function POST(request: Request) {
  const session = await auth()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    // Parsear el formData
    const { file, alt, galleryId } = await parseFormData(request)

    if (!file || !galleryId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Verificar que la galería existe
    const gallery = await prisma.gallery.findUnique({
      where: { id: galleryId },
    })

    if (!gallery) {
      return NextResponse.json({ error: "Gallery not found" }, { status: 404 })
    }

    // Subir la imagen a Cloudinary
    const result = await uploadImage(file, `photography/${gallery.slug}`)

    // Guardar la información de la imagen en la base de datos
    const image = await prisma.image.create({
      data: {
        url: result.secure_url,
        publicId: result.public_id,
        alt: alt || file.name.replace(/\.[^/.]+$/, ""),
        width: result.width,
        height: result.height,
        size: result.bytes,
        format: result.format,
        galleryId,
      },
    })

    return NextResponse.json(image, { status: 201 })
  } catch (error) {
    console.error("Error uploading image:", error)
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 })
  }
}
