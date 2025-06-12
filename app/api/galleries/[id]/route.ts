import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { z } from "zod"

const galleryUpdateSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  slug: z.string().min(1, "Slug is required").optional(),
  description: z.string().optional(),
  categoryId: z.string().min(1, "Category is required").optional(),
  featured: z.boolean().optional(),
  published: z.boolean().optional(),
  order: z.number().optional(),
})

// GET /api/galleries/[id] - Get single gallery
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const gallery = await prisma.gallery.findUnique({
      where: { id: params.id },
      include: {
        category: true,
        images: {
          orderBy: { order: "asc" },
        },
      },
    })

    if (!gallery) {
      return NextResponse.json({ error: "Gallery not found" }, { status: 404 })
    }

    // Increment view count
    await prisma.gallery.update({
      where: { id: params.id },
      data: { views: { increment: 1 } },
    })

    return NextResponse.json(gallery)
  } catch (error) {
    console.error("Error fetching gallery:", error)
    return NextResponse.json({ error: "Failed to fetch gallery" }, { status: 500 })
  }
}

// PUT /api/galleries/[id] - Update gallery
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const session = await auth()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const validatedData = galleryUpdateSchema.parse(body)

    // Check if gallery exists
    const existingGallery = await prisma.gallery.findUnique({
      where: { id: params.id },
    })

    if (!existingGallery) {
      return NextResponse.json({ error: "Gallery not found" }, { status: 404 })
    }

    // Check if slug is being updated and if it already exists
    if (validatedData.slug && validatedData.slug !== existingGallery.slug) {
      const slugExists = await prisma.gallery.findUnique({
        where: { slug: validatedData.slug },
      })

      if (slugExists) {
        return NextResponse.json({ error: "Gallery with this slug already exists" }, { status: 400 })
      }
    }

    // Check if category exists (if being updated)
    if (validatedData.categoryId) {
      const category = await prisma.category.findUnique({
        where: { id: validatedData.categoryId },
      })

      if (!category) {
        return NextResponse.json({ error: "Category not found" }, { status: 400 })
      }
    }

    const gallery = await prisma.gallery.update({
      where: { id: params.id },
      data: validatedData,
      include: {
        category: true,
        _count: {
          select: { images: true },
        },
      },
    })

    return NextResponse.json(gallery)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid data", details: error.errors }, { status: 400 })
    }

    console.error("Error updating gallery:", error)
    return NextResponse.json({ error: "Failed to update gallery" }, { status: 500 })
  }
}

// DELETE /api/galleries/[id] - Delete gallery
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const session = await auth()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    // Check if gallery exists
    const existingGallery = await prisma.gallery.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: { images: true },
        },
      },
    })

    if (!existingGallery) {
      return NextResponse.json({ error: "Gallery not found" }, { status: 404 })
    }

    // Delete gallery (images will be deleted automatically due to cascade)
    await prisma.gallery.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: "Gallery deleted successfully" })
  } catch (error) {
    console.error("Error deleting gallery:", error)
    return NextResponse.json({ error: "Failed to delete gallery" }, { status: 500 })
  }
}
