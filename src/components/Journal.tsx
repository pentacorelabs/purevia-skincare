import { ArrowRight } from "lucide-react";
import { journalArticles } from "../data/site";
import { Eyebrow, SmartImage } from "./ui";

type Article = (typeof journalArticles)[number];

export function Journal({ onReadArticle }: { onReadArticle: (article: Article) => void }) {
  return (
    <section id="journal" className="scroll-mt-24 bg-cream py-14 sm:py-20 lg:py-24">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <Eyebrow>Notes from the Garden</Eyebrow>
            <h2 className="mt-3 font-serif text-[2.15rem] leading-none tracking-[-0.015em] text-forest sm:text-[2.8rem] lg:text-[3.05rem]">
              The Purevia <em className="italic text-olive">Journal</em>
            </h2>
          </div>
          <p className="max-w-[270px] text-[11.5px] leading-relaxed text-muted">
            Slow rituals, considered ingredients and small ways to feel well.
          </p>
        </div>

        <div className="mt-9 grid gap-5 md:grid-cols-3 lg:mt-11 lg:gap-6">
          {journalArticles.map((article) => (
            <article key={article.id} className="group border border-forest/10 bg-ivory transition-shadow duration-500 hover:shadow-[0_20px_50px_-30px_rgba(34,42,28,0.4)]">
              <button
                type="button"
                onClick={() => onReadArticle(article)}
                className="block w-full text-left"
                aria-label={`Read ${article.title}`}
              >
                <div className="relative aspect-[16/11] overflow-hidden bg-sand">
                  <SmartImage
                    src={article.image}
                    alt={`Editorial image for ${article.title}`}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-[1.05]"
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                </div>
                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-2 text-[8px] font-semibold uppercase tracking-[0.2em] text-olive">
                    <span>{article.kicker}</span>
                    <span className="h-2.5 w-px bg-olive/30" aria-hidden="true" />
                    <span className="font-medium text-muted">{article.readTime}</span>
                  </div>
                  <h3 className="mt-3 font-serif text-[22px] leading-[1.12] text-forest transition-colors group-hover:text-olive sm:text-[24px]">
                    {article.title}
                  </h3>
                  <p className="mt-2.5 line-clamp-2 text-[11.5px] leading-relaxed text-muted">{article.excerpt}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-forest">
                    Read Story
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                </div>
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export type { Article };
