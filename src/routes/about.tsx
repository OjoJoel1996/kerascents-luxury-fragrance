import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, Truck, HeartHandshake, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import ceoAsset from "@/assets/ceo.jpg.asset.json";
import { site } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — KERAscents" },
      {
        name: "description",
        content:
          "KERAscents is a premium fragrance destination in Nigeria offering authentic perfumes, roll-ons, perfume oils and gift sets.",
      },
      { property: "og:title", content: "About Us — KERAscents" },
      {
        property: "og:description",
        content:
          "Premium fragrances curated with authenticity, elegance and customer care.",
      },
    ],
  }),
  component: About,
});

const values = [
  {
    icon: ShieldCheck,
    title: "Authenticity first",
    text: "We verify every supplier so you can shop with confidence.",
  },
  {
    icon: Award,
    title: "Curated selection",
    text: "Only the best designer, niche and artisan fragrances make it to our shelves.",
  },
  {
    icon: Truck,
    title: "Nationwide delivery",
    text: "Fast, tracked shipping across Lagos and every Nigerian state.",
  },
  {
    icon: HeartHandshake,
    title: "Personal service",
    text: "Reach us on WhatsApp for recommendations, orders and after-sales support.",
  },
];

function About() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <header className="text-center">
        <span className="eyebrow">Our story</span>
        <h1 className="mt-2 font-display text-4xl">About KERAscents</h1>
        <div className="mx-auto mt-3 gold-rule" />
      </header>

      <section className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-lg leading-relaxed text-foreground">
            KERAscents was created to make luxury fragrance accessible, authentic and
            personal for every Nigerian. We believe a scent is more than a finishing
            touch — it is a statement of identity, mood and memory.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            From designer classics to concentrated roll-ons and alcohol-free perfume oils,
            every product in our collection is chosen for quality, longevity and value.
            Whether you are buying your first signature scent or restocking a favourite,
            we are here to help you find the perfect match.
          </p>
          <Button asChild className="mt-6">
            <Link to="/shop">Shop the collection</Link>
          </Button>
        </div>
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={ceoAsset.url}
            alt="CEO of KERAscents"
            loading="lazy"
            className="aspect-[4/5] w-full object-cover"
          />
        </div>
      </section>

      <section className="mt-16 rounded-lg bg-secondary/60 p-6 sm:p-10">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl">A message from our CEO</h2>
            <div className="mt-3 gold-rule" />
            <blockquote className="mt-5 leading-relaxed text-foreground">
              “The CEO of KERAscents is a purpose-driven entrepreneur passionate about
              transforming fragrance from a simple product into an expression of
              confidence, identity and personal excellence. Through KERAscents, she is
              building a distinctive fragrance brand that combines quality, elegance and
              meaningful customer experiences.”
            </blockquote>
            <p className="mt-4 font-medium">— Founder & CEO, KERAscents</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="font-display text-xl">Visit or reach us</h3>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="eyebrow">Address</dt>
                <dd>1 Bishop Aggey Street, Ilasamaja, Mushin, Lagos</dd>
              </div>
              <div>
                <dt className="eyebrow">Email</dt>
                <dd>{site.email}</dd>
              </div>
              <div>
                <dt className="eyebrow">WhatsApp</dt>
                <dd>{site.whatsapp.map((w) => w.label).join(" · ")}</dd>
              </div>
              <div>
                <dt className="eyebrow">Business hours</dt>
                <dd>{site.hours}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-center font-display text-3xl">Why KERAscents</h2>
        <div className="mx-auto mt-3 gold-rule" />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <div key={v.title} className="rounded-lg border border-border bg-card p-6">
              <v.icon className="h-6 w-6 text-gold" />
              <h3 className="mt-3 font-display text-xl">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
