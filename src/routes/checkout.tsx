import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatNaira } from "@/lib/site";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — KERAscents" },
      {
        name: "description",
        content:
          "Secure checkout with Paystack, Flutterwave, bank transfer or cash on delivery. Nationwide delivery across Nigeria.",
      },
      { property: "og:title", content: "Checkout — KERAscents" },
      { property: "og:description", content: "Complete your KERAscents order securely." },
    ],
  }),
  component: Checkout,
});

const schema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(80),
  email: z.string().trim().email("Enter a valid email").max(120),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+\s-]{10,15}$/, "Enter a valid phone number"),
  address: z.string().trim().min(6, "Enter your delivery address").max(200),
  state: z.string().trim().min(2, "Enter your state").max(60),
  city: z.string().trim().min(2, "Enter your city").max(60),
  instructions: z.string().trim().max(300).optional(),
});

const payments = ["Paystack", "Flutterwave", "Bank Transfer", "Cash on Delivery"];

function Checkout() {
  const { hydrated, detailed, subtotal, discount, delivery, total, placeOrder } =
    useStore();
  const navigate = useNavigate();
  const [payment, setPayment] = useState(payments[0]!);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  if (hydrated && detailed.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-display text-4xl">Nothing to check out</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Add a fragrance to your cart first.
        </p>
        <Button asChild className="mt-6">
          <Link to="/shop">Shop fragrances</Link>
        </Button>
      </div>
    );
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<
      string,
      string
    >;
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues)
        next[String(issue.path[0])] = issue.message;
      setErrors(next);
      return;
    }
    setErrors({});
    setSubmitting(true);
    const order = placeOrder({
      ...parsed.data,
      instructions: parsed.data.instructions ?? "",
      payment,
      items: detailed.map((l) => ({
        name: l.product.name,
        size: l.size,
        qty: l.qty,
        price: l.product.price,
      })),
      subtotal,
      delivery,
      discount,
      total,
    });
    navigate({ to: "/order-confirmation", search: { id: order.id } });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-4xl">Checkout</h1>
      <form
        onSubmit={onSubmit}
        className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]"
      >
        <div className="space-y-6 rounded-lg border border-border bg-card p-6">
          <h2 className="font-display text-2xl">Delivery details</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field name="name" label="Full name" error={errors["name"]} />
            <Field name="email" label="Email address" type="email" error={errors["email"]} />
            <Field name="phone" label="Phone number" error={errors["phone"]} />
            <Field name="state" label="State" error={errors["state"]} />
            <Field name="city" label="City" error={errors["city"]} />
            <div className="sm:col-span-2">
              <Field name="address" label="Delivery address" error={errors["address"]} />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="instructions">Additional delivery instructions</Label>
              <Textarea
                id="instructions"
                name="instructions"
                rows={3}
                className="mt-1.5"
                placeholder="Landmark, gate code, preferred delivery time…"
              />
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl">Payment method</h2>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {payments.map((p) => (
                <label
                  key={p}
                  className={`flex cursor-pointer items-center gap-3 rounded-md border p-3 text-sm transition-colors ${
                    payment === p ? "border-primary bg-secondary" : "border-border"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={payment === p}
                    onChange={() => setPayment(p)}
                    className="accent-[var(--primary)]"
                  />
                  {p}
                </label>
              ))}
            </div>
          </div>
        </div>

        <aside className="h-fit rounded-lg border border-border bg-card p-6">
          <h2 className="font-display text-2xl">Order summary</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {detailed.map((l) => (
              <li key={`${l.product.slug}-${l.size}`} className="flex justify-between gap-3">
                <span className="min-w-0">
                  <span className="block truncate">{l.product.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {l.size} × {l.qty}
                  </span>
                </span>
                <span>{formatNaira(l.product.price * l.qty)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd>{formatNaira(subtotal)}</dd>
            </div>
            {discount > 0 && (
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Discount</dt>
                <dd>− {formatNaira(discount)}</dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Delivery</dt>
              <dd>{delivery === 0 ? "Free" : formatNaira(delivery)}</dd>
            </div>
            <div className="flex justify-between border-t border-border pt-3">
              <dt className="font-medium">Total</dt>
              <dd className="font-display text-xl">{formatNaira(total)}</dd>
            </div>
          </dl>
          <Button type="submit" className="mt-6 w-full" disabled={submitting}>
            {submitting ? "Placing order…" : "Place order"}
          </Button>
          <Button asChild variant="outline" className="mt-2 w-full">
            <Link to="/cart">Back to cart</Link>
          </Button>
        </aside>
      </form>
    </div>
  );
}

function Field({
  name,
  label,
  type = "text",
  error,
}: {
  name: string;
  label: string;
  type?: string;
  error?: string;
}) {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} type={type} className="mt-1.5" />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
