import { useCallback, useState } from "react";
import { CartProvider } from "./context/CartContext";
import type { Product } from "./data/products";
import { journalArticles } from "./data/site";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { TrustBar } from "./components/TrustBar";
import { Categories } from "./components/Categories";
import { StoryBanner } from "./components/StoryBanner";
import { BestSellers, ShopSection } from "./components/ShopSections";
import { PromiseStrip } from "./components/PromiseStrip";
import { Journal } from "./components/Journal";
import { Footer } from "./components/Footer";
import { CartDrawer } from "./components/CartDrawer";
import { AccountModal, ArticleModal, InfoModal, QuickView, SearchModal } from "./components/Dialogs";

type Article = (typeof journalArticles)[number];

function Storefront() {
  const [collection, setCollection] = useState("all");
  const [shopQuery, setShopQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [article, setArticle] = useState<Article | null>(null);
  const [infoKey, setInfoKey] = useState<string | null>(null);

  const scrollToSection = useCallback((id: string) => {
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 70);
  }, []);

  const selectCollection = useCallback((collectionId: string) => {
    setCollection(collectionId);
  }, []);

  const browseAll = useCallback(() => {
    setCollection("all");
    setShopQuery("");
  }, []);

  const viewAllSearchResults = useCallback(
    (query: string) => {
      setCollection("all");
      setShopQuery(query);
      setSearchOpen(false);
      scrollToSection("shop");
    },
    [scrollToSection],
  );

  const selectSearchResult = useCallback((product: Product) => {
    setSearchOpen(false);
    setQuickView(product);
  }, []);

  const joinNewsletter = useCallback(() => {
    setAccountOpen(false);
    window.setTimeout(() => {
      const input = document.getElementById("newsletter-email") as HTMLInputElement | null;
      input?.scrollIntoView({ behavior: "smooth", block: "center" });
      input?.focus({ preventScroll: true });
    }, 280);
  }, []);

  return (
    <div className="min-h-screen bg-ivory">
      <a
        href="#main"
        className="sr-only z-[110] bg-forest px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-ivory focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      <Navbar
        onOpenSearch={() => setSearchOpen(true)}
        onOpenAccount={() => setAccountOpen(true)}
        onSelectCollection={selectCollection}
      />

      <main id="main">
        <Hero onShopNow={browseAll} />
        <TrustBar />
        <Categories onSelectCollection={selectCollection} />
        <StoryBanner onOurStory={() => setInfoKey("story")} />
        <BestSellers onQuickView={setQuickView} onViewAll={browseAll} />
        <PromiseStrip />
        <ShopSection
          collection={collection}
          query={shopQuery}
          onCollectionChange={setCollection}
          onQueryChange={setShopQuery}
          onQuickView={setQuickView}
        />
        <Journal onReadArticle={setArticle} />
      </main>

      <Footer onInfo={setInfoKey} onSelectCollection={selectCollection} />

      <CartDrawer />

      <SearchModal
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectProduct={selectSearchResult}
        onViewAll={viewAllSearchResults}
      />
      <QuickView product={quickView} onClose={() => setQuickView(null)} />
      <ArticleModal article={article} onClose={() => setArticle(null)} />
      <InfoModal infoKey={infoKey} onClose={() => setInfoKey(null)} />
      <AccountModal open={accountOpen} onClose={() => setAccountOpen(false)} onJoinNewsletter={joinNewsletter} />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <Storefront />
    </CartProvider>
  );
}
