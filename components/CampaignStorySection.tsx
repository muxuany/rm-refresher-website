import Image from "next/image";
import { Reveal } from "./Reveal";

export function CampaignStorySection() {
  return (
    <section className="section-shell py-24">
      <Reveal>
        <article className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div className="relative overflow-hidden">
            <Image
              src="/images/lifestyle-gathering.png"
              alt="Friends gathering at home with RM Refresher milk tea drinks and foldable pouches"
              width={1672}
              height={941}
              className="h-[30rem] w-full object-cover transition duration-700 hover:scale-[1.02] sm:h-[38rem]"
            />
          </div>

          <div className="px-0 lg:px-8 lg:pb-6">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-coral">
              Lifestyle
            </p>
            <h2 className="mt-4 max-w-md font-display text-4xl leading-tight text-espresso sm:text-5xl">
              Made for everyday moments.
            </h2>
            <p className="mt-4 max-w-md text-lg leading-8 text-rosewood">
              Milk tea for movement, pauses, and quiet comfort.
            </p>
          </div>
        </article>
      </Reveal>
    </section>
  );
}
