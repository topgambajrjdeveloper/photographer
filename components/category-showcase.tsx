import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { getFeaturedCategories } from "@/lib/categories"

export async function CategoryShowcase() {
  const categories = await getFeaturedCategories()

  if (categories.length === 0) {
    return null
  }

  return (
    <section className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Explore Categories</h2>
          <p className="text-neutral-400 mt-2">Browse photography by subject matter</p>
        </div>
        <Button asChild variant="link" className="px-0">
          <Link href="/categories" className="flex items-center gap-2">
            View All Categories <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link key={category.id} href={`/categories/${category.slug}`} className="group">
            <div className="image-container">
              <Image
                src={
                  category.coverImage || "/placeholder.svg?height=600&width=600&query=photography of " + category.name
                }
                alt={category.name}
                fill
                className="object-cover"
              />
              <div className="image-overlay">
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium">Explore Category</span>
                  <ArrowRight className="h-4 w-4 text-white" />
                </div>
              </div>
              {category._count.galleries > 0 && (
                <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-md">
                  {category._count.galleries} {category._count.galleries === 1 ? "gallery" : "galleries"}
                </div>
              )}
            </div>
            <h3 className="mt-3 font-medium group-hover:text-white transition-colors">{category.name}</h3>
            <p className="text-sm text-neutral-400 line-clamp-2">{category.description}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
