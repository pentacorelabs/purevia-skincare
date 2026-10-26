import { promises } from "../data/site";
import { ValueIcon } from "./ui";

export function PromiseStrip() {
  return (
    <section aria-label="Purevia brand promise" className="relative overflow-hidden bg-olive-deep">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 30%, rgba(199,208,185,0.22), transparent 45%), radial-gradient(circle at 85% 70%, rgba(199,208,185,0.16), transparent 45%)",
        }}
        aria-hidden="true"
      />
      <div className="container-x relative">
        <ul className="grid grid-cols-2 gap-y-6 py-8 sm:grid-cols-3 sm:py-9 lg:grid-cols-5 lg:divide-x lg:divide-ivory/15">
          {promises.map((promise) => (
            <li key={promise.label} className="flex items-center justify-center gap-2.5 px-2 lg:px-4">
              <ValueIcon name={promise.icon} className="h-5 w-5 shrink-0 text-sage" />
              <span className="text-[9px] font-medium uppercase leading-tight tracking-[0.16em] text-ivory sm:text-[9.5px]">
                {promise.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
