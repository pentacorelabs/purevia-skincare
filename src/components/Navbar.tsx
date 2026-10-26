import { useEffect, useState } from "react";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { navLinks } from "../data/site";
import { Logo } from "./ui";
import { cn } from "../utils/cn";

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenAccount: () => void;
  onSelectCollection: (collectionId: string) => void;
}

export function Navbar({ onOpenSearch, onOpenAccount, onSelectCollection }: NavbarProps) {
  const { count, openCart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const handleNavClick = (filter?: string) => {
    setMobileOpen(false);
    if (filter) onSelectCollection(filter);
  };

  return (
    <>
      <div className="bg-olive-deep text-ivory">
        <div className="container-x flex min-h-[34px] items-center justify-center py-2 text-center">
          <p className="text-[8.5px] font-medium uppercase leading-relaxed tracking-[0.14em] sm:text-[9.5px] sm:tracking-[0.2em]">
            <span className="hidden sm:inline">
              Free shipping on orders over $49 <span className="mx-2 text-ivory/50">|</span> Use code: GLOW20
            </span>
            <span className="sm:hidden">Free shipping over $49 · Code: GLOW20</span>
          </p>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 border-b bg-ivory/95 backdrop-blur-md transition-shadow duration-300",
          scrolled ? "border-forest/10 shadow-[0_6px_30px_-18px_rgba(34,42,28,0.35)]" : "border-forest/[0.07]",
        )}
      >
        <div className="container-x">
          <div className="flex h-16 items-center justify-between gap-2 lg:h-[78px] lg:gap-5">
            <div className="flex items-center gap-0.5 lg:hidden">
              <button
                type="button"
                onClick={() => setMobileOpen((open) => !open)}
                aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={mobileOpen}
                aria-controls="mobile-navigation"
                className="flex h-10 w-9 items-center justify-center text-forest"
              >
                {mobileOpen ? <X className="h-5 w-5" strokeWidth={1.5} /> : <Menu className="h-5 w-5" strokeWidth={1.5} />}
              </button>
              <Logo compact />
            </div>

            <Logo className="hidden lg:inline-flex" />

            <nav aria-label="Primary" className="hidden flex-1 justify-center lg:flex">
              <ul className="flex items-center gap-4 xl:gap-6">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={() => handleNavClick(link.filter)}
                      className="group relative inline-block py-2 text-[9.5px] font-semibold uppercase tracking-[0.14em] text-ink/75 transition-colors hover:text-forest xl:text-[10px] xl:tracking-[0.16em]"
                    >
                      {link.label}
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0.5 h-px origin-left scale-x-0 bg-olive transition-transform duration-300 group-hover:scale-x-100"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-0.5 sm:gap-1.5">
              <button
                type="button"
                onClick={onOpenSearch}
                aria-label="Search products"
                className="flex h-10 w-10 items-center justify-center text-forest transition-colors hover:text-olive"
              >
                <Search className="h-[19px] w-[19px]" strokeWidth={1.4} />
              </button>
              <button
                type="button"
                onClick={onOpenAccount}
                aria-label="Account"
                className="hidden h-10 w-10 items-center justify-center text-forest transition-colors hover:text-olive sm:flex"
              >
                <User className="h-[19px] w-[19px]" strokeWidth={1.4} />
              </button>
              <button
                type="button"
                onClick={openCart}
                aria-label={`Shopping bag, ${count} ${count === 1 ? "item" : "items"}`}
                className="relative flex h-10 w-10 items-center justify-center text-forest transition-colors hover:text-olive"
              >
                <ShoppingBag className="h-[19px] w-[19px]" strokeWidth={1.4} />
                <span
                  key={count}
                  className="absolute right-0.5 top-0.5 flex h-[16px] min-w-[16px] items-center justify-center rounded-full bg-forest px-1 text-[8.5px] font-semibold leading-none text-ivory"
                  aria-hidden="true"
                >
                  {count > 99 ? "99+" : count}
                </span>
              </button>
            </div>
          </div>

        </div>

        <div
          id="mobile-navigation"
          className={cn(
            "overflow-hidden border-t border-forest/10 bg-ivory transition-[max-height,opacity] duration-300 lg:hidden",
            mobileOpen ? "max-h-[560px] opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <nav aria-label="Mobile" className="container-x py-4">
            <ul className="divide-y divide-forest/10">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => handleNavClick(link.filter)}
                    className="flex items-center justify-between py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/80 transition-colors hover:text-olive"
                  >
                    {link.label}
                    <span aria-hidden="true" className="text-olive/60">
                      →
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center justify-between border-t border-forest/10 pt-4">
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onOpenAccount();
                }}
                className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-forest"
              >
                <User className="h-4 w-4" strokeWidth={1.4} aria-hidden="true" /> My account
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  openCart();
                }}
                className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-forest"
              >
                <ShoppingBag className="h-4 w-4" strokeWidth={1.4} aria-hidden="true" /> Bag ({count})
              </button>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
