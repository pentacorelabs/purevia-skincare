import { useEffect, useState, type FormEvent } from "react";
import { ArrowRight, ArrowUpRight, Check, Leaf, Search, ShieldCheck, Sparkles, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { bestSellerIds, formatPrice, products, searchProducts, type Product } from "../data/products";
import { infoContent, journalArticles } from "../data/site";
import { Eyebrow, LeafMark, Modal, QuantityStepper, SmartImage, Stars } from "./ui";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const popularSearches = ["Serum", "Moisturizer", "Face Wash", "Gift Set"];

/* ---------------------------------- Search --------------------------------- */

export function SearchModal({
  open,
  onClose,
  onSelectProduct,
  onViewAll,
}: {
  open: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onViewAll: (query: string) => void;
}) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (open) setQuery("");
  }, [open]);

  const results = query.trim() ? searchProducts(query).slice(0, 5) : bestSellerIds.map((id) => products.find((product) => product.id === id)!).slice(0, 4);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    onViewAll(query);
  };

  return (
    <Modal open={open} onClose={onClose} label="Search products" className="max-w-[640px]">
      <form onSubmit={submit} className="p-5 sm:p-6">
        <div className="flex items-center gap-3 border-b border-forest/20 pb-3">
          <Search className="h-5 w-5 shrink-0 text-olive" strokeWidth={1.4} aria-hidden="true" />
          <label htmlFor="site-search" className="sr-only">
            Search products
          </label>
          <input
            id="site-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search serums, moisturizers, rituals…"
            autoFocus
            className="w-full border-0 bg-transparent py-2 font-serif text-[21px] text-forest placeholder:text-muted/60 focus:outline-none sm:text-[24px]"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-muted hover:bg-sage-soft hover:text-forest"
            >
              <X className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            </button>
          ) : null}
        </div>

        {!query.trim() ? (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-[8.5px] font-semibold uppercase tracking-[0.18em] text-muted">Popular</span>
            {popularSearches.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => setQuery(term)}
                className="rounded-full border border-forest/15 px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.1em] text-forest/75 transition-colors hover:border-olive hover:text-olive"
              >
                {term}
              </button>
            ))}
          </div>
        ) : null}

        <p className="mt-5 text-[8.5px] font-semibold uppercase tracking-[0.2em] text-olive">
          {query.trim() ? `${results.length} ${results.length === 1 ? "match" : "matches"}` : "Most loved"}
        </p>

        {results.length > 0 ? (
          <ul className="mt-2 divide-y divide-forest/10">
            {results.map((product) => (
              <li key={product.id}>
                <button
                  type="button"
                  onClick={() => onSelectProduct(product)}
                  className="group flex w-full items-center gap-3.5 py-3 text-left"
                >
                  <span className="relative h-[64px] w-[52px] shrink-0 overflow-hidden bg-sand">
                    <SmartImage
                      src={product.image}
                      alt={`${product.name} thumbnail`}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="52px"
                    />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[8px] font-semibold uppercase tracking-[0.18em] text-olive">{product.category}</span>
                    <span className="mt-0.5 block truncate font-serif text-[18px] leading-tight text-forest">{product.name}</span>
                    <span className="mt-0.5 block text-[11px] text-muted">{formatPrice(product.price)}</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-olive transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.4} aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-3 border border-dashed border-forest/20 bg-cream/60 px-5 py-10 text-center">
            <Leaf className="mx-auto h-6 w-6 text-olive" strokeWidth={1.2} aria-hidden="true" />
            <p className="mt-3 font-serif text-[21px] text-forest">No formulas found for “{query.trim()}”</p>
            <p className="mt-1 text-[11.5px] text-muted">Try “serum”, “cream”, “wash” or “gift”.</p>
          </div>
        )}

        <div className="mt-4 flex items-center justify-between gap-3 border-t border-forest/10 pt-3.5">
          <button
            type="button"
            onClick={() => setQuery("")}
            className="text-[9px] font-semibold uppercase tracking-[0.14em] text-muted transition-colors hover:text-forest"
          >
            Clear
          </button>
          <button type="submit" className="group inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-forest transition-colors hover:text-olive">
            View all results
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>
      </form>
    </Modal>
  );
}

/* -------------------------------- Quick view ------------------------------- */

