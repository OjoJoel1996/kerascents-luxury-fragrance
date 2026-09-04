import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Rating } from "@/components/Rating";
import { getProduct } from "@/lib/products";
import { formatNaira } from "@/lib/site";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Your Wishlist — KERAscents" },
      { name: "description", content: "Save your favourite KERAscents fragrances." },
      { property: "og:title", content: "Your Wishlist — KERAscents" },
      { property: "og:description", content: "Your saved fragrances." },
    ],
  }),
  component: Wishlist,
});

function Wishlist() {
  const { hydrated, wishlist, toggleWishlist, addToCart } = useStore();
  const items = wishlist.map(getProduct).filter(Boolean);

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center text-sm text-muted-foreground">
        Loading wishlist…
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-display text-4xl">Your wishlist is empty</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Tap the heart on any fragrance to save it here.
        </p>
        <Button asChild className="mt-6">
          <Link to="/shop">Explore fragrances</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-4xl">Your wishlist</h1>
      <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {items.map((p) =>
          p ? (
            <div
              key={p.slug}
              className="luxe-card overflow-hidden rounded-lg bg-card"
            >
              <img
                src={p.image}
                alt={p.name}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
              <div className="p-4">
                <h2 className="font-display text-lg">
                  <Link to="/product/$slug" params={{ slug: p.slug }}>
                    {p.name}
                  </Link>
                </h2>
                <Rating value={p.rating} reviews={p.reviews} />
                <p className="mt-2 text-sm font-medium">{formatNaira(p.price)}</p>
                <div className="mt-3 flex gap-2">
                  <Button
                    size="sm"
                    className="flex-1 gap-1"
                    onClick={() => {
                      addToCart(p.slug, p.size);
                      toast.success("Added to cart");
                    }}
                  >
                    <ShoppingBag className="h-3.5 w-3.5" /> Cart
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleWishlist(p.slug)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          ) : null,
        )}
      </div>
    </div>
  );
}
