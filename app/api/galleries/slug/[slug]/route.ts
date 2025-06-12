import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET /api/galleries/slug/[slug] - Get gallery by slug
export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    const gallery = await prisma.gallery.findUnique({
      where: {
        slug: params.slug,
        published: true,
      },
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
      where: { id: gallery.id },
      data: { views: { increment: 1 } },
    })

    return NextResponse.json(gallery)
  } catch (error) {
    console.error("Error fetching gallery by slug:", error)
    return NextResponse.json({ error: "Failed to fetch gallery" }, { status: 500 })
  }
}
