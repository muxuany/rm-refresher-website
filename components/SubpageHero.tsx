import Image from "next/image";

type SubpageHeroProps = {
  eyebrow: string;
  title: string;
  description?: string;
  image: string;
  imageAlt: string;
};

export function SubpageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt
}: SubpageHeroProps) {
  return (
    <section className="section-shell pt-6 sm:pt-8">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/60 shadow-soft">
        <Image
          src={image}
          alt={imageAlt}
          width={1672}
          height={941}
          className="h-[22rem] w-full object-cover sm:h-[28rem] lg:h-[34rem]"
        />
        <div className="absolute inset-0 bg-[rgba(63,38,30,0.34)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(63,38,30,0.52)] via-[rgba(63,38,30,0.26)] to-[rgba(63,38,30,0.12)]" />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[rgba(63,38,30,0.50)] via-[rgba(63,38,30,0.24)] to-transparent p-6 text-white sm:p-8 lg:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#ffece8] drop-shadow-sm">
            {eyebrow}
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl leading-[0.95] drop-shadow-[0_3px_18px_rgba(63,38,30,0.40)] sm:text-6xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-4 max-w-xl text-base leading-7 text-[#fff4f1] drop-shadow-[0_2px_12px_rgba(63,38,30,0.34)] sm:text-lg">
              {description}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
