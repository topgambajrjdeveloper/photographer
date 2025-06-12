import { GalleryManager } from "@/components/admin/gallery-manager"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Manage Galleries | Admin Dashboard",
}

export default function GalleriesPage() {
  return <GalleryManager />
}
