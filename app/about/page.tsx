import Image from "next/image";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Reveal } from "@/components/Reveal";
import { SubpageHero } from "@/components/SubpageHero";

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <SubpageHero
        eyebrow="About"
        title="A modern milk tea brand shaped around soft flavor, warmth, and ease."
        description="RM Refresher is built to bring real-milk instant drinks into everyday life with a more elevated feel."
        image="/images/lifestyle-drinks-desserts.png"
        imageAlt="RM Refresher drinks and desserts arranged as part of the brand story"
      />

      <section className="section-shell py-24">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <div className="max-w-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-coral">
                Brand Story
              </p>
              <h2 className="mt-4 font-display text-4xl leading-tight text-espresso sm:text-5xl">
                Real milk tea made to feel effortless, polished, and easy to enjoy.
              </h2>
              <p className="mt-6 text-lg leading-8 text-rosewood">
                From peach-led refreshment to taro comfort and brown sugar warmth, the collection
                is designed to fit quiet mornings, quick breaks, and small hosting moments.
              </p>
            </div>
          </Reveal>

          <Reveal delayMs={140}>
            <div className="overflow-hidden rounded-[2rem] shadow-soft">
              <Image
                src="/images/Hero image.jpg"
                alt="RM Refresher signature trio presented in a bright kitchen setting"
                width={1365}
                height={768}
                className="h-[26rem] w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
