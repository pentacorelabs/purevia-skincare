import { ArrowRight, Droplets, Leaf, Rabbit, ShieldCheck } from "lucide-react";
import { BotanicalBranch, Eyebrow, LeafMark, SmartImage, Stars } from "./ui";

const benefits = [
  { label: "Clean Ingredients", Icon: Leaf },
  { label: "Cruelty Free", Icon: Rabbit },
  { label: "Paraben Free", Icon: ShieldCheck },
  { label: "Sulfate Free", Icon: Droplets },
];

function Seal() {
  return (
    <div className="relative h-[88px] w-[88px] text-forest sm:h-[98px] sm:w-[98px]" aria-hidden="true">
      <svg className="absolute inset-0 h-full w-full animate-spin-slow" viewBox="0 0 100 100">
        <defs>
          <path id="pureviaSealPath" d="M50,50 m-39,0 a39,39 0 1,1 78,0 a39,39 0 1,1 -78,0" />
        </defs>
        <circle cx="50" cy="50" r="49" fill="#FBF8F2" fillOpacity="0.92" />
        <circle cx="50" cy="50" r="39" fill="none" stroke="currentColor" strokeOpacity="0.22" strokeWidth="0.8" />
        <text fill="currentColor" fontSize="6.4" letterSpacing="1.9" fontFamily="Manrope, sans-serif" fontWeight="600">
          <textPath href="#pureviaSealPath">BOTANICALLY POWERED · CLEAN BEAUTY ·</textPath>
        </text>
      </svg>
      <div className="absolute inset-[20px] flex items-center justify-center">
        <LeafMark className="h-8 w-8" />
      </div>
    </div>
  );
}

export function Hero({ onShopNow }: { onShopNow: () => void }) {
  return (
    <section id="home" className="relative overflow-hidden bg-cream">
      <div className="container-x relative">
        <div className="grid items-stretch lg:grid-cols-[0.92fr_1.08fr]">
          <div className="animate-fade-up pb-10 pt-10 sm:pt-14 lg:py-16 lg:pr-10 xl:py-20 xl:pr-14">
            <Eyebrow>Natural Skincare Essentials</Eyebrow>

            <h1 className="mt-5 max-w-[560px] font-serif text-[3.1rem] font-normal leading-[0.93] tracking-[-0.02em] text-forest sm:text-[4.2rem] lg:text-[4.15rem] xl:text-[5rem]">
              Pure Beauty
              <span className="block">
                From <em className="font-light italic text-olive">Nature</em>
              </span>
            </h1>

            <p className="mt-5 max-w-[22rem] text-[13.5px] leading-[1.85] text-ink/65 sm:mt-6 sm:text-[14.5px]">
              Discover the power of botanicals in our clean, effective skincare essentials — thoughtfully formulated to
              help skin look and feel its healthiest.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
              <a href="#shop" onClick={onShopNow} className="btn-primary group">
                Shop Now
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.6} />
              </a>
              <a href="#story" className="group inline-flex items-center gap-2 border-b border-forest/25 pb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-forest transition-colors hover:border-olive hover:text-olive">
                Our Story
                <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} aria-hidden="true" />
              </a>
            </div>

            <div className="mt-7 flex items-center gap-3">
              <Stars rating={4.9} />
              <span className="h-3 w-px bg-forest/15" aria-hidden="true" />
              <p className="text-[10.5px] tracking-wide text-muted">Loved by 2,400+ skin rituals</p>
            </div>

            <ul className="mt-9 grid grid-cols-2 gap-x-4 gap-y-4 border-t border-forest/10 pt-6 sm:grid-cols-4 lg:mt-10">
              {benefits.map(({ label, Icon }) => (
                <li key={label} className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-forest/15 text-olive">
                    <Icon className="h-3.5 w-3.5" strokeWidth={1.4} aria-hidden="true" />
                  </span>
                  <span className="text-[9.5px] font-semibold uppercase leading-tight tracking-[0.08em] text-forest/80">
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative lg:py-5 lg:pl-4 xl:py-6">
            <BotanicalBranch className="-right-8 -top-6 hidden h-[360px] w-[240px] text-olive/20 lg:block" />
            <div className="group relative h-[420px] overflow-hidden bg-sand sm:h-[540px] lg:h-full lg:min-h-[620px]">
              <SmartImage
                src="/images/hero-botanical.jpg"
                alt="Purevia Botanicals hero: glass serum bottle with dropper, facial wash tube, moisturizer jar and toner bottle arranged with green leaves, white flowers and natural stone on warm beige"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.025]"
                loading="eager"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest/30 via-transparent to-transparent"
                aria-hidden="true"
              />

              <div className="absolute right-4 top-4 sm:right-5 sm:top-5">
                <Seal />
              </div>

              <div className="absolute left-4 top-4 max-w-[190px] border border-ivory/40 bg-ivory/90 px-4 py-3 backdrop-blur-sm sm:left-5 sm:top-5">
                <p className="text-[8px] font-semibold uppercase tracking-[0.24em] text-olive">Formulated with</p>
                <p className="mt-1 font-serif text-[19px] leading-none text-forest">98% natural origin</p>
              </div>

              <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 sm:inset-x-5 sm:bottom-5">
                <div className="max-w-[250px]">
                  <p className="text-[8px] font-semibold uppercase tracking-[0.24em] text-ivory/85">The Glow Collection</p>
                  <p className="mt-1.5 font-serif text-[24px] leading-[1.1] text-ivory sm:text-[27px]">
                    Quiet rituals for luminous skin.
                  </p>
                </div>
                <a
                  href="#shop"
                  onClick={onShopNow}
                  aria-label="Explore the Glow Collection"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ivory/50 bg-ivory/10 text-ivory backdrop-blur-sm transition-colors hover:bg-ivory hover:text-forest"
                >
                  <ArrowRight className="h-4 w-4" strokeWidth={1.4} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
