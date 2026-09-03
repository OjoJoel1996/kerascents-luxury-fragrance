import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { byCategory, categories, type CategorySlug } from "@/lib/products";

export const Route = createFileRoute("/category/$slug")({
  loader: ({ params }) => {
    const category = categories.find((c) => c.slug === params.slug);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return {
        meta: [{ title: "Category — KERAscents" }, { name: "robots", content: "noindex" }],
      };
    const { category } = loaderData;
    return {
      meta: [
        { title: `${category.name} — KERAscents` },
        { name: "description", content: category.description },
        { property: "og:title", content: `${category.name} — KERAscents` },
        { property: "og:description", content: category.description },
      ],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const items = byCategory(category.slug as CategorySlug);
  const grouped =
    category.slug === "roll-ons"
      ? Array.from(new Set(items.map((i) => i.scent))).sort()
      : null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <nav className="text-xs text-muted-foreground">
        <Link to="/" className="hover:text-primary">
          Home
        </Link>{" "}
        /{" "}
        <Link to="/shop" className="hover:text-primary">
          Shop
        </Link>{" "}
        / <span className="text-foreground">{category.name}</span>
      </nav>

      <header className="mt-6 grid gap-6 rounded-lg bg-secondary/60 p-6 sm:grid-cols-[minmax(0,1fr)_260px] sm:items-center">
        <div className="min-w-0">
          <span className="eyebrow">Category</span>
          <h1 className="mt-2 font-display text-4xl">{category.name}</h1>
          <p className="mt-2 max-w-lg text-sm text-muted-foreground">
            {category.description}
          </p>
        </div>
        <img
          src={category.image}
          alt={category.name}
          loading="lazy"
          width={900}
          height={1100}
          className="h-40 w-full rounded-md object-cover sm:h-48"
        />
      </header>

      {items.length === 0 ? (
        <div className="mt-10 rounded-lg border border-dashed border-border p-12 text-center">
          <p className="text-sm text-muted-foreground">
            No products in this category yet.
          </p>
          <Button asChild className="mt-4">
            <Link to="/shop">Browse all fragrances</Link>
          </Button>
        </div>
      ) : grouped ? (
        <div className="mt-10 space-y-12">
          {grouped.map((scent) => (
            <section key={scent}>
              <h2 className="font-display text-2xl">{scent} roll-ons</h2>
              <div className="mt-4 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
                {items
                  .filter((i) => i.scent === scent)
                  .map((p) => (
                    <ProductCard key={p.slug} product={p} />
                  ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
