import type { MetadataRoute } from "next"
import { getGalleries } from "@/lib/galleries"
import { getCategories } from "@/lib/categories"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXTAUTH_URL || "https://localhost:3000"

  // Páginas estáticas
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/galleries`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
  ]

  try {
    // Obtener galerías dinámicas
    const galleries = await getGalleries()
    const galleryPages = galleries.map((gallery) => ({
      url: `${baseUrl}/galleries/${gallery.slug}`,
      lastModified: gallery.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }))

    // Obtener categorías dinámicas
    const categories = await getCategories()
    const categoryPages = categories.map((category) => ({
      url: `${baseUrl}/categories/${category.slug}`,
      lastModified: category.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }))

    return [...staticPages, ...galleryPages, ...categoryPages]
  } catch (error) {
    console.error("Error generating sitemap:", error)
    return staticPages
  }
}
