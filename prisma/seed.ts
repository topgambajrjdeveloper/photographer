import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Seeding database...")

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: "wedding-photography" },
      update: {},
      create: {
        name: "Wedding Photography",
        slug: "wedding-photography",
        description: "Capturing the most important day of your life with elegance and emotion",
        featured: true,
        order: 1,
      },
    }),
    prisma.category.upsert({
      where: { slug: "portrait-photography" },
      update: {},
      create: {
        name: "Portrait Photography",
        slug: "portrait-photography",
        description: "Professional portraits that reveal personality and character",
        featured: true,
        order: 2,
      },
    }),
    prisma.category.upsert({
      where: { slug: "nature-landscape" },
      update: {},
      create: {
        name: "Nature & Landscape",
        slug: "nature-landscape",
        description: "Breathtaking natural scenes and outdoor photography",
        featured: true,
        order: 3,
      },
    }),
    prisma.category.upsert({
      where: { slug: "street-photography" },
      update: {},
      create: {
        name: "Street Photography",
        slug: "street-photography",
        description: "Candid moments and urban life captured in their natural state",
        order: 4,
      },
    }),
    prisma.category.upsert({
      where: { slug: "architecture" },
      update: {},
      create: {
        name: "Architecture",
        slug: "architecture",
        description: "Stunning architectural photography showcasing design and structure",
        order: 5,
      },
    }),
  ])

  console.log("✅ Categories created")

  // Create galleries
  const galleries = await Promise.all([
    prisma.gallery.upsert({
      where: { slug: "sunset-beach-wedding" },
      update: {},
      create: {
        title: "Sunset Beach Wedding",
        slug: "sunset-beach-wedding",
        description: "A romantic beach wedding captured during golden hour",
        categoryId: categories[0].id,
        featured: true,
        published: true,
        order: 1,
      },
    }),
    prisma.gallery.upsert({
      where: { slug: "corporate-portraits-2024" },
      update: {},
      create: {
        title: "Corporate Portraits 2024",
        slug: "corporate-portraits-2024",
        description: "Professional headshots for business executives",
        categoryId: categories[1].id,
        published: true,
        order: 2,
      },
    }),
    prisma.gallery.upsert({
      where: { slug: "mountain-landscapes" },
      update: {},
      create: {
        title: "Mountain Landscapes",
        slug: "mountain-landscapes",
        description: "Majestic mountain views from various hiking expeditions",
        categoryId: categories[2].id,
        published: true,
        order: 3,
      },
    }),
    prisma.gallery.upsert({
      where: { slug: "city-life-chronicles" },
      update: {},
      create: {
        title: "City Life Chronicles",
        slug: "city-life-chronicles",
        description: "Street photography capturing the essence of urban living",
        categoryId: categories[3].id,
        published: true,
        order: 4,
      },
    }),
    prisma.gallery.upsert({
      where: { slug: "modern-architecture" },
      update: {},
      create: {
        title: "Modern Architecture",
        slug: "modern-architecture",
        description: "Contemporary buildings and architectural marvels",
        categoryId: categories[4].id,
        published: true,
        order: 5,
      },
    }),
  ])

  console.log("✅ Galleries created")

  // Create sample images
  const images = [
    // Sunset Beach Wedding images
    {
      url: "/placeholder.svg?height=800&width=1200",
      alt: "Beach wedding ceremony at sunset",
      title: "Ceremony at Golden Hour",
      galleryId: galleries[0].id,
      order: 1,
    },
    {
      url: "/placeholder.svg?height=800&width=1200",
      alt: "Wedding couple portrait on beach",
      title: "Romantic Beach Portrait",
      galleryId: galleries[0].id,
      order: 2,
    },
    {
      url: "/placeholder.svg?height=800&width=1200",
      alt: "Beach wedding reception setup",
      title: "Reception by the Sea",
      galleryId: galleries[0].id,
      order: 3,
    },
    {
      url: "/placeholder.svg?height=800&width=1200",
      alt: "First dance on the beach",
      title: "First Dance Under Stars",
      galleryId: galleries[0].id,
      order: 4,
    },
    // Corporate Portraits images
    {
      url: "/placeholder.svg?height=800&width=600",
      alt: "Professional business headshot",
      title: "Executive Portrait",
      galleryId: galleries[1].id,
      order: 1,
    },
    {
      url: "/placeholder.svg?height=800&width=600",
      alt: "Executive portrait in office",
      title: "Office Environment",
      galleryId: galleries[1].id,
      order: 2,
    },
    {
      url: "/placeholder.svg?height=800&width=600",
      alt: "Corporate team portrait",
      title: "Team Leadership",
      galleryId: galleries[1].id,
      order: 3,
    },
    // Mountain Landscapes images
    {
      url: "/placeholder.svg?height=800&width=1200",
      alt: "Mountain landscape at sunrise",
      title: "Alpine Sunrise",
      galleryId: galleries[2].id,
      order: 1,
    },
    {
      url: "/placeholder.svg?height=800&width=1200",
      alt: "Alpine lake with mountain reflection",
      title: "Mirror Lake",
      galleryId: galleries[2].id,
      order: 2,
    },
    {
      url: "/placeholder.svg?height=800&width=1200",
      alt: "Mountain peak above clouds",
      title: "Above the Clouds",
      galleryId: galleries[2].id,
      order: 3,
    },
    // City Life Chronicles images
    {
      url: "/placeholder.svg?height=800&width=600",
      alt: "Urban street scene",
      title: "City Streets",
      galleryId: galleries[3].id,
      order: 1,
    },
    {
      url: "/placeholder.svg?height=800&width=600",
      alt: "City lights at night",
      title: "Night Lights",
      galleryId: galleries[3].id,
      order: 2,
    },
    {
      url: "/placeholder.svg?height=800&width=600",
      alt: "People walking on busy street",
      title: "Urban Movement",
      galleryId: galleries[3].id,
      order: 3,
    },
    // Modern Architecture images
    {
      url: "/placeholder.svg?height=800&width=600",
      alt: "Modern building facade",
      title: "Contemporary Design",
      galleryId: galleries[4].id,
      order: 1,
    },
    {
      url: "/placeholder.svg?height=800&width=600",
      alt: "Architectural interior design",
      title: "Interior Spaces",
      galleryId: galleries[4].id,
      order: 2,
    },
    {
      url: "/placeholder.svg?height=800&width=600",
      alt: "Glass building with reflections",
      title: "Glass and Steel",
      galleryId: galleries[4].id,
      order: 3,
    },
  ]

  await prisma.image.createMany({
    data: images,
    skipDuplicates: true,
  })

  console.log("✅ Images created")

  // Create default settings
  const settings = [
    {
      key: "site_title",
      value: "Photography Portfolio",
      description: "Main site title",
    },
    {
      key: "site_description",
      value: "Professional photography portfolio showcasing elegant imagery",
      description: "Site meta description",
    },
    {
      key: "contact_email",
      value: "contact@photographyportfolio.com",
      description: "Contact email address",
    },
    {
      key: "social_instagram",
      value: "https://instagram.com/photographer",
      description: "Instagram profile URL",
    },
    {
      key: "social_twitter",
      value: "https://twitter.com/photographer",
      description: "Twitter profile URL",
    },
  ]

  await Promise.all(
    settings.map((setting) =>
      prisma.settings.upsert({
        where: { key: setting.key },
        update: {},
        create: setting,
      }),
    ),
  )

  console.log("✅ Settings created")

  console.log("🎉 Seeding completed successfully!")
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
