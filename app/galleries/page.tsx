import { GalleryGrid } from "@/components/gallery-grid"
import { ShareButtons } from "@/components/share-buttons"
import type { Metadata } from "next"
import { getGalleries } from "@/lib/galleries"

export const metadata: Metadata = {
  title: "Galleries | Photography Portfolio",
  description: "Browse through my photography collections",
}

export default async function GalleriesPage() {
  const galleries = await getGalleries()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
        <div>
          <h1 className="text-4xl font-bold">Photography Galleries</h1>
          <p className="text-neutral-300 mt-2">Browse through my curated collections</p>
        </div>
        <ShareButtons title="Photography Galleries" path="/galleries" />
      </div>

      <GalleryGrid galleries={galleries} />
    </div>
  )
}
