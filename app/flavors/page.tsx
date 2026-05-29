import Image from "next/image";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Reveal } from "@/components/Reveal";
import { SubpageHero } from "@/components/SubpageHero";
import { products } from "@/data/products";

export default function FlavorsPage() {
  return (
    <main>
      <Navbar />
      <SubpageHero
        eyebrow="Flavors"
        title="Three signature milk teas, introduced one by one."
        description="Peach Oolong Plum leads the collection, followed by soft taro comfort and brown sugar warmth."
        image="/images/Hero image.jpg"
        imageAlt="RM Refresher three-flavor lineup displayed together in a warm kitchen setting"
      />

      <section className="section-shell py-24">
        <div className="space-y-20">
          {products.map((product, index) => {
            const reverse = index % 2 === 1;

            return (
              <Reveal key={product.slug} delayMs={index * 90}>
                <article
                  id={product.slug}
                  className={`grid gap-8 lg:grid-cols-2 lg:items-center ${
                    reverse ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div className="overflow-hidden rounded-[2rem]">
                    <Image
                      src={product.image}
                      alt={product.imageAlt}
                      width={900}
                      height={1100}
                      className="h-[28rem] w-full object-cover transition duration-700 hover:scale-[1.02] sm:h-[34rem]"
                    />
                  </div>

                  <div
                    className="rounded-[2rem] px-2 py-2 sm:px-6"
                    style={{
                      background: `linear-gradient(180deg, ${product.accentSoft} 0%, rgba(255,255,255,0) 100%)`
                    }}
                  >
                    <p className="text-sm font-semibold uppercase tracking-[0.35em] text-coral">
                      {product.featured ? "Lead Flavor" : "Signature Flavor"}
                    </p>
                    <h2 className="mt-4 font-display text-4xl leading-tight text-espresso sm:text-5xl">
                      {product.name}
                    </h2>
                    <p className="mt-5 max-w-xl text-xl leading-8 text-rosewood">
                      {product.shortDescription}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">
                      {product.keywords?.map((keyword) => (
                        <span
                          key={keyword}
                          className="rounded-full border border-white/70 bg-white/75 px-4 py-2 text-sm font-medium text-rosewood shadow-soft"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>

                    <p className="mt-8 max-w-xl text-lg leading-8 text-rosewood">
                      {product.description}
                      {product.featured
                        ? " Peach Oolong Plum opens the lineup with a bright floral tone and a smoother tea finish, making it the signature entry point to the collection."
                        : product.slug === "taro-flavor"
                          ? " Taro brings a softer, more mellow mood to the range, with a creamy texture that feels especially easy to sip any time of day."
                          : " Brown Sugar closes the trio with a deeper, richer profile that feels warm, cozy, and naturally suited to dessert-like moments."}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <Footer />
    </main>
  );
}
