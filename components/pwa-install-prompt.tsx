"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

export function PWAInstallPrompt() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setInstallPrompt(e as BeforeInstallPromptEvent)

      // Check if we should show the install prompt
      const hasPromptBeenShown = localStorage.getItem("pwa-prompt-shown")
      if (!hasPromptBeenShown) {
        setShowPrompt(true)
      }
    }

    window.addEventListener("beforeinstallprompt", handler)

    return () => {
      window.removeEventListener("beforeinstallprompt", handler)
    }
  }, [])

  const handleInstall = async () => {
    if (!installPrompt) return

    await installPrompt.prompt()
    const choiceResult = await installPrompt.userChoice

    if (choiceResult.outcome === "accepted") {
      console.log("User accepted the install prompt")
    } else {
      console.log("User dismissed the install prompt")
    }

    setInstallPrompt(null)
    setShowPrompt(false)
    localStorage.setItem("pwa-prompt-shown", "true")
  }

  const handleClose = () => {
    setShowPrompt(false)
    localStorage.setItem("pwa-prompt-shown", "true")
  }

  return (
    <Dialog open={showPrompt} onOpenChange={setShowPrompt}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Install Photography App</DialogTitle>
          <DialogDescription>
            Install this app on your device for quick access to galleries and a better viewing experience.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center py-4">
          <img src="/icon-192x192.png" alt="App Icon" className="w-24 h-24 rounded-xl shadow-lg" />
        </div>
        <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-2">
          <Button variant="outline" onClick={handleClose}>
            Not Now
          </Button>
          <Button onClick={handleInstall} className="gap-2">
            <Download className="h-4 w-4" />
            Install App
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
