import men from "@/assets/cat-men.jpg";
import women from "@/assets/cat-women.jpg";
import unisex from "@/assets/cat-unisex.jpg";
import rollon from "@/assets/cat-rollon.jpg";
import oils from "@/assets/cat-oils.jpg";
import gift from "@/assets/cat-gift.jpg";
import luxury from "@/assets/cat-luxury.jpg";

export type CategorySlug =
  | "men"
  | "women"
  | "unisex"
  | "luxury"
  | "roll-ons"
  | "perfume-oils"
  | "gift-sets";

export type Gender = "Men" | "Women" | "Unisex";

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: CategorySlug;
  gender: Gender;
  scent: string;
  sizes: string[];
  size: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  stock: number;
  image: string;
  description: string;
  notes: { top: string[]; heart: string[]; base: string[] };
  bestSeller?: boolean;
  newArrival?: boolean;
  featured?: boolean;
}

export const categories: {
  slug: CategorySlug;
  name: string;
  description: string;
  image: string;
}[] = [
  {
    slug: "men",
    name: "Men's Perfumes",
    description: "Bold, woody and confident signatures for the modern gentleman.",
    image: men,
  },
  {
    slug: "women",
    name: "Women's Perfumes",
    description: "Floral, radiant and unforgettable scents made to linger.",
    image: women,
  },
  {
    slug: "unisex",
    name: "Unisex Perfumes",
    description: "Boundary-free compositions of oud, musk, vanilla and wood.",
    image: unisex,
  },
  {
    slug: "luxury",
    name: "Luxury Perfumes",
    description: "Rare, long-lasting niche houses for the true collector.",
    image: luxury,
  },
  {
    slug: "roll-ons",
    name: "Roll-On Fragrances",
    description: "Pocket-sized 6ml – 15ml roll-ons in ten signature scents.",
    image: rollon,
  },
  {
    slug: "perfume-oils",
    name: "Perfume Oils",
    description: "Alcohol-free concentrated oils with exceptional depth.",
    image: oils,
  },
  {
    slug: "gift-sets",
    name: "Gift Sets",
    description: "Beautifully boxed duos and trios, ready to be gifted.",
    image: gift,
  },
];

export const categoryName = (slug: CategorySlug) =>
  categories.find((c) => c.slug === slug)?.name ?? slug;

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

interface Seed {
  name: string;
  brand: string;
  category: CategorySlug;
  gender: Gender;
  scent: string;
  price: number;
  oldPrice?: number;
  size: string;
  sizes?: string[];
  rating: number;
  reviews: number;
  stock?: number;
  notes: [string[], string[], string[]];
  flags?: ("best" | "new" | "featured")[];
  description?: string;
}

