import { createFileRoute, Link } from "@tanstack/react-router";
import { site } from "@/lib/site";

export const Route = createFileRoute("/faqs")({
  head: () => ({
    meta: [
      { title: "FAQs & Delivery Info — KERAscents" },
      {
        name: "description",
        content:
          "Find answers to common questions about KERAscents orders, delivery, returns and authenticity.",
      },
      { property: "og:title", content: "FAQs & Delivery Info — KERAscents" },
      { property: "og:description", content: "Delivery, returns and support FAQs." },
    ],
  }),
  component: FAQs,
});

const faqs = [
  {
    q: "Are your perfumes authentic?",
    a: "Yes. Every designer, niche and roll-on fragrance we sell is sourced from verified distributors and importers. We guarantee authenticity on every order.",
  },
  {
    q: "How long does delivery take?",
    a: "Lagos orders typically arrive within 24–48 hours. Deliveries to other Nigerian states take 2–5 working days depending on the courier route.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept Paystack, Flutterwave, direct bank transfer and cash on delivery where available.",
  },
  {
    q: "Can I order through WhatsApp?",
    a: "Absolutely. Click the WhatsApp button on any product page or reach us directly at the numbers on our contact page.",
  },
  {
    q: "Do you offer free delivery?",
    a: `Yes. Orders above ${site.freeDeliveryThreshold.toLocaleString("en-NG")} Naira qualify for free nationwide delivery.`,
  },
  {
    q: "What is your return policy?",
    a: "Unopened and sealed items can be returned within 7 days of delivery. Opened fragrances cannot be returned for hygiene reasons.",
  },
];

function FAQs() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <header className="text-center">
        <span className="eyebrow">Help center</span>
        <h1 className="mt-2 font-display text-4xl">FAQs & delivery</h1>
        <div className="mx-auto mt-3 gold-rule" />
      </header>

      <div className="mt-10 space-y-4">
        {faqs.map((f, i) => (
          <details
            key={i}
            className="rounded-lg border border-border bg-card p-5 [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="flex cursor-pointer items-center justify-between font-medium">
              {f.q}
              <span className="text-gold">+</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
          </details>
        ))}
      </div>

      <section id="delivery" className="mt-12 rounded-lg bg-secondary/60 p-6">
        <h2 className="font-display text-2xl">Delivery information</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          We partner with trusted local couriers for fast, reliable delivery across
          Nigeria. You will receive tracking details via WhatsApp or email once your order
          is dispatched.
        </p>
        <ul className="mt-4 list-inside list-disc space-y-1 text-sm text-muted-foreground">
          <li>Lagos: 24–48 hours</li>
          <li>Other states: 2–5 working days</li>
          <li>Free delivery on orders above ₦{site.freeDeliveryThreshold.toLocaleString("en-NG")}</li>
        </ul>
      </section>

      <section id="returns" className="mt-6 rounded-lg bg-secondary/60 p-6">
        <h2 className="font-display text-2xl">Returns policy</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Items must be returned unopened and in original packaging within 7 days. Please
          contact us on{" "}
          <Link to="/contact" className="text-primary underline">
            WhatsApp or email
          </Link>{" "}
          to start a return.
        </p>
      </section>
    </div>
  );
}
