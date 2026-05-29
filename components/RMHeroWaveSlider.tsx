/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  type Transition
} from "framer-motion";
import { useRef, useState } from "react";

type Slide = {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  description: string;
  bg: string;
  stripColor: string;
  ctaLabel: string;
  href: string;
  artImage: string;
  artAlt: string;
  artClassName: string;
};

const slides: Slide[] = [
  {
    id: "peach",
    label: "RM Refresher",
    title: "Peach Oolong Plum",
    subtitle: "Instant Beverage Powder",
    description: "A soft fruity tea refreshment with peach, oolong, and plum notes.",
    bg: "linear-gradient(135deg, #fff8f4 0%, #fee8e1 40%, #f7b5af 100%)",
    stripColor: "#ef9f9a",
    ctaLabel: "Explore Peach",
    href: "/flavors#peach-oolong-plum",
    artImage: "/images/hero/peach-wave.png",
    artAlt: "Peach Oolong Plum hero art",
    artClassName: "left-[-2%] top-0 h-full w-[88%] object-cover object-left"
  },
  {
    id: "taro",
    label: "RM Refresher",
    title: "Taro Flavor",
    subtitle: "Instant Milk Tea Powder",
    description: "A creamy taro milk tea flavor with a soft lavender finish and smooth dessert-like taste.",
    bg: "linear-gradient(135deg, #fbf8ff 0%, #ede1ff 40%, #c7aff0 100%)",
    stripColor: "#b495e7",
    ctaLabel: "Explore Taro",
    href: "/flavors#taro-flavor",
    artImage: "/images/hero/taro-wave.png",
    artAlt: "Taro hero art",
    artClassName: "left-[-1%] top-0 h-full w-[87%] object-cover object-left"
  },
  {
    id: "brown-sugar",
    label: "RM Refresher",
    title: "Brown Sugar Flavor",
    subtitle: "Instant Milk Tea Powder",
    description: "Rich caramel brown sugar flavor with a creamy milk tea finish.",
    bg: "linear-gradient(135deg, #fff8ef 0%, #f3d3a1 40%, #cb8d3d 100%)",
    stripColor: "#c38134",
    ctaLabel: "Explore Brown Sugar",
    href: "/flavors#brown-sugar-flavor",
    artImage: "/images/hero/brown-sugar-wave.png",
    artAlt: "Brown Sugar hero art",
    artClassName: "left-[-2%] top-0 h-full w-[88%] object-cover object-left"
  },
  {
    id: "together",
    label: "RM Refresher Collection",
    title: "All Products Together",
    subtitle: "Three Flavors, One Flexible Pouch",
    description: "Peach Oolong Plum, Taro, and Brown Sugar presented as one soft lifestyle-ready collection.",
    bg: "linear-gradient(135deg, #fff8f3 0%, #f7dce4 38%, #d5b5ef 100%)",
    stripColor: "#d3a09a",
    ctaLabel: "View Collection",
    href: "/flavors",
    artImage: "/images/hero/all-products-wave.png",
    artAlt: "RM Refresher full collection hero art",
    artClassName: "left-[-4%] top-0 h-full w-[92%] object-cover object-left"
  }
];

const SPRING: Transition = {
  type: "spring",
  stiffness: 92,
  damping: 23,
  mass: 0.85
};

const TEXT_TRANSITION = {
  duration: 0.28,
  ease: [0.22, 1, 0.36, 1] as const
};

const WAVE_CLIP_ID = "rm-hero-wave-panel";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function lerp(start: number, end: number, amount: number) {
  return start + (end - start) * amount;
}

type PanelVisual = {
  x: number;
  right: number;
  width: number;
  opacity: number;
  zIndex: number;
  scale: number;
  active: boolean;
};

function getDesktopPanelVisual(index: number, progressIndex: number): PanelVisual {
  const relative = index - progressIndex;

  if (relative <= -1) {
    return {
      x: -16,
      right: 8,
      width: 56,
      opacity: 0,
      zIndex: 5,
      scale: 0.98,
      active: false
    };
  }

  if (relative < 0) {
    const t = relative + 1;
    return {
      x: lerp(-16, 0, t),
      right: lerp(8, 7, t),
      width: 56,
      opacity: t,
      zIndex: 30,
      scale: lerp(0.98, 1, t),
      active: false
    };
  }

  if (relative <= 1) {
    const t = 1 - relative;
    return {
      x: 0,
      right: lerp(4, 7, t),
      width: lerp(8.5, 56, t),
      opacity: 1,
      zIndex: 40,
      scale: lerp(0.985, 1, t),
      active: t > 0.5
    };
  }

  if (relative <= 2) {
    const t = relative - 1;
    return {
      x: lerp(0, 0.4, t),
      right: lerp(4, 7.8, t),
      width: lerp(8.5, 7, t),
      opacity: 1,
      zIndex: 30,
      scale: 0.985,
      active: false
    };
  }

  if (relative <= 3) {
    const t = relative - 2;
    return {
      x: lerp(0.4, 0.8, t),
      right: lerp(7.8, 11.2, t),
      width: lerp(7, 5.8, t),
      opacity: 1,
      zIndex: 20,
      scale: 0.97,
      active: false
    };
  }

  return {
    x: 0.8,
    right: 11.2,
    width: 5.8,
    opacity: 1,
    zIndex: 10,
    scale: 0.96,
    active: false
  };
}

