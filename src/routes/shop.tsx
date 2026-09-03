import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  allScents,
  allSizes,
  categories,
  products,
  type CategorySlug,
} from "@/lib/products";
import { formatNaira } from "@/lib/site";

type Search = { q?: string };

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): Search =>
    typeof search["q"] === "string" && search["q"] ? { q: search["q"] } : {},
  head: () => ({
    meta: [
      { title: "Shop All Fragrances — KERAscents" },
      {
        name: "description",
        content:
          "Browse the full KERAscents catalogue: men's, women's and unisex perfumes, roll-ons, perfume oils and gift sets. Filter by price, size and scent.",
      },
      { property: "og:title", content: "Shop All Fragrances — KERAscents" },
      {
        property: "og:description",
        content: "Filter premium perfumes by category, gender, scent, size and price.",
      },
    ],
  }),
  component: Shop,
});

const sorts = [
  { id: "featured", label: "Best Selling" },
  { id: "new", label: "Newest" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "rating", label: "Highest Rated" },
] as const;

const genders = ["Men", "Women", "Unisex"] as const;
const MAX_PRICE = 150000;

function Shop() {
  const { q } = Route.useSearch();
  const [term, setTerm] = useState(q ?? "");
  const [cats, setCats] = useState<CategorySlug[]>([]);
  const [gender, setGender] = useState<string[]>([]);
  const [scents, setScents] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [sort, setSort] = useState<(typeof sorts)[number]["id"]>("featured");

  const toggle = <T,>(list: T[], set: (v: T[]) => void, value: T) =>
    set(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);

  const results = useMemo(() => {
    const t = term.trim().toLowerCase();
    let list = products.filter((p) => {
      if (t) {
        const haystack = [
          p.name,
          p.brand,
          p.scent,
          p.category,
          p.gender,
          ...p.notes.top,
          ...p.notes.heart,
          ...p.notes.base,
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(t)) return false;
      }
      if (cats.length && !cats.includes(p.category)) return false;
      if (gender.length && !gender.includes(p.gender)) return false;
      if (scents.length && !scents.includes(p.scent)) return false;
      if (sizes.length && !p.sizes.some((s) => sizes.includes(s))) return false;
      if (p.price > maxPrice) return false;
      return true;
    });

    list = [...list].sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "new":
          return Number(b.newArrival) - Number(a.newArrival);
        default:
          return Number(b.bestSeller) - Number(a.bestSeller) || b.reviews - a.reviews;
      }
    });
    return list;
  }, [term, cats, gender, scents, sizes, maxPrice, sort]);

  const reset = () => {
    setTerm("");
    setCats([]);
    setGender([]);
    setScents([]);
    setSizes([]);
    setMaxPrice(MAX_PRICE);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <header className="text-center">
        <span className="eyebrow">The collection</span>
        <h1 className="mt-2 font-display text-4xl">Shop all fragrances</h1>
        <div className="mx-auto mt-3 gold-rule" />
      </header>

      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="space-y-6 rounded-lg border border-border bg-card p-5">
          <div>
            <label className="eyebrow" htmlFor="search">
              Search
            </label>
            <Input
              id="search"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Name, brand or note"
              className="mt-2"
            />
          </div>

          <FilterGroup title="Category">
            {categories.map((c) => (
              <Check
                key={c.slug}
                label={c.name}
                checked={cats.includes(c.slug)}
                onChange={() => toggle(cats, setCats, c.slug)}
              />
            ))}
          </FilterGroup>

          <FilterGroup title="Gender">
            {genders.map((g) => (
              <Check
                key={g}
                label={g}
                checked={gender.includes(g)}
                onChange={() => toggle(gender, setGender, g)}
              />
            ))}
          </FilterGroup>

          <div>
            <p className="eyebrow">Max price</p>
            <input
              type="range"
              min={4000}
              max={MAX_PRICE}
              step={1000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="mt-3 w-full accent-[var(--primary)]"
            />
            <p className="text-sm text-muted-foreground">Up to {formatNaira(maxPrice)}</p>
          </div>

          <FilterGroup title="Fragrance type">
            <div className="max-h-44 overflow-y-auto pr-1">
              {allScents.map((s) => (
                <Check
                  key={s}
                  label={s}
                  checked={scents.includes(s)}
                  onChange={() => toggle(scents, setScents, s)}
                />
              ))}
            </div>
          </FilterGroup>

          <FilterGroup title="Size">
            <div className="flex flex-wrap gap-2">
              {allSizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => toggle(sizes, setSizes, s)}
                  className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                    sizes.includes(s)
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border hover:border-primary"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </FilterGroup>

          <Button variant="outline" className="w-full" onClick={reset}>
            Clear filters
          </Button>
        </aside>

        <div>
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 pb-5">
            <p className="text-sm text-muted-foreground">
              {results.length} product{results.length === 1 ? "" : "s"}
            </p>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="rounded-md border border-input bg-background px-3 py-2 text-sm"
              aria-label="Sort products"
            >
              {sorts.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          {results.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border p-12 text-center">
              <h2 className="font-display text-2xl">No fragrances found</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Try widening your filters or searching a different note.
              </p>
              <Button className="mt-4" onClick={reset}>
                Clear filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
              {results.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="eyebrow">{title}</p>
      <div className="mt-2 space-y-1.5">{children}</div>
    </div>
  );
}

function Check({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-sm">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 accent-[var(--primary)]"
      />
      {label}
    </label>
  );
}
