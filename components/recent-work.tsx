import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { getRecentGalleries } from "@/lib/galleries"

export async function RecentWork() {
  const galleries = await getRecentGalleries()

  if (galleries.length === 0) {
    return null
  }

  return (
    <section className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Recent Work</h2>
          <p className="text-neutral-400 mt-2">My latest photography projects</p>
        </div>
        <Button asChild variant="link" className="px-0">
          <Link href="/galleries" className="flex items-center gap-2">
            View All Galleries <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleries.map((gallery, index) => (
          <Link key={gallery.id} href={`/galleries/${gallery.slug}`} className="group">
            <div className="image-container">
              {gallery.images[0] && (
                <Image
                  src={gallery.images[0].url || "/placeholder.svg"}
                  alt={gallery.title}
                  fill
                  className="object-cover"
                />
              )}
              <div className="image-overlay">
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium">View Gallery</span>
                  <ArrowRight className="h-4 w-4 text-white" />
                </div>
              </div>
              {gallery._count.images > 1 && (
                <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-md">
                  {gallery._count.images} photos
                </div>
              )}
            </div>
            <h3 className="mt-3 font-medium group-hover:text-white transition-colors">{gallery.title}</h3>
            <p className="text-sm text-neutral-400">{gallery.category?.name}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
