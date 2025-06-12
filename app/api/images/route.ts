import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { z } from "zod"

const imageSchema = z.object({
  url: z.string().url("Invalid URL"),
  alt: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
  size: z.number().optional(),
  format: z.string().optional(),
  galleryId: z.string().min(1, "Gallery is required"),
  featured: z.boolean().optional(),
  order: z.number().optional(),
})

const bulkImageSchema = z.object({
  images: z.array(imageSchema),
})

// GET /api/images - Get all images
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const galleryId = searchParams.get("galleryId")
  const featured = searchParams.get("featured")
  const limit = searchParams.get("limit")

  try {
    const where: any = {}

    if (galleryId) where.galleryId = galleryId
    if (featured === "true") where.featured = true

    const images = await prisma.image.findMany({
      where,
      include: {
        gallery: {
          include: {
            category: true,
          },
        },
      },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
      take: limit ? Number.parseInt(limit) : undefined,
    })

    return NextResponse.json(images)
  } catch (error) {
    console.error("Error fetching images:", error)
    return NextResponse.json({ error: "Failed to fetch images" }, { status: 500 })
  }
}

// POST /api/images - Create new image(s)
export async function POST(request: Request) {
  const session = await auth()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()

    // Check if it's a single image or bulk upload
    if (body.images && Array.isArray(body.images)) {
      // Bulk upload
      const validatedData = bulkImageSchema.parse(body)

      // Verify all galleries exist
      const galleryIds = [...new Set(validatedData.images.map((img) => img.galleryId))]
      const galleries = await prisma.gallery.findMany({
        where: { id: { in: galleryIds } },
      })

      if (galleries.length !== galleryIds.length) {
        return NextResponse.json({ error: "One or more galleries not found" }, { status: 400 })
      }

      const images = await prisma.image.createMany({
        data: validatedData.images,
      })

      return NextResponse.json(
        {
          message: `${images.count} images uploaded successfully`,
          count: images.count,
        },
        { status: 201 },
      )
    } else {
      // Single image upload
      const validatedData = imageSchema.parse(body)

      // Check if gallery exists
      const gallery = await prisma.gallery.findUnique({
        where: { id: validatedData.galleryId },
      })

      if (!gallery) {
        return NextResponse.json({ error: "Gallery not found" }, { status: 400 })
      }

      const image = await prisma.image.create({
        data: validatedData,
        include: {
          gallery: {
            include: {
              category: true,
            },
          },
        },
      })

      return NextResponse.json(image, { status: 201 })
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid data", details: error.errors }, { status: 400 })
    }

    console.error("Error creating image(s):", error)
    return NextResponse.json({ error: "Failed to create image(s)" }, { status: 500 })
  }
}
