import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

interface GalleryImage {
  id: string
  url: string
  alt: string | null
  publicId?: string | null
}

interface Gallery {
  id: string
  title: string
  slug: string
  description: string | null
  images: GalleryImage[]
  _count: {
    images: number
  }
  category?: {
    name: string
    slug: string
  } | null
}

interface GalleryGridProps {
  galleries: Gallery[]
}

export function GalleryGrid({ galleries }: GalleryGridProps) {
  if (galleries.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-neutral-400">No galleries found.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {galleries.map((gallery) => (
        <Link key={gallery.id} href={`/galleries/${gallery.slug}`} className="group">
          <div className="image-container">
            {gallery.images[0] ? (
              <Image
                src={gallery.images[0].url || "/placeholder.svg"}
                alt={gallery.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-neutral-700 flex items-center justify-center">
                <p className="text-neutral-300">No images</p>
              </div>
            )}
            <div className="image-overlay">
              <div className="flex items-center gap-2">
                <span className="text-white font-medium">View Gallery</span>
                <ArrowRight className="h-4 w-4 text-white" />
              </div>
            </div>
            {gallery._count.images > 0 && (
              <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-md">
                {gallery._count.images} {gallery._count.images === 1 ? "photo" : "photos"}
              </div>
            )}
          </div>
          <h3 className="mt-3 font-medium group-hover:text-white transition-colors">{gallery.title}</h3>
          {gallery.category && <p className="text-sm text-neutral-400">{gallery.category.name}</p>}
        </Link>
      ))}
    </div>
  )
}