const seeds: Seed[] = [
  // Men
  {
    name: "Bleu de Chanel",
    brand: "Chanel",
    category: "men",
    gender: "Men",
    scent: "Woody Aromatic",
    price: 85000,
    oldPrice: 95000,
    size: "100ml",
    sizes: ["50ml", "100ml"],
    rating: 4.9,
    reviews: 128,
    notes: [
      ["Grapefruit", "Lemon", "Mint"],
      ["Ginger", "Nutmeg", "Jasmine"],
      ["Sandalwood", "Cedar", "Amber"],
    ],
    flags: ["best", "featured"],
  },
  {
    name: "Dior Sauvage",
    brand: "Dior",
    category: "men",
    gender: "Men",
    scent: "Fresh Spicy",
    price: 75000,
    size: "100ml",
    sizes: ["60ml", "100ml"],
    rating: 4.8,
    reviews: 204,
    notes: [
      ["Calabrian Bergamot", "Pepper"],
      ["Sichuan Pepper", "Lavender", "Geranium"],
      ["Ambroxan", "Cedar", "Labdanum"],
    ],
    flags: ["best"],
  },
  {
    name: "Creed Aventus",
    brand: "Creed",
    category: "luxury",
    gender: "Men",
    scent: "Fruity Chypre",
    price: 120000,
    size: "100ml",
    sizes: ["50ml", "100ml"],
    rating: 5,
    reviews: 87,
    notes: [
      ["Pineapple", "Blackcurrant", "Bergamot"],
      ["Birch", "Patchouli", "Jasmine"],
      ["Musk", "Oakmoss", "Vanilla"],
    ],
    flags: ["best", "featured"],
  },
  {
    name: "Paco Rabanne Invictus",
    brand: "Paco Rabanne",
    category: "men",
    gender: "Men",
    scent: "Aquatic",
    price: 62000,
    size: "100ml",
    rating: 4.6,
    reviews: 74,
    notes: [
      ["Grapefruit", "Sea Notes"],
      ["Bay Leaf", "Jasmine"],
      ["Guaiac Wood", "Ambergris"],
    ],
  },
  {
    name: "Versace Eros",
    brand: "Versace",
    category: "men",
    gender: "Men",
    scent: "Oriental Fougère",
    price: 68000,
    size: "100ml",
    rating: 4.7,
    reviews: 96,
    notes: [
      ["Mint", "Green Apple", "Lemon"],
      ["Tonka Bean", "Geranium"],
      ["Vanilla", "Vetiver", "Oakmoss"],
    ],
    flags: ["new"],
  },
  // Women
  {
    name: "Coco Mademoiselle",
    brand: "Chanel",
    category: "women",
    gender: "Women",
    scent: "Oriental Floral",
    price: 95000,
    size: "100ml",
    sizes: ["50ml", "100ml"],
    rating: 4.9,
    reviews: 156,
    notes: [
      ["Orange", "Bergamot"],
      ["Rose", "Jasmine", "Litchi"],
      ["Patchouli", "Vetiver", "Vanilla"],
    ],
    flags: ["best", "featured"],
  },
  {
    name: "Dior J'adore",
    brand: "Dior",
    category: "women",
    gender: "Women",
    scent: "Floral",
    price: 90000,
    oldPrice: 98000,
    size: "100ml",
    rating: 4.8,
    reviews: 132,
    notes: [
      ["Pear", "Melon", "Magnolia"],
      ["Rose", "Orchid", "Violet"],
      ["Musk", "Blackberry", "Cedar"],
    ],
    flags: ["best"],
  },
  {
    name: "YSL Libre",
    brand: "Yves Saint Laurent",
    category: "women",
    gender: "Women",
    scent: "Floral Lavender",
    price: 80000,
    size: "90ml",
    rating: 4.7,
    reviews: 88,
    notes: [
      ["Mandarin", "Blackcurrant", "Lavender"],
      ["Orange Blossom", "Jasmine"],
      ["Vanilla", "Musk", "Cedar"],
    ],
    flags: ["new"],
  },
  {
    name: "Carolina Herrera Good Girl",
    brand: "Carolina Herrera",
    category: "women",
    gender: "Women",
    scent: "Oriental",
    price: 88000,
    size: "80ml",
    rating: 4.6,
    reviews: 71,
    notes: [
      ["Almond", "Coffee"],
      ["Tuberose", "Jasmine Sambac"],
      ["Tonka Bean", "Cacao", "Vanilla"],
    ],
  },
  {
    name: "Lancôme La Vie Est Belle",
    brand: "Lancôme",
    category: "women",
    gender: "Women",
    scent: "Gourmand Floral",
    price: 92000,
    size: "100ml",
    rating: 4.8,
    reviews: 110,
    notes: [
      ["Blackcurrant", "Pear"],
      ["Iris", "Jasmine", "Orange Blossom"],
      ["Praline", "Patchouli", "Tonka"],
    ],
  },
  // Unisex
  {
    name: "Rouge Baccarat Extrait",
    brand: "KERA Signature",
    category: "unisex",
    gender: "Unisex",
    scent: "Amber Woody",
    price: 78000,
    size: "70ml",
    rating: 4.9,
    reviews: 143,
    notes: [
      ["Saffron", "Jasmine"],
      ["Amberwood", "Ambergris"],
      ["Fir Resin", "Cedar"],
    ],
    flags: ["best", "featured"],
  },
  {
    name: "Oud Imperial",
    brand: "KERA Signature",
    category: "unisex",
    gender: "Unisex",
    scent: "Oud",
    price: 70000,
    size: "75ml",
    rating: 4.7,
    reviews: 64,
    notes: [
      ["Bergamot", "Pink Pepper"],
      ["Rose", "Agarwood"],
      ["Leather", "Sandalwood"],
    ],
  },
  {
    name: "White Musk Veil",
    brand: "KERA Signature",
    category: "unisex",
    gender: "Unisex",
    scent: "Musk",
    price: 45000,
    size: "60ml",
    rating: 4.5,
    reviews: 52,
    notes: [
      ["Aldehydes", "Lemon"],
      ["White Musk", "Iris"],
      ["Cashmere Wood", "Amber"],
    ],
    flags: ["new"],
  },
  {
    name: "Vanilla Noir",
    brand: "KERA Signature",
    category: "unisex",
    gender: "Unisex",
    scent: "Vanilla",
    price: 52000,
    size: "75ml",
    rating: 4.6,
    reviews: 58,
    notes: [
      ["Bourbon Vanilla", "Bergamot"],
      ["Tonka", "Benzoin"],
      ["Sandalwood", "Tobacco"],
    ],
  },
  {
    name: "Wood & Smoke",
    brand: "KERA Signature",
    category: "unisex",
    gender: "Unisex",
    scent: "Woody",
    price: 58000,
    size: "75ml",
    rating: 4.5,
    reviews: 41,
    notes: [
      ["Cypress", "Cardamom"],
      ["Vetiver", "Incense"],
      ["Cedar", "Guaiac Wood"],
    ],
  },
  // Luxury extras
  {
    name: "Royal Amber Extrait",
    brand: "Maison Kera",
    category: "luxury",
    gender: "Unisex",
    scent: "Amber",
    price: 145000,
    size: "50ml",
    rating: 4.9,
    reviews: 33,
    notes: [
      ["Saffron", "Bergamot"],
      ["Amber", "Rose"],
      ["Oud", "Musk"],
    ],
    flags: ["featured", "new"],
  },
  {
    name: "Velvet Orchid Absolu",
    brand: "Maison Kera",
    category: "luxury",
    gender: "Women",
    scent: "Floral Oriental",
    price: 132000,
    size: "50ml",
    rating: 4.8,
    reviews: 28,
    notes: [
      ["Bergamot", "Mandarin"],
      ["Orchid", "Jasmine"],
      ["Vanilla", "Sandalwood"],
    ],
  },
  // Perfume oils
  {
    name: "Arabian Oud Oil",
    brand: "KERA Oils",
    category: "perfume-oils",
    gender: "Unisex",
    scent: "Oud",
    price: 18000,
    size: "12ml",
    sizes: ["6ml", "12ml"],
    rating: 4.8,
    reviews: 66,
    notes: [
      ["Agarwood"],
      ["Rose", "Saffron"],
      ["Musk", "Amber"],
    ],
    flags: ["best"],
  },
  {
    name: "Egyptian Musk Oil",
    brand: "KERA Oils",
    category: "perfume-oils",
    gender: "Unisex",
    scent: "Musk",
    price: 12000,
    size: "12ml",
    rating: 4.6,
    reviews: 47,
    notes: [["Citrus"], ["White Musk"], ["Amber", "Vanilla"]],
  },
  {
    name: "Amber Resin Oil",
    brand: "KERA Oils",
    category: "perfume-oils",
    gender: "Unisex",
    scent: "Amber",
    price: 14000,
    size: "12ml",
    rating: 4.5,
    reviews: 39,
    notes: [["Labdanum"], ["Benzoin"], ["Vanilla", "Tonka"]],
    flags: ["new"],
  },
  // Gift sets
  {
    name: "Signature Duo Gift Set",
    brand: "KERAscents",
    category: "gift-sets",
    gender: "Unisex",
    scent: "Mixed",
    price: 98000,
    oldPrice: 115000,
    size: "2 × 50ml",
    rating: 4.9,
    reviews: 45,
    notes: [["Citrus", "Pepper"], ["Rose", "Jasmine"], ["Amber", "Oud"]],
    flags: ["featured", "best"],
  },
  {
    name: "Discovery Trio Box",
    brand: "KERAscents",
    category: "gift-sets",
    gender: "Unisex",
    scent: "Mixed",
    price: 45000,
    size: "3 × 15ml",
    rating: 4.7,
    reviews: 61,
    notes: [["Bergamot"], ["Florals"], ["Woods", "Musk"]],
    flags: ["new"],
  },
];

