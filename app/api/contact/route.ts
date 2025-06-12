import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { z } from "zod"

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

// GET /api/contact - Get all contact messages (admin only)
export async function GET(request: Request) {
  const session = await auth()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const status = searchParams.get("status")
  const limit = searchParams.get("limit")

  try {
    const where: any = {}
    if (status) where.status = status

    const contacts = await prisma.contact.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: limit ? Number.parseInt(limit) : undefined,
    })

    return NextResponse.json(contacts)
  } catch (error) {
    console.error("Error fetching contacts:", error)
    return NextResponse.json({ error: "Failed to fetch contacts" }, { status: 500 })
  }
}

// POST /api/contact - Create new contact message
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validatedData = contactSchema.parse(body)

    const contact = await prisma.contact.create({
      data: validatedData,
    })

    // Here you could add email notification logic
    // await sendEmailNotification(contact)

    return NextResponse.json({ message: "Message sent successfully", id: contact.id }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid data", details: error.errors }, { status: 400 })
    }

    console.error("Error creating contact:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}
