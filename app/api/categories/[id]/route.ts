import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { z } from "zod"

const categoryUpdateSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  slug: z.string().min(1, "Slug is required").optional(),
  description: z.string().optional(),
  coverImage: z.string().optional(),
  featured: z.boolean().optional(),
  order: z.number().optional(),
})

// GET /api/categories/[id] - Get single category
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const category = await prisma.category.findUnique({
      where: { id: params.id },
      include: {
        galleries: {
          where: { published: true },
          include: {
            images: {
              take: 1,
              orderBy: { order: "asc" },
            },
            _count: {
              select: { images: true },
            },
          },
          orderBy: [{ order: "asc" }, { createdAt: "desc" }],
        },
        _count: {
          select: { galleries: true },
        },
      },
    })

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    return NextResponse.json(category)
  } catch (error) {
    console.error("Error fetching category:", error)
    return NextResponse.json({ error: "Failed to fetch category" }, { status: 500 })
  }
}

// PUT /api/categories/[id] - Update category
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const session = await auth()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const validatedData = categoryUpdateSchema.parse(body)

    // Check if category exists
    const existingCategory = await prisma.category.findUnique({
      where: { id: params.id },
    })

    if (!existingCategory) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    // Check if slug is being updated and if it already exists
    if (validatedData.slug && validatedData.slug !== existingCategory.slug) {
      const slugExists = await prisma.category.findUnique({
        where: { slug: validatedData.slug },
      })

      if (slugExists) {
        return NextResponse.json({ error: "Category with this slug already exists" }, { status: 400 })
      }
    }

    const category = await prisma.category.update({
      where: { id: params.id },
      data: validatedData,
    })

    return NextResponse.json(category)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid data", details: error.errors }, { status: 400 })
    }

    console.error("Error updating category:", error)
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 })
  }
}

// DELETE /api/categories/[id] - Delete category
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const session = await auth()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    // Check if category exists
    const existingCategory = await prisma.category.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: { galleries: true },
        },
      },
    })

    if (!existingCategory) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    // Check if category has galleries
    if (existingCategory._count.galleries > 0) {
      return NextResponse.json({ error: "Cannot delete category with existing galleries" }, { status: 400 })
    }

    await prisma.category.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: "Category deleted successfully" })
  } catch (error) {
    console.error("Error deleting category:", error)
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 })
  }
}
