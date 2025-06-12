import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { z } from "zod"

const gallerySchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().optional(),
  categoryId: z.string().min(1, "Category is required"),
  featured: z.boolean().optional(),
  published: z.boolean().optional(),
  order: z.number().optional(),
})

// GET /api/galleries - Get all galleries
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const categoryId = searchParams.get("categoryId")
  const featured = searchParams.get("featured")
  const published = searchParams.get("published")
  const limit = searchParams.get("limit")

  try {
    const where: any = {}

    if (categoryId) where.categoryId = categoryId
    if (featured === "true") where.featured = true
    if (published !== "false") where.published = true

    const galleries = await prisma.gallery.findMany({
      where,
      include: {
        category: true,
        images: {
          take: 1,
          orderBy: { order: "asc" },
        },
        _count: {
          select: { images: true },
        },
      },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
      take: limit ? Number.parseInt(limit) : undefined,
    })

    return NextResponse.json(galleries)
  } catch (error) {
    console.error("Error fetching galleries:", error)
    return NextResponse.json({ error: "Failed to fetch galleries" }, { status: 500 })
  }
}

// POST /api/galleries - Create new gallery
export async function POST(request: Request) {
  const session = await auth()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const validatedData = gallerySchema.parse(body)

    // Check if slug already exists
    const existingGallery = await prisma.gallery.findUnique({
      where: { slug: validatedData.slug },
    })

    if (existingGallery) {
      return NextResponse.json({ error: "Gallery with this slug already exists" }, { status: 400 })
    }

    // Check if category exists
    const category = await prisma.category.findUnique({
      where: { id: validatedData.categoryId },
    })

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 400 })
    }

    const gallery = await prisma.gallery.create({
      data: validatedData,
      include: {
        category: true,
        _count: {
          select: { images: true },
        },
      },
    })

    return NextResponse.json(gallery, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid data", details: error.errors }, { status: 400 })
    }

    console.error("Error creating gallery:", error)
    return NextResponse.json({ error: "Failed to create gallery" }, { status: 500 })
  }
}
