import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { getFeaturedGallery } from "@/lib/galleries"

export async function FeaturedGallery() {
  const gallery = await getFeaturedGallery()

  if (!gallery) {
    return null
  }

  return (
    <section className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Featured Gallery</h2>
          <p className="text-neutral-400 mt-2">{gallery.description}</p>
        </div>
        <Button asChild variant="link" className="px-0">
          <Link href={`/galleries/${gallery.slug}`} className="flex items-center gap-2">
            View Full Gallery <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gallery.images.slice(0, 6).map((image, index) => (
          <Link key={index} href={`/galleries/${gallery.slug}`} className="image-container">
            <Image
              src={image.url || "/placeholder.svg"}
              alt={image.alt || `Gallery image ${index + 1}`}
              fill
              className="object-cover"
            />
            <div className="image-overlay">
              <span className="text-white font-medium">View Gallery</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
