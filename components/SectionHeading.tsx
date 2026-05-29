type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left"
}: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? (
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-coral">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-balance font-display text-4xl leading-tight text-espresso sm:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-lg leading-8 text-rosewood">{description}</p>
      ) : null}
    </div>
  );
}
