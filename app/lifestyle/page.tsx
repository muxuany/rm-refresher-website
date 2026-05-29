import Image from "next/image";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Reveal } from "@/components/Reveal";
import { SubpageHero } from "@/components/SubpageHero";
import { lifestyleMoments } from "@/data/products";

export default function LifestylePage() {
  return (
    <main>
      <Navbar />
      <SubpageHero
        eyebrow="Lifestyle"
        title="Made for everyday moments."
        description="A gallery of movement, pauses, and soft cafe-style comfort."
        image="/images/lifestyle-drinks-desserts.png"
        imageAlt="RM Refresher drinks and desserts styled as a cafe-like tabletop spread"
      />

      <section className="section-shell py-24">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-coral">
            Everyday Lifestyle
          </p>
          <h2 className="mt-4 font-display text-4xl leading-tight text-espresso sm:text-5xl">
            Reduced sugar blends made to fit movement, pauses, and everyday routines.
          </h2>
          <p className="mt-4 text-lg leading-8 text-rosewood">
            RM Refresher is designed for soft, everyday rituals, from post-run refreshment and yoga pauses to driving breaks, cozy nights, and simple cafe-style serving at home. With reduced sugar and a creamy milk tea profile, the collection is made to feel easy to return to throughout the day.
          </p>
          <p className="mt-4 text-lg leading-8 text-rosewood">
            The drinks also pair naturally alongside protein shakes and post-workout routines. You can enjoy RM Refresher as a separate milk tea moment after training, or serve it next to protein drinks when you want something smoother, warmer, and more comforting in the same routine.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {lifestyleMoments.map((moment, index) => (
            <Reveal key={moment.title} delayMs={index * 100}>
              <figure className="overflow-hidden rounded-[2rem] bg-white/40 shadow-soft">
                <Image
                  src={moment.image}
                  alt={moment.alt}
                  width={1672}
                  height={941}
                  className="h-[21rem] w-full object-cover transition duration-700 hover:scale-[1.02] sm:h-[26rem]"
                />
                <figcaption className="px-5 py-4 text-lg text-rosewood">{moment.title}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
