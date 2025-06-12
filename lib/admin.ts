import { prisma } from "@/lib/prisma"

export async function getDashboardStats() {
  try {
    const now = new Date()
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())

    const [
      totalCategories,
      totalGalleries,
      totalImages,
      totalContacts,
      recentCategories,
      recentGalleries,
      recentImages,
      pendingContacts,
      topGalleries,
      recentGalleriesList,
    ] = await Promise.all([
      prisma.category.count().catch(() => 0),
      prisma.gallery.count().catch(() => 0),
      prisma.image.count().catch(() => 0),
      prisma.contact.count().catch(() => 0),
      prisma.category
        .count({
          where: { createdAt: { gte: lastMonth } },
        })
        .catch(() => 0),
      prisma.gallery
        .count({
          where: { createdAt: { gte: lastMonth } },
        })
        .catch(() => 0),
      prisma.image
        .count({
          where: { createdAt: { gte: lastMonth } },
        })
        .catch(() => 0),
      prisma.contact
        .count({
          where: { status: "PENDING" },
        })
        .catch(() => 0),
      prisma.gallery
        .findMany({
          take: 5,
          orderBy: { views: "desc" },
          include: {
            category: true,
            _count: { select: { images: true } },
          },
        })
        .catch(() => []),
      prisma.gallery
        .findMany({
          take: 5,
          orderBy: { createdAt: "desc" },
          include: {
            category: true,
            _count: { select: { images: true } },
          },
        })
        .catch(() => []),
    ])

    const totalViews = Array.isArray(topGalleries)
      ? topGalleries.reduce((sum, gallery) => sum + (gallery.views || 0), 0)
      : 0

    // Calculate view increase percentage (mock calculation)
    const viewsIncrease = totalViews > 0 ? Math.floor(Math.random() * 20) + 5 : 0

    return {
      totalCategories,
      totalGalleries,
      totalImages,
      totalContacts,
      totalViews,
      recentCategories,
      recentGalleries,
      recentImages,
      pendingContacts,
      viewsIncrease,
      popularGalleries: Array.isArray(topGalleries)
        ? topGalleries.map((gallery) => ({
            id: gallery.id,
            title: gallery.title,
            category: gallery.category?.name || "Uncategorized",
            views: gallery.views || 0,
            imageCount: gallery._count?.images || 0,
          }))
        : [],
      recentGalleriesList: Array.isArray(recentGalleriesList)
        ? recentGalleriesList.map((gallery) => ({
            id: gallery.id,
            title: gallery.title,
            category: gallery.category?.name || "Uncategorized",
            date: gallery.createdAt ? gallery.createdAt.toLocaleDateString() : "Unknown",
            imageCount: gallery._count?.images || 0,
          }))
        : [],
    }
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    return {
      totalCategories: 0,
      totalGalleries: 0,
      totalImages: 0,
      totalContacts: 0,
      totalViews: 0,
      recentCategories: 0,
      recentGalleries: 0,
      recentImages: 0,
      pendingContacts: 0,
      viewsIncrease: 0,
      popularGalleries: [],
      recentGalleriesList: [],
    }
  }
}
