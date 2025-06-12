"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trash2, Edit, Upload } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import Link from "next/link"

interface Gallery {
  id: string
  title: string
  slug: string
  description: string | null
  category: {
    name: string
  } | null
  _count: {
    images: number
  }
}

export function GalleryList() {
  const [galleries, setGalleries] = useState<Gallery[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchGalleries()
  }, [])

  const fetchGalleries = async () => {
    try {
      const response = await fetch("/api/galleries")
      if (response.ok) {
        const data = await response.json()
        setGalleries(data)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch galleries",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const deleteGallery = async (id: string) => {
    if (!confirm("Are you sure you want to delete this gallery?")) {
      return
    }

    try {
      const response = await fetch(`/api/galleries/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setGalleries(galleries.filter((gallery) => gallery.id !== id))
        toast({
          title: "Gallery deleted",
          description: "The gallery has been successfully deleted.",
        })
      } else {
        throw new Error("Failed to delete gallery")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete gallery",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return <div className="text-center py-4">Loading galleries...</div>
  }

  if (galleries.length === 0) {
    return <div className="text-center py-4 text-neutral-400">No galleries found</div>
  }

  return (
    <div className="space-y-4">
      {galleries.map((gallery) => (
        <div key={gallery.id} className="flex items-center justify-between p-4 border border-neutral-700 rounded-lg">
          <div className="flex-1">
            <h3 className="font-medium">{gallery.title}</h3>
            <p className="text-sm text-neutral-400 mt-1">{gallery.description}</p>
            <div className="flex items-center gap-2 mt-2">
              {gallery.category && <Badge variant="outline">{gallery.category.name}</Badge>}
              <Badge variant="secondary">
                {gallery._count.images} {gallery._count.images === 1 ? "image" : "images"}
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" size="icon">
              <Link href={`/admin/upload?gallery=${gallery.id}`}>
                <Upload className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="icon">
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => deleteGallery(gallery.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
