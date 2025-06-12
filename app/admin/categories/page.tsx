import { CategoryManager } from "@/components/admin/category-manager"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Manage Categories | Admin Dashboard",
}

export default function CategoriesPage() {
  return <CategoryManager />
}
