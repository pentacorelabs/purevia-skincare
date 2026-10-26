import { useEffect, useRef, useState } from "react";
import { Check, Eye, Plus } from "lucide-react";
import { useCart } from "../context/CartContext";
import { formatPrice, type Product } from "../data/products";
import { SmartImage, Stars } from "./ui";

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const timeout = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timeout.current), []);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    window.clearTimeout(timeout.current);
    timeout.current = window.setTimeout(() => setAdded(false), 1700);
  };

  return (
    <article className="group flex min-w-0 flex-col">
      <div className="relative aspect-[4/5] overflow-hidden bg-sand">
        <button
          type="button"
          onClick={() => onQuickView(product)}
          aria-label={`Quick view ${product.name}`}
          className="absolute inset-0 block h-full w-full text-left"
        >
          <SmartImage
            src={product.image}
            alt={`${product.name} — botanical ${product.category.toLowerCase()} by Purevia Botanicals`}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-[1.055]"
            sizes="(min-width: 1280px) 16vw, (min-width: 768px) 30vw, 46vw"
          />
          <span
            className="pointer-events-none absolute inset-0 bg-forest/0 transition-colors duration-500 group-hover:bg-forest/[0.07]"
            aria-hidden="true"
          />
          <span className="absolute inset-x-3 bottom-3 hidden translate-y-2 items-center justify-center gap-2 bg-ivory/95 py-2.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-forest opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:flex">
            <Eye className="h-3.5 w-3.5" strokeWidth={1.4} aria-hidden="true" />
            Quick View
          </span>
        </button>

        {product.tag ? (
          <span className="pointer-events-none absolute left-2.5 top-2.5 bg-ivory/95 px-2 py-1 text-[7.5px] font-semibold uppercase tracking-[0.16em] text-olive-deep backdrop-blur-sm">
            {product.tag}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col pt-3">
        <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-olive">{product.category}</p>
        <h3 className="mt-1.5 line-clamp-2 min-h-[2.36em] font-serif text-[17px] leading-[1.18] text-forest sm:text-[18px]">
          <button type="button" onClick={() => onQuickView(product)} className="text-left transition-colors hover:text-olive">
            {product.name}
          </button>
        </h3>
        <div className="mt-1.5">
          <Stars rating={product.rating} reviews={product.reviews} />
        </div>
        <p className="mt-2 text-[12.5px] font-semibold tracking-wide text-forest">{formatPrice(product.price)}</p>

        <div className="mt-auto pt-3">
          <button
            type="button"
            onClick={handleAdd}
            className={`flex w-full items-center justify-center gap-1.5 border px-2 py-2.5 text-[8.5px] font-semibold uppercase tracking-[0.13em] transition-all duration-300 ${
              added
                ? "border-olive bg-olive text-ivory"
                : "border-forest/25 text-forest hover:border-forest hover:bg-forest hover:text-ivory"
            }`}
            aria-label={added ? `${product.name} added to bag` : `Add ${product.name} to bag`}
          >
            {added ? (
              <>
                <Check className="h-3 w-3" strokeWidth={2} aria-hidden="true" /> Added
              </>
            ) : (
              <>
                <Plus className="h-3 w-3" strokeWidth={1.7} aria-hidden="true" /> Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
