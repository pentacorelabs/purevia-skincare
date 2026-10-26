import { useEffect, useRef, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Lock, ShoppingBag, Trash2, Truck, X } from "lucide-react";
import { FREE_SHIPPING_THRESHOLD, useCart } from "../context/CartContext";
import { formatPrice } from "../data/products";
import { QuantityStepper, SmartImage } from "./ui";
import { cn } from "../utils/cn";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const SHIPPING_RATE = 4.95;

type Step = "bag" | "checkout" | "success";

export function CartDrawer() {
  const {
    entries,
    count,
    subtotal,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();
  const [step, setStep] = useState<Step>("bag");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [confirmedName, setConfirmedName] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const closeButton = useRef<HTMLButtonElement>(null);

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_RATE;
  const total = subtotal + shipping;

  useEffect(() => {
    if (!isCartOpen) return;
    setStep("bag");
    setErrors({});
  }, [isCartOpen]);

  useEffect(() => {
    if (!isCartOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKeyDown);
    const focusTimer = window.setTimeout(() => closeButton.current?.focus(), 80);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(focusTimer);
    };
  }, [isCartOpen, closeCart]);

  const goShopping = () => {
    closeCart();
    window.setTimeout(() => {
      document.getElementById("shop")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 260);
  };

  const handleDemoOrder = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: { name?: string; email?: string } = {};
    if (name.trim().length < 2) nextErrors.name = "Please enter your full name.";
    if (!EMAIL_PATTERN.test(email.trim())) nextErrors.email = "Please enter a valid email address.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setConfirmedName(name.trim());
    setOrderNumber(`PVB-${Math.floor(100000 + Math.random() * 900000)}`);
    setStep("success");
    clearCart();
  };

  return createPortal(
    <div
      className={cn("fixed inset-0 z-[90]", isCartOpen ? "pointer-events-auto" : "pointer-events-none")}
      aria-hidden={!isCartOpen}
      {...(!isCartOpen ? { inert: true } : {})}
    >
      <button
        type="button"
        aria-label="Close shopping bag"
        tabIndex={isCartOpen ? 0 : -1}
        onClick={closeCart}
        className={cn(
          "absolute inset-0 h-full w-full bg-forest/45 backdrop-blur-[2px] transition-opacity duration-300",
          isCartOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
        tabIndex={-1}
        className={cn(
          "absolute right-0 top-0 flex h-full w-full max-w-[420px] flex-col bg-ivory shadow-[-30px_0_80px_-30px_rgba(20,26,16,0.4)] transition-transform duration-300 ease-out",
          isCartOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <header className="flex items-center justify-between border-b border-forest/10 px-5 py-4">
          <div>
            <p className="text-[8px] font-semibold uppercase tracking-[0.24em] text-olive">
              {step === "success" ? "Demo order" : "Purevia Botanicals"}
            </p>
            <h2 className="mt-0.5 font-serif text-[26px] leading-none text-forest">
              {step === "bag" ? "Your Bag" : step === "checkout" ? "Demo Checkout" : "Thank You"}
            </h2>
            {step === "bag" ? (
              <p className="mt-1.5 text-[10px] uppercase tracking-[0.14em] text-muted">
                {count} {count === 1 ? "item" : "items"}
              </p>
            ) : null}
          </div>
          <button
            ref={closeButton}
            type="button"
            onClick={closeCart}
            aria-label="Close shopping bag"
            className="flex h-9 w-9 items-center justify-center rounded-full text-forest transition-colors hover:bg-sage-soft"
          >
            <X className="h-4.5 w-4.5" strokeWidth={1.4} aria-hidden="true" />
          </button>
        </header>

        {step === "bag" ? (
          entries.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-sage-soft text-olive-deep">
                <ShoppingBag className="h-7 w-7" strokeWidth={1.2} aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-serif text-[28px] leading-tight text-forest">Your bag is empty</h3>
              <p className="mt-2 max-w-[240px] text-[12px] leading-relaxed text-muted">
                A quiet ritual is waiting. Explore our botanical essentials and begin with one small step.
              </p>
              <button type="button" onClick={goShopping} className="btn-primary mt-6 w-full">
                Discover the collection
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
              </button>
              <a href="#best-sellers" onClick={closeCart} className="mt-4 text-[9.5px] font-semibold uppercase tracking-[0.18em] text-olive underline underline-offset-4">
                Browse best sellers
              </a>
            </div>
          ) : (
            <>
              <div className="border-b border-forest/10 bg-cream/60 px-5 py-3.5">
                {remaining > 0 ? (
                  <p className="flex items-center gap-2 text-[10.5px] text-forest/80">
                    <Truck className="h-3.5 w-3.5 shrink-0 text-olive" strokeWidth={1.4} aria-hidden="true" />
                    You are <strong className="font-semibold">{formatPrice(remaining)}</strong> away from free shipping.
                  </p>
                ) : (
                  <p className="flex items-center gap-2 text-[10.5px] text-forest/80">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-olive" strokeWidth={1.4} aria-hidden="true" />
                    Complimentary shipping unlocked.
                  </p>
                )}
                <div className="mt-2 h-[3px] w-full overflow-hidden bg-forest/10" aria-hidden="true">
                  <div className="h-full bg-olive transition-[width] duration-500" style={{ width: `${progress}%` }} />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-5">
                <ul className="divide-y divide-forest/10">
                  {entries.map(({ product, quantity }) => (
                    <li key={product.id} className="flex gap-3.5 py-4">
                      <div className="relative h-[100px] w-[78px] shrink-0 overflow-hidden bg-sand">
                        <SmartImage
                          src={product.image}
                          alt={`${product.name} product bottle`}
                          className="absolute inset-0 h-full w-full object-cover"
                          sizes="78px"
                        />
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="text-[7.5px] font-semibold uppercase tracking-[0.18em] text-olive">{product.category}</p>
                            <h3 className="mt-0.5 font-serif text-[16.5px] leading-tight text-forest">{product.name}</h3>
                            <p className="mt-0.5 text-[9.5px] text-muted">{product.size}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(product.id)}
                            aria-label={`Remove ${product.name} from bag`}
                            className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center text-muted transition-colors hover:text-clay"
                          >
                            <Trash2 className="h-3.5 w-3.5" strokeWidth={1.4} aria-hidden="true" />
                          </button>
                        </div>
                        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
                          <QuantityStepper
                            value={quantity}
                            onChange={(next) => updateQuantity(product.id, next)}
                            compact
                            label={`Quantity for ${product.name}`}
                          />
                          <p className="text-[12px] font-semibold text-forest">{formatPrice(product.price * quantity)}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={goShopping}
                  className="my-4 inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-olive hover:text-forest"
                >
                  <ArrowLeft className="h-3 w-3" strokeWidth={1.5} aria-hidden="true" />
                  Continue shopping
                </button>
              </div>

              <footer className="border-t border-forest/10 bg-cream/50 px-5 py-4">
                <div className="flex items-baseline justify-between">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-forest">Subtotal</p>
                  <p className="font-serif text-[24px] leading-none text-forest">{formatPrice(subtotal)}</p>
                </div>
                <p className="mt-2 text-[10px] leading-relaxed text-muted">
                  Shipping and taxes calculated at checkout. Free shipping on orders over $49.
                </p>
                <button type="button" onClick={() => setStep("checkout")} className="btn-primary mt-3.5 w-full">
                  Proceed to checkout
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
                </button>
                <p className="mt-2 flex items-center justify-center gap-1.5 text-[9px] text-muted">
                  <Lock className="h-2.5 w-2.5" strokeWidth={1.5} aria-hidden="true" />
                  Demo storefront · No payment is processed
                </p>
              </footer>
            </>
          )
        ) : null}

        {step === "checkout" ? (
          <form onSubmit={handleDemoOrder} className="flex flex-1 flex-col overflow-y-auto" noValidate>
            <div className="flex-1 px-5 py-4">
              <button
                type="button"
                onClick={() => setStep("bag")}
                className="inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-olive hover:text-forest"
              >
                <ArrowLeft className="h-3 w-3" strokeWidth={1.5} aria-hidden="true" />
                Back to bag
              </button>

              <div className="mt-4 border border-olive/25 bg-sage-soft/60 px-4 py-3 text-[10.5px] leading-relaxed text-forest/80">
                <strong className="font-semibold uppercase tracking-[0.1em] text-forest">Demo checkout.</strong> No payment
                details are required and no real order will be placed.
              </div>

              <div className="mt-5 space-y-3.5">
                <div>
                  <label htmlFor="checkout-name" className="text-[9px] font-semibold uppercase tracking-[0.16em] text-forest">
                    Full name
                  </label>
                  <input
                    id="checkout-name"
                    type="text"
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                      if (errors.name) setErrors((current) => ({ ...current, name: undefined }));
                    }}
                    autoComplete="name"
                    placeholder="Aria Bennett"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "checkout-name-error" : undefined}
                    className="field mt-1.5"
                  />
                  {errors.name ? <p id="checkout-name-error" className="mt-1 text-[10.5px] text-clay">{errors.name}</p> : null}
                </div>
                <div>
                  <label htmlFor="checkout-email" className="text-[9px] font-semibold uppercase tracking-[0.16em] text-forest">
                    Email address
                  </label>
                  <input
                    id="checkout-email"
                    type="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      if (errors.email) setErrors((current) => ({ ...current, email: undefined }));
                    }}
                    autoComplete="email"
                    placeholder="aria@example.com"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "checkout-email-error" : undefined}
                    className="field mt-1.5"
                  />
                  {errors.email ? <p id="checkout-email-error" className="mt-1 text-[10.5px] text-clay">{errors.email}</p> : null}
                </div>
              </div>

              <div className="mt-6 border-t border-forest/10 pt-4">
                <h3 className="font-serif text-[20px] text-forest">Order summary</h3>
                <ul className="mt-3 space-y-2.5">
                  {entries.map(({ product, quantity }) => (
                    <li key={product.id} className="flex items-start justify-between gap-3 text-[11px] text-forest/80">
                      <span className="min-w-0">
                        {product.name} <span className="text-muted">× {quantity}</span>
                      </span>
                      <span className="shrink-0 tabular-nums">{formatPrice(product.price * quantity)}</span>
                    </li>
                  ))}
                </ul>
                <dl className="mt-4 space-y-2 border-t border-forest/10 pt-3 text-[11px]">
                  <div className="flex justify-between text-forest/75">
                    <dt>Subtotal</dt>
                    <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
                  </div>
                  <div className="flex justify-between text-forest/75">
                    <dt>Shipping</dt>
                    <dd className="tabular-nums">{shipping === 0 ? "Complimentary" : formatPrice(shipping)}</dd>
                  </div>
                  <div className="flex justify-between border-t border-forest/10 pt-2 text-[13px] font-semibold text-forest">
                    <dt>Total</dt>
                    <dd className="tabular-nums">{formatPrice(total)}</dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="border-t border-forest/10 bg-cream/50 px-5 py-4">
              <button type="submit" className="btn-primary w-full">
                Place demo order
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
              </button>
              <p className="mt-2 flex items-center justify-center gap-1.5 text-[9px] text-muted">
                <Lock className="h-2.5 w-2.5" strokeWidth={1.5} aria-hidden="true" />
                Simulated checkout · No card required
              </p>
            </div>
          </form>
        ) : null}

        {step === "success" ? (
          <div className="flex flex-1 flex-col overflow-y-auto px-6 py-8">
            <div className="flex flex-1 flex-col items-center justify-center text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-sage-soft text-olive-deep">
                <Check className="h-7 w-7" strokeWidth={1.4} aria-hidden="true" />
              </span>
              <p className="mt-5 text-[8.5px] font-semibold uppercase tracking-[0.22em] text-olive">Demo order confirmed</p>
              <h3 className="mt-2 font-serif text-[30px] leading-tight text-forest">Thank you, {confirmedName.split(" ")[0]}.</h3>
              <p className="mt-2 max-w-[280px] text-[12px] leading-relaxed text-muted">
                Your demo order <strong className="font-semibold text-forest">{orderNumber}</strong> has been recorded in
                this browser. Nothing was purchased and no payment was processed.
              </p>
              <div className="mt-5 w-full border border-forest/10 bg-cream/60 px-4 py-3 text-left">
                <p className="flex items-center gap-2 text-[10.5px] text-forest/80">
                  <Truck className="h-3.5 w-3.5 text-olive" strokeWidth={1.4} aria-hidden="true" />
                  A confirmation would normally arrive at {email.trim()}.
                </p>
              </div>
            </div>
            <button type="button" onClick={goShopping} className="btn-primary mt-6 w-full">
              Continue browsing
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => {
                setStep("bag");
                closeCart();
              }}
              className="mt-3 text-[9px] font-semibold uppercase tracking-[0.18em] text-olive hover:text-forest"
            >
              Close bag
            </button>
          </div>
        ) : null}
      </aside>
    </div>,
    document.body,
  );
}
