export type Product = {
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  keywords?: string[];
  featured?: boolean;
  badge?: string;
  label?: string;
  accent: string;
  accentSoft: string;
  image: string;
  imageAlt: string;
  benefits?: string[];
};

export const products: Product[] = [
  {
    name: "Peach Oolong Plum",
    slug: "peach-oolong-plum",
    description: "Fruity, floral, and refreshing with a creamy finish.",
    shortDescription: "Soft, fruity, and refreshing.",
    keywords: ["Peach-forward", "Oolong depth", "Plum finish"],
    featured: true,
    badge: "FEATURED",
    label: "Main Flavor",
    accent: "#F3A3A0",
    accentSoft: "#FFF2EE",
    image: "/images/product-peach-still-life.png",
    imageAlt: "Peach Oolong Plum instant beverage pouch with peach still-life styling",
    benefits: [
      "Peach-forward flavor",
      "Oolong tea character",
      "Smooth plum finish",
      "Instant preparation",
      "Served hot or cold"
    ]
  },
  {
    name: "Taro Flavor",
    slug: "taro-flavor",
    description: "Smooth, creamy taro flavor with a comforting milk tea profile.",
    shortDescription: "Smooth and comforting.",
    keywords: ["Creamy", "Comforting", "Velvety"],
    accent: "#DCC8F2",
    accentSoft: "#F5EEFD",
    image: "/images/product-taro-still-life.png",
    imageAlt: "Taro Flavor instant milk tea pouch styled with taro cubes and lavender accents"
  },
  {
    name: "Brown Sugar Flavor",
    slug: "brown-sugar-flavor",
    description: "Rich brown sugar flavor with a warm, dessert-like finish.",
    shortDescription: "Rich and warm.",
    keywords: ["Rich", "Caramel warmth", "Dessert-like"],
    accent: "#C98A54",
    accentSoft: "#F7E6D5",
    image: "/images/product-brown-sugar-still-life.png",
    imageAlt: "Brown Sugar Flavor instant milk tea pouch styled with brown sugar cubes and a warm drink"
  }
];

export const featureBadges = [
  "Reduced Sugar",
  "No Artificial Coloring",
  "Served Hot or Cold",
  "Ready in Seconds"
];

export const lifestyleMoments = [
  {
    title: "Gathering",
    image: "/images/lifestyle-gathering.png",
    alt: "Friends gathering at home with RM Refresher drinks and foldable pouches on the table"
  },
  {
    title: "Driving",
    image: "/images/lifestyle-driving.png",
    alt: "A relaxed driving moment with an RM Refresher milk tea drink in the car"
  },
  {
    title: "Yoga",
    image: "/images/ChatGPT Image 2026年4月24日 04_09_41.png",
    alt: "A yoga moment styled with RM Refresher Taro Flavor and a lavender-toned drink"
  },
  {
    title: "Cozy Nights",
    image: "/images/ChatGPT Image 2026年4月24日 04_09_52.png",
    alt: "A cozy evening at home with RM Refresher Brown Sugar Flavor and a warm drink"
  },
  {
    title: "Cafe Breaks",
    image: "/images/lifestyle-drinks-desserts.png",
    alt: "RM Refresher drinks served with desserts for an easy cafe-style tabletop moment"
  },
  {
    title: "Working from Home",
    image: "/images/lifestyle-working-from-home.png",
    alt: "A work-from-home desk with Brown Sugar RM Refresher, an iced milk tea, laptop, notes, and cookies"
  }
];

export const ingredientSlides = [
  {
    title: "Tea Depth",
    description: "A mellow tea character that keeps the blends smooth and balanced.",
    image: "/images/Ingrediant_tea.png",
    alt: "Fresh tea leaves on a misty hillside ingredient landscape"
  },
  {
    title: "Brown Sugar Warmth",
    description: "Rich sweetness that brings warmth and depth to the collection.",
    image: "/images/ingrediant_brownsugar.png",
    alt: "Brown sugar ingredient scene arranged on a rustic wooden tabletop"
  },
  {
    title: "Taro Softness",
    description: "A calm, creamy root note with a gentle lavender mood.",
    image: "/images/ingrediant_taro.png",
    alt: "Fresh taro ingredient scene styled in a lush botanical setting"
  },
  {
    title: "Peach Bloom",
    description: "A delicate peach note that keeps the signature lineup bright and soft.",
    image: "/images/ingrediant_peach.png",
    alt: "Peach ingredient scene with blossoms and fruit in a soft pink setting"
  }
];

export const benefits = [
  {
    title: "Made with real milk",
    description: "Delivers a creamy milk tea taste with a smooth, comforting finish."
  },
  {
    title: "Reduced sugar",
    description: "Balanced sweetness designed for easier everyday sipping."
  },
  {
    title: "No artificial coloring",
    description: "A cleaner, more natural-looking drink experience."
  },
  {
    title: "Foldable self-standing pouch",
    description: "Easy to store, easy to scoop, and practical for repeated use."
  },
  {
    title: "Easy for home, office, or cafe-style drinks",
    description: "Perfect for quick preparation without sacrificing presentation."
  }
];

export const brewSteps = [
  {
    title: "STEP 1",
    body: "Place one sachet into a cup or container"
  },
  {
    title: "STEP 2",
    body: "Add 200ml warm water, around 60°C"
  },
  {
    title: "STEP 3",
    body: "Stir well and enjoy"
  }
];
