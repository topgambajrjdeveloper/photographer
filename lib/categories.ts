import { prisma } from "@/lib/prisma"

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: {
            galleries: {
              where: { published: true },
            },
          },
        },
      },
      orderBy: [{ order: "asc" }, { name: "asc" }],
    })

    return categories
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}

export async function getCategory(slug: string) {
  try {
    const category = await prisma.category.findUnique({
      where: { slug },
      include: {
        galleries: {
          where: { published: true },
          include: {
            images: {
              take: 1,
              orderBy: { order: "asc" },
            },
            _count: {
              select: { images: true },
            },
          },
          orderBy: [{ order: "asc" }, { createdAt: "desc" }],
        },
      },
    })

    return category
  } catch (error) {
    console.error("Error fetching category:", error)
    return null
  }
}

export async function getFeaturedCategories(limit = 6) {
  try {
    const categories = await prisma.category.findMany({
      where: { featured: true },
      take: limit,
      include: {
        _count: {
          select: {
            galleries: {
              where: { published: true },
            },
          },
        },
      },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    })

    return categories
  } catch (error) {
    console.error("Error fetching featured categories:", error)
    return []
  }
}
