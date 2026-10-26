export type Department = "skin" | "hair" | "gift";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  department: Department;
  image: string;
  size: string;
  rating: number;
  reviews: number;
  tag?: string;
  description: string;
  bestSeller?: boolean;
}

export interface Collection {
  id: string;
  label: string;
  shortLabel?: string;
}

export const collections: Collection[] = [
  { id: "all", label: "All Products" },
  { id: "skin-care", label: "Skin Care" },
  { id: "serums", label: "Serums" },
  { id: "moisturizers", label: "Moisturizers" },
  { id: "face-wash", label: "Face Wash" },
  { id: "face-masks", label: "Face Masks" },
  { id: "gift-sets", label: "Gift Sets" },
  { id: "hair-care", label: "Hair Care" },
];

export const products: Product[] = [
  {
    id: "glow-serum",
    name: "Glow Serum",
    price: 34.99,
    category: "Serums",
    department: "skin",
    image: "/images/product-glow-serum.jpg",
    size: "30 ml / 1 fl oz",
    rating: 4.9,
    reviews: 218,
    tag: "Bestseller",
    bestSeller: true,
    description:
      "A featherlight botanical serum with vitamin C-rich Kakadu plum and hyaluronic acid. It brightens uneven tone, cushions moisture and reveals a soft, lit-from-within glow.",
  },
  {
    id: "hydrate-day-cream",
    name: "Hydrate & Nourish Day Cream",
    price: 29.99,
    category: "Moisturizers",
    department: "skin",
    image: "/images/product-day-cream.jpg",
    size: "50 ml / 1.7 fl oz",
    rating: 4.8,
    reviews: 168,
    tag: "Bestseller",
    bestSeller: true,
    description:
      "A cloud-soft daily moisturizer with squalane, oat lipids and green tea. Layered under makeup or worn bare, it leaves skin comfortably plump and quietly luminous.",
  },
  {
    id: "refreshing-face-wash",
    name: "Refreshing Face Wash",
    price: 18.99,
    category: "Face Wash",
    department: "skin",
    image: "/images/product-face-wash.jpg",
    size: "120 ml / 4 fl oz",
    rating: 4.7,
    reviews: 143,
    tag: "Bestseller",
    bestSeller: true,
    description:
      "A pH-balanced gel cleanser with chamomile water and gentle coconut-derived surfactants. It lifts the day away without stripping skin of its natural moisture.",
  },
  {
    id: "balancing-toner",
    name: "Balancing Toner",
    price: 21.99,
    category: "Skin Care",
    department: "skin",
    image: "/images/product-toner.jpg",
    size: "100 ml / 3.4 fl oz",
    rating: 4.8,
    reviews: 96,
    tag: "Bestseller",
    bestSeller: true,
    description:
      "A calm, alcohol-free toning mist with rose water, cucumber and niacinamide. It refreshes, visibly refines pores and prepares skin to receive every layer that follows.",
  },
  {
    id: "revive-eye-cream",
    name: "Revive Eye Cream",
    price: 24.99,
    category: "Skin Care",
    department: "skin",
    image: "/images/product-eye-cream.jpg",
    size: "15 ml / 0.5 fl oz",
    rating: 4.9,
    reviews: 121,
    tag: "Bestseller",
    bestSeller: true,
    description:
      "A cushiony eye treatment with caffeine, cucumber seed and peptides. The cooling ceramic-inspired texture softens the look of fatigue and leaves the eye area rested.",
  },
  {
    id: "botanical-face-oil",
    name: "Botanical Radiance Face Oil",
    price: 39.99,
    category: "Serums",
    department: "skin",
    image: "/images/product-face-oil.jpg",
    size: "30 ml / 1 fl oz",
    rating: 4.9,
    reviews: 187,
    tag: "Bestseller",
    bestSeller: true,
    description:
      "A golden blend of camellia, rosehip and olive-derived squalane. Three drops pressed into skin at night seal in moisture and leave a dewy, healthy-looking finish by morning.",
  },
  {
    id: "purifying-clay-mask",
    name: "Purifying Clay Mask",
    price: 26.99,
    category: "Face Masks",
    department: "skin",
    image: "/images/product-clay-mask.jpg",
    size: "60 ml / 2 fl oz",
    rating: 4.6,
    reviews: 54,
    tag: "New",
    description:
      "A creamy kaolin and green clay mask with willow bark and aloe. It gently draws out congestion, smooths texture and leaves skin balanced rather than tight.",
  },
  {
    id: "silk-hair-scalp-oil",
    name: "Silk Hair & Scalp Oil",
    price: 27.99,
    category: "Hair Care",
    department: "hair",
    image: "/images/product-face-oil.jpg",
    size: "50 ml / 1.7 fl oz",
    rating: 4.7,
    reviews: 62,
    tag: "New",
    description:
      "A weightless rosemary and camellia oil for scalp and ends. Massaged in before cleansing, it nourishes the scalp and leaves hair with a soft, botanical shine.",
  },
  {
    id: "botanical-ritual-set",
    name: "Botanical Ritual Set",
    price: 74.99,
    category: "Gift Sets",
    department: "gift",
    image: "/images/product-gift-set.jpg",
    size: "4-piece gift set",
    rating: 5,
    reviews: 38,
    tag: "Limited",
    description:
      "Our complete evening ritual, wrapped and ready to give: Glow Serum, Refreshing Face Wash, Hydrate & Nourish Day Cream and Botanical Radiance Face Oil in a keepsake box.",
  },
];

export const bestSellerIds = [
  "glow-serum",
  "hydrate-day-cream",
  "refreshing-face-wash",
  "balancing-toner",
  "revive-eye-cream",
  "botanical-face-oil",
];

export const getProduct = (id: string) => products.find((product) => product.id === id);

export function matchesCollection(product: Product, collectionId: string): boolean {
  if (collectionId === "all") return true;
  if (collectionId === "skin-care") return product.department === "skin";
  if (collectionId === "hair-care") return product.department === "hair";
  return product.category.toLowerCase().replace(/\s+/g, "-") === collectionId;
}

export function searchProducts(query: string): Product[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return products;
  return products.filter((product) =>
    [product.name, product.category, product.description, product.tag ?? ""]
      .join(" ")
      .toLowerCase()
      .includes(normalized),
  );
}

export const formatPrice = (value: number) => `$${value.toFixed(2)}`;
