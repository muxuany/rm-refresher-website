import { benefits } from "@/data/products";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const benefitIcons = [
  <svg key="milk" viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M9 3h6v5l2 3v7a3 3 0 0 1-3 3h-4a3 3 0 0 1-3-3v-7l2-3V3Z" />
  </svg>,
  <svg key="sugar" viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M8 4h8l4 8-4 8H8l-4-8 4-8Z" />
    <path d="M9 9h6M9 12h6M9 15h4" />
  </svg>,
  <svg key="coloring" viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M5 19 19 5" />
    <path d="M9 5h10v10" />
    <path d="M6 10V5h5" />
  </svg>,
  <svg key="pouch" viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M7 3h10l-1 4 2 5v7H6v-7l2-5-1-4Z" />
  </svg>,
  <svg key="everyday" viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M4 13a8 8 0 1 0 16 0" />
    <path d="M12 3v5" />
    <path d="M8 17h8" />
  </svg>
];

export function BenefitsSection() {
  return (
    <section className="py-24">
      <div className="section-shell">
        <Reveal>
          <SectionHeading
            eyebrow="Why RM Refresher"
            title="Thoughtful product details for everyday preparation."
            description="Built to be elegant on shelf, easy to prepare, and comforting to sip."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
          {benefits.map((benefit, index) => (
            <Reveal key={benefit.title} delayMs={index * 100}>
              <article className="flex h-full min-h-[16rem] flex-col rounded-[2rem] border border-white/70 bg-white/78 p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-glow">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blush text-coral">
                  {benefitIcons[index]}
                </div>
                <h3 className="mt-5 text-xl font-semibold leading-8 text-espresso">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-base leading-7 text-rosewood">
                  {benefit.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
