import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, Check, Loader2, Mail, MapPin, Phone } from "lucide-react";
import { useCart } from "../context/CartContext";
import { Logo } from "./ui";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const quickLinks = [
  { label: "Shop", href: "#shop", filter: "all" },
  { label: "About Us", href: "#story" },
  { label: "Blog", href: "#journal" },
  { label: "FAQs", action: "faqs" },
  { label: "Contact Us", href: "#contact" },
];

const careLinks = [
  { label: "Shipping Policy", action: "shipping" },
  { label: "Return Policy", action: "returns" },
  { label: "Terms & Conditions", action: "terms" },
  { label: "Privacy Policy", action: "privacy" },
];

function PinterestMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <path d="M12 3a9 9 0 0 0-3.3 17.4c-.1-.7-.2-1.8 0-2.6l1.2-5s-.3-.6-.3-1.5c0-1.4.8-2.4 1.8-2.4.9 0 1.3.7 1.3 1.5 0 .9-.6 2.2-.9 3.4-.2 1 .5 1.9 1.6 1.9 1.9 0 3.2-2.5 3.2-5.4 0-2.2-1.5-3.9-4.3-3.9-3.1 0-5 2.3-5 4.9 0 1 .3 1.7.8 2.2.2.2.2.3.2.6l-.3 1c-.1.3-.3.4-.6.3-1.6-.7-2.4-2.5-2.4-4.4 0-3 2.9-6.6 8.3-6.6 4.4 0 7.2 3.1 7.2 6.5 0 4.5-2.5 7.8-6.1 7.8-1.2 0-2.4-.7-2.8-1.4l-.8 3c-.2.9-.8 2-1.3 2.7A9 9 0 1 0 12 3Z" />
    </svg>
  );
}

function InstagramMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <path d="M14.5 21v-7.4h2.6l.5-3h-3.1V8.7c0-.9.3-1.5 1.6-1.5h1.6V4.6c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1v2H8.6v3h2.7V21" strokeLinejoin="round" />
    </svg>
  );
}

function YoutubeMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="M10.5 9.2 15 12l-4.5 2.8V9.2Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

interface FooterProps {
  onInfo: (key: string) => void;
  onSelectCollection: (collectionId: string) => void;
}

