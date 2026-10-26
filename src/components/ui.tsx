import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Droplets, Heart, Leaf, Minus, Plus, Recycle, Rabbit, ShieldCheck, Sprout, Star } from "lucide-react";
import { cn } from "../utils/cn";

/** Minimal leaf mark used in the wordmark and as a recurring brand motif. */
export function LeafMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-8 w-8", className)}
      aria-hidden="true"
    >
      <path
        d="M16 27c0-8 4.8-12.6 11-13.6C26.2 21 21.5 25.9 16 27Z"
        stroke="currentColor"
        strokeWidth="1.1"
        fill="currentColor"
        fillOpacity="0.16"
      />
      <path
        d="M16 27c0-6.8-4-11-9.6-12 .9 6.6 4.4 11 9.6 12Z"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path d="M16 27V10.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M16 16.5l3.4-4.2M16 20.4l-3.1-3.7" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <a
      href="#home"
      aria-label="Purevia Botanicals — back to home"
      className={cn("group inline-flex items-center gap-2.5 text-forest", className)}
    >
      <LeafMark className={cn("transition-transform duration-500 group-hover:-rotate-6", compact ? "h-7 w-7" : "h-9 w-9")} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-serif uppercase leading-none",
            compact ? "text-[16px] tracking-[0.2em]" : "text-[19px] tracking-[0.22em] sm:text-[21px]",
          )}
        >
          Purevia
        </span>
        <span
          className={cn(
            "font-sans font-medium uppercase text-olive",
            compact ? "mt-[3px] text-[6.5px] tracking-[0.42em]" : "mt-[5px] text-[7.5px] tracking-[0.44em]",
          )}
        >
          Botanicals
        </span>
      </span>
    </a>
  );
}

/** Decorative hand-drawn branch, used at low opacity behind editorial sections. */
export function BotanicalBranch({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("pointer-events-none absolute", className)}
      aria-hidden="true"
    >
      <path d="M112 314C108 246 117 168 152 96c14-29 33-56 56-80" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M146 146c-30-1-52-14-63-39 28-4 51 9 63 39Z" stroke="currentColor" strokeWidth="1" />
      <path d="M132 196c28-4 49-18 58-43-27-2-49 13-58 43Z" stroke="currentColor" strokeWidth="1" />
      <path d="M160 100c-17-18-23-40-15-63 22 14 28 37 15 63Z" stroke="currentColor" strokeWidth="1" />
      <path d="M179 62c4-22 19-38 42-43-1 27-17 44-42 43Z" stroke="currentColor" strokeWidth="1" />
      <path d="M117 250c-27 1-48-10-60-33 26-6 48 5 60 33Z" stroke="currentColor" strokeWidth="1" />
      <path d="M101 282c24-2 43-13 52-35-24-1-43 12-52 35Z" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function SmartImage({
  src,
  alt,
  className,
  loading = "lazy",
  sizes,
}: {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  sizes?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={cn("flex flex-col items-center justify-center gap-2 bg-sand text-olive", className)}
        role="img"
        aria-label={alt}
      >
        <LeafMark className="h-9 w-9" />
        <span className="px-3 text-center text-[9px] font-semibold uppercase tracking-[0.24em]">Purevia Botanicals</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      sizes={sizes}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}

export function Eyebrow({
  children,
  tone = "dark",
  className,
}: {
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-[9.5px] font-semibold uppercase tracking-[0.28em] sm:text-[10px]",
        tone === "dark" ? "text-olive" : "text-ivory/80",
        className,
      )}
    >
      <span className={cn("h-px w-7 shrink-0", tone === "dark" ? "bg-olive/50" : "bg-ivory/40")} aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}

export function Stars({ rating, reviews, className }: { rating: number; reviews?: number; className?: string }) {
  return (
    <div className={cn("flex items-center gap-1.5", className)} aria-label={`Rated ${rating} out of 5`}>
      <span className="flex items-center gap-0.5" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn("h-[11px] w-[11px]", star <= Math.round(rating) ? "fill-olive text-olive" : "fill-transparent text-olive/30")}
            strokeWidth={1.4}
          />
        ))}
      </span>
      <span className="text-[10px] font-medium tracking-wide text-muted">
        {rating.toFixed(1)}
        {typeof reviews === "number" ? ` (${reviews})` : ""}
      </span>
    </div>
  );
}

const valueIcons = {
  rabbit: Rabbit,
  shield: ShieldCheck,
  droplets: Droplets,
  leaf: Leaf,
  recycle: Recycle,
  sprout: Sprout,
  heart: Heart,
};

export function ValueIcon({ name, className }: { name: string; className?: string }) {
  const Icon = valueIcons[name as keyof typeof valueIcons] ?? Leaf;
  return <Icon className={cn("h-5 w-5", className)} strokeWidth={1.25} aria-hidden="true" />;
}

export function Modal({
  open,
  onClose,
  label,
  children,
  className,
}: {
  open: boolean;
  onClose: () => void;
  label: string;
  children: ReactNode;
  className?: string;
}) {
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[80] overflow-y-auto bg-forest/50 backdrop-blur-[2px]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="flex min-h-full items-center justify-center p-3 sm:p-6">
        <div
          role="dialog"
          aria-modal="true"
          aria-label={label}
          className={cn("relative my-auto w-full bg-ivory shadow-[0_30px_90px_-20px_rgba(20,26,16,0.55)] animate-fade-up", className)}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-ivory/90 text-forest transition-colors hover:bg-sage"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
}

export function QuantityStepper({
  value,
  onChange,
  compact = false,
  label = "Quantity",
}: {
  value: number;
  onChange: (next: number) => void;
  compact?: boolean;
  label?: string;
}) {
  return (
    <div
      className={cn("inline-flex items-center border border-forest/20 bg-transparent", compact ? "h-8" : "h-11")}
      role="group"
      aria-label={label}
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(1, value - 1))}
        disabled={value <= 1}
        aria-label="Decrease quantity"
        className={cn(
          "flex items-center justify-center text-forest transition-colors hover:bg-sage-soft disabled:cursor-not-allowed disabled:opacity-35",
          compact ? "h-8 w-8" : "h-11 w-10",
        )}
      >
        <Minus className={compact ? "h-3 w-3" : "h-3.5 w-3.5"} strokeWidth={1.6} aria-hidden="true" />
      </button>
      <span className={cn("text-center text-[12px] font-medium tabular-nums", compact ? "w-7" : "w-8")} aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(99, value + 1))}
        aria-label="Increase quantity"
        className={cn(
          "flex items-center justify-center text-forest transition-colors hover:bg-sage-soft",
          compact ? "h-8 w-8" : "h-11 w-10",
        )}
      >
        <Plus className={compact ? "h-3 w-3" : "h-3.5 w-3.5"} strokeWidth={1.6} aria-hidden="true" />
      </button>
    </div>
  );
}
