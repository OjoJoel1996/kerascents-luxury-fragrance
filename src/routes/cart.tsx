import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatNaira, site } from "@/lib/site";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — KERAscents" },
      {
        name: "description",
        content:
          "Review your selected fragrances, update quantities and apply a promo code before checkout.",
      },
      { property: "og:title", content: "Your Cart — KERAscents" },
      { property: "og:description", content: "Review your KERAscents fragrance order." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const {
    hydrated,
    detailed,
    setQty,
    removeLine,
    subtotal,
    discount,
    delivery,
    total,
    promo,
    applyPromo,
    clearPromo,
  } = useStore();
  const [code, setCode] = useState("");

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center text-sm text-muted-foreground">
        Loading your cart…
      </div>
    );
  }

  if (detailed.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-display text-4xl">Your cart is empty</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Discover a signature scent worth keeping.
        </p>
        <Button asChild className="mt-6">
          <Link to="/shop">Continue shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-4xl">Shopping cart</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
        <ul className="space-y-4">
          {detailed.map(({ product, size, qty }) => (
            <li
              key={`${product.slug}-${size}`}
              className="grid grid-cols-[80px_minmax(0,1fr)] gap-4 rounded-lg border border-border bg-card p-4 sm:grid-cols-[100px_minmax(0,1fr)_auto]"
            >
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
                className="h-full max-h-28 w-full rounded object-cover"
              />
              <div className="min-w-0">
                <h2 className="truncate font-display text-lg">
                  <Link to="/product/$slug" params={{ slug: product.slug }}>
                    {product.name}
                  </Link>
                </h2>
                <p className="text-xs text-muted-foreground">
                  {size} · {product.scent}
                </p>
                <p className="mt-1 text-sm">{formatNaira(product.price)}</p>
                <div className="mt-3 flex items-center gap-3">
                  <div className="flex items-center rounded-md border border-border">
                    <button
                      onClick={() => setQty(product.slug, size, qty - 1)}
                      className="grid h-8 w-8 place-items-center"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm">{qty}</span>
                    <button
                      onClick={() => setQty(product.slug, size, qty + 1)}
                      className="grid h-8 w-8 place-items-center"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeLine(product.slug, size)}
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Remove
                  </button>
                </div>
              </div>
              <p className="col-span-2 text-right text-sm font-medium sm:col-span-1 sm:self-center">
                {formatNaira(product.price * qty)}
              </p>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-lg border border-border bg-card p-6">
          <h2 className="font-display text-2xl">Order summary</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <Row label="Subtotal" value={formatNaira(subtotal)} />
            {discount > 0 && (
              <Row label={`Discount (${promo})`} value={`− ${formatNaira(discount)}`} />
            )}
            <Row
              label="Delivery"
              value={delivery === 0 ? "Free" : formatNaira(delivery)}
            />
            <div className="border-t border-border pt-3">
              <Row label="Total" value={formatNaira(total)} strong />
            </div>
          </dl>
          <p className="mt-2 text-xs text-muted-foreground">
            Free delivery on orders above {formatNaira(site.freeDeliveryThreshold)}.
          </p>

          <div className="mt-5">
            <label className="eyebrow" htmlFor="promo">
              Promo code
            </label>
            <div className="mt-2 flex gap-2">
              <Input
                id="promo"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="KERA10"
              />
              <Button
                variant="outline"
                onClick={() => {
                  if (applyPromo(code)) toast.success("Promo code applied");
                  else toast.error("Invalid promo code");
                  setCode("");
                }}
              >
                Apply
              </Button>
            </div>
            {promo && (
              <button
                onClick={clearPromo}
                className="mt-2 text-xs text-muted-foreground underline"
              >
                Remove {promo}
              </button>
            )}
          </div>

          <Button asChild className="mt-6 w-full">
            <Link to="/checkout">Proceed to checkout</Link>
          </Button>
          <Button asChild variant="outline" className="mt-2 w-full">
            <Link to="/shop">Continue shopping</Link>
          </Button>
        </aside>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  strong,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <dt className={strong ? "font-medium" : "text-muted-foreground"}>{label}</dt>
      <dd className={strong ? "font-display text-xl" : ""}>{value}</dd>
    </div>
  );
}
