import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { z } from "zod"

const settingSchema = z.object({
  key: z.string().min(1, "Key is required"),
  value: z.string(),
  description: z.string().optional(),
})

// GET /api/settings - Get all settings
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const key = searchParams.get("key")

  try {
    if (key) {
      const setting = await prisma.settings.findUnique({
        where: { key },
      })
      return NextResponse.json(setting)
    }

    const settings = await prisma.settings.findMany({
      orderBy: { key: "asc" },
    })

    return NextResponse.json(settings)
  } catch (error) {
    console.error("Error fetching settings:", error)
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 })
  }
}

// POST /api/settings - Create or update setting
export async function POST(request: Request) {
  const session = await auth()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const validatedData = settingSchema.parse(body)

    const setting = await prisma.settings.upsert({
      where: { key: validatedData.key },
      update: {
        value: validatedData.value,
        description: validatedData.description,
      },
      create: validatedData,
    })

    return NextResponse.json(setting)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid data", details: error.errors }, { status: 400 })
    }

    console.error("Error creating/updating setting:", error)
    return NextResponse.json({ error: "Failed to save setting" }, { status: 500 })
  }
}
