import { CampaignStorySection } from "@/components/CampaignStorySection";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { HomeCtaSection } from "@/components/HomeCtaSection";
import { IngredientSliderSection } from "@/components/IngredientSliderSection";
import { Navbar } from "@/components/Navbar";
import { SignatureFlavorsSection } from "@/components/SignatureFlavorsSection";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <CampaignStorySection />
      <IngredientSliderSection />
      <SignatureFlavorsSection />
      <HomeCtaSection />
      <Footer />
    </main>
  );
}