const rollOnScents: { scent: string; name: string; price: number; size: string; rating: number }[] =
  [
    { scent: "Vanilla", name: "Vanilla Bliss", price: 5000, size: "10ml", rating: 4.8 },
    { scent: "Oud", name: "Oud Royale", price: 6500, size: "10ml", rating: 4.9 },
    { scent: "Musk", name: "Musk Essence", price: 5500, size: "10ml", rating: 4.6 },
    { scent: "Rose", name: "Rose Bloom", price: 5000, size: "10ml", rating: 4.7 },
    { scent: "Amber", name: "Amber Gold", price: 6000, size: "10ml", rating: 4.8 },
    { scent: "Lavender", name: "Lavender Calm", price: 4800, size: "6ml", rating: 4.5 },
    { scent: "Citrus", name: "Citrus Spark", price: 4500, size: "6ml", rating: 4.4 },
    { scent: "Fruity", name: "Berry Kiss", price: 5200, size: "10ml", rating: 4.6 },
    { scent: "Woody", name: "Cedar Trail", price: 5800, size: "15ml", rating: 4.7 },
    { scent: "Floral", name: "Petal Whisper", price: 5300, size: "15ml", rating: 4.6 },
  ];

const imageFor = (category: CategorySlug) =>
  categories.find((c) => c.slug === category)?.image ?? luxury;

