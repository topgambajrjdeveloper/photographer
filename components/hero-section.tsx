import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <div className="relative h-[70vh] overflow-hidden rounded-xl">
      <Image src="/placeholder.svg?height=1080&width=1920" alt="Hero image" fill className="object-cover" priority />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16">
        <h1 className="text-3xl md:text-5xl font-bold max-w-2xl">Capturing moments that last a lifetime</h1>
        <p className="mt-4 max-w-xl text-neutral-200 text-lg">
          Professional photography that tells your story through a unique visual perspective
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button asChild size="lg">
            <Link href="/galleries">View Galleries</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