function getMobilePanelVisual(index: number, progressIndex: number): PanelVisual {
  const relative = index - progressIndex;

  if (relative <= -1) {
    return {
      x: -12,
      right: -10,
      width: 88,
      opacity: 0,
      zIndex: 5,
      scale: 0.98,
      active: false
    };
  }

  if (relative < 0) {
    const t = relative + 1;
    return {
      x: lerp(-12, 0, t),
      right: lerp(-10, -8, t),
      width: 88,
      opacity: t,
      zIndex: 30,
      scale: lerp(0.98, 1, t),
      active: false
    };
  }

  if (relative <= 1) {
    const t = 1 - relative;
    return {
      x: 0,
      right: lerp(-2, -8, t),
      width: lerp(12, 88, t),
      opacity: 1,
      zIndex: 40,
      scale: lerp(0.985, 1, t),
      active: t > 0.5
    };
  }

  if (relative <= 2) {
    const t = relative - 1;
    return {
      x: 0,
      right: lerp(-2, 3, t),
      width: lerp(12, 9, t),
      opacity: 1,
      zIndex: 30,
      scale: 0.985,
      active: false
    };
  }

  if (relative <= 3) {
    const t = relative - 2;
    return {
      x: 0,
      right: lerp(3, 8, t),
      width: lerp(9, 7, t),
      opacity: 1,
      zIndex: 20,
      scale: 0.97,
      active: false
    };
  }

  return {
    x: 0,
    right: 8,
    width: 7,
    opacity: 1,
    zIndex: 10,
    scale: 0.96,
    active: false
  };
}

export function RMHeroWaveSlider() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 22,
    mass: 0.8
  });
  const [progressIndex, setProgressIndex] = useState(0);

  useMotionValueEvent(smoothProgress, "change", (value) => {
    const nextProgressIndex = clamp(value * (slides.length - 1), 0, slides.length - 1);
    setProgressIndex(nextProgressIndex);
    setActiveIndex(clamp(Math.round(nextProgressIndex), 0, slides.length - 1));
  });

  return (
    <section ref={sectionRef} className="relative h-[400vh]" aria-label="RM Refresher pinned hero">
      <div className="sticky top-0 h-screen overflow-hidden">
        <RMHeroWaveSliderContent
          activeIndex={activeIndex}
          progressIndex={progressIndex}
          reducedMotion={!!reducedMotion}
        />
      </div>
    </section>
  );
}

