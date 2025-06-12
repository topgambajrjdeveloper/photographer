import { FeaturedGallery } from "@/components/featured-gallery"
import { HeroSection } from "@/components/hero-section"
import { RecentWork } from "@/components/recent-work"
import { CategoryShowcase } from "@/components/category-showcase"

export default async function Home() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-16">
      <HeroSection />
      <FeaturedGallery />
      <CategoryShowcase />
      <RecentWork />
    </div>
  )
}
