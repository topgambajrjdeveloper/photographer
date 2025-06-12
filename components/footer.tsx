"use client"

import Link from "next/link"
import { Instagram, Twitter, Facebook } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

export function Footer() {
  const isMobile = useMobile()

  // No renderizar el footer en dispositivos móviles
  if (isMobile) {
    return null
  }

  return (
    <footer className="border-t border-neutral-700 py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold">
              PHOTO<span className="text-neutral-400">GRAPHY</span>
            </h3>
            <p className="text-sm text-neutral-400">
              Capturing moments, creating memories, and telling stories through the lens.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Navigation</h3>
            <div className="flex flex-col space-y-2">
              <Link href="/" className="text-sm text-neutral-400 hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/galleries" className="text-sm text-neutral-400 hover:text-white transition-colors">
                Galleries
              </Link>
              <Link href="/categories" className="text-sm text-neutral-400 hover:text-white transition-colors">
                Categories
              </Link>
              <Link href="/about" className="text-sm text-neutral-400 hover:text-white transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-sm text-neutral-400 hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Legal</h3>
            <div className="flex flex-col space-y-2">
              <Link href="/privacy" className="text-sm text-neutral-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-neutral-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-sm text-neutral-400 hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Connect</h3>
            <div className="flex space-x-4">
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-neutral-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-neutral-400">
            &copy; {new Date().getFullYear()} Photography Portfolio. All rights reserved.
          </p>
          <p className="text-xs text-neutral-400 mt-4 md:mt-0">Designed and developed with passion</p>
        </div>
      </div>
    </footer>
  )
}
