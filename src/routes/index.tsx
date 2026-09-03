import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BadgeCheck,
  Sparkles,
  Wallet,
  ShieldCheck,
  Truck,
  Headphones,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import hero from "@/assets/hero.jpg";
import { ProductCard } from "@/components/ProductCard";
import { Rating } from "@/components/Rating";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { bestSellers, categories, newArrivals } from "@/lib/products";
import { site } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KERAscents — Discover Your Signature Scent | Perfumes in Nigeria" },
      {
        name: "description",
        content:
          "Premium, 100% authentic perfumes, roll-on fragrances, perfume oils and gift sets. Shop online in Naira or order on WhatsApp with fast nationwide delivery.",
      },
      { property: "og:title", content: "KERAscents — Discover Your Signature Scent" },
      {
        property: "og:description",
        content:
          "Authentic Scents. Timeless Impressions. Premium fragrances for every personality, mood and occasion.",
      },
    ],
  }),
  component: Home,
});

const reasons = [
  { icon: BadgeCheck, title: "100% Authentic", text: "Every bottle is sourced and verified." },
  { icon: Sparkles, title: "Premium Fragrances", text: "Designer, niche and artisan oils." },
  { icon: Wallet, title: "Affordable Prices", text: "Luxury scents at fair Naira pricing." },
  { icon: ShieldCheck, title: "Secure Shopping", text: "Paystack, Flutterwave & transfer." },
  { icon: Truck, title: "Fast Delivery", text: "24–72hrs nationwide across Nigeria." },
  { icon: Headphones, title: "Customer Support", text: "WhatsApp support 6 days a week." },
];

const testimonials = [
  {
    name: "Adaeze O.",
    rating: 5,
    text: "My Coco Mademoiselle arrived same day in Lagos and it is the real deal. The packaging felt so premium.",
  },
  {
    name: "Tunde A.",
    rating: 5,
    text: "Ordered Aventus through WhatsApp and the process was seamless. Longevity is unmatched.",
  },
  {
    name: "Hauwa I.",
    rating: 4,
    text: "The roll-ons are my everyday favourite. Vanilla Bliss lasts on my skin all day at work.",
  },
];

function Home() {
  const [email, setEmail] = useState("");

  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink text-primary-foreground">
        <img
          src={hero}
          alt="Luxury KERAscents perfume bottle on purple velvet"
          width={1600}
          height={1100}
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:py-40">
          <div className="max-w-xl">
            <span className="eyebrow text-gold">{site.tagline}</span>
            <h1 className="mt-4 font-display text-5xl leading-tight sm:text-6xl lg:text-7xl">
              Discover Your <span className="text-gold">Signature Scent</span>
            </h1>
            <p className="mt-5 max-w-md text-base text-primary-foreground/80">
              Premium fragrances carefully selected to match every personality, mood, and
              occasion.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/shop">Shop Collection</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent">
                <Link to="/category/$slug" params={{ slug: "roll-ons" }}>
                  Explore Roll-On Fragrances
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Section
        eyebrow="Collections"
        title="Shop by category"
        subtitle="From bold designer signatures to pocket-sized roll-ons."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <article key={c.slug} className="luxe-card group overflow-hidden rounded-lg">
              <img
                src={c.image}
                alt={c.name}
                loading="lazy"
                width={900}
                height={1100}
                className="aspect-[5/4] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="p-5">
                <h3 className="font-display text-xl">{c.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.description}</p>
                <Button asChild variant="link" className="mt-2 h-auto p-0 text-gold">
                  <Link to="/category/$slug" params={{ slug: c.slug }}>
                    Shop now →
                  </Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Loved by many"
        title="Best sellers"
        subtitle="The fragrances our customers reorder again and again."
      >
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {bestSellers.slice(0, 8).map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </Section>

      <Section eyebrow="Just landed" title="New arrivals" subtitle="Fresh into the vault.">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {newArrivals.slice(0, 4).map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </Section>

      <section className="bg-secondary/60 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-center font-display text-3xl">Why choose KERAscents</h2>
          <div className="mx-auto mt-3 gold-rule" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map((r) => (
              <div key={r.title} className="flex items-start gap-4 rounded-lg bg-card p-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                  <r.icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-base font-medium">{r.title}</h3>
                  <p className="text-sm text-muted-foreground">{r.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section eyebrow="Testimonials" title="What our customers say">
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="rounded-lg border border-border bg-card p-6">
              <Rating value={t.rating} />
              <blockquote className="mt-3 text-sm text-muted-foreground">
                “{t.text}”
              </blockquote>
              <figcaption className="mt-4 text-sm font-medium">{t.name}</figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <section className="bg-ink py-16 text-primary-foreground">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="font-display text-3xl">Join the KERAscents list</h2>
          <p className="mt-3 text-sm text-primary-foreground/75">
            Get fragrance updates, exclusive offers and new arrivals.
          </p>
          <form
            className="mx-auto mt-6 flex max-w-md gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (!/^\S+@\S+\.\S+$/.test(email)) {
                toast.error("Enter a valid email address");
                return;
              }
              toast.success("Subscribed. Check your inbox for a welcome offer.");
              setEmail("");
            }}
          >
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="border-primary-foreground/25 bg-transparent placeholder:text-primary-foreground/50"
            />
            <Button type="submit" variant="secondary">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}

function Section({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <header className="mb-8 text-center">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2 className="mt-2 font-display text-3xl sm:text-4xl">{title}</h2>
        <div className="mx-auto mt-3 gold-rule" />
        {subtitle && <p className="mt-3 text-sm text-muted-foreground">{subtitle}</p>}
      </header>
      {children}
    </section>
  );
}
