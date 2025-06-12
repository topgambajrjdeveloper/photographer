import { CategoryGrid } from "@/components/category-grid"
import { ShareButtons } from "@/components/share-buttons"
import type { Metadata } from "next"
import { getCategories } from "@/lib/categories"

export const metadata: Metadata = {
  title: "Categories | Photography Portfolio",
  description: "Browse photography by category",
}

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
        <div>
          <h1 className="text-4xl font-bold">Photography Categories</h1>
          <p className="text-neutral-300 mt-2">Explore my work by subject matter</p>
        </div>
        <ShareButtons title="Photography Categories" path="/categories" />
      </div>

      <CategoryGrid categories={categories} />
    </div>
  )
}
