export const site = {
  name: "KERAscents",
  tagline: "Authentic Scents. Timeless Impressions.",
  email: "hello@kerascents.com",
  instagram: "https://instagram.com/kerascents",
  tiktok: "https://tiktok.com/@kerascents",
  facebook: "https://facebook.com/kerascents",
  hours: "Mon – Sat, 9:00am – 7:00pm (WAT)",
  /** Admin-configurable WhatsApp ordering lines (local format shown, intl used for links). */
  whatsapp: [
    { label: "0813 623 3941", intl: "2348136233941" },
    { label: "0818 115 2707", intl: "2348181152707" },
  ],
  deliveryFee: 3500,
  freeDeliveryThreshold: 150000,
};

export const formatNaira = (value: number) =>
  `₦${Math.round(value).toLocaleString("en-NG")}`;

export function whatsappOrderLink(params: {
  product: string;
  size: string;
  quantity: number;
  price: number;
  number?: string;
}) {
  const text = `Hello ${site.name}, I would like to order:
Product: ${params.product}
Size: ${params.size}
Quantity: ${params.quantity}
Price: ${formatNaira(params.price)}`;
  const num = params.number ?? site.whatsapp[0].intl;
  return `https://wa.me/${num}?text=${encodeURIComponent(text)}`;
}
