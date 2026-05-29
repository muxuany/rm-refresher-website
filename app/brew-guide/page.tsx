import Image from "next/image";
import { BenefitsSection } from "@/components/BenefitsSection";
import { Footer } from "@/components/Footer";
import { HowToBrew } from "@/components/HowToBrew";
import { Navbar } from "@/components/Navbar";
import { SubpageHero } from "@/components/SubpageHero";

export default function BrewGuidePage() {
  return (
    <main>
      <Navbar />
      <SubpageHero
        eyebrow="Brew Guide"
        title="Simple preparation for everyday café-style sipping."
        description="A quick guide for warm or chilled milk tea moments at home, in the office, or on the go."
        image="/images/product-peach-still-life.png"
        imageAlt="Peach Oolong Plum product still life used for the brew guide page"
      />
      <section className="section-shell pt-14">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-white/70 bg-white shadow-soft">
          <Image
            src="/images/brew-guide-foldable-pouch-brown-sugar.jpg"
            alt="Foldable pouch guide showing how to flip, fold, and pour Brown Sugar RM Refresher"
            width={2000}
            height={2000}
            className="h-auto w-full"
            sizes="(min-width: 1024px) 1024px, 100vw"
          />
        </div>
      </section>
      <HowToBrew />
      <BenefitsSection />
      <Footer />
    </main>
  );
}
