import { Link } from "@tanstack/react-router";
import { Heart, Eye, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Rating } from "./Rating";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { categoryName, type Product } from "@/lib/products";
import { formatNaira } from "@/lib/site";
import { useStore } from "@/lib/store";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const [open, setOpen] = useState(false);
  const wished = wishlist.includes(product.slug);

  const add = () => {
    addToCart(product.slug, product.size, 1);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <article className="luxe-card group relative flex flex-col overflow-hidden rounded-lg">
      <div className="relative overflow-hidden bg-secondary">
        <Link
          to="/product/$slug"
          params={{ slug: product.slug }}
          aria-label={product.name}
        >
          <img
            src={product.image}
            alt={`${product.name} by ${product.brand}`}
            loading="lazy"
            width={900}
            height={1100}
            className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>
        <div className="absolute left-3 top-3 flex flex-col gap-1">
          {product.newArrival && (
            <span className="rounded-full bg-primary px-2.5 py-1 text-[10px] uppercase tracking-widest text-primary-foreground">
              New
            </span>
          )}
          {product.oldPrice && (
            <span className="rounded-full bg-gold px-2.5 py-1 text-[10px] uppercase tracking-widest text-accent-foreground">
              Sale
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={() => {
            toggleWishlist(product.slug);
            toast(wished ? "Removed from wishlist" : "Saved to wishlist");
          }}
          aria-label="Add to wishlist"
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-card/90 text-foreground shadow-sm transition-colors hover:text-primary"
        >
          <Heart className={`h-4 w-4 ${wished ? "fill-primary text-primary" : ""}`} />
        </button>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="absolute inset-x-3 bottom-3 hidden items-center justify-center gap-2 rounded-md bg-card/95 py-2 text-xs uppercase tracking-widest text-foreground transition-colors hover:bg-card sm:flex sm:opacity-0 sm:group-hover:opacity-100"
        >
          <Eye className="h-3.5 w-3.5" /> Quick view
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="eyebrow">{categoryName(product.category)}</span>
        <h3 className="font-display text-lg leading-tight">
          <Link to="/product/$slug" params={{ slug: product.slug }}>
            {product.name}
          </Link>
        </h3>
        <p className="text-xs text-muted-foreground">
          {product.size} · {product.scent}
        </p>
        <Rating value={product.rating} reviews={product.reviews} />
        <div className="mt-auto flex items-baseline gap-2 pt-2">
          <span className="text-base font-medium">{formatNaira(product.price)}</span>
          {product.oldPrice && (
            <span className="text-xs text-muted-foreground line-through">
              {formatNaira(product.oldPrice)}
            </span>
          )}
        </div>
        <div className="flex gap-2 pt-2">
          <Button onClick={add} className="flex-1 gap-2" size="sm">
            <ShoppingBag className="h-4 w-4" /> Add to cart
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setOpen(true)}
            aria-label="Quick view"
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">{product.name}</DialogTitle>
            <DialogDescription>
              {product.brand} · {categoryName(product.category)}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-5 sm:grid-cols-2">
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="aspect-[4/5] w-full rounded-md object-cover"
            />
            <div className="flex flex-col gap-3">
              <Rating value={product.rating} reviews={product.reviews} />
              <p className="text-sm text-muted-foreground">{product.description}</p>
              <p className="text-sm">
                <span className="text-muted-foreground">Sizes:</span>{" "}
                {product.sizes.join(", ")}
              </p>
              <p className="text-xl font-medium">{formatNaira(product.price)}</p>
              <div className="flex flex-wrap gap-2">
                <Button onClick={add}>Add to cart</Button>
                <Button asChild variant="outline">
                  <Link to="/product/$slug" params={{ slug: product.slug }}>
                    View details
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </article>
  );
}
