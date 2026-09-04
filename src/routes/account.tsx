import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatNaira } from "@/lib/site";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "My Account — KERAscents" },
      { name: "description", content: "View your KERAscents orders and account details." },
      { property: "og:title", content: "My Account — KERAscents" },
      { property: "og:description", content: "Track your KERAscents orders." },
    ],
  }),
  component: Account,
});

function Account() {
  const { hydrated, orders } = useStore();
  const [tab, setTab] = useState<"orders" | "login">("orders");

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center text-sm text-muted-foreground">
        Loading account…
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-4xl">My account</h1>
      <div className="mt-6 flex gap-4 border-b border-border">
        <button
          type="button"
          onClick={() => setTab("orders")}
          className={`pb-3 text-sm uppercase tracking-widest ${
            tab === "orders" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"
          }`}
        >
          Orders
        </button>
        <button
          type="button"
          onClick={() => setTab("login")}
          className={`pb-3 text-sm uppercase tracking-widest ${
            tab === "login" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"
          }`}
        >
          Login
        </button>
      </div>

      {tab === "orders" && (
        <div className="mt-6">
          {orders.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border p-12 text-center">
              <p className="text-sm text-muted-foreground">No orders yet.</p>
              <Button asChild className="mt-4">
                <Link to="/shop">Start shopping</Link>
              </Button>
            </div>
          ) : (
            <ul className="space-y-4">
              {orders.map((o) => (
                <li key={o.id} className="rounded-lg border border-border bg-card p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-medium">{o.id}</span>
                    <span className="rounded-full bg-secondary px-3 py-1 text-xs">
                      {o.status}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {new Date(o.createdAt).toLocaleDateString("en-NG", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                  <ul className="mt-3 space-y-1 text-sm">
                    {o.items.map((i) => (
                      <li key={`${i.name}-${i.size}`} className="text-muted-foreground">
                        {i.name} · {i.size} × {i.qty}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-right font-display text-xl">
                    {formatNaira(o.total)}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {tab === "login" && (
        <form
          className="mt-6 max-w-md space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            toast.info("Customer login will be available once accounts are enabled.");
          }}
        >
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>
          <Button type="submit" className="w-full">
            Sign in
          </Button>
          <p className="text-xs text-muted-foreground">
            Customer accounts are coming soon. For now, you can check out as a guest.
          </p>
        </form>
      )}
    </div>
  );
}
