import { notFound } from "next/navigation"
import Image from "next/image"
import { ShareButtons } from "@/components/share-buttons"
import type { Metadata } from "next"
import { getGallery, getGalleries } from "@/lib/galleries"

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const gallery = await getGallery(params.slug)

  if (!gallery) {
    return {
      title: "Gallery Not Found",
    }
  }

  return {
    title: `${gallery.title} | Photography Portfolio`,
    description: gallery.description,
  }
}

export async function generateStaticParams() {
  const galleries = await getGalleries()

  return galleries.map((gallery) => ({
    slug: gallery.slug,
  }))
}

export default async function GalleryPage({ params }: { params: { slug: string } }) {
  const gallery = await getGallery(params.slug)

  if (!gallery) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold">{gallery.title}</h1>
            <p className="text-neutral-300 mt-2">{gallery.description}</p>
          </div>
          <ShareButtons title={gallery.title} path={`/galleries/${params.slug}`} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {gallery.images.map((image, index) => (
            <div key={index} className="image-container">
              <Image
                src={image.url || "/placeholder.svg"}
                alt={image.alt || `Gallery image ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
