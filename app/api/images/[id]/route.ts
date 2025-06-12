import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { z } from "zod"
import { deleteImage } from "@/lib/cloudinary"

const imageUpdateSchema = z.object({
  url: z.string().url("Invalid URL").optional(),
  alt: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
  size: z.number().optional(),
  format: z.string().optional(),
  galleryId: z.string().min(1, "Gallery is required").optional(),
  featured: z.boolean().optional(),
  order: z.number().optional(),
})

// GET /api/images/[id] - Get single image
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const image = await prisma.image.findUnique({
      where: { id: params.id },
      include: {
        gallery: {
          include: {
            category: true,
          },
        },
      },
    })

    if (!image) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 })
    }

    return NextResponse.json(image)
  } catch (error) {
    console.error("Error fetching image:", error)
    return NextResponse.json({ error: "Failed to fetch image" }, { status: 500 })
  }
}

// PUT /api/images/[id] - Update image
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const session = await auth()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const validatedData = imageUpdateSchema.parse(body)

    // Check if image exists
    const existingImage = await prisma.image.findUnique({
      where: { id: params.id },
    })

    if (!existingImage) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 })
    }

    // Check if gallery exists (if being updated)
    if (validatedData.galleryId) {
      const gallery = await prisma.gallery.findUnique({
        where: { id: validatedData.galleryId },
      })

      if (!gallery) {
        return NextResponse.json({ error: "Gallery not found" }, { status: 400 })
      }
    }

    const image = await prisma.image.update({
      where: { id: params.id },
      data: validatedData,
      include: {
        gallery: {
          include: {
            category: true,
          },
        },
      },
    })

    return NextResponse.json(image)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid data", details: error.errors }, { status: 400 })
    }

    console.error("Error updating image:", error)
    return NextResponse.json({ error: "Failed to update image" }, { status: 500 })
  }
}

// DELETE /api/images/[id] - Delete image
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const session = await auth()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    // Check if image exists
    const existingImage = await prisma.image.findUnique({
      where: { id: params.id },
    })

    if (!existingImage) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 })
    }

    // Si la imagen tiene un publicId, eliminarla de Cloudinary
    if (existingImage.publicId) {
      await deleteImage(existingImage.publicId).catch((error) => {
        console.error("Error deleting image from Cloudinary:", error)
        // Continuamos con la eliminación de la base de datos incluso si falla en Cloudinary
      })
    }

    await prisma.image.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: "Image deleted successfully" })
  } catch (error) {
    console.error("Error deleting image:", error)
    return NextResponse.json({ error: "Failed to delete image" }, { status: 500 })
  }
}
