import { brewSteps } from "@/data/products";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const icons = [
  <svg key="sachet" viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M7 3h10v18H7z" />
    <path d="M9 7h6M9 11h6M9 15h4" />
  </svg>,
  <svg key="water" viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M12 3c3 4 5 6.7 5 10a5 5 0 1 1-10 0c0-3.3 2-6 5-10Z" />
    <path d="M15 14a3 3 0 0 1-3 3" />
  </svg>,
  <svg key="stir" viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M7 8h10v8a4 4 0 0 1-4 4h-2a4 4 0 0 1-4-4V8Z" />
    <path d="M9 3l6 9" />
  </svg>
];

export function HowToBrew() {
  return (
    <section id="brew" className="py-24">
      <div className="section-shell">
        <Reveal>
          <SectionHeading
            eyebrow="How to Brew"
            title="Three easy steps for a soft peach milk tea moment."
            description="Simple to make, easy to love, and polished enough for everyday café-style sipping."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {brewSteps.map((step, index) => (
            <Reveal key={step.title} delayMs={index * 120}>
              <article className="flex h-full min-h-[17rem] flex-col rounded-[2rem] border border-white/70 bg-white/72 p-8 shadow-soft">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blush text-coral">
                  {icons[index]}
                </div>
                <p className="mt-6 text-sm font-semibold uppercase tracking-[0.28em] text-coral">
                  {step.title}
                </p>
                <p className="mt-3 text-lg leading-8 text-espresso">{step.body}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delayMs={160}>
          <p className="mt-8 rounded-[1.5rem] border border-[#f3d4cf] bg-[#fff7f5] px-6 py-5 text-base leading-7 text-rosewood">
            Best served cold for a refreshing peach tea experience, or warm for a cozy milk tea moment.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
