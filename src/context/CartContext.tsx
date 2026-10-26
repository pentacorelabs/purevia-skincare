import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { CheckCircle2, X } from "lucide-react";
import { getProduct, type Product } from "../data/products";

const STORAGE_KEY = "purevia-cart-v1";
export const FREE_SHIPPING_THRESHOLD = 49;

interface StoredLine {
  id: string;
  quantity: number;
}

export interface CartEntry {
  product: Product;
  quantity: number;
}

interface ToastMessage {
  id: number;
  message: string;
  withCartAction?: boolean;
}

interface CartContextValue {
  entries: CartEntry[];
  count: number;
  subtotal: number;
  isCartOpen: boolean;
  toast: ToastMessage | null;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, quantity?: number) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  notify: (message: string, withCartAction?: boolean) => void;
  dismissToast: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function readStoredLines(): StoredLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (line): line is StoredLine =>
          typeof line === "object" &&
          line !== null &&
          typeof (line as StoredLine).id === "string" &&
          typeof (line as StoredLine).quantity === "number" &&
          (line as StoredLine).quantity > 0 &&
          Boolean(getProduct((line as StoredLine).id)),
      )
      .map((line) => ({ id: line.id, quantity: Math.min(99, Math.floor(line.quantity)) }));
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<StoredLine[]>(readStoredLines);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const toastId = useRef(0);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // Storage can be unavailable in private mode — the cart still works in memory.
    }
  }, [lines]);

  const notify = useCallback((message: string, withCartAction = false) => {
    toastId.current += 1;
    setToast({ id: toastId.current, message, withCartAction });
  }, []);

  useEffect(() => {
    if (!toast) return;
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setToast(null), 4600);
    return () => window.clearTimeout(timer.current);
  }, [toast]);

  const addItem = useCallback(
    (product: Product, quantity = 1) => {
      setLines((current) => {
        const existing = current.find((line) => line.id === product.id);
        if (existing) {
          return current.map((line) =>
            line.id === product.id
              ? { ...line, quantity: Math.min(99, line.quantity + quantity) }
              : line,
          );
        }
        return [...current, { id: product.id, quantity: Math.min(99, Math.max(1, quantity)) }];
      });
      notify(`${product.name} added to your bag.`, true);
    },
    [notify],
  );

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setLines((current) =>
      current
        .map((line) => (line.id === id ? { ...line, quantity: Math.max(0, Math.min(99, quantity)) } : line))
        .filter((line) => line.quantity > 0),
    );
  }, []);

  const removeItem = useCallback(
    (id: string) => {
      const product = getProduct(id);
      setLines((current) => current.filter((line) => line.id !== id));
      if (product) notify(`${product.name} removed from your bag.`);
    },
    [notify],
  );

  const clearCart = useCallback(() => setLines([]), []);
  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const dismissToast = useCallback(() => setToast(null), []);

  const entries = useMemo<CartEntry[]>(
    () =>
      lines.reduce<CartEntry[]>((accumulator, line) => {
        const product = getProduct(line.id);
        if (product) accumulator.push({ product, quantity: line.quantity });
        return accumulator;
      }, []),
    [lines],
  );

  const count = useMemo(() => entries.reduce((total, entry) => total + entry.quantity, 0), [entries]);
  const subtotal = useMemo(
    () => Math.round(entries.reduce((total, entry) => total + entry.product.price * entry.quantity, 0) * 100) / 100,
    [entries],
  );

  const value: CartContextValue = {
    entries,
    count,
    subtotal,
    isCartOpen,
    toast,
    openCart,
    closeCart,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    notify,
    dismissToast,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
      {toast ? (
        <div
          className="fixed inset-x-4 bottom-4 z-[100] flex items-center gap-3 border border-forest/15 bg-ivory px-4 py-3.5 shadow-[0_18px_50px_-12px_rgba(34,42,28,0.35)] animate-toast sm:inset-x-auto sm:right-6 sm:bottom-6 sm:max-w-sm"
          role="status"
          aria-live="polite"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sage-soft text-olive-deep">
            <CheckCircle2 className="h-4 w-4" aria-hidden="true" strokeWidth={1.6} />
          </span>
          <p className="flex-1 text-[12.5px] leading-snug text-ink">{toast.message}</p>
          {toast.withCartAction ? (
            <button
              type="button"
              onClick={() => {
                setIsCartOpen(true);
                setToast(null);
              }}
              className="shrink-0 border-b border-forest/40 pb-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-forest hover:border-olive hover:text-olive"
            >
              View bag
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => setToast(null)}
            aria-label="Dismiss notification"
            className="shrink-0 text-muted transition-colors hover:text-forest"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      ) : null}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside a CartProvider");
  return context;
}
