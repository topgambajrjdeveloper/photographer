import type React from "react"
import { AdminSidebar } from "@/components/admin/sidebar"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { AuthGuard } from "@/components/admin/auth-guard"
import { SessionProvider } from "@/components/session-provider"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session) {
    redirect("/api/auth/signin")
  }

  return (
   <SessionProvider>
      <AuthGuard>
        <div className="flex min-h-screen">
          <AdminSidebar />
          <div className="flex-1 p-8">{children}</div>
        </div>
      </AuthGuard>
    </SessionProvider>
  )
}
