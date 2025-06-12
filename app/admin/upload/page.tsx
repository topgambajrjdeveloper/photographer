import { ImageUploader } from "@/components/admin/image-uploader"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Upload Images | Admin Dashboard",
}

export default function UploadPage() {
  return <ImageUploader />
}
