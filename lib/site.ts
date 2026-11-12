export const site = {
  name: "AgroChain",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://agrochain.africa",
  description:
    "AgroChain helps farmers prove their harvest, get fair prices and sell to verified buyers.",
  tagline: "Proof. Pricing. Prosperity.",
  email: "info@agrochain.africa",
  phone: "+234 805 067 4789",
  phoneHref: "tel:+2348050674789",
  location: "Ibadan, Oyo State, Nigeria",
  whatsappGroup: "https://chat.whatsapp.com/JPiJSkR379M5Kl3Sp7J06J",
  company: "Lazerjet Technologies LTD",
  socials: {
    x: "https://twitter.com/agrochain",
    linkedin: "https://linkedin.com/company/agrochain",
  },
} as const;

export const mainNav = [
  { href: "/marketplace", label: "Marketplace" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/blog", label: "Journal" },
  { href: "/about", label: "About" },
] as const;

/** The 36 states and the Federal Capital Territory. */
export const nigerianStates = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno",
  "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT (Abuja)", "Gombe",
  "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos",
  "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto",
  "Taraba", "Yobe", "Zamfara",
] as const;

export const roles = [
  { value: "farmer", label: "Farmer", hint: "I grow and sell produce" },
  { value: "cooperative", label: "Cooperative", hint: "We sell as a group" },
  { value: "buyer", label: "Buyer", hint: "I buy for processing, retail or export" },
  { value: "aggregator", label: "Aggregator", hint: "I source and move produce" },
] as const;

export type Role = (typeof roles)[number]["value"];
