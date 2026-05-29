import Image from "next/image";
import { Reveal } from "./Reveal";

export function LifestyleSection() {
  return (
    <section className="py-24">
      <div className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <Reveal>
            <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/50 p-4 shadow-soft">
              <div className="overflow-hidden rounded-[1.6rem]">
                <Image
                  src="/images/lifestyle-drinks-desserts.png"
                  alt="RM Refresher milk tea drinks served in cups with desserts for a cozy café-style tabletop spread"
                  width={1672}
                  height={941}
                  className="h-full w-full object-cover transition duration-700 hover:scale-[1.02]"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delayMs={140}>
            <div className="rounded-[2rem] border border-white/70 bg-white/60 p-8 shadow-soft sm:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-coral">
                Lifestyle
              </p>
              <h2 className="mt-4 text-balance font-display text-4xl leading-tight text-espresso sm:text-5xl">
                Bring a café-style milk tea spread home.
              </h2>
              <p className="mt-6 text-lg leading-8 text-rosewood">
                From peach refreshers to taro and brown sugar favorites, RM Refresher makes it
                easy to enjoy café-style drinks alongside simple desserts and everyday treats.
              </p>
              <p className="mt-4 text-base leading-7 text-rosewood">
                Perfect for afternoon breaks, small gatherings, and easy at-home indulgence.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
