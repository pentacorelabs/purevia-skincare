/// <reference types="react" />

import { FlaskConical, Gem, Sparkles, Sprout } from "lucide-react";
import { trustBenefits } from "../data/site";

const icons = [FlaskConical, Gem, Sprout, Sparkles];

export function TrustBar() {
  return (
    <section aria-label="Why choose Purevia" className="border-b border-forest/10 bg-ivory">
      <div className="container-x">
        <ul className="grid grid-cols-1 divide-y divide-forest/10 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          {trustBenefits.map((item, index) => {
            const Icon = icons[index];
            return (
              <li key={item.title} className="flex items-start gap-3.5 py-5 sm:px-5 sm:py-7 lg:px-7 lg:first:pl-0 lg:last:pr-0">
                <Icon className="mt-0.5 h-6 w-6 shrink-0 text-olive" strokeWidth={1.1} aria-hidden="true" />
                <div>
                  <h2 className="font-serif text-[19px] leading-tight text-forest">{item.title}</h2>
                  <p className="mt-1.5 text-[11.5px] leading-relaxed text-muted">{item.copy}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}