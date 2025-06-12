"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trash2, Edit } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  _count: {
    galleries: number
  }
}

export function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories")
      if (response.ok) {
        const data = await response.json()
        setCategories(data)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch categories",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const deleteCategory = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) {
      return
    }

    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setCategories(categories.filter((cat) => cat.id !== id))
        toast({
          title: "Category deleted",
          description: "The category has been successfully deleted.",
        })
      } else {
        throw new Error("Failed to delete category")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete category",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return <div className="text-center py-4">Loading categories...</div>
  }

  if (categories.length === 0) {
    return <div className="text-center py-4 text-neutral-400">No categories found</div>
  }

  return (
    <div className="space-y-4">
      {categories.map((category) => (
        <div key={category.id} className="flex items-center justify-between p-4 border border-neutral-700 rounded-lg">
          <div className="flex-1">
            <h3 className="font-medium">{category.name}</h3>
            <p className="text-sm text-neutral-400 mt-1">{category.description}</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary">
                {category._count.galleries} {category._count.galleries === 1 ? "gallery" : "galleries"}
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => deleteCategory(category.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
