"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { LayoutDashboard, FolderOpen, Tags, Upload, Settings, LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const navItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Galleries", href: "/admin/galleries", icon: FolderOpen },
  { name: "Categories", href: "/admin/categories", icon: Tags },
  { name: "Upload Images", href: "/admin/upload", icon: Upload },
  // { name: "Settings", href: "/admin/settings", icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" })
  }

  return (
    <div className="w-64 border-r border-neutral-700 h-screen flex flex-col bg-neutral-900">
      <div className="p-6">
        <Link href="/" className="text-xl font-bold tracking-tight">
          PHOTO<span className="text-neutral-400">ADMIN</span>
        </Link>
      </div>

      {/* User info */}
      {session?.user && (
        <div className="px-6 py-4 border-b border-neutral-700">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={session.user.image || ""} />
              <AvatarFallback>
                <User className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{session.user.name || session.user.username}</p>
              <p className="text-xs text-neutral-400 truncate">{session.user.email}</p>
            </div>
          </div>
        </div>
      )}

      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-neutral-700 text-white"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-800",
              )}
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-neutral-700">
        <Button
          variant="ghost"
          className="w-full justify-start text-neutral-400 hover:text-white"
          onClick={handleSignOut}
        >
          <LogOut className="h-5 w-5 mr-3" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}