export function QuickView({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setQuantity(1);
  }, [product]);

  return (
    <Modal open={Boolean(product)} onClose={onClose} label={product ? `${product.name} details` : "Product details"} className="max-w-[880px]">
      {product ? (
        <div className="grid md:grid-cols-2">
          <div className="relative aspect-[4/5] overflow-hidden bg-sand md:aspect-auto md:h-full md:min-h-[520px]">
            <SmartImage
              src={product.image}
              alt={`${product.name} — ${product.category} by Purevia Botanicals`}
              className="absolute inset-0 h-full w-full object-cover"
              sizes="(min-width: 768px) 440px, 100vw"
            />
            {product.tag ? (
              <span className="absolute left-4 top-4 bg-ivory/95 px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.16em] text-olive-deep">
                {product.tag}
              </span>
            ) : null}
          </div>

          <div className="flex flex-col p-5 pt-8 sm:p-7 md:pt-10">
            <p className="text-[8.5px] font-semibold uppercase tracking-[0.22em] text-olive">{product.category}</p>
            <h2 className="mt-2 font-serif text-[30px] leading-[1.05] tracking-[-0.01em] text-forest sm:text-[36px]">{product.name}</h2>
            <div className="mt-2.5 flex items-center gap-3">
              <Stars rating={product.rating} reviews={product.reviews} />
              <span className="h-3 w-px bg-forest/15" aria-hidden="true" />
              <span className="text-[10.5px] text-muted">{product.size}</span>
            </div>
            <p className="mt-3 font-serif text-[24px] text-forest">{formatPrice(product.price)}</p>
            <p className="mt-4 text-[12.5px] leading-[1.85] text-ink/65">{product.description}</p>

            <ul className="mt-5 grid grid-cols-2 gap-2 border-y border-forest/10 py-3.5">
              {["Vegan formula", "Cruelty free", "Dermatologist tested", "Recyclable packaging"].map((label) => (
                <li key={label} className="flex items-center gap-1.5 text-[9.5px] uppercase tracking-[0.08em] text-forest/70">
                  <Check className="h-3 w-3 shrink-0 text-olive" strokeWidth={1.8} aria-hidden="true" />
                  {label}
                </li>
              ))}
            </ul>

            <div className="mt-5 flex items-stretch gap-3">
              <QuantityStepper value={quantity} onChange={setQuantity} label={`Quantity for ${product.name}`} />
              <button
                type="button"
                onClick={() => {
                  addItem(product, quantity);
                  onClose();
                }}
                className="btn-primary flex-1 px-4"
              >
                Add to Bag · {formatPrice(product.price * quantity)}
              </button>
            </div>
            <p className="mt-2.5 text-center text-[9.5px] text-muted">Free shipping over $49 · 30-day returns</p>
            <p className="mt-4 flex items-start gap-2 bg-cream/70 px-3 py-2.5 text-[9.5px] leading-relaxed text-muted">
              <Sparkles className="mt-0.5 h-3 w-3 shrink-0 text-olive" strokeWidth={1.4} aria-hidden="true" />
              This is a demo storefront. Product details, reviews and checkout are illustrative.
            </p>
          </div>
        </div>
      ) : null}
    </Modal>
  );
}

/* ---------------------------------- Article -------------------------------- */

type Article = (typeof journalArticles)[number];

