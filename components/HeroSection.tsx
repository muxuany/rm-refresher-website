"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";

type FlavorSlide = {
  eyebrow: string;
  title: string;
  text: string;
  image: string;
  alt: string;
  ctaLabel: string;
  ctaHref: string;
  textAlign?: "left" | "right";
  pouchFeature?: {
    eyebrow: string;
    title: string;
    body: string;
    highlights: string[];
  };
};

const flavorSlides: FlavorSlide[] = [
  {
    eyebrow: "Signature Flavor",
    title: "Peach Oolong Plum",
    text: "Soft peach notes, gentle oolong depth, and a smooth plum finish.",
    image: "/images/scroll peach.png",
    alt: "Peach Oolong Plum flavor slide with peach fruit and a soft blush wave accent",
    ctaLabel: "Shop Now",
    ctaHref: "/flavors#peach-oolong-plum",
    textAlign: "left",
    pouchFeature: {
      eyebrow: "New Packaging",
      title: "New Foldable Pouch Design",
      body:
        "RM Refresher introduces a flexible pouch that stands neatly on the counter, folds down for storage, and keeps every scoop easy to reach.",
      highlights: ["Self-standing", "Foldable storage", "Easy to scoop"]
    }
  },
  {
    eyebrow: "Creamy Favorite",
    title: "Taro Flavor",
    text: "Smooth, comforting, and creamy with a mellow taro finish.",
    image: "/images/scroll taro.png",
    alt: "Taro flavor slide with taro root and a lavender wave accent",
    ctaLabel: "Explore Flavor",
    ctaHref: "/flavors#taro-flavor",
    textAlign: "right"
  },
  {
    eyebrow: "Warm & Sweet",
    title: "Brown Sugar Flavor",
    text: "Rich brown sugar flavor with a cozy milk tea profile.",
    image: "/images/scroll brown sugar.png",
    alt: "Brown Sugar flavor slide with warm brown sugar elements and a caramel wave accent",
    ctaLabel: "Explore Flavor",
    ctaHref: "/flavors#brown-sugar-flavor",
    textAlign: "right"
  },
  {
    eyebrow: "Three Signature Milk Teas",
    title: "Find Your Everyday Sip",
    text: "Peach, taro, and brown sugar — crafted for every mood and moment.",
    image: "/images/scroll three flavors.png",
    alt: "All three RM Refresher flavors together with a blended multicolor wave accent",
    ctaLabel: "Explore Flavors",
    ctaHref: "/flavors",
    textAlign: "right"
  }
];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);

  useEffect(() => {
    function updateProgress() {
      const node = sectionRef.current;

      if (!node) {
        return;
      }

      const rect = node.getBoundingClientRect();
      const total = Math.max(node.offsetHeight - window.innerHeight, 1);
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      setProgress(scrolled / total);
      setViewportWidth(window.innerWidth);
    }

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  const activeIndex = Math.min(
    flavorSlides.length - 1,
    Math.round(progress * (flavorSlides.length - 1))
  );

  return (
    <>
      <section className="bg-[#fff7f1] lg:hidden">
        <div className="flex snap-x snap-mandatory overflow-x-auto">
          {flavorSlides.map((slide) => (
            <MobileFlavorSlide key={slide.title} slide={slide} />
          ))}
        </div>
      </section>

      <section
        id="home"
        ref={sectionRef}
        className="relative hidden h-[400vh] bg-[#fff7f1] lg:block"
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="relative h-full w-full">
            {flavorSlides.map((slide, index) => (
              <FlavorShowcaseSlide
                key={slide.title}
                slide={slide}
                layout={getStackedSlideLayout(index, progress, viewportWidth)}
                zIndex={index + 1}
              />
            ))}
          </div>

          <div className="pointer-events-none absolute bottom-10 left-1/2 flex -translate-x-1/2 gap-2">
            {flavorSlides.map((slide, index) => (
              <span
                key={slide.title}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === activeIndex ? "w-12 bg-white" : "w-5 bg-white/45"
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function FlavorShowcaseSlide({
  slide,
  layout,
  zIndex
}: {
  slide: FlavorSlide;
  layout: CSSProperties & { contentOpacity: number };
  zIndex: number;
}) {
  const textPosition =
    slide.textAlign === "right"
      ? "items-end text-right lg:pr-[12vw]"
      : "items-start text-left lg:pl-[8vw]";

  return (
    <div
      className="absolute inset-y-0 right-0 overflow-hidden will-change-transform"
      style={{ width: layout.width, transform: layout.transform, zIndex }}
    >
      <article
        className={`absolute inset-y-0 right-0 h-screen w-screen overflow-hidden ${
          slide.pouchFeature ? "bg-white" : "bg-[#fff7f1]"
        }`}
      >
        <div className={`absolute inset-0 ${slide.pouchFeature ? "bg-white" : "bg-[#fff7f1]"}`} />
        <div className="absolute inset-0 z-10">
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            priority
            className="object-cover object-right"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[rgba(255,248,241,0.10)] via-transparent to-[rgba(255,248,241,0.06)]" />
        <div
          className={`absolute inset-y-0 z-20 hidden w-[58vw] lg:block ${
            slide.textAlign === "right"
              ? "right-0 bg-gradient-to-l from-[rgba(255,248,241,0.88)] via-[rgba(255,248,241,0.58)] to-transparent"
              : "left-0 bg-gradient-to-r from-[rgba(255,248,241,0.86)] via-[rgba(255,248,241,0.54)] to-transparent"
          }`}
        />
        {slide.pouchFeature ? (
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-20 hidden w-[min(48vw,44rem)] flex-col justify-center py-24 pl-[9vw] pr-8 text-left lg:flex xl:pl-32 xl:pr-12"
            style={{ opacity: layout.contentOpacity }}
          >
            <PouchPanelShape />
            <div className="relative z-10">
              <PouchDesignCallout feature={slide.pouchFeature} />
            </div>
          </div>
        ) : null}

        <div
          className={`relative z-30 flex h-full justify-end transition-opacity duration-500 ${textPosition}`}
          style={{ opacity: layout.contentOpacity }}
        >
          <div className="mt-28 flex max-w-[34rem] flex-col px-6 sm:px-8 lg:mt-32">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#f18a84]">
              {slide.eyebrow}
            </p>
            <h1 className="mt-5 font-display text-5xl leading-[0.92] text-espresso sm:text-6xl xl:text-7xl">
              {slide.title}
            </h1>
            <p className="mt-5 max-w-md text-lg leading-8 text-rosewood">
              {slide.text}
            </p>
            <div className="mt-8">
              <Link
                href={slide.ctaHref}
                className="inline-flex rounded-full bg-espresso px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#2f1c16]"
              >
                {slide.ctaLabel}
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

function PouchDesignCallout({
  feature,
  compact = false
}: {
  feature: NonNullable<FlavorSlide["pouchFeature"]>;
  compact?: boolean;
}) {
  return (
    <div className="max-w-sm">
      <p
        className={`font-semibold uppercase text-coral ${
          compact ? "text-[10px] tracking-[0.22em]" : "text-xs tracking-[0.28em]"
        }`}
      >
        {feature.eyebrow}
      </p>
      <h2
        className={`mt-4 font-display leading-tight text-espresso ${
          compact ? "text-[1.35rem] sm:text-2xl md:text-3xl" : "text-4xl xl:text-5xl"
        }`}
      >
        {feature.title}
      </h2>
      <p
        className={`${
          compact ? "mt-3 text-[0.72rem] leading-5 sm:text-sm sm:leading-6" : "mt-5 text-lg leading-8"
        } text-rosewood`}
      >
        {feature.body}
      </p>
      <div className={`flex flex-wrap gap-2 ${compact ? "mt-4" : "mt-7"}`}>
        {feature.highlights.map((highlight) => (
          <span
            key={highlight}
            className={`rounded-full border border-[#f0d9d4] bg-[#fff8f5] font-semibold text-rosewood ${
              compact ? "px-2 py-1 text-[10px]" : "px-3 py-1.5 text-xs"
            }`}
          >
            {highlight}
          </span>
        ))}
      </div>
    </div>
  );
}

function PouchPanelShape() {
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 h-full w-full drop-shadow-[-18px_0_42px_rgba(63,38,30,0.06)]"
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
    >
      <path
        d="M9 0H100V100H0C10 88 2 76 8 65C17 52 3 42 10 31C18 18 0 9 9 0Z"
        fill="white"
      />
    </svg>
  );
}

function getStackedSlideLayout(
  index: number,
  progress: number,
  viewportWidth: number
): CSSProperties & { contentOpacity: number } {
  if (!viewportWidth) {
    return {
      width: "100vw",
      transform: "translate3d(0,0,0)",
      contentOpacity: 1
    };
  }

  const stage = progress * (flavorSlides.length - 1);
  const baseIndex = Math.floor(stage);
  const t = stage - baseIndex;

  const peeks = [viewportWidth, 176, 120, 76];

  const distance = index - baseIndex;
  let width = 0;
  let x = 0;
  let contentOpacity = 0;

  if (distance < 0) {
    width = viewportWidth;
    x = -viewportWidth;
  } else if (distance === 0) {
    width = viewportWidth;
    x = -viewportWidth * t;
    contentOpacity = 1 - Math.min(t * 1.35, 1);
  } else if (distance < peeks.length) {
    const startWidth = peeks[distance];
    const endWidth = peeks[distance - 1];
    width = startWidth + (endWidth - startWidth) * t;
    contentOpacity = distance === 1 ? Math.max(0, (t - 0.28) / 0.54) : 0;
  } else {
    width = 0;
  }

  return {
    width: `${width}px`,
    transform: `translate3d(${x}px, 0, 0)`,
    contentOpacity
  };
}

function MobileFlavorSlide({ slide }: { slide: FlavorSlide }) {
  return (
    <article
      className={`relative h-[88svh] w-full min-w-full snap-start overflow-hidden ${
        slide.pouchFeature ? "bg-white" : "bg-[#fff7f1]"
      }`}
    >
      <div className={`absolute inset-0 ${slide.pouchFeature ? "bg-white" : "bg-[#fff7f1]"}`} />
      <Image
        src={slide.image}
        alt={slide.alt}
        fill
        priority
        className="object-cover object-right"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(63,38,30,0.58)] via-[rgba(63,38,30,0.15)] to-transparent" />
      <div className="absolute inset-y-0 left-0 w-[62vw] bg-gradient-to-r from-[rgba(63,38,30,0.34)] via-[rgba(63,38,30,0.18)] to-transparent" />
      {slide.pouchFeature ? (
        <div className="absolute inset-y-0 right-0 z-20 flex w-[50vw] min-w-[16rem] max-w-[28rem] flex-col justify-center py-6 pl-16 pr-4 text-left sm:w-[48vw] sm:min-w-[18rem] sm:pl-20 md:w-[46vw] md:min-w-[20rem] md:pl-24 md:pr-6 lg:hidden">
          <PouchPanelShape />
          <div className="relative z-10">
            <PouchDesignCallout feature={slide.pouchFeature} compact />
          </div>
        </div>
      ) : null}
      <div className="absolute inset-x-0 bottom-0 z-30 p-6 text-white">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#ffe7e2]">
          {slide.eyebrow}
        </p>
        <h1
          className={`mt-4 font-display text-5xl leading-[0.95] ${
            slide.pouchFeature ? "max-w-[17rem] sm:max-w-sm" : "max-w-sm"
          }`}
        >
          {slide.title}
        </h1>
        <p
          className={`mt-4 text-base leading-7 text-[#fff1ee] ${
            slide.pouchFeature ? "max-w-[17rem] sm:max-w-sm" : "max-w-sm"
          }`}
        >
          {slide.text}
        </p>
        <div className="mt-7">
          <Link
            href={slide.ctaHref}
            className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-espresso"
          >
            {slide.ctaLabel}
          </Link>
        </div>
      </div>
    </article>
  );
}
