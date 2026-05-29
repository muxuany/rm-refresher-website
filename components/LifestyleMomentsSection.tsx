import Image from "next/image";
import Link from "next/link";
import { lifestyleMoments } from "@/data/products";
import { Reveal } from "./Reveal";

export function LifestyleMomentsSection() {
  return (
    <section className="section-shell py-24">
      <Reveal>
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-coral">
            Lifestyle
          </p>
          <h2 className="mt-4 font-display text-4xl leading-tight text-espresso sm:text-5xl">
            Made for everyday moments.
          </h2>
          <p className="mt-4 text-lg leading-8 text-rosewood">
            Milk tea for movement, pauses, and quiet comfort.
          </p>
        </div>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-2">
        {lifestyleMoments.map((moment, index) => (
          <Reveal key={moment.title} delayMs={index * 110}>
            <article className="group overflow-hidden">
              <div className="relative overflow-hidden rounded-[1.75rem]">
                <Image
                  src={moment.image}
                  alt={moment.alt}
                  width={1672}
                  height={941}
                  className="h-[20rem] w-full object-cover transition duration-700 group-hover:scale-[1.03] sm:h-[24rem]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[rgba(63,38,30,0.6)] to-transparent p-6">
                  <p className="text-2xl font-display text-white">{moment.title}</p>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delayMs={200}>
        <div className="mt-10">
          <Link
            href="/lifestyle"
            className="inline-flex rounded-full border border-[#e6c9c2] bg-white/70 px-6 py-3 text-sm font-semibold text-espresso transition hover:-translate-y-0.5 hover:bg-white"
          >
            View Lifestyle Gallery
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
