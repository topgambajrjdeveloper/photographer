"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Home", href: "/" },
  { name: "Galleries", href: "/galleries" },
  { name: "Categories", href: "/categories" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Access", href: "/auth/signin" },
]

export function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
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

  if (isAdminPage) {
    return null
  }

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <header className="sticky top-0 z-40 w-full border-b border-neutral-700 bg-neutral-800/95 backdrop-blur supports-[backdrop-filter]:bg-neutral-800/80">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight">
            PHOTO<span className="text-neutral-400">GRAPHY</span>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-white",
                  pathname === item.href ? "text-white" : "text-neutral-400",
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-700 bg-neutral-800/95 backdrop-blur supports-[backdrop-filter]:bg-neutral-800/80">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight">
          PHOTO<span className="text-neutral-400">GRAPHY</span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-white",
                pathname === item.href ? "text-white" : "text-neutral-400",
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile menu button */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          <span className="sr-only">Toggle menu</span>
        </Button>
      </nav>

      {/* Mobile navigation dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden py-4 px-4 border-t border-neutral-700 bg-neutral-800">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-white",
                  pathname === item.href ? "text-white" : "text-neutral-400",
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
