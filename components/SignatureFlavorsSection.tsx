import Image from "next/image";
import { products } from "@/data/products";
import { Reveal } from "./Reveal";

export function SignatureFlavorsSection() {
  return (
    <section className="section-shell py-24">
      <Reveal>
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-coral">
              Signature Flavors
            </p>
            <h2 className="mt-4 font-display text-4xl text-espresso sm:text-5xl">
              Three signature flavors, styled for everyday indulgence.
            </h2>
          </div>
        </div>
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr_0.95fr]">
        {products.map((product, index) => {
          const featured = Boolean(product.featured);

          return (
            <Reveal key={product.slug} delayMs={index * 120}>
              <article
                className={`group overflow-hidden ${
                  featured ? "lg:translate-y-0" : "lg:translate-y-8"
                }`}
              >
                <div className="relative overflow-hidden rounded-[1.75rem]" style={{ backgroundColor: product.accentSoft }}>
                  <Image
                    src={product.image}
                    alt={product.imageAlt}
                    width={featured ? 900 : 700}
                    height={featured ? 1100 : 900}
                    className={`w-full object-cover transition duration-700 group-hover:scale-[1.03] ${
                      featured ? "h-[36rem]" : "h-[31rem]"
                    }`}
                    sizes={featured ? "(min-width: 1024px) 34vw, 100vw" : "(min-width: 1024px) 30vw, 100vw"}
                  />
                </div>
                <div className="space-y-3 px-1 pt-5">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-display text-3xl text-espresso">{product.name}</h3>
                    {featured ? (
                      <span className="rounded-full border border-[#f0c1bd] bg-[#fff5f3] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-coral">
                        Featured
                      </span>
                    ) : null}
                  </div>
                  <p className="text-base text-rosewood">{product.shortDescription}</p>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
