"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CategoryList } from "@/components/admin/category-list"
import { Upload } from "lucide-react"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  slug: z
    .string()
    .min(2, {
      message: "Slug must be at least 2 characters.",
    })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: "Slug must contain only lowercase letters, numbers, and hyphens.",
    }),
  description: z.string().optional(),
})

export function CategoryManager() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
    },
  })

  const watchName = form.watch("name")

  // Auto-generate slug from name
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value
    const slug = name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
    form.setValue("slug", slug)
  }

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setCoverImage(file)
      setCoverImagePreview(URL.createObjectURL(file))
    }
  }

  const removeCoverImage = () => {
    setCoverImage(null)
    if (coverImagePreview) {
      URL.revokeObjectURL(coverImagePreview)
      setCoverImagePreview(null)
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      // Si hay una imagen de portada, primero la subimos
      let coverImageUrl = null

      if (coverImage) {
        const formData = new FormData()
        formData.append("file", coverImage)
        formData.append("folder", "categories")

        const uploadResponse = await fetch("/api/images/upload", {
          method: "POST",
          body: formData,
        })

        if (!uploadResponse.ok) {
          throw new Error("Failed to upload cover image")
        }

        const uploadResult = await uploadResponse.json()
        coverImageUrl = uploadResult.url
      }

      // Luego creamos la categoría
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          coverImage: coverImageUrl,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create category")
      }

      toast({
        title: "Category created!",
        description: "The category has been successfully created.",
      })

      form.reset()
      removeCoverImage()
      router.refresh()
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: "The category couldn't be created. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Manage Categories</h1>
        <p className="text-neutral-400 mt-1">Create and manage photography categories</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Create New Category</CardTitle>
            <CardDescription>Add a new category to organize your photography galleries</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Portrait Photography"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e)
                            handleNameChange(e)
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input placeholder="portrait-photography" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Professional portrait photography showcasing personality and emotion..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <FormLabel>Cover Image</FormLabel>
                  <div className="flex items-center gap-4">
                    {coverImagePreview ? (
                      <div className="relative w-24 h-24 rounded-md overflow-hidden">
                        <img
                          src={coverImagePreview || "/placeholder.svg"}
                          alt="Cover preview"
                          className="object-cover w-full h-full"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-1 right-1 h-6 w-6"
                          onClick={removeCoverImage}
                        >
                          <span className="sr-only">Remove image</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M18 6L6 18M6 6l12 12"></path>
                          </svg>
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center w-24 h-24 bg-neutral-800 rounded-md border border-dashed border-neutral-600">
                        <Upload className="h-6 w-6 text-neutral-400" />
                      </div>
                    )}
                    <div className="flex-1">
                      <Input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleCoverImageChange}
                        className="hidden"
                        id="cover-image"
                      />
                      <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                        {coverImagePreview ? "Change Image" : "Select Image"}
                      </Button>
                      <p className="text-xs text-neutral-400 mt-1">Recommended size: 600x600px</p>
                    </div>
                  </div>
                </div>

                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creating..." : "Create Category"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Existing Categories</CardTitle>
            <CardDescription>Manage your existing photography categories</CardDescription>
          </CardHeader>
          <CardContent>
            <CategoryList />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
