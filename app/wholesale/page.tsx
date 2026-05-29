import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { SubpageHero } from "@/components/SubpageHero";

export default function WholesalePage() {
  return (
    <main>
      <Navbar />
      <SubpageHero
        eyebrow="Wholesale"
        title="Bring RM Refresher into retail, café, and pantry spaces."
        description="Reach out for product inquiries, wholesale details, and collection availability."
        image="/images/Hero image.jpg"
        imageAlt="RM Refresher flavor lineup arranged as a wholesale brand presentation"
      />
      <ContactSection />
      <Footer />
    </main>
  );
}
