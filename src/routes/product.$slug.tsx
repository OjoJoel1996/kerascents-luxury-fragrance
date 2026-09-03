import { createFileRoute, notFound, Link, useNavigate } from "@tanstack/react-router";
import { Heart, Minus, Plus, MessageCircle, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ProductCard } from "@/components/ProductCard";
import { Rating } from "@/components/Rating";
import { Button } from "@/components/ui/button";
import { categoryName, getProduct, relatedTo } from "@/lib/products";
import { formatNaira, site, whatsappOrderLink } from "@/lib/site";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return {
        meta: [{ title: "Product — KERAscents" }, { name: "robots", content: "noindex" }],
      };
    const p = loaderData.product;
    const description = `${p.name} (${p.size}) by ${p.brand} — ${formatNaira(p.price)}. ${p.scent} fragrance, 100% authentic, delivered nationwide in Nigeria.`;
    return {
      meta: [
        { title: `${p.name} — ${p.size} | KERAscents` },
        { name: "description", content: description },
        { property: "og:title", content: `${p.name} — KERAscents` },
        { property: "og:description", content: description },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const navigate = useNavigate();
  const [size, setSize] = useState(product.size);
  const [qty, setQty] = useState(1);
  const wished = wishlist.includes(product.slug);
  const related = relatedTo(product);

  const add = () => {
    addToCart(product.slug, size, qty);
    toast.success(`${product.name} (${size}) added to cart`);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <nav className="text-xs text-muted-foreground">
        <Link to="/" className="hover:text-primary">
          Home
        </Link>{" "}
        /{" "}
        <Link to="/category/$slug" params={{ slug: product.category }} className="hover:text-primary">
          {categoryName(product.category)}
        </Link>{" "}
        / <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div>
          <img
            src={product.image}
            alt={`${product.name} by ${product.brand}`}
            width={900}
            height={1100}
            className="aspect-[4/5] w-full rounded-lg object-cover"
          />
          <div className="mt-3 grid grid-cols-4 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <img
                key={i}
                src={product.image}
                alt=""
                loading="lazy"
                className="aspect-square w-full rounded-md object-cover opacity-80 transition-opacity hover:opacity-100"
                style={{ objectPosition: `${20 + i * 20}% center` }}
              />
            ))}
          </div>
        </div>

        <div>
          <span className="eyebrow">{product.brand}</span>
          <h1 className="mt-2 font-display text-4xl">{product.name}</h1>
          <div className="mt-3 flex items-center gap-3">
            <Rating value={product.rating} />
            <span className="text-sm text-muted-foreground">
              {product.reviews} reviews
            </span>
          </div>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="font-display text-3xl">{formatNaira(product.price)}</span>
            {product.oldPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatNaira(product.oldPrice)}
              </span>
            )}
          </div>

          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
            <div>
              <dt className="eyebrow">Fragrance</dt>
              <dd>{product.scent}</dd>
            </div>
            <div>
              <dt className="eyebrow">Gender</dt>
              <dd>{product.gender}</dd>
            </div>
            <div>
              <dt className="eyebrow">Category</dt>
              <dd>{categoryName(product.category)}</dd>
            </div>
            <div>
              <dt className="eyebrow">Availability</dt>
              <dd>{product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}</dd>
            </div>
          </dl>

          <div className="mt-6">
            <p className="eyebrow">Size</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                    size === s
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border hover:border-primary"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-md border border-border">
              <button
                type="button"
                onClick={() => setQty((v) => Math.max(1, v - 1))}
                className="grid h-10 w-10 place-items-center"
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center text-sm">{qty}</span>
              <button
                type="button"
                onClick={() => setQty((v) => Math.min(20, v + 1))}
                className="grid h-10 w-10 place-items-center"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <Button onClick={add} className="gap-2">
              <ShoppingBag className="h-4 w-4" /> Add to cart
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                add();
                navigate({ to: "/checkout" });
              }}
            >
              Buy now
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                toggleWishlist(product.slug);
                toast(wished ? "Removed from wishlist" : "Saved to wishlist");
              }}
              className="gap-2"
            >
              <Heart className={`h-4 w-4 ${wished ? "fill-primary text-primary" : ""}`} />
              Wishlist
            </Button>
          </div>

          <a
            href={whatsappOrderLink({
              product: product.name,
              size,
              quantity: qty,
              price: product.price * qty,
            })}
            target="_blank"
            rel="noreferrer"
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-ink py-3 text-sm uppercase tracking-widest text-primary-foreground transition-opacity hover:opacity-90 sm:w-auto sm:px-6"
          >
            <MessageCircle className="h-4 w-4" /> Order via WhatsApp
          </a>
          <p className="mt-2 text-xs text-muted-foreground">
            Chat us on {site.whatsapp.map((w) => w.label).join(" or ")}.
          </p>

          <div className="mt-8 rounded-lg border border-border bg-card p-5">
            <h2 className="font-display text-xl">Fragrance notes</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {[
                ["Top notes", product.notes.top],
                ["Heart notes", product.notes.heart],
                ["Base notes", product.notes.base],
              ].map(([label, list]) => (
                <div key={label as string}>
                  <p className="eyebrow">{label as string}</p>
                  <p className="mt-1 text-sm">{(list as string[]).join(", ")}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-center font-display text-3xl">You may also like</h2>
          <div className="mx-auto mt-3 gold-rule" />
          <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
