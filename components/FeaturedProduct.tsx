import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function FeaturedProduct() {
  const product = products[0];

  return (
    <section id="featured" className="py-24">
      <div className="section-shell">
        <Reveal>
          <SectionHeading
            eyebrow="Signature Highlight"
            title="Peach Oolong Plum leads a signature trio designed for soft café-style indulgence."
            description="Peach brings the bright floral lift, while Taro and Brown Sugar round out the lineup with comforting, creamy depth."
          />
        </Reveal>

        <Reveal delayMs={140}>
          <article className="card-sheen relative mt-10 overflow-hidden rounded-[2rem] border border-white/60 bg-gradient-to-br from-[#ffe8e4] via-[#ffd8d5] to-[#f4aaa6] p-8 shadow-glow sm:p-10 lg:p-12">
            <div className="absolute -left-10 top-8 h-40 w-40 rounded-full bg-white/40 blur-3xl" />
            <div className="absolute right-10 top-12 h-12 w-12 rotate-12 petal" />
            <div className="absolute bottom-16 left-12 h-10 w-10 -rotate-[25deg] petal" />
            <div className="absolute bottom-8 right-20 h-14 w-14 rotate-45 petal" />

            <div className="relative grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-end">
              <div>
                <span className="inline-flex rounded-full border border-white/70 bg-white/50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-coral">
                  Premium Product Card
                </span>
                <h3 className="mt-6 font-display text-4xl text-espresso sm:text-5xl">
                  {product.name}
                </h3>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-[#6f4a40]">
                  Fruity, floral, and creamy with a refreshing tea finish.
                </p>

                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {product.benefits?.map((benefit) => (
                    <li
                      key={benefit}
                      className="rounded-2xl bg-white/60 px-4 py-3 text-sm font-medium text-rosewood shadow-soft"
                    >
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[1.75rem] border border-white/70 bg-white/35 p-6 backdrop-blur-md">
                <div className="overflow-hidden rounded-[1.4rem] border border-white/80 bg-white/60">
                  <Image
                    src={product.image}
                    alt={product.imageAlt}
                    width={545}
                    height={750}
                    className="h-56 w-full object-cover object-center"
                  />
                </div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-coral">
                  Crafted for café-style sipping
                </p>
                <p className="mt-5 text-base leading-7 text-[#6b4d44]">
                  From home kitchens to coffee counters, the RM Refresher collection brings
                  three distinct milk tea moments to the table, with Peach as the hero flavor.
                </p>
                <Link
                  href="#wholesale"
                  className="mt-8 inline-flex rounded-full bg-espresso px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#2d1a15]"
                >
                  Request Wholesale Info
                </Link>
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
