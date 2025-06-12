"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      setShowConsent(true)
    }
  }, [])

  const acceptAll = () => {
    localStorage.setItem("cookie-consent", "all")
    setShowConsent(false)
  }

  const acceptEssential = () => {
    localStorage.setItem("cookie-consent", "essential")
    setShowConsent(false)
  }

  return (
    <Dialog open={showConsent} onOpenChange={setShowConsent}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Cookie Consent</DialogTitle>
          <DialogDescription>
            We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our
            traffic. By clicking "Accept All", you consent to our use of cookies.
          </DialogDescription>
        </DialogHeader>
        <div className="text-sm text-neutral-400">
          <p>
            Essential cookies help make our website usable by enabling basic functions like page navigation and access
            to secure areas of the website. The website cannot function properly without these cookies.
          </p>
          <p className="mt-2">
            Analytics cookies help us understand how visitors interact with our website by collecting and reporting
            information anonymously.
          </p>
        </div>
        <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-2">
          <Button variant="outline" onClick={acceptEssential}>
            Essential Only
          </Button>
          <Button onClick={acceptAll}>Accept All</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
