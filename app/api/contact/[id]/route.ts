import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { z } from "zod"

const contactUpdateSchema = z.object({
  status: z.enum(["PENDING", "READ", "REPLIED", "ARCHIVED"]),
})

// GET /api/contact/[id] - Get single contact message
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const session = await auth()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const contact = await prisma.contact.findUnique({
      where: { id: params.id },
    })

    if (!contact) {
      return NextResponse.json({ error: "Contact message not found" }, { status: 404 })
    }

    // Mark as read if it was pending
    if (contact.status === "PENDING") {
      await prisma.contact.update({
        where: { id: params.id },
        data: { status: "READ" },
      })
    }

    return NextResponse.json(contact)
  } catch (error) {
    console.error("Error fetching contact:", error)
    return NextResponse.json({ error: "Failed to fetch contact message" }, { status: 500 })
  }
}

// PUT /api/contact/[id] - Update contact status
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const session = await auth()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const validatedData = contactUpdateSchema.parse(body)

    const contact = await prisma.contact.update({
      where: { id: params.id },
      data: validatedData,
    })

    return NextResponse.json(contact)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid data", details: error.errors }, { status: 400 })
    }

    console.error("Error updating contact:", error)
    return NextResponse.json({ error: "Failed to update contact message" }, { status: 500 })
  }
}

// DELETE /api/contact/[id] - Delete contact message
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const session = await auth()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    await prisma.contact.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: "Contact message deleted successfully" })
  } catch (error) {
    console.error("Error deleting contact:", error)
    return NextResponse.json({ error: "Failed to delete contact message" }, { status: 500 })
  }
}
