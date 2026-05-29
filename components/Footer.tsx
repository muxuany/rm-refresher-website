import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/flavors", label: "Flavors" },
  { href: "/lifestyle", label: "Lifestyle" },
  { href: "/brew-guide", label: "Brew Guide" },
  { href: "/wholesale", label: "Wholesale" }
];

export function Footer() {
  return (
    <footer className="border-t border-[#efd4ce] bg-[#fff6f2] py-10">
      <div className="section-shell grid gap-8 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <Image
            src="/images/logo-peach.png"
            alt="RM Refresher peach logo"
            width={170}
            height={48}
            className="h-auto w-[160px]"
          />
          <p className="mt-5 text-lg text-rosewood">Real Milk. Real Instant.</p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-coral">Links</h2>
          <div className="mt-4 flex flex-col gap-3">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-rosewood transition hover:text-coral"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-coral">
            Contact
          </h2>
          <p className="mt-4 text-rosewood">hello@rmrefresher.com</p>
          <p className="mt-2 text-rosewood">R&M Trading LLC</p>
        </div>
      </div>

      <div className="section-shell mt-10 border-t border-[#efd4ce] pt-6 text-sm text-rosewood">
        Copyright R&amp;M Trading LLC
      </div>
    </footer>
  );
}
