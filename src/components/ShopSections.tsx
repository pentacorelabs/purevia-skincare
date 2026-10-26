import { ArrowRight, Search, SlidersHorizontal, X } from "lucide-react";
import {
  bestSellerIds,
  collections,
  formatPrice,
  matchesCollection,
  products,
  type Product,
} from "../data/products";
import { ProductCard } from "./ProductCard";
import { Eyebrow } from "./ui";
import { cn } from "../utils/cn";

const bestSellers = bestSellerIds
  .map((id) => products.find((product) => product.id === id))
  .filter((product): product is Product => Boolean(product));

export function BestSellers({
  onQuickView,
  onViewAll,
}: {
  onQuickView: (product: Product) => void;
  onViewAll: () => void;
}) {
  return (
    <section id="best-sellers" className="bg-cream py-14 sm:py-20 lg:py-24">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <Eyebrow>Best Sellers</Eyebrow>
            <h2 className="mt-3 font-serif text-[2.15rem] leading-none tracking-[-0.015em] text-forest sm:text-[2.8rem] lg:text-[3.05rem]">
              Customer <em className="italic text-olive">Favorites</em>
            </h2>
          </div>
          <a href="#shop" onClick={onViewAll} className="link-arrow group shrink-0 pb-1">
            View All Products
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} aria-hidden="true" />
          </a>
        </div>

        <div className="mt-9 grid grid-cols-2 gap-x-4 gap-y-9 sm:gap-x-5 md:grid-cols-3 xl:mt-11 xl:grid-cols-6 xl:gap-x-4">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} onQuickView={onQuickView} />
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-forest/10 pt-6 sm:flex-row">
          <p className="text-[11px] leading-relaxed text-muted">
            Free shipping over $49 · 30-day returns · Complimentary samples with every order
          </p>
          <a href="#shop" onClick={onViewAll} className="group inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-forest hover:text-olive">
            Discover the full collection
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" strokeWidth={1.5} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

interface ShopSectionProps {
  collection: string;
  query: string;
  onCollectionChange: (collectionId: string) => void;
  onQueryChange: (query: string) => void;
  onQuickView: (product: Product) => void;
}

export function ShopSection({ collection, query, onCollectionChange, onQueryChange, onQuickView }: ShopSectionProps) {
  const normalizedQuery = query.trim().toLowerCase();
  const filtered = products.filter((product) => {
    if (!matchesCollection(product, collection)) return false;
    if (!normalizedQuery) return true;
    return [product.name, product.category, product.description, product.tag ?? ""]
      .join(" ")
      .toLowerCase()
      .includes(normalizedQuery);
  });

  const activeLabel = collections.find((item) => item.id === collection)?.label ?? "All Products";

  return (
    <section id="shop" className="scroll-mt-24 border-t border-forest/10 bg-ivory py-14 sm:py-20 lg:py-24">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-6">
          <div>
            <Eyebrow>The Collection</Eyebrow>
            <h2 className="mt-3 max-w-[560px] font-serif text-[2.15rem] leading-[1.02] tracking-[-0.015em] text-forest sm:text-[2.8rem] lg:text-[3.05rem]">
              Shop Your Botanical <em className="italic text-olive">Ritual</em>
            </h2>
            <p className="mt-3 max-w-[430px] text-[12.5px] leading-relaxed text-muted">
              Clean, considered formulas for skin, hair and the quiet moments in between.
            </p>
          </div>

          <div className="w-full sm:w-[280px]">
            <label htmlFor="shop-search" className="text-[8.5px] font-semibold uppercase tracking-[0.22em] text-olive">
              Search the collection
            </label>
            <div className="relative mt-2">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" strokeWidth={1.4} aria-hidden="true" />
              <input
                id="shop-search"
                type="search"
                value={query}
                onChange={(event) => onQueryChange(event.target.value)}
                placeholder="Serum, cream, gift set…"
                className="field py-3 pl-10 pr-10 text-[12.5px]"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => onQueryChange("")}
                  aria-label="Clear search"
                  className="absolute right-2.5 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center text-muted hover:text-forest"
                >
                  <X className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
                </button>
              ) : null}
            </div>
          </div>
        </div>

        <div className="no-scrollbar mt-8 flex items-center gap-2 overflow-x-auto border-y border-forest/10 py-3.5">
          <SlidersHorizontal className="mr-1 hidden h-3.5 w-3.5 shrink-0 text-olive sm:block" strokeWidth={1.4} aria-hidden="true" />
          {collections.map((item) => {
            const active = collection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onCollectionChange(item.id)}
                aria-pressed={active}
                className={cn(
                  "shrink-0 whitespace-nowrap rounded-full border px-3.5 py-2 text-[8.5px] font-semibold uppercase tracking-[0.13em] transition-colors sm:text-[9px]",
                  active
                    ? "border-forest bg-forest text-ivory"
                    : "border-forest/15 text-ink/65 hover:border-olive hover:text-olive",
                )}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="mt-5 flex items-center justify-between gap-4">
          <p className="text-[10.5px] uppercase tracking-[0.14em] text-muted" aria-live="polite">
            {activeLabel} · {filtered.length} {filtered.length === 1 ? "product" : "products"}
            {normalizedQuery ? ` for “${query.trim()}”` : ""}
          </p>
          {(collection !== "all" || query) && (
            <button
              type="button"
              onClick={() => {
                onCollectionChange("all");
                onQueryChange("");
              }}
              className="shrink-0 text-[9px] font-semibold uppercase tracking-[0.14em] text-olive underline decoration-olive/40 underline-offset-4 hover:text-forest"
            >
              Reset
            </button>
          )}
        </div>

        {filtered.length > 0 ? (
          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:gap-x-6 lg:gap-y-12">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} onQuickView={onQuickView} />
            ))}
          </div>
        ) : (
          <div className="mt-8 flex flex-col items-center justify-center border border-dashed border-forest/20 bg-cream/60 px-6 py-16 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-sage-soft text-olive-deep">
              <Search className="h-6 w-6" strokeWidth={1.2} aria-hidden="true" />
            </span>
            <h3 className="mt-5 font-serif text-[26px] text-forest">Nothing has bloomed here yet</h3>
            <p className="mt-2 max-w-sm text-[12.5px] leading-relaxed text-muted">
              We could not find a match for {query ? `“${query.trim()}”` : "this selection"}. Try a different formula or
              browse the full collection.
            </p>
            <button
              type="button"
              onClick={() => {
                onCollectionChange("all");
                onQueryChange("");
              }}
              className="btn-primary mt-6"
            >
              View all products
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

/** Small format helper kept local for the cart drawer's free-shipping note. */
export const displayPrice = formatPrice;