function RMHeroWaveSliderContent({
  activeIndex,
  progressIndex,
  reducedMotion
}: {
  activeIndex: number;
  progressIndex: number;
  reducedMotion: boolean;
}) {
  const activeSlide = slides[activeIndex];

  return (
    <div className="relative h-screen overflow-hidden">
      <svg className="absolute h-0 w-0" aria-hidden="true" focusable="false">
        <defs>
          <clipPath id={WAVE_CLIP_ID} clipPathUnits="objectBoundingBox">
            <path d="M0.02,0 H0.82 C0.91,0 0.97,0.055 0.965,0.14 C0.958,0.235 0.905,0.302 0.902,0.385 C0.899,0.468 0.95,0.532 0.95,0.612 C0.95,0.695 0.905,0.758 0.902,0.84 C0.899,0.922 0.94,0.972 0.99,1 H0.02 C0.009,1 0,0.991 0,0.98 V0.02 C0,0.009 0.009,0 0.02,0 Z" />
          </clipPath>
        </defs>
      </svg>

      <motion.div
        className="absolute inset-0"
        animate={{ background: activeSlide.bg }}
        transition={reducedMotion ? { duration: 0 } : { duration: 0.45, ease: "easeOut" }}
      />

      <div className="absolute inset-0 bg-gradient-to-r from-[rgba(255,248,240,0.92)] via-[rgba(255,248,240,0.62)] to-[rgba(255,248,240,0.12)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.72),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.12),transparent_24%)]" />

      <div className="relative z-20 grid h-full grid-cols-1 px-5 pb-10 pt-24 sm:px-8 lg:grid-cols-[38%_62%] lg:px-10 lg:pb-0 lg:pt-16 xl:px-14">
        <div className="relative flex items-center">
          <div className="max-w-[32rem]">
            <AnimatePresenceText activeSlide={activeSlide} reducedMotion={reducedMotion} />
          </div>
        </div>

        <div className="relative min-h-[28rem] lg:min-h-screen">
          <div className="absolute inset-0 hidden lg:block">
            {slides.map((slide, index) => (
              <WavePanel
                key={slide.id}
                slide={slide}
                visual={getDesktopPanelVisual(index, progressIndex)}
                reducedMotion={reducedMotion}
              />
            ))}
          </div>

          <div className="absolute inset-0 lg:hidden">
            {slides.map((slide, index) => (
              <WavePanel
                key={slide.id}
                slide={slide}
                visual={getMobilePanelVisual(index, progressIndex)}
                reducedMotion={reducedMotion}
                mobile
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AnimatePresenceText({
  activeSlide,
  reducedMotion
}: {
  activeSlide: Slide;
  reducedMotion: boolean;
}) {
  return (
    <motion.div
      key={activeSlide.id}
      initial={reducedMotion ? false : { opacity: 0, y: 16 }}
      animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={reducedMotion ? { duration: 0 } : TEXT_TRANSITION}
      className="relative z-30"
    >
      <p className="text-sm font-semibold uppercase tracking-[0.36em] text-[#9a7468]">
        {activeSlide.label}
      </p>
      <h1 className="mt-7 max-w-[7ch] font-display text-[clamp(3.8rem,8vw,7.2rem)] leading-[0.84] text-espresso">
        {activeSlide.title}
      </h1>
      <p className="mt-7 max-w-[24rem] text-lg leading-8 text-[#a37c70] sm:text-xl">
        {activeSlide.description}
      </p>
      <p className="mt-4 text-sm font-medium uppercase tracking-[0.24em] text-[#b18a7f]">
        {activeSlide.subtitle}
      </p>

      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          href={activeSlide.href}
          className="inline-flex rounded-full bg-coral px-8 py-4 text-sm font-semibold text-white transition hover:-translate-y-0.5"
        >
          {activeSlide.ctaLabel}
        </Link>
        <Link
          href="/flavors"
          className="inline-flex rounded-full border border-[#e8d2cb] bg-white/82 px-8 py-4 text-sm font-semibold text-espresso transition hover:-translate-y-0.5 hover:bg-white"
        >
          View All Flavors
        </Link>
      </div>

      <div className="mt-12 flex items-center gap-3">
        {slides.map((slide, index) => (
          <span
            key={slide.id}
            className="block rounded-full transition-all duration-300"
            style={{
              width: index === slides.findIndex((entry) => entry.id === activeSlide.id) ? "3.4rem" : "0.85rem",
              height: "0.55rem",
              backgroundColor: slide.stripColor,
              opacity: index === slides.findIndex((entry) => entry.id === activeSlide.id) ? 1 : 0.65
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

function WavePanel({
  slide,
  visual,
  reducedMotion,
  mobile = false
}: {
  slide: Slide;
  visual: PanelVisual;
  reducedMotion: boolean;
  mobile?: boolean;
}) {
  return (
    <motion.div
      className={`absolute ${mobile ? "bottom-0 top-auto" : "top-1/2"}`}
      initial={false}
      animate={{
        x: `${visual.x}vw`,
        right: `${visual.right}vw`,
        width: `${visual.width}vw`,
        opacity: visual.opacity,
        scale: visual.scale,
        y: mobile ? "0%" : "-50%"
      }}
      transition={reducedMotion ? { duration: 0 } : SPRING}
      style={{
        zIndex: visual.zIndex,
        height: mobile ? "100vh" : "100vh",
        filter: visual.active
          ? "drop-shadow(0 24px 34px rgba(96, 66, 55, 0.18))"
          : "drop-shadow(0 14px 22px rgba(96, 66, 55, 0.12))"
      }}
    >
      <div
        className="relative h-full w-full overflow-hidden"
        style={{
          clipPath: `url(#${WAVE_CLIP_ID})`,
          background: slide.bg
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.36),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0))]" />

        {visual.active ? (
          <>
            <img
              src={slide.artImage}
              alt={slide.artAlt}
              className={`absolute ${slide.artClassName} select-none`}
              draggable={false}
            />

            <div
              className="pointer-events-none absolute inset-y-0 right-0 w-[12%]"
              style={{ background: slide.bg }}
            />
          </>
        ) : (
          <div
            className="absolute inset-y-0 right-0 w-full"
            style={{
              background: `linear-gradient(180deg, rgba(255,255,255,0.16), rgba(255,255,255,0)), ${slide.stripColor}`
            }}
          />
        )}
      </div>
    </motion.div>
  );
}
