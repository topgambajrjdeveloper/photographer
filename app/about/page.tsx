import Image from "next/image"
import { ShareButtons } from "@/components/share-buttons"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Me | Photography Portfolio",
  description: "Learn more about the photographer behind the lens",
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="relative aspect-square overflow-hidden rounded-lg">
          <Image
            src="/placeholder.svg?height=800&width=800"
            alt="Photographer portrait"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="space-y-6">
          <h1 className="text-4xl font-bold tracking-tight">About Me</h1>
          <p className="text-lg text-neutral-300">
            With over a decade of experience capturing moments that matter, I've developed a distinctive style that
            emphasizes natural light, authentic emotions, and the subtle beauty in everyday scenes.
          </p>
          <p className="text-neutral-300">
            My journey into photography began when I discovered my grandfather's vintage camera in our attic. What
            started as curiosity evolved into passion, and eventually into my profession. I've since worked with clients
            across the globe, from intimate weddings in Tuscany to corporate events in Tokyo.
          </p>
          <p className="text-neutral-300">
            When I'm not behind the lens, you'll find me exploring hiking trails, experimenting with new cooking
            recipes, or mentoring aspiring photographers in my community workshop.
          </p>
          <div className="pt-4">
            <h3 className="text-sm font-medium mb-2">Share this page</h3>
            <ShareButtons title="About the Photographer" path="/about" />
          </div>
        </div>
      </div>

      <div className="mt-16 space-y-8">
        <h2 className="text-2xl font-bold">My Approach</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <h3 className="text-xl font-medium">Authenticity</h3>
            <p className="text-neutral-300">
              I believe in capturing genuine moments rather than manufacturing them. My work focuses on revealing the
              true essence of my subjects.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="text-xl font-medium">Technical Excellence</h3>
            <p className="text-neutral-300">
              While creativity drives my vision, technical precision brings it to life. I'm meticulous about lighting,
              composition, and post-processing.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="text-xl font-medium">Collaboration</h3>
            <p className="text-neutral-300">
              Every project is a partnership. I work closely with clients to understand their vision and translate it
              into compelling imagery.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
