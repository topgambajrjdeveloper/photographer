import { ContactForm } from "@/components/contact-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact | Photography Portfolio",
  description: "Get in touch for photography services and inquiries",
}

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Get in Touch</h1>
        <p className="text-lg text-neutral-300 mb-8">
          Interested in working together? Fill out the form below with details about your project, and I'll get back to
          you as soon as possible.
        </p>
        <ContactForm />

        <div className="mt-16 grid sm:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-medium mb-2">Email</h3>
            <p className="text-neutral-300">contact@photographyportfolio.com</p>
          </div>
          <div>
            <h3 className="text-xl font-medium mb-2">Based in</h3>
            <p className="text-neutral-300">Barcelona, Spain</p>
            <p className="text-neutral-300">Available for worldwide assignments</p>
          </div>
        </div>
      </div>
    </div>
  )
}
