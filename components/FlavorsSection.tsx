import Image from "next/image";
import { products } from "@/data/products";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function FlavorsSection() {
  return (
    <section id="flavors" className="py-24">
      <div className="section-shell">
        <Reveal>
          <SectionHeading
            eyebrow="Three Flavors"
            title="A signature trio designed around soft café comfort."
            description="Peach leads the collection with a bright floral profile, supported by creamy taro and rich brown sugar."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.16fr_0.84fr_0.84fr]">
          {products.map((product, index) => {
            const isFeatured = Boolean(product.featured);

            return (
              <Reveal key={product.slug} delayMs={index * 120}>
                <article
                  id={product.slug}
                  className={`group flex h-full flex-col rounded-[2rem] border border-white/70 p-6 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-glow ${
                    isFeatured ? "lg:min-h-[32rem]" : "lg:min-h-[28rem]"
                  }`}
                  style={{
                    background: `linear-gradient(180deg, ${product.accentSoft} 0%, rgba(255,255,255,0.85) 100%)`
                  }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      {product.badge ? (
                        <span className="inline-flex rounded-full bg-white/85 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-coral">
                          {product.badge}
                        </span>
                      ) : null}
                      {product.label ? (
                        <p className="mt-3 text-sm font-medium text-rosewood">{product.label}</p>
                      ) : null}
                    </div>
                    <span
                      className="h-4 w-4 rounded-full shadow-sm"
                      style={{ backgroundColor: product.accent }}
                      aria-hidden="true"
                    />
                  </div>

                  <h3 className={`mt-6 font-display text-3xl text-espresso ${isFeatured ? "sm:text-4xl" : ""}`}>
                    {product.name}
                  </h3>
                  <p className="mt-4 max-w-md text-base leading-7 text-rosewood">
                    {product.description}
                  </p>

                  <div className="mt-8 flex-1">
                    <div
                      className={`rounded-[1.5rem] border border-white/70 bg-white/60 transition duration-300 group-hover:scale-[1.01] ${
                        isFeatured ? "p-4" : "p-3"
                      }`}
                    >
                      <div
                        className={`relative overflow-hidden rounded-[1.25rem] ${
                          isFeatured ? "h-72" : "h-60"
                        }`}
                      >
                        <div
                          className="absolute inset-0"
                          style={{
                            backgroundImage: `linear-gradient(135deg, ${product.accentSoft} 10%, rgba(255,255,255,0.9) 100%)`
                          }}
                        />
                        <Image
                          src={product.image}
                          alt={product.imageAlt}
                          fill
                          className="object-cover"
                          sizes={isFeatured ? "(min-width: 1024px) 38vw, 100vw" : "(min-width: 1024px) 26vw, 100vw"}
                        />
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
