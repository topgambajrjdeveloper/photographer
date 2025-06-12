import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXTAUTH_URL || "https://localhost:3000"

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/galleries", "/categories", "/about", "/contact"],
        disallow: ["/admin", "/auth", "/api"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