export function Footer({ onInfo, onSelectCollection }: FooterProps) {
  const { notify } = useCart();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const handleSubscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!EMAIL_PATTERN.test(email.trim())) {
      setError("Please enter a valid email address, e.g. you@example.com.");
      setStatus("idle");
      return;
    }
    setError("");
    setStatus("submitting");
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setStatus("success");
      notify("Welcome to the garden — newsletter signup simulated.");
    }, 650);
  };

  const socialHandler = (network: string) => notify(`Follow Purevia on ${network} — social links are demo only.`);

  return (
    <footer id="contact" className="scroll-mt-24 overflow-hidden border-t border-forest/10 bg-cream">
      <div className="container-x pb-10 pt-12 sm:pt-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-9 md:grid-cols-6 xl:grid-cols-12 xl:gap-x-7">
          <div className="col-span-2 md:col-span-6 xl:col-span-3">
            <Logo />
            <p className="mt-4 max-w-[290px] text-[11.5px] leading-[1.85] text-muted">
              Considered botanicals, modern skincare science and quiet rituals for healthy, luminous skin. Made with care
              for you and the world around you.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {[
                { label: "Instagram", icon: <InstagramMark /> },
                { label: "Facebook", icon: <FacebookMark /> },
                { label: "Pinterest", icon: <PinterestMark /> },
                { label: "YouTube", icon: <YoutubeMark /> },
              ].map((social) => (
                <button
                  key={social.label}
                  type="button"
                  onClick={() => socialHandler(social.label)}
                  aria-label={`Purevia on ${social.label} (demo link)`}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-forest/20 text-forest transition-colors hover:border-forest hover:bg-forest hover:text-ivory"
                >
                  {social.icon}
                </button>
              ))}
            </div>
            <p className="mt-4 text-[8px] font-semibold uppercase tracking-[0.2em] text-olive/70">Clean beauty · Est. 2018</p>
          </div>

          <nav aria-label="Quick links" className="xl:col-span-2">
            <h2 className="text-[9.5px] font-semibold uppercase tracking-[0.2em] text-forest">Quick Links</h2>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  {link.href ? (
                    <a
                      href={link.href}
                      onClick={() => link.filter && onSelectCollection(link.filter)}
                      className="text-[11.5px] text-ink/60 transition-colors hover:text-olive"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onInfo(link.action ?? "faqs")}
                      className="text-left text-[11.5px] text-ink/60 transition-colors hover:text-olive"
                    >
                      {link.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Customer care" className="xl:col-span-2">
            <h2 className="text-[9.5px] font-semibold uppercase tracking-[0.2em] text-forest">Customer Care</h2>
            <ul className="mt-4 space-y-2.5">
              {careLinks.map((link) => (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={() => onInfo(link.action)}
                    className="text-left text-[11.5px] text-ink/60 transition-colors hover:text-olive"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-2 md:col-span-2 xl:col-span-2">
            <h2 className="text-[9.5px] font-semibold uppercase tracking-[0.2em] text-forest">Contact Us</h2>
            <ul className="mt-4 space-y-3">
              <li>
                <a href="tel:+15550142088" className="group flex items-start gap-2.5 text-[11.5px] text-ink/60 transition-colors hover:text-olive">
                  <Phone className="mt-0.5 h-3.5 w-3.5 shrink-0 text-olive" strokeWidth={1.4} aria-hidden="true" />
                  +1 (555) 014-2088
                </a>
              </li>
              <li>
                <a href="mailto:hello@pureviabotanicals.com" className="group flex items-start gap-2.5 break-all text-[11.5px] text-ink/60 transition-colors hover:text-olive">
                  <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0 text-olive" strokeWidth={1.4} aria-hidden="true" />
                  hello@pureviabotanicals.com
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-[11.5px] leading-relaxed text-ink/60">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-olive" strokeWidth={1.4} aria-hidden="true" />
                <span>
                  142 Botanical Lane, Suite 08
                  <br />
                  Portland, OR 97205
                </span>
              </li>
            </ul>
            <p className="mt-3 text-[8px] uppercase leading-relaxed tracking-[0.16em] text-olive/70">Sample contact details for this demo</p>
          </div>

          <div className="col-span-2 md:col-span-6 xl:col-span-3">
            <h2 className="font-serif text-[26px] leading-none text-forest">Stay in Bloom</h2>
            <p className="mt-2.5 max-w-[290px] text-[11.5px] leading-relaxed text-muted">
              Exclusive offers, seasonal formulas and gentle skincare notes — delivered occasionally, never noisily.
            </p>

            {status === "success" ? (
              <div className="mt-4 border border-olive/30 bg-sage-soft/60 p-4" aria-live="polite">
                <p className="flex items-center gap-2 font-serif text-[19px] text-forest">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-olive text-ivory">
                    <Check className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                  </span>
                  You are on the list.
                </p>
                <p className="mt-2 text-[10.5px] leading-relaxed text-forest/70">
                  A welcome note would be on its way to {email.trim()}. This demo does not send emails.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setStatus("idle");
                    setEmail("");
                  }}
                  className="mt-3 text-[8.5px] font-semibold uppercase tracking-[0.16em] text-olive underline underline-offset-4 hover:text-forest"
                >
                  Subscribe another email
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-4" noValidate>
                <label htmlFor="newsletter-email" className="text-[8.5px] font-semibold uppercase tracking-[0.18em] text-forest">
                  Email address
                </label>
                <div className="mt-1.5 flex flex-col gap-2">
                  <input
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      if (error) setError("");
                    }}
                    placeholder="you@example.com"
                    autoComplete="email"
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? "newsletter-error" : undefined}
                    className="field bg-ivory py-3 text-[12px]"
                  />
                  <button type="submit" disabled={status === "submitting"} className="btn-primary w-full py-3.5 disabled:cursor-wait disabled:opacity-80">
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" strokeWidth={1.6} aria-hidden="true" />
                        Subscribing
                      </>
                    ) : (
                      <>
                        Subscribe
                        <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
                      </>
                    )}
                  </button>
                </div>
                {error ? (
                  <p id="newsletter-error" className="mt-1.5 text-[10.5px] leading-snug text-clay" role="alert">
                    {error}
                  </p>
                ) : null}
                <p className="mt-2.5 text-[9px] leading-relaxed text-muted">
                  By subscribing you agree to our{" "}
                  <button type="button" onClick={() => onInfo("privacy")} className="underline decoration-forest/30 underline-offset-2 hover:text-olive">
                    Privacy Policy
                  </button>
                  . Demo form — no data is sent.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      <div className="pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <p className="-mb-[0.06em] text-center font-serif text-[15vw] uppercase leading-[0.7] tracking-[0.08em] text-forest/[0.055]">
          Purevia
        </p>
      </div>

      <div className="container-x">
        <div className="flex flex-col gap-3 border-t border-forest/10 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[9.5px] leading-relaxed tracking-wide text-muted">
            © {new Date().getFullYear()} Purevia Botanicals. All rights reserved. Demo storefront.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <button type="button" onClick={() => onInfo("privacy")} className="text-[9px] uppercase tracking-[0.12em] text-muted hover:text-olive">
              Privacy
            </button>
            <button type="button" onClick={() => onInfo("terms")} className="text-[9px] uppercase tracking-[0.12em] text-muted hover:text-olive">
              Terms
            </button>
            <span className="text-[9px] uppercase tracking-[0.12em] text-muted">Simulated checkout only</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
