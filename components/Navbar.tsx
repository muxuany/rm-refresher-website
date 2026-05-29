"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/flavors", label: "Flavors" },
  { href: "/lifestyle", label: "Lifestyle" },
  { href: "/brew-guide", label: "Brew Guide" },
  { href: "/wholesale", label: "Wholesale" },
  { href: "/about", label: "About" }
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/40 bg-cream/75 backdrop-blur-xl">
      <div className="section-shell flex h-20 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3" aria-label="RM Refresher home">
          <Image
            src="/images/logo-peach.png"
            alt="RM Refresher peach logo"
            width={170}
            height={48}
            className="h-auto w-[132px] sm:w-[170px]"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-rosewood transition hover:text-coral"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/wholesale"
            className="rounded-full bg-coral px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-[#dd615d]"
          >
            Contact Us
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#f3cdc7] bg-white/80 text-espresso md:hidden"
          aria-expanded={open}
          aria-label="Toggle navigation"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="space-y-1.5">
            <span className="block h-0.5 w-5 rounded-full bg-current" />
            <span className="block h-0.5 w-5 rounded-full bg-current" />
            <span className="block h-0.5 w-5 rounded-full bg-current" />
          </span>
        </button>
      </div>

      {open ? (
        <div className="border-t border-[#f4d8d3] bg-cream/95 md:hidden">
          <nav className="section-shell flex flex-col gap-2 py-5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-2xl px-4 py-3 text-sm font-medium text-rosewood transition hover:bg-white/80 hover:text-coral"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/wholesale"
              className="mt-2 rounded-full bg-coral px-5 py-3 text-center text-sm font-semibold text-white shadow-glow"
              onClick={() => setOpen(false)}
            >
              Contact Us
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
