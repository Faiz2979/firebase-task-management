import CtaSection from '@/components/Landing-Section/CTA'
import FeaturesSection from '@/components/Landing-Section/Features'
import HeroSection from '@/components/Landing-Section/Hero'
import ProblemSection from '@/components/Landing-Section/Problem'
export default function LandingPage() {
  return (
    <div className="min-h-screen w-full bg-white">
      {/* Hero Section */}
      <HeroSection/>

      {/* Problem Statement Section */}
      <ProblemSection/>

      {/* Features Section */}
      <FeaturesSection/>

      {/* CTA Section */}
      <CtaSection/>
    </div>
  )
}