import { ArrowRight } from "lucide-react";
import { storyValues } from "../data/site";
import { BotanicalBranch, Eyebrow, SmartImage, ValueIcon } from "./ui";

export function StoryBanner({ onOurStory }: { onOurStory: () => void }) {
  return (
    <section id="story" className="scroll-mt-24 bg-ivory px-0 py-6 sm:py-10">
      <div className="container-x">
        <div className="relative overflow-hidden bg-sage">
          <BotanicalBranch className="-left-10 bottom-0 h-[320px] w-[220px] text-forest/25" />
          <div className="grid lg:grid-cols-[1.04fr_0.96fr]">
            <div className="relative z-10 flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-12 lg:px-11 lg:py-14 xl:px-16 xl:py-16">
              <Eyebrow>Nature. Science. You.</Eyebrow>
              <h2 className="mt-4 max-w-[500px] font-serif text-[2.3rem] leading-[0.98] tracking-[-0.015em] text-forest sm:text-[3rem] xl:text-[3.45rem]">
                Thoughtful Skincare for a <em className="italic text-olive-deep">Healthier You</em>
              </h2>
              <p className="mt-5 max-w-[430px] text-[13px] leading-[1.85] text-forest/70 sm:text-[13.5px]">
                We pair time-honoured botanicals with modern skincare research to create formulas that are as gentle as
                they are effective. Every ingredient is chosen with intention — for your skin, and for the world it
                belongs to.
              </p>

              <div className="mt-7">
                <button type="button" onClick={onOurStory} className="btn-primary group">
                  Our Story
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} aria-hidden="true" />
                </button>
              </div>

              <ul className="mt-8 grid grid-cols-3 gap-3 border-t border-forest/15 pt-6">
                {storyValues.map((value) => (
                  <li key={value.label} className="flex flex-col gap-2">
                    <ValueIcon name={value.icon} className="h-[22px] w-[22px] text-olive-deep" />
                    <span className="text-[9px] font-semibold uppercase leading-tight tracking-[0.12em] text-forest/75">
                      {value.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative min-h-[360px] p-3 sm:min-h-[420px] sm:p-5 lg:min-h-[520px] lg:p-5 lg:pl-0">
              <div className="group relative h-full min-h-[330px] overflow-hidden bg-forest sm:min-h-[400px]">
                <SmartImage
                  src="/images/story-model.jpg"
                  alt="Model with healthy, dewy skin holding a green botanical leaf in warm natural light"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03]"
                  sizes="(min-width: 1024px) 45vw, 100vw"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest/45 via-transparent to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 sm:inset-x-5 sm:bottom-5">
                  <div className="border border-ivory/35 bg-ivory/92 px-4 py-3 backdrop-blur-sm">
                    <p className="text-[8px] font-semibold uppercase tracking-[0.24em] text-olive">Our promise</p>
                    <p className="mt-1 font-serif text-[20px] leading-tight text-forest">Kind to skin. Kinder to earth.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
