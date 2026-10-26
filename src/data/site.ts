export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Shop", href: "#shop", filter: "all" },
  { label: "Skin Care", href: "#shop", filter: "skin-care" },
  { label: "Hair Care", href: "#shop", filter: "hair-care" },
  { label: "Wellness", href: "#journal" },
  { label: "About Us", href: "#story" },
  { label: "Blog", href: "#journal" },
  { label: "Contact", href: "#contact" },
];

export interface Category {
  name: string;
  image: string;
  filter: string;
  caption: string;
}

export const categories: Category[] = [
  {
    name: "Skin Care",
    image: "/images/hero-botanical.jpg",
    filter: "skin-care",
    caption: "Everyday essentials",
  },
  {
    name: "Serums",
    image: "/images/product-glow-serum.jpg",
    filter: "serums",
    caption: "Targeted botanicals",
  },
  {
    name: "Moisturizers",
    image: "/images/product-day-cream.jpg",
    filter: "moisturizers",
    caption: "Deep, lasting comfort",
  },
  {
    name: "Face Wash",
    image: "/images/product-face-wash.jpg",
    filter: "face-wash",
    caption: "Gentle daily cleanse",
  },
  {
    name: "Face Masks",
    image: "/images/product-clay-mask.jpg",
    filter: "face-masks",
    caption: "Weekly restoration",
  },
  {
    name: "Gift Sets",
    image: "/images/product-gift-set.jpg",
    filter: "gift-sets",
    caption: "Thoughtfully wrapped",
  },
];

export const journalArticles = [
  {
    id: "evening-ritual",
    kicker: "Skin Rituals",
    title: "The Evening Ritual: Five Slow Steps to Restful Skin",
    excerpt:
      "A simple, sensory routine that asks very little of you — and gives skin the quiet time it needs to renew.",
    readTime: "5 min read",
    image: "/images/product-toner.jpg",
    body: [
      "Good skin rarely comes from doing more. More often, it comes from a handful of steps repeated with care. An evening ritual is less about perfection and more about creating a small, deliberate pause between the demands of the day and sleep.",
      "Begin with warm — never hot — water and a gentle cleanser. Massage it into dry skin in upward strokes, then remove with a soft cloth. If you have worn sunscreen or makeup, repeat once more. The goal is simply skin that feels clean, still comfortable and never tight.",
      "Follow with a hydrating toner while skin is slightly damp. This is the moment for a few deep breaths. Next, press in a botanical serum — our Glow Serum is a favourite for the evening — and allow it to settle for a minute.",
      "Finish with a moisturizer to seal everything in, or a few drops of face oil if skin feels particularly dry. Turn off the bright overhead light, take three slow breaths, and let the rest be rest.",
    ],
  },
  {
    id: "slow-beauty",
    kicker: "Wellness",
    title: "Why Slow Beauty Is the Future of Everyday Wellness",
    excerpt:
      "Fewer formulas. Better ingredients. More presence. The quiet movement reshaping how we care for ourselves.",
    readTime: "6 min read",
    image: "/images/story-model.jpg",
    body: [
      "Slow beauty is a gentle counterpoint to a skincare aisle built on urgency. Instead of chasing a new routine every season, it invites us to understand our skin, choose considered formulas, and give those formulas time.",
      "It is not an invitation to be complacent. It is an invitation to be intentional. Fewer products, used consistently, often do more for the skin barrier than a shelf of half-finished bottles. Our own formulations are designed to be layered simply, and to feel like a ritual rather than a chore.",
      "Botanicals have always asked for patience. A plant does not hurry to bloom, and neither does a healthy skin barrier. The visible glow arrives as a byproduct of care, sleep, hydration and consistency.",
      "Start small this week: one less step, one more minute of massage, one earlier night. Slow beauty is not a trend to achieve. It is a rhythm to return to.",
    ],
  },
  {
    id: "botanical-gifting",
    kicker: "The Journal",
    title: "The Art of Gifting Botanical Beauty, Thoughtfully",
    excerpt:
      "A guide to choosing presents that feel personal, useful and kind to the planet — complete with our favourite pairings.",
    readTime: "4 min read",
    image: "/images/product-gift-set.jpg",
    body: [
      "The most memorable beauty gifts are not the largest ones. They are the ones that seem to say, without much fuss, I noticed something about you. A fragrance someone always reaches for. A cleanser that suits their skin. A moment of care they would not buy for themselves.",
      "Begin with their routine rather than your favourites. If they are new to botanical skincare, a gentle cleanser and a simple moisturizer make an easy, generous pairing. For someone who already has their essentials, a face oil or a weekly mask feels like a small luxury.",
      "Presentation matters, but it does not need to cost much. Our Botanical Ritual Set arrives in a keepsake box with a hand-tied sage ribbon. Add a short, handwritten note — the best gift wrapping is a few thoughtful words.",
      "And if you are gifting to yourself this year, we would simply say: you are worth the pause.",
    ],
  },
];

export const promises = [
  { label: "Cruelty Free", icon: "rabbit" },
  { label: "Paraben Free", icon: "shield" },
  { label: "Sulfate Free", icon: "droplets" },
  { label: "Vegan", icon: "leaf" },
  { label: "Recyclable Packaging", icon: "recycle" },
];

