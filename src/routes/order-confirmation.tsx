import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatNaira } from "@/lib/site";
import { useStore } from "@/lib/store";

type Search = { id?: string };

export const Route = createFileRoute("/order-confirmation")({
  validateSearch: (search: Record<string, unknown>): Search =>
    typeof search["id"] === "string" ? { id: search["id"] } : {},
  head: () => ({
    meta: [
      { title: "Order Confirmed — KERAscents" },
      {
        name: "description",
        content: "Thank you for your KERAscents order. Track your fragrance delivery here.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Order Confirmed — KERAscents" },
      { property: "og:description", content: "Your KERAscents order was received." },
    ],
  }),
  component: Confirmation,
});

function Confirmation() {
  const { id } = Route.useSearch();
  const { orders, hydrated } = useStore();
  const order = orders.find((o) => o.id === id) ?? orders[0];

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center text-sm text-muted-foreground">
        Loading your order…
      </div>
    );
  }

  if (!order) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-display text-4xl">No order found</h1>
        <Button asChild className="mt-6">
          <Link to="/shop">Continue shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-gold" />
        <h1 className="mt-4 font-display text-4xl">Thank You for Your Order!</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          A confirmation has been sent to {order.email}. Our team will reach out on
          WhatsApp shortly.
        </p>
      </div>

      <div className="mt-10 rounded-lg border border-border bg-card p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <Info label="Order number" value={order.id} />
          <Info label="Customer" value={order.name} />
          <Info label="Payment method" value={order.payment} />
          <Info label="Payment status" value={order.paymentStatus} />
          <Info label="Order status" value={order.status} />
          <Info label="Estimated delivery" value="2 – 5 working days" />
        </div>

        <h2 className="mt-8 font-display text-2xl">Items purchased</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {order.items.map((i) => (
            <li key={`${i.name}-${i.size}`} className="flex justify-between gap-3">
              <span className="min-w-0 truncate">
                {i.name} · {i.size} × {i.qty}
              </span>
              <span>{formatNaira(i.price * i.qty)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-between border-t border-border pt-4">
          <span className="font-medium">Total paid</span>
          <span className="font-display text-xl">{formatNaira(order.total)}</span>
        </div>

        <h2 className="mt-8 font-display text-2xl">Delivery information</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {order.address}, {order.city}, {order.state}
          <br />
          {order.phone}
          {order.instructions ? ` · ${order.instructions}` : ""}
        </p>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild>
          <Link to="/shop">Continue shopping</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/account">View order</Link>
        </Button>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="eyebrow">{label}</p>
      <p className="text-sm">{value}</p>
    </div>
  );
}
