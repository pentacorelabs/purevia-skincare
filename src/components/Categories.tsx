import { ArrowRight, ArrowUpRight } from "lucide-react";
import { categories } from "../data/site";
import { Eyebrow, SmartImage } from "./ui";

export function Categories({ onSelectCollection }: { onSelectCollection: (collectionId: string) => void }) {
  return (
    <section id="categories" className="bg-ivory py-14 sm:py-20 lg:py-24">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <Eyebrow>Explore by Category</Eyebrow>
            <h2 className="mt-3 max-w-[520px] font-serif text-[2.15rem] leading-[1.02] tracking-[-0.015em] text-forest sm:text-[2.8rem] lg:text-[3.05rem]">
              Find Your Everyday <em className="italic text-olive">Essentials</em>
            </h2>
          </div>
          <a href="#shop" onClick={() => onSelectCollection("all")} className="link-arrow group shrink-0 pb-1">
            View All
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} aria-hidden="true" />
          </a>
        </div>

        <div className="mt-9 grid grid-cols-2 gap-x-3.5 gap-y-8 sm:gap-x-5 sm:gap-y-9 md:grid-cols-3 lg:mt-12 lg:grid-cols-6 lg:gap-x-4">
          {categories.map((category, index) => (
            <a
              key={category.name}
              href="#shop"
              onClick={() => onSelectCollection(category.filter)}
              className="group block"
              aria-label={`Shop ${category.name}`}
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-sand">
                <SmartImage
                  src={category.image}
                  alt={`${category.name} — Purevia botanical skincare`}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                  sizes="(min-width: 1024px) 16vw, (min-width: 768px) 30vw, 45vw"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-forest/0 transition-colors duration-500 group-hover:bg-forest/10"
                  aria-hidden="true"
                />
                <span className="absolute left-2.5 top-2.5 flex h-6 w-6 items-center justify-center bg-ivory/90 text-[8.5px] font-semibold tracking-[0.08em] text-forest backdrop-blur-sm">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className="absolute bottom-2.5 right-2.5 flex h-8 w-8 translate-y-2 items-center justify-center rounded-full bg-ivory text-forest opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                  aria-hidden="true"
                >
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                </span>
              </div>
              <h3 className="mt-3 font-serif text-[19px] leading-tight text-forest transition-colors group-hover:text-olive sm:text-[21px]">
                {category.name}
              </h3>
              <p className="mt-0.5 hidden text-[10.5px] text-muted sm:block">{category.caption}</p>
              <span className="mt-1.5 inline-flex items-center gap-1.5 text-[8.5px] font-semibold uppercase tracking-[0.18em] text-olive">
                Shop Now
                <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} aria-hidden="true" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
