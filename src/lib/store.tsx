import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { products, type Product } from "./products";
import { site } from "./site";

export interface CartLine {
  slug: string;
  size: string;
  qty: number;
}

export interface Order {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  state: string;
  city: string;
  instructions: string;
  payment: string;
  paymentStatus: string;
  status: string;
  items: { name: string; size: string; qty: number; price: number }[];
  subtotal: number;
  delivery: number;
  discount: number;
  total: number;
}

const PROMOS: Record<string, { type: "percent" | "fixed"; value: number }> = {
  KERA10: { type: "percent", value: 10 },
  SCENT5000: { type: "fixed", value: 5000 },
  WELCOME15: { type: "percent", value: 15 },
};

interface StoreValue {
  hydrated: boolean;
  lines: CartLine[];
  wishlist: string[];
  promo: string | null;
  addToCart: (slug: string, size: string, qty?: number) => void;
  removeLine: (slug: string, size: string) => void;
  setQty: (slug: string, size: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (slug: string) => void;
  applyPromo: (code: string) => boolean;
  clearPromo: () => void;
  count: number;
  detailed: { product: Product; size: string; qty: number }[];
  subtotal: number;
  discount: number;
  delivery: number;
  total: number;
  orders: Order[];
  placeOrder: (o: Omit<Order, "id" | "createdAt" | "status" | "paymentStatus">) => Order;
}

const StoreContext = createContext<StoreValue | null>(null);

const read = <T,>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

export function StoreProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [lines, setLines] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [promo, setPromo] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    setLines(read<CartLine[]>("kera.cart", []));
    setWishlist(read<string[]>("kera.wishlist", []));
    setOrders(read<Order[]>("kera.orders", []));
    setPromo(read<string | null>("kera.promo", null));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem("kera.cart", JSON.stringify(lines));
  }, [lines, hydrated]);
  useEffect(() => {
    if (hydrated) localStorage.setItem("kera.wishlist", JSON.stringify(wishlist));
  }, [wishlist, hydrated]);
  useEffect(() => {
    if (hydrated) localStorage.setItem("kera.orders", JSON.stringify(orders));
  }, [orders, hydrated]);
  useEffect(() => {
    if (hydrated) localStorage.setItem("kera.promo", JSON.stringify(promo));
  }, [promo, hydrated]);

  const addToCart = useCallback((slug: string, size: string, qty = 1) => {
    setLines((prev) => {
      const found = prev.find((l) => l.slug === slug && l.size === size);
      if (found)
        return prev.map((l) =>
          l === found ? { ...l, qty: Math.min(l.qty + qty, 20) } : l,
        );
      return [...prev, { slug, size, qty }];
    });
  }, []);

  const removeLine = useCallback((slug: string, size: string) => {
    setLines((prev) => prev.filter((l) => !(l.slug === slug && l.size === size)));
  }, []);

  const setQty = useCallback((slug: string, size: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => !(l.slug === slug && l.size === size))
        : prev.map((l) =>
            l.slug === slug && l.size === size ? { ...l, qty: Math.min(qty, 20) } : l,
          ),
    );
  }, []);

  const toggleWishlist = useCallback((slug: string) => {
    setWishlist((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    );
  }, []);

  const detailed = useMemo(
    () =>
      lines.flatMap((l) => {
        const product = products.find((p) => p.slug === l.slug);
        return product ? [{ product, size: l.size, qty: l.qty }] : [];
      }),
    [lines],
  );

  const subtotal = useMemo(
    () => detailed.reduce((sum, l) => sum + l.product.price * l.qty, 0),
    [detailed],
  );

  const discount = useMemo(() => {
    if (!promo) return 0;
    const rule = PROMOS[promo];
    if (!rule) return 0;
    return rule.type === "percent"
      ? Math.round((subtotal * rule.value) / 100)
      : Math.min(rule.value, subtotal);
  }, [promo, subtotal]);

  const delivery =
    subtotal === 0 || subtotal - discount >= site.freeDeliveryThreshold
      ? 0
      : site.deliveryFee;

  const value: StoreValue = {
    hydrated,
    lines,
    wishlist,
    promo,
    addToCart,
    removeLine,
    setQty,
    clearCart: () => setLines([]),
    toggleWishlist,
    applyPromo: (code) => {
      const key = code.trim().toUpperCase();
      if (PROMOS[key]) {
        setPromo(key);
        return true;
      }
      return false;
    },
    clearPromo: () => setPromo(null),
    count: lines.reduce((n, l) => n + l.qty, 0),
    detailed,
    subtotal,
    discount,
    delivery,
    total: Math.max(subtotal - discount + delivery, 0),
    orders,
    placeOrder: (input) => {
      const order: Order = {
        ...input,
        id: `KS-${Date.now().toString().slice(-6)}`,
        createdAt: new Date().toISOString(),
        status: "Pending",
        paymentStatus:
          input.payment === "Cash on Delivery" ? "Pay on delivery" : "Awaiting payment",
      };
      setOrders((prev) => [order, ...prev]);
      setLines([]);
      setPromo(null);
      return order;
    },
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
