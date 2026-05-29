"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ingredientSlides } from "@/data/products";
import { Reveal } from "./Reveal";

export function IngredientSliderSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % ingredientSlides.length);
    }, 4200);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="section-shell py-24">
      <Reveal>
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-coral">
            Ingredients
          </p>
          <h2 className="mt-4 font-display text-4xl leading-tight text-espresso sm:text-5xl">
            Built from soft flavor notes and warm ingredient stories.
          </h2>
        </div>
      </Reveal>

      <Reveal delayMs={120}>
        <div className="relative overflow-hidden">
          <div className="relative h-[28rem] sm:h-[34rem] lg:h-[40rem]">
            {ingredientSlides.map((slide, index) => (
              <div
                key={`${slide.title}-${slide.image}`}
                className={`absolute inset-0 transition-all duration-700 ${
                  index === activeIndex
                    ? "pointer-events-auto opacity-100"
                    : "pointer-events-none opacity-0"
                }`}
                aria-hidden={index !== activeIndex}
              >
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[rgba(63,38,30,0.42)] via-[rgba(63,38,30,0.12)] to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[rgba(63,38,30,0.48)] to-transparent" />
                <div className="absolute bottom-0 left-0 max-w-xl p-6 text-white sm:p-8 lg:p-10">
                  <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#ffe6e0]">
                    {slide.title}
                  </p>
                  <p className="mt-4 max-w-md font-display text-4xl leading-[0.96] sm:text-5xl">
                    {slide.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
