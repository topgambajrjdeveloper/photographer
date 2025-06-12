import { notFound } from "next/navigation"
import { GalleryGrid } from "@/components/gallery-grid"
import { ShareButtons } from "@/components/share-buttons"
import type { Metadata } from "next"
import { getCategory, getCategories } from "@/lib/categories"

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const category = await getCategory(params.slug)

  if (!category) {
    return {
      title: "Category Not Found",
    }
  }

  return {
    title: `${category.name} Photography | Photography Portfolio`,
    description: `Browse my ${category.name.toLowerCase()} photography collection`,
  }
}

export async function generateStaticParams() {
  const categories = await getCategories()

  return categories.map((category) => ({
    slug: category.slug,
  }))
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const category = await getCategory(params.slug)

  if (!category) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
        <div>
          <h1 className="text-4xl font-bold">{category.name} Photography</h1>
          <p className="text-neutral-300 mt-2">{category.description}</p>
        </div>
        <ShareButtons title={`${category.name} Photography`} path={`/categories/${params.slug}`} />
      </div>

      <GalleryGrid galleries={category.galleries} />
    </div>
  )
}