export const storyValues = [
  { label: "Clean Ingredients", icon: "leaf" },
  { label: "Ethically Sourced", icon: "sprout" },
  { label: "Made with Love", icon: "heart" },
];

export interface InfoContent {
  title: string;
  intro: string;
  sections: { heading?: string; copy: string }[];
}

export const infoContent: Record<string, InfoContent> = {
  shipping: {
    title: "Shipping Policy",
    intro: "A simple guide to how your Purevia order arrives. This is a demo storefront.",
    sections: [
      {
        heading: "Processing time",
        copy: "Demo orders are prepared within 1–2 business days. You will receive a confirmation email once your order is placed (simulated in this demo).",
      },
      {
        heading: "Rates & delivery",
        copy: "Complimentary standard shipping is applied automatically to orders over $49. Standard delivery is estimated at 3–5 business days; express options are calculated at checkout.",
      },
      {
        heading: "Tracking",
        copy: "A tracking link is emailed as soon as your parcel leaves our studio. Orders are packed in recycled, recyclable materials with no unnecessary inserts.",
      },
    ],
  },
  returns: {
    title: "Return Policy",
    intro: "We hope you love your ritual. If something is not quite right, we are here to help.",
    sections: [
      {
        heading: "30-day returns",
        copy: "Unopened products may be returned within 30 days of delivery for a full refund. For hygiene reasons, opened skincare can only be returned if faulty or damaged on arrival.",
      },
      {
        heading: "How to start a return",
        copy: "Contact our care team with your order number and a short note about the issue. We will share the next steps and a return label where applicable.",
      },
      {
        heading: "Refunds",
        copy: "Refunds are issued to the original payment method within 5–10 business days of receiving the return. This demo does not process real payments or refunds.",
      },
    ],
  },
  terms: {
    title: "Terms & Conditions",
    intro: "The following terms apply to this Purevia Botanicals demo website.",
    sections: [
      {
        heading: "Demo use",
        copy: "This website is a design and portfolio demonstration. The catalogue, cart and checkout are simulated. No real products are sold, no payment is collected and no order is fulfilled.",
      },
      {
        heading: "Content",
        copy: "Product names, prices, reviews, contact details and imagery are illustrative. They may be updated or removed at any time.",
      },
      {
        heading: "Intellectual property",
        copy: "All brand names, copy and visual assets on this site are presented for demonstration purposes.",
      },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    intro: "Your trust matters. This demo collects as little as possible.",
    sections: [
      {
        heading: "What is stored",
        copy: "Cart contents are saved in your browser's localStorage so your bag survives a page refresh. Newsletter submissions are held in the interface only and are not sent to a server.",
      },
      {
        heading: "No tracking",
        copy: "This demo does not include advertising trackers or third-party analytics. Fonts are loaded from Google Fonts.",
      },
      {
        heading: "Your choices",
        copy: "You can clear your saved cart at any time by removing items in the bag or clearing your browser storage.",
      },
    ],
  },
  story: {
    title: "Our Story",
    intro: "Purevia Botanicals began with a simple belief: the most effective skincare should feel like a return to nature.",
    sections: [
      {
        heading: "Rooted in the garden",
        copy: "Founded in 2018 in a small Portland studio, Purevia grew from a love of botanical medicine and a frustration with crowded routines. We wanted fewer, better formulas — ones you could understand at a glance and trust on the most sensitive skin.",
      },
      {
        heading: "Where nature meets science",
        copy: "Every formula pairs time-honoured plant oils and extracts with modern, evidence-led actives such as niacinamide, peptides and hyaluronic acid. We formulate at a skin-friendly pH, test for tolerance and never add fillers for the sake of a longer ingredient list.",
      },
      {
        heading: "Considered to the last petal",
        copy: "Our ingredients are ethically sourced, our range is vegan and cruelty free, and our packaging is chosen to be recycled or refilled. It is not perfect — but it is a practice of getting a little better every season.",
      },
    ],
  },
  faqs: {
    title: "Frequently Asked Questions",
    intro: "Answers to the questions we hear most often in the Purevia studio.",
    sections: [
      {
        heading: "Is Purevia suitable for sensitive skin?",
        copy: "Every formula is dermatologically tested and designed to be gentle. We still recommend a patch test on the inner arm for very reactive skin, and consulting a dermatologist where needed.",
      },
      {
        heading: "Are the products vegan and cruelty free?",
        copy: "Yes. The range is vegan, never tested on animals, and free from parabens and sulfates.",
      },
      {
        heading: "How do I build a simple routine?",
        copy: "Start with a cleanser, a hydrating serum and a moisturizer. Add sunscreen daily and a mask or face oil one or two evenings a week.",
      },
      {
        heading: "Is checkout real on this site?",
        copy: "No. Checkout is a simulation for this design demo. No payment details are requested or processed.",
      },
    ],
  },
};

export const trustBenefits = [
  {
    icon: "flask",
    title: "Dermatologically Tested",
    copy: "Safe and gentle for all skin types.",
  },
  {
    icon: "gem",
    title: "Premium Quality",
    copy: "High-performance formulas you can trust.",
  },
  {
    icon: "sprout",
    title: "Sustainable Beauty",
    copy: "Eco-friendly practices for a better tomorrow.",
  },
  {
    icon: "sparkles",
    title: "Visible Results",
    copy: "Clinically proven to deliver real, visible results.",
  },
];