function build(seed: Seed, index: number): Product {
  const slug = slugify(seed.name);
  return {
    id: `p-${index + 1}`,
    slug,
    name: seed.name,
    brand: seed.brand,
    category: seed.category,
    gender: seed.gender,
    scent: seed.scent,
    size: seed.size,
    sizes: seed.sizes ?? [seed.size],
    price: seed.price,
    ...(seed.oldPrice !== undefined ? { oldPrice: seed.oldPrice } : {}),
    rating: seed.rating,
    reviews: seed.reviews,
    stock: seed.stock ?? 24,
    image: imageFor(seed.category),
    description:
      seed.description ??
      `${seed.name} by ${seed.brand} is a ${seed.scent.toLowerCase()} fragrance sourced 100% authentic by KERAscents. Long-lasting projection with an elegant dry-down, perfect for both daily wear and special occasions.`,
    notes: { top: seed.notes[0], heart: seed.notes[1], base: seed.notes[2] },
    bestSeller: seed.flags?.includes("best") ?? false,
    newArrival: seed.flags?.includes("new") ?? false,
    featured: seed.flags?.includes("featured") ?? false,
  };
}

const rollOnProducts: Product[] = rollOnScents.map((r, i) =>
  build(
    {
      name: `${r.name} Roll-On`,
      brand: "KERA Roll-Ons",
      category: "roll-ons",
      gender: "Unisex",
      scent: r.scent,
      price: r.price,
      size: r.size,
      sizes: ["6ml", "10ml", "15ml"],
      rating: r.rating,
      reviews: 20 + i * 3,
      notes: [[r.scent], [`${r.scent} Accord`, "Musk"], ["Amber", "Sandalwood"]],
      flags: i < 3 ? ["best"] : i > 6 ? ["new"] : [],
      description: `${r.name} is a concentrated ${r.scent.toLowerCase()} roll-on fragrance oil in a handy ${r.size} glass bottle. Alcohol-free, skin friendly and made to travel with you all day.`,
    },
    seeds.length + i,
  ),
);

export const products: Product[] = [...seeds.map(build), ...rollOnProducts];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const byCategory = (slug: CategorySlug) =>
  products.filter((p) => p.category === slug);

export const bestSellers = products.filter((p) => p.bestSeller);
export const newArrivals = products.filter((p) => p.newArrival);

export const relatedTo = (product: Product, count = 4) =>
  products
    .filter(
      (p) =>
        p.slug !== product.slug &&
        (p.category === product.category || p.scent === product.scent),
    )
    .slice(0, count);

export const allScents = Array.from(new Set(products.map((p) => p.scent))).sort();
export const allSizes = Array.from(new Set(products.flatMap((p) => p.sizes))).sort(
  (a, b) => parseInt(a) - parseInt(b),
);
