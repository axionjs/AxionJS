import "@/app/global.css";
import { Container } from "@/registry/new-york/ui/container";
import { HeroSection } from "./components/hero-section";
import FeatureGrid from "./components/featured-grid";
import { AnimatedBackground } from "./components/animated-background";

export default function AxionsJSLandingPage() {
  return (
    <div className="relative min-h-screen bg-background">
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Main Content Container */}
      <Container className="relative z-10 px-2 sm:px-4 md:px-6 lg:px-8">
        {/* Vertical lines inside container */}
        <div className="absolute inset-0 pointer-events-none hidden sm:block">
          <div className="absolute top-0 bottom-0 left-0 border-l border-border w-px"></div>
          <div className="absolute top-0 bottom-0 right-0 border-r border-border w-px"></div>
        </div>

        {/* Top border with margin - extending to edges */}
        <div className="relative mt-4 sm:mt-6">
          <div className="absolute left-1/2 -translate-x-1/2 w-screen border-t border-border"></div>
        </div>

        {/* Hero Section */}
        <div className="relative p-4 sm:p-8">
          <HeroSection />
        </div>

        {/* Section divider extending to edges */}
        <div className="relative">
          <div className="absolute left-1/2 -translate-x-1/2 w-screen border-t border-border"></div>
        </div>

        {/* Feature Grid Section */}
        <div className="relative">
          <FeatureGrid />
        </div>

        {/* Section divider extending to edges */}
        <div className="relative">
          <div className="absolute left-1/2 -translate-x-1/2 w-screen border-t border-border"></div>
        </div>
      </Container>
    </div>
  );
}
