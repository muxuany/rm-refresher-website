import Link from "next/link";
import { Reveal } from "./Reveal";

export function HomeCtaSection() {
  return (
    <section className="section-shell py-24">
      <Reveal>
        <div className="rounded-[2rem] border border-[#eed8cf] bg-[#fff6f2] px-6 py-12 text-center shadow-soft sm:px-10">
          <h2 className="font-display text-4xl text-espresso sm:text-5xl">
            Explore all three signature flavors.
          </h2>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/flavors"
              className="rounded-full bg-coral px-7 py-3 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-[#dd615d]"
            >
              View Flavors
            </Link>
            <Link
              href="/wholesale"
              className="rounded-full border border-[#e7c7c0] bg-white/80 px-7 py-3 text-sm font-semibold text-espresso transition hover:-translate-y-0.5 hover:bg-white"
            >
              Contact Wholesale
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
