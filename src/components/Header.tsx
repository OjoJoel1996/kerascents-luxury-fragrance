import { Link, useNavigate } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { products } from "@/lib/products";
import { site } from "@/lib/site";
import { useStore } from "@/lib/store";

const nav = [
  { label: "Home", to: "/" as const },
  { label: "Shop", to: "/shop" as const },
];

const catNav = [
  { label: "Men", slug: "men" },
  { label: "Women", slug: "women" },
  { label: "Unisex", slug: "unisex" },
  { label: "Roll-Ons", slug: "roll-ons" },
  { label: "Gift Sets", slug: "gift-sets" },
];

export function Header() {
  const { count, wishlist } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const suggestions = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (term.length < 2) return [];
    return products
      .filter((p) =>
        [p.name, p.brand, p.scent, p.category, ...p.notes.top, ...p.notes.base]
          .join(" ")
          .toLowerCase()
          .includes(term),
      )
      .slice(0, 6);
  }, [q]);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchOpen(false);
    navigate({ to: "/shop", search: { q: q.trim() } });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="bg-ink py-2 text-center text-[11px] uppercase tracking-[0.25em] text-primary-foreground">
        {site.tagline}
      </div>
      <div className="mx-auto grid max-w-7xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-6">
        <button
          type="button"
          className="lg:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Open menu"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <div className="flex min-w-0 items-center gap-8">
          <Link to="/" className="shrink-0">
            <span className="font-display text-2xl font-semibold tracking-wide">
              KERA<span className="text-gold">scents</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm lg:flex">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeOptions={{ exact: n.to === "/" }}
                activeProps={{ className: "text-primary" }}
                className="uppercase tracking-widest text-foreground/80 transition-colors hover:text-primary"
              >
                {n.label}
              </Link>
            ))}
            {catNav.map((c) => (
              <Link
                key={c.slug}
                to="/category/$slug"
                params={{ slug: c.slug }}
                activeProps={{ className: "text-primary" }}
                className="uppercase tracking-widest text-foreground/80 transition-colors hover:text-primary"
              >
                {c.label}
              </Link>
            ))}
            <Link
              to="/about"
              className="uppercase tracking-widest text-foreground/80 transition-colors hover:text-primary"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="uppercase tracking-widest text-foreground/80 transition-colors hover:text-primary"
            >
              Contact
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
            className="grid h-9 w-9 place-items-center rounded-full transition-colors hover:bg-secondary"
          >
            <Search className="h-[18px] w-[18px]" />
          </button>
          <Link
            to="/wishlist"
            aria-label="Wishlist"
            className="relative grid h-9 w-9 place-items-center rounded-full transition-colors hover:bg-secondary"
          >
            <Heart className="h-[18px] w-[18px]" />
            {wishlist.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] text-primary-foreground">
                {wishlist.length}
              </span>
            )}
          </Link>
          <Link
            to="/account"
            aria-label="Account"
            className="hidden h-9 w-9 place-items-center rounded-full transition-colors hover:bg-secondary sm:grid"
          >
            <User className="h-[18px] w-[18px]" />
          </Link>
          <Link
            to="/cart"
            aria-label="Cart"
            className="relative grid h-9 w-9 place-items-center rounded-full transition-colors hover:bg-secondary"
          >
            <ShoppingBag className="h-[18px] w-[18px]" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[10px] text-accent-foreground">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-border bg-background px-4 pb-4 lg:hidden">
          {[
            ...nav.map((n) => ({ label: n.label, to: n.to, slug: null })),
            ...catNav.map((c) => ({ label: c.label, to: null, slug: c.slug })),
          ].map((item) =>
            item.slug ? (
              <Link
                key={item.slug}
                to="/category/$slug"
                params={{ slug: item.slug }}
                onClick={() => setMenuOpen(false)}
                className="block border-b border-border py-3 text-sm uppercase tracking-widest"
              >
                {item.label}
              </Link>
            ) : (
              <Link
                key={item.label}
                to={item.to!}
                onClick={() => setMenuOpen(false)}
                className="block border-b border-border py-3 text-sm uppercase tracking-widest"
              >
                {item.label}
              </Link>
            ),
          )}
          <Link
            to="/about"
            onClick={() => setMenuOpen(false)}
            className="block border-b border-border py-3 text-sm uppercase tracking-widest"
          >
            About
          </Link>
          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="block py-3 text-sm uppercase tracking-widest"
          >
            Contact
          </Link>
        </nav>
      )}

      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="max-w-lg">
          <DialogTitle className="font-display text-xl">Search fragrances</DialogTitle>
          <form onSubmit={submitSearch} className="flex gap-2">
            <Input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Perfume, brand, note or scent type…"
            />
            <Button type="submit">Search</Button>
          </form>
          <ul className="max-h-72 overflow-y-auto">
            {suggestions.map((p) => (
              <li key={p.slug}>
                <Link
                  to="/product/$slug"
                  params={{ slug: p.slug }}
                  onClick={() => setSearchOpen(false)}
                  className="flex items-center gap-3 rounded-md p-2 hover:bg-secondary"
                >
                  <img
                    src={p.image}
                    alt=""
                    loading="lazy"
                    className="h-12 w-10 rounded object-cover"
                  />
                  <span className="min-w-0">
                    <span className="block truncate text-sm">{p.name}</span>
                    <span className="block text-xs text-muted-foreground">
                      {p.brand} · {p.scent}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
            {q.trim().length >= 2 && suggestions.length === 0 && (
              <li className="p-2 text-sm text-muted-foreground">
                No fragrances match “{q}”.
              </li>
            )}
          </ul>
        </DialogContent>
      </Dialog>
    </header>
  );
}
