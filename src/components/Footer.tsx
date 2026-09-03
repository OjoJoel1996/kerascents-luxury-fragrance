import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Mail, Phone, Clock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { site } from "@/lib/site";

export function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="mt-24 bg-ink text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <span className="font-display text-2xl">
            KERA<span className="text-gold">scents</span>
          </span>
          <p className="mt-3 text-sm text-primary-foreground/70">{site.tagline}</p>
          <p className="mt-4 text-sm text-primary-foreground/70">
            100% authentic designer, niche and roll-on fragrances delivered nationwide
            across Nigeria.
          </p>
          <div className="mt-4 flex gap-3">
            <a
              href={site.instagram}
              aria-label="Instagram"
              className="grid h-9 w-9 place-items-center rounded-full border border-primary-foreground/25 transition-colors hover:border-gold hover:text-gold"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href={site.tiktok}
              aria-label="TikTok"
              className="grid h-9 w-9 place-items-center rounded-full border border-primary-foreground/25 text-xs transition-colors hover:border-gold hover:text-gold"
            >
              TT
            </a>
            <a
              href={site.facebook}
              aria-label="Facebook"
              className="grid h-9 w-9 place-items-center rounded-full border border-primary-foreground/25 transition-colors hover:border-gold hover:text-gold"
            >
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm uppercase tracking-[0.25em] text-gold">Quick links</h3>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/75">
            <li>
              <Link to="/" className="hover:text-gold">
                Home
              </Link>
            </li>
            <li>
              <Link to="/shop" className="hover:text-gold">
                Shop
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-gold">
                About us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gold">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/faqs" className="hover:text-gold">
                FAQs
              </Link>
            </li>
            <li>
              <Link to="/faqs" hash="delivery" className="hover:text-gold">
                Delivery information
              </Link>
            </li>
            <li>
              <Link to="/faqs" hash="returns" className="hover:text-gold">
                Returns policy
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm uppercase tracking-[0.25em] text-gold">
            Customer service
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-primary-foreground/75">
            {site.whatsapp.map((w) => (
              <li key={w.intl}>
                <a
                  href={`https://wa.me/${w.intl}`}
                  className="flex items-center gap-2 hover:text-gold"
                >
                  <Phone className="h-4 w-4" /> WhatsApp {w.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-2 hover:text-gold"
              >
                <Mail className="h-4 w-4" /> {site.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Clock className="h-4 w-4" /> {site.hours}
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm uppercase tracking-[0.25em] text-gold">Newsletter</h3>
          <p className="mt-4 text-sm text-primary-foreground/75">
            Subscribe for exclusive fragrance deals and new arrivals.
          </p>
          <form
            className="mt-4 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (!/^\S+@\S+\.\S+$/.test(email)) {
                toast.error("Enter a valid email address");
                return;
              }
              toast.success("You're subscribed. Welcome to KERAscents.");
              setEmail("");
            }}
          >
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="border-primary-foreground/25 bg-transparent placeholder:text-primary-foreground/50"
            />
            <Button type="submit" variant="secondary">
              Join
            </Button>
          </form>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15 py-5 text-center text-xs text-primary-foreground/60">
        © 2026 KERAscents. All Rights Reserved.
      </div>
    </footer>
  );
}
