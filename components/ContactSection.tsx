"use client";

import { FormEvent, useState } from "react";
import { products } from "@/data/products";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const initialState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  product: products[0]?.name ?? "",
  quantity: "",
  message: ""
};

export function ContactSection() {
  const [formData, setFormData] = useState(initialState);
  const [status, setStatus] = useState<"idle" | "success">("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("success");
    setFormData(initialState);
  }

  return (
    <section id="wholesale" className="py-20">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <SectionHeading
              eyebrow="Wholesale / Contact"
              title="Bring RM Refresher into your retail or café lineup."
              description="Share your business details and preferred product, and we can connect this form to an API route later without changing the UI."
            />

            <div className="mt-8 rounded-[2rem] border border-[#f0d9d4] bg-white/70 p-8 shadow-soft">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-coral">
                Contact for Wholesale
              </p>
              <p className="mt-4 text-lg leading-8 text-rosewood">
                Ideal for grocery, café, office pantry, and specialty beverage placements.
              </p>
            </div>
          </Reveal>

          <Reveal delayMs={140}>
            <form
              className="rounded-[2rem] border border-white/70 bg-white/75 p-6 shadow-glow sm:p-8"
              onSubmit={handleSubmit}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name">
                  <input
                    required
                    value={formData.name}
                    onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                    className="w-full rounded-2xl border border-[#ecd3ce] bg-[#fffaf8] px-4 py-3 outline-none transition focus:border-coral"
                  />
                </Field>
                <Field label="Company">
                  <input
                    required
                    value={formData.company}
                    onChange={(event) => setFormData({ ...formData, company: event.target.value })}
                    className="w-full rounded-2xl border border-[#ecd3ce] bg-[#fffaf8] px-4 py-3 outline-none transition focus:border-coral"
                  />
                </Field>
                <Field label="Email">
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                    className="w-full rounded-2xl border border-[#ecd3ce] bg-[#fffaf8] px-4 py-3 outline-none transition focus:border-coral"
                  />
                </Field>
                <Field label="Phone">
                  <input
                    value={formData.phone}
                    onChange={(event) => setFormData({ ...formData, phone: event.target.value })}
                    className="w-full rounded-2xl border border-[#ecd3ce] bg-[#fffaf8] px-4 py-3 outline-none transition focus:border-coral"
                  />
                </Field>
                <Field label="Interested Product">
                  <select
                    value={formData.product}
                    onChange={(event) => setFormData({ ...formData, product: event.target.value })}
                    className="w-full rounded-2xl border border-[#ecd3ce] bg-[#fffaf8] px-4 py-3 outline-none transition focus:border-coral"
                  >
                    {products.map((product) => (
                      <option key={product.slug} value={product.name}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Quantity">
                  <input
                    value={formData.quantity}
                    onChange={(event) => setFormData({ ...formData, quantity: event.target.value })}
                    className="w-full rounded-2xl border border-[#ecd3ce] bg-[#fffaf8] px-4 py-3 outline-none transition focus:border-coral"
                    placeholder="Estimated order volume"
                  />
                </Field>
              </div>

              <Field label="Message" className="mt-5">
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(event) => setFormData({ ...formData, message: event.target.value })}
                  className="w-full rounded-2xl border border-[#ecd3ce] bg-[#fffaf8] px-4 py-3 outline-none transition focus:border-coral"
                />
              </Field>

              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  className="rounded-full bg-coral px-7 py-4 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-[#dd615d]"
                >
                  Contact for Wholesale
                </button>

                <p
                  className={`text-sm ${
                    status === "success" ? "text-coral" : "text-rosewood"
                  }`}
                  aria-live="polite"
                >
                  {status === "success"
                    ? "Thanks. Your wholesale inquiry was received successfully."
                    : "Frontend success flow is ready for future API integration."}
                </p>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  children,
  className = ""
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-sm font-medium text-rosewood">{label}</span>
      {children}
    </label>
  );
}