export function ArticleModal({ article, onClose }: { article: Article | null; onClose: () => void }) {
  return (
    <Modal open={Boolean(article)} onClose={onClose} label={article ? article.title : "Journal story"} className="max-w-[720px]">
      {article ? (
        <article>
          <div className="relative aspect-[16/9] overflow-hidden bg-sand">
            <SmartImage src={article.image} alt={`Editorial image for ${article.title}`} className="absolute inset-0 h-full w-full object-cover" sizes="720px" />
          </div>
          <div className="px-5 pb-7 pt-6 sm:px-8 sm:pb-9 sm:pt-8">
            <div className="flex items-center gap-2 text-[8.5px] font-semibold uppercase tracking-[0.2em] text-olive">
              <span>{article.kicker}</span>
              <span className="h-2.5 w-px bg-olive/30" aria-hidden="true" />
              <span className="font-medium text-muted">{article.readTime}</span>
            </div>
            <h2 className="mt-3 max-w-[560px] font-serif text-[29px] leading-[1.06] tracking-[-0.01em] text-forest sm:text-[36px]">{article.title}</h2>
            <p className="mt-3 font-serif text-[18px] italic leading-relaxed text-olive">{article.excerpt}</p>
            <div className="mt-5 space-y-4">
              {article.body.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="text-[12.5px] leading-[1.9] text-ink/70">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-forest/10 pt-4">
              <p className="font-serif text-[17px] italic text-forest">With care, the Purevia Studio</p>
              <button type="button" onClick={onClose} className="text-[9px] font-semibold uppercase tracking-[0.18em] text-olive hover:text-forest">
                Close
              </button>
            </div>
          </div>
        </article>
      ) : null}
    </Modal>
  );
}

/* ----------------------------------- Info ---------------------------------- */

export function InfoModal({ infoKey, onClose }: { infoKey: string | null; onClose: () => void }) {
  const content = infoKey ? infoContent[infoKey] : null;

  return (
    <Modal open={Boolean(content)} onClose={onClose} label={content ? content.title : "Information"} className="max-w-[600px]">
      {content ? (
        <div className="px-5 pb-7 pt-8 sm:px-8 sm:pb-9 sm:pt-9">
          <Eyebrow>Purevia Botanicals</Eyebrow>
          <h2 className="mt-3 font-serif text-[30px] leading-tight text-forest sm:text-[34px]">{content.title}</h2>
          <p className="mt-2 text-[12px] leading-relaxed text-muted">{content.intro}</p>
          <div className="mt-5 space-y-4 border-t border-forest/10 pt-5">
            {content.sections.map((section) => (
              <div key={section.copy.slice(0, 24)}>
                {section.heading ? <h3 className="font-serif text-[19px] leading-tight text-forest">{section.heading}</h3> : null}
                <p className="mt-1 text-[12px] leading-[1.8] text-ink/65">{section.copy}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-between gap-3 bg-cream/70 px-4 py-3">
            <p className="text-[9.5px] leading-relaxed text-muted">Demo storefront · Contact hello@pureviabotanicals.com for questions.</p>
            <button type="button" onClick={onClose} className="shrink-0 text-[9px] font-semibold uppercase tracking-[0.16em] text-forest hover:text-olive">
              Close
            </button>
          </div>
        </div>
      ) : null}
    </Modal>
  );
}

/* --------------------------------- Account -------------------------------- */

export function AccountModal({ open, onClose, onJoinNewsletter }: { open: boolean; onClose: () => void; onJoinNewsletter: () => void }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!open) return;
    setError("");
    setMessage("");
  }, [open]);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!EMAIL_PATTERN.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    setMessage("Demo mode: no account has been created. Your email was not sent anywhere.");
  };

  return (
    <Modal open={open} onClose={onClose} label="Your Purevia account" className="max-w-[420px]">
      <div className="px-6 pb-7 pt-8 text-center sm:px-8">
        <LeafMark className="mx-auto h-10 w-10 text-forest" />
        <p className="mt-3 text-[8px] font-semibold uppercase tracking-[0.26em] text-olive">Purevia Botanicals</p>
        <h2 className="mt-2 font-serif text-[30px] leading-tight text-forest">Your Account</h2>
        <p className="mx-auto mt-2 max-w-[290px] text-[11.5px] leading-relaxed text-muted">
          Accounts are not enabled in this demo storefront. Join our newsletter to hear about new botanical releases.
        </p>

        {message ? (
          <div className="mt-5 border border-olive/25 bg-sage-soft/60 px-4 py-4 text-left">
            <p className="flex items-start gap-2 text-[11px] leading-relaxed text-forest/80">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-olive" strokeWidth={1.3} aria-hidden="true" />
              {message}
            </p>
            <button type="button" onClick={onClose} className="btn-primary mt-4 w-full">
              Continue browsing
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-5 text-left" noValidate>
            <label htmlFor="account-email" className="text-[8.5px] font-semibold uppercase tracking-[0.18em] text-forest">
              Email address
            </label>
            <input
              id="account-email"
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                if (error) setError("");
              }}
              placeholder="you@example.com"
              autoComplete="email"
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "account-error" : undefined}
              className="field mt-1.5"
            />
            {error ? <p id="account-error" className="mt-1.5 text-[10.5px] text-clay">{error}</p> : null}
            <button type="submit" className="btn-primary mt-3 w-full">
              Continue
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
            </button>
          </form>
        )}

        <button
          type="button"
          onClick={onJoinNewsletter}
          className="mt-4 inline-flex items-center gap-1.5 border-b border-olive/40 pb-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-olive hover:text-forest"
        >
          Join the newsletter
          <ArrowRight className="h-3 w-3" strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>
    </Modal>
  );
}
