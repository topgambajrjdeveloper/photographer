"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Home, ImageIcon, Grid, User, Mail } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Galleries", href: "/galleries", icon: ImageIcon },
  { name: "Categories", href: "/categories", icon: Grid },
  { name: "About", href: "/about", icon: User },
  { name: "Contact", href: "/contact", icon: Mail },
]

export function BottomTabBar() {
  const pathname = usePathname()
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)

  const isAdminPage = pathname?.startsWith("/admin")

  useEffect(() => {
    setMounted(true)

    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIsMobile()
    window.addEventListener("resize", checkIsMobile)

    return () => window.removeEventListener("resize", checkIsMobile)
  }, [])

  // Don't render until mounted and only on mobile and not admin pages
  if (!mounted || isAdminPage || !isMobile) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-neutral-900 border-t border-neutral-700 h-16 px-2">
      <nav className="flex items-center justify-around h-full">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link key={item.name} href={item.href} className="flex flex-col items-center justify-center w-full h-full">
              <Icon className={cn("h-5 w-5 mb-1", isActive ? "text-white" : "text-neutral-400")} />
              <span className={cn("text-xs", isActive ? "text-white font-medium" : "text-neutral-400")}>
                {item.name}
              </span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
