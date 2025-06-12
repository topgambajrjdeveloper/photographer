"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, X } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface Gallery {
  id: string
  title: string
  slug: string
}

interface ImagePreview {
  file: File
  preview: string
  uploading: boolean
  progress: number
  alt: string
}

export function ImageUploader() {
  const [galleries, setGalleries] = useState<Gallery[]>([])
  const [selectedGallery, setSelectedGallery] = useState("")
  const [images, setImages] = useState<ImagePreview[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const searchParams = useSearchParams()

  useEffect(() => {
    fetchGalleries()

    // Pre-select gallery if provided in URL
    const galleryId = searchParams.get("gallery")
    if (galleryId) {
      setSelectedGallery(galleryId)
    }
  }, [searchParams])

  const fetchGalleries = async () => {
    try {
      const response = await fetch("/api/galleries")
      if (response.ok) {
        const data = await response.json()
        setGalleries(data)
      }
    } catch (error) {
      console.error("Failed to fetch galleries:", error)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)

      // Create preview for each file
      const newImages = newFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        uploading: false,
        progress: 0,
        alt: file.name.replace(/\.[^/.]+$/, ""), // Remove file extension
      }))

      setImages((prev) => [...prev, ...newImages])
    }
  }

  const removeImage = (index: number) => {
    setImages((prev) => {
      const newImages = [...prev]
      // Revoke object URL to avoid memory leaks
      URL.revokeObjectURL(newImages[index].preview)
      newImages.splice(index, 1)
      return newImages
    })
  }

  const updateImageAlt = (index: number, alt: string) => {
    setImages((prev) => {
      const newImages = [...prev]
      newImages[index].alt = alt
      return newImages
    })
  }

  const uploadImages = async () => {
    if (!selectedGallery || images.length === 0) {
      toast({
        title: "Error",
        description: "Please select a gallery and at least one image",
        variant: "destructive",
      })
      return
    }

    setUploading(true)
    setUploadProgress(0)

    try {
      let successCount = 0

      for (let i = 0; i < images.length; i++) {
        const image = images[i]

        // Update current image status
        setImages((prev) => {
          const newImages = [...prev]
          newImages[i].uploading = true
          return newImages
        })

        // Create form data for the image
        const formData = new FormData()
        formData.append("file", image.file)
        formData.append("alt", image.alt)
        formData.append("galleryId", selectedGallery)

        try {
          // Upload image to Cloudinary via our API
          const response = await fetch("/api/images/upload", {
            method: "POST",
            body: formData,
          })

          if (!response.ok) {
            throw new Error(`Failed to upload ${image.file.name}`)
          }

          successCount++

          // Update progress
          setImages((prev) => {
            const newImages = [...prev]
            newImages[i].uploading = false
            newImages[i].progress = 100
            return newImages
          })
        } catch (error) {
          console.error(`Error uploading ${image.file.name}:`, error)

          // Mark as failed
          setImages((prev) => {
            const newImages = [...prev]
            newImages[i].uploading = false
            return newImages
          })
        }

        // Update overall progress
        setUploadProgress(Math.round(((i + 1) / images.length) * 100))
      }

      toast({
        title: "Upload complete",
        description: `Successfully uploaded ${successCount} of ${images.length} images.`,
        variant: successCount === images.length ? "default" : "destructive",
      })

      // Clear images if all were successful
      if (successCount === images.length) {
        // Revoke all object URLs
        images.forEach((image) => URL.revokeObjectURL(image.preview))
        setImages([])
      } else {
        // Keep only failed images
        setImages((prev) => prev.filter((img) => img.progress < 100))
      }
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Some images couldn't be uploaded. Please try again.",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Upload Images</h1>
        <p className="text-neutral-400 mt-1">Add images to your photography galleries</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upload Images</CardTitle>
          <CardDescription>Select a gallery and upload your images</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="gallery">Gallery</Label>
            <Select value={selectedGallery} onValueChange={setSelectedGallery}>
              <SelectTrigger>
                <SelectValue placeholder="Select a gallery" />
              </SelectTrigger>
              <SelectContent>
                {galleries.map((gallery) => (
                  <SelectItem key={gallery.id} value={gallery.id}>
                    {gallery.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="images">Images</Label>
            <div className="border-2 border-dashed border-neutral-700 rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 mx-auto text-neutral-400 mb-4" />
              <p className="text-neutral-400 mb-4">Drag and drop your images here, or click to select files</p>
              <Input id="images" type="file" multiple accept="image/*" onChange={handleFileSelect} className="hidden" />
              <Button variant="outline" onClick={() => document.getElementById("images")?.click()}>
                Select Images
              </Button>
            </div>
          </div>

          {images.length > 0 && (
            <div className="space-y-4">
              <Label>Selected Images ({images.length})</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative group border border-neutral-700 rounded-lg p-3">
                    <div className="aspect-square bg-neutral-800 rounded-lg flex items-center justify-center overflow-hidden mb-2">
                      <img
                        src={image.preview || "/placeholder.svg"}
                        alt={image.alt}
                        className="object-cover w-full h-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <Input
                        type="text"
                        value={image.alt}
                        onChange={(e) => updateImageAlt(index, e.target.value)}
                        placeholder="Image description"
                        className="text-xs"
                      />

                      {image.uploading && <Progress value={image.progress} className="h-1" />}
                    </div>

                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeImage(index)}
                      disabled={uploading}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {uploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Overall progress</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}

          <Button
            onClick={uploadImages}
            disabled={uploading || !selectedGallery || images.length === 0}
            className="w-full"
          >
            {uploading ? `Uploading... ${uploadProgress}%` : `Upload ${images.length} Images`}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
