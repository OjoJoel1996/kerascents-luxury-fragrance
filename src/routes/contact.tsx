import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { site } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — KERAscents" },
      {
        name: "description",
        content:
          "Reach KERAscents by WhatsApp, phone or email. Visit our Lagos store or send a message for orders and support.",
      },
      { property: "og:title", content: "Contact Us — KERAscents" },
      { property: "og:description", content: "Get in touch with KERAscents." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <header className="text-center">
        <span className="eyebrow">Get in touch</span>
        <h1 className="mt-2 font-display text-4xl">Contact us</h1>
        <div className="mx-auto mt-3 gold-rule" />
      </header>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="font-display text-2xl">Send a message</h2>
          <form
            className="mt-4 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (!/^\S+@\S+\.\S+$/.test(form.email)) {
                toast.error("Enter a valid email");
                return;
              }
              toast.success("Message sent. We will reply within 24 hours.");
              setForm({ name: "", email: "", subject: "", message: "" });
            }}
          >
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={form.subject}
                onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                rows={5}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Send message
            </Button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="font-display text-2xl">Visit our store</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              1 Bishop Aggey Street
              <br />
              Ilasamaja, Mushin, Lagos
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="font-display text-2xl">Customer service</h2>
            <dl className="mt-3 space-y-2 text-sm">
              <div>
                <dt className="eyebrow">WhatsApp</dt>
                <dd>{site.whatsapp.map((w) => w.label).join(" · ")}</dd>
              </div>
              <div>
                <dt className="eyebrow">Email</dt>
                <dd>{site.email}</dd>
              </div>
              <div>
                <dt className="eyebrow">Hours</dt>
                <dd>{site.hours}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
