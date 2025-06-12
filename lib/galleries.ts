import { prisma } from "@/lib/prisma"

export async function getGalleries() {
  try {
    const galleries = await prisma.gallery.findMany({
      where: { published: true },
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
    })

    return galleries
  } catch (error) {
    console.error("Error fetching galleries:", error)
    return []
  }
}

export async function getGallery(slug: string) {
  try {
    const gallery = await prisma.gallery.findUnique({
      where: {
        slug,
        published: true,
      },
      include: {
        category: true,
        images: {
          orderBy: { order: "asc" },
        },
      },
    })

    if (gallery) {
      // Increment view count
      await prisma.gallery
        .update({
          where: { id: gallery.id },
          data: { views: { increment: 1 } },
        })
        .catch(() => {
          // Ignore errors when updating views
        })
    }

    return gallery
  } catch (error) {
    console.error("Error fetching gallery:", error)
    return null
  }
}

export async function getFeaturedGallery() {
  try {
    const gallery = await prisma.gallery.findFirst({
      where: {
        featured: true,
        published: true,
      },
      include: {
        images: {
          take: 6,
          orderBy: { order: "asc" },
        },
      },
      orderBy: { createdAt: "desc" },
    })

    return gallery
  } catch (error) {
    console.error("Error fetching featured gallery:", error)
    return null
  }
}

export async function getRecentGalleries(limit = 6) {
  try {
    const galleries = await prisma.gallery.findMany({
      where: { published: true },
      take: limit,
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
      orderBy: { createdAt: "desc" },
    })

    return galleries
  } catch (error) {
    console.error("Error fetching recent galleries:", error)
    return []
  }
}
