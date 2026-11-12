/**
 * Sample marketplace listings. Shown only when the backend API is not reachable
 * (see lib/api.ts), and also used by backend/db/seed.ts to seed Postgres.
 * Prices are illustrative, not live quotes.
 */

export type Category =
  | "grains"
  | "tubers"
  | "vegetables"
  | "fruits"
  | "cash-crops"
  | "spices"
  | "oils";

export const categories: { value: Category; label: string }[] = [
  { value: "grains", label: "Grains & legumes" },
  { value: "tubers", label: "Tubers" },
  { value: "vegetables", label: "Vegetables" },
  { value: "fruits", label: "Fruits" },
  { value: "cash-crops", label: "Cash crops" },
  { value: "spices", label: "Spices" },
  { value: "oils", label: "Oils" },
];

export type TraceStep = { label: string; date: string; place: string };

export type Seller = {
  name: string;
  type: "Farmer" | "Cooperative" | "Aggregator";
  since: number;
  rating: number;
  trades: number;
  verified: boolean;
};

export type Listing = {
  id: string;
  slug: string;
  title: string;
  localName?: string;
  category: Category;
  state: string;
  lga: string;
  price: number;
  unit: string;
  minOrder: number;
  available: number;
  grade: "A" | "B";
  verified: boolean;
  harvestedOn: string;
  image: string;
  description: string;
  seller: Seller;
  trace: TraceStep[];
};

export const listings: Listing[] = [
  {
    id: "lst_001",
    slug: "white-yam-makurdi",
    title: "White yam (Hembankwase)",
    localName: "Isu · Ji · Doya",
    category: "tubers",
    state: "Benue",
    lga: "Makurdi",
    price: 4200,
    unit: "tuber",
    minOrder: 100,
    available: 3800,
    grade: "A",
    verified: true,
    harvestedOn: "2026-08-22",
    image: "/img/market/yam-benue.jpg",
    description:
      "Large, dry-season-cured white yam from the Makurdi floodplain. Tubers average 3–4.5kg, sorted by size and free of rot and nematode damage. Pooled from 42 member farms and stored in ventilated barns.",
    seller: { name: "Tiv Yam Growers Cooperative", type: "Cooperative", since: 2024, rating: 4.8, trades: 126, verified: true },
    trace: [
      { label: "Harvest logged by 42 member farms", date: "2026-08-22", place: "Makurdi, Benue" },
      { label: "Graded & sorted by size", date: "2026-08-25", place: "Co-op barn, Makurdi" },
      { label: "Quality check passed (Grade A)", date: "2026-08-26", place: "AgroChain field agent" },
    ],
  },
  {
    id: "lst_002",
    slug: "parboiled-local-rice-argungu",
    title: "Parboiled local rice, destoned",
    localName: "Shinkafa",
    category: "grains",
    state: "Kebbi",
    lga: "Argungu",
    price: 72000,
    unit: "50kg bag",
    minOrder: 20,
    available: 640,
    grade: "A",
    verified: true,
    harvestedOn: "2026-07-30",
    image: "/img/market/rice-kebbi.jpg",
    description:
      "Long-grain FARO 44 rice, parboiled and destoned at a cluster mill in Argungu. Moisture under 13%, less than 5% broken grains. Bagged in branded 50kg woven sacks.",
    seller: { name: "Argungu Rice Farmers Cluster", type: "Cooperative", since: 2024, rating: 4.7, trades: 88, verified: true },
    trace: [
      { label: "Paddy harvested", date: "2026-07-30", place: "Argungu, Kebbi" },
      { label: "Parboiled & milled", date: "2026-08-06", place: "Cluster mill, Argungu" },
      { label: "Moisture 12.4% verified", date: "2026-08-07", place: "AgroChain field agent" },
    ],
  },
  {
    id: "lst_003",
    slug: "dried-split-ginger-kachia",
    title: "Dried split ginger",
    localName: "Citta",
    category: "spices",
    state: "Kaduna",
    lga: "Kachia",
    price: 98000,
    unit: "50kg bag",
    minOrder: 10,
    available: 210,
    grade: "A",
    verified: true,
    harvestedOn: "2026-06-12",
    image: "/img/market/ginger-kaduna.jpg",
    description:
      "Southern Kaduna yellow ginger, washed, split and sun-dried on raised mats. Export-grade: low fibre, strong aroma, aflatoxin-tested. Ideal for processors and exporters.",
    seller: { name: "Kachia Ginger Aggregators", type: "Aggregator", since: 2025, rating: 4.6, trades: 41, verified: true },
    trace: [
      { label: "Harvested from 18 farms", date: "2026-06-12", place: "Kachia, Kaduna" },
      { label: "Split & sun-dried (14 days)", date: "2026-06-28", place: "Drying yard, Kachia" },
      { label: "Aflatoxin test passed", date: "2026-07-02", place: "Partner lab, Kaduna" },
    ],
  },
  {
    id: "lst_004",
    slug: "roma-tomatoes-kura",
    title: "Roma tomatoes",
    localName: "Tumatir · Tòmátò",
    category: "vegetables",
    state: "Kano",
    lga: "Kura",
    price: 28000,
    unit: "basket (≈25kg)",
    minOrder: 30,
    available: 900,
    grade: "B",
    verified: true,
    harvestedOn: "2026-09-20",
    image: "/img/market/tomatoes-kano.jpg",
    description:
      "Firm, deep-red Roma tomatoes picked at breaker stage for the Kano–Lagos run. Packed in ventilated plastic crates on request to cut transit losses.",
    seller: { name: "Malam Sani Kura", type: "Farmer", since: 2025, rating: 4.5, trades: 23, verified: true },
    trace: [
      { label: "Picked at breaker stage", date: "2026-09-20", place: "Kura, Kano" },
      { label: "Crated & loaded", date: "2026-09-21", place: "Kura market" },
    ],
  },
  {
    id: "lst_005",
    slug: "irish-potatoes-bokkos",
    title: "Irish potatoes",
    localName: "Dankalin Turawa",
    category: "tubers",
    state: "Plateau",
    lga: "Bokkos",
    price: 48000,
    unit: "50kg bag",
    minOrder: 20,
    available: 520,
    grade: "A",
    verified: true,
    harvestedOn: "2026-09-02",
    image: "/img/market/potatoes-plateau.jpg",
    description:
      "Nicola variety grown on the Jos Plateau highlands. Washed, cured for 10 days and sorted to 60–90mm. Great for chips processors and QSR kitchens.",
    seller: { name: "Bokkos Highland Growers", type: "Cooperative", since: 2025, rating: 4.7, trades: 57, verified: true },
    trace: [
      { label: "Harvested", date: "2026-09-02", place: "Bokkos, Plateau" },
      { label: "Cured 10 days", date: "2026-09-12", place: "Co-op store, Bokkos" },
    ],
  },
  {
    id: "lst_006",
    slug: "cassava-tubers-abeokuta",
    title: "Fresh cassava tubers (TME 419)",
    localName: "Ẹ̀gẹ́ · Akpu · Rogo",
    category: "tubers",
    state: "Ogun",
    lga: "Abeokuta North",
    price: 145000,
    unit: "tonne",
    minOrder: 5,
    available: 180,
    grade: "A",
    verified: true,
    harvestedOn: "2026-09-24",
    image: "/img/market/cassava-ogun.jpg",
    description:
      "High-starch TME 419 cassava harvested at 12 months. Delivered within 48 hours of uprooting to garri, fufu and starch processors across Ogun and Lagos.",
    seller: { name: "Ọlá Farms", type: "Farmer", since: 2024, rating: 4.9, trades: 64, verified: true },
    trace: [{ label: "Uprooted on order", date: "2026-09-24", place: "Abeokuta North, Ogun" }],
  },
  {
    id: "lst_007",
    slug: "cocoa-beans-idanre",
    title: "Fermented cocoa beans",
    localName: "Kòkó",
    category: "cash-crops",
    state: "Ondo",
    lga: "Idanre",
    price: 8600000,
    unit: "tonne",
    minOrder: 1,
    available: 24,
    grade: "A",
    verified: true,
    harvestedOn: "2026-05-18",
    image: "/img/market/cocoa-ondo.jpg",
    description:
      "Main-crop Idanre cocoa, box-fermented six days and sun-dried to 7% moisture. Bean count under 100 per 100g. Farm GPS boundaries on record for EU deforestation-free checks.",
    seller: { name: "Idanre Hills Cocoa Union", type: "Cooperative", since: 2024, rating: 4.8, trades: 19, verified: true },
    trace: [
      { label: "Pods harvested & fermented", date: "2026-05-18", place: "Idanre, Ondo" },
      { label: "Sun-dried to 7% moisture", date: "2026-05-30", place: "Idanre" },
      { label: "Farm boundaries mapped", date: "2026-06-02", place: "AgroChain field agent" },
    ],
  },
  {
    id: "lst_008",
    slug: "white-sesame-seeds-hadejia",
    title: "White sesame seeds",
    localName: "Ridi · Beniseed",
    category: "cash-crops",
    state: "Jigawa",
    lga: "Hadejia",
    price: 2100000,
    unit: "tonne",
    minOrder: 2,
    available: 60,
    grade: "A",
    verified: true,
    harvestedOn: "2026-02-10",
    image: "/img/market/sesame-jigawa.jpg",
    description:
      "Machine-cleaned white sesame at 99% purity, 50% oil content. Stored in fumigated warehouses in Hadejia. Suitable for export and oil processors.",
    seller: { name: "Hadejia Valley Traders", type: "Aggregator", since: 2025, rating: 4.4, trades: 12, verified: true },
    trace: [
      { label: "Harvested", date: "2026-02-10", place: "Hadejia, Jigawa" },
      { label: "Cleaned to 99% purity", date: "2026-03-01", place: "Hadejia warehouse" },
    ],
  },
  {
    id: "lst_009",
    slug: "red-onions-sokoto",
    title: "Red onions (Red Creole)",
    localName: "Albasa · Àlùbọ́sà",
    category: "vegetables",
    state: "Sokoto",
    lga: "Goronyo",
    price: 85000,
    unit: "100kg bag",
    minOrder: 10,
    available: 300,
    grade: "A",
    verified: false,
    harvestedOn: "2026-04-15",
    image: "/img/market/onions-sokoto.jpg",
    description:
      "Pungent, long-keeping red onions from the Goronyo dam irrigation scheme. Cured in traditional rumbu stores; tops trimmed and bags netted.",
    seller: { name: "Goronyo Irrigation Farmers", type: "Cooperative", since: 2026, rating: 4.3, trades: 7, verified: false },
    trace: [{ label: "Harvested & cured", date: "2026-04-15", place: "Goronyo, Sokoto" }],
  },
  {
    id: "lst_010",
    slug: "white-maize-ogbomoso",
    title: "White maize, shelled",
    localName: "Àgbàdo · Masara · Ọka",
    category: "grains",
    state: "Oyo",
    lga: "Ogbomoso North",
    price: 62000,
    unit: "100kg bag",
    minOrder: 20,
    available: 450,
    grade: "B",
    verified: true,
    harvestedOn: "2026-08-10",
    image: "/img/market/maize-oyo.jpg",
    description:
      "Shelled white maize, dried to 13.5% moisture and cleaned of cobs and stones. Suitable for ogi, feed mills and flour.",
    seller: { name: "Adéwálé Agro Ventures", type: "Farmer", since: 2024, rating: 4.6, trades: 45, verified: true },
    trace: [
      { label: "Harvested & shelled", date: "2026-08-10", place: "Ogbomoso, Oyo" },
      { label: "Moisture 13.5% verified", date: "2026-08-18", place: "AgroChain field agent" },
    ],
  },
  {
    id: "lst_011",
    slug: "yellow-pepper-nsukka",
    title: "Nsukka yellow pepper",
    localName: "Ose Nsukka · Ata rodo",
    category: "spices",
    state: "Enugu",
    lga: "Nsukka",
    price: 55000,
    unit: "bag (≈20kg)",
    minOrder: 5,
    available: 80,
    grade: "A",
    verified: true,
    harvestedOn: "2026-09-18",
    image: "/img/market/pepper-enugu.jpg",
    description:
      "The famous aromatic Nsukka yellow pepper, the one that makes ofe nsala and pepper soup sing. Fresh-picked, with a dried option on request.",
    seller: { name: "Ụmụ Nsukka Growers", type: "Cooperative", since: 2025, rating: 4.9, trades: 31, verified: true },
    trace: [{ label: "Fresh-picked", date: "2026-09-18", place: "Nsukka, Enugu" }],
  },
  {
    id: "lst_012",
    slug: "red-palm-oil-abia",
    title: "Red palm oil, special grade",
    localName: "Mmanụ nkwụ · Epo pupa",
    category: "oils",
    state: "Abia",
    lga: "Isiala Ngwa",
    price: 62000,
    unit: "25L keg",
    minOrder: 10,
    available: 400,
    grade: "A",
    verified: true,
    harvestedOn: "2026-09-01",
    image: "/img/market/palm-oil-abia.jpg",
    description:
      "Low-FFA special palm oil pressed from fresh Tenera bunches within 48 hours of harvest. Clean, bright and sediment-free, in sealed 25-litre kegs.",
    seller: { name: "Ngwa Palm Processors", type: "Cooperative", since: 2024, rating: 4.7, trades: 72, verified: true },
    trace: [
      { label: "Bunches harvested", date: "2026-09-01", place: "Isiala Ngwa, Abia" },
      { label: "Pressed & clarified", date: "2026-09-02", place: "Co-op mill" },
    ],
  },
  {
    id: "lst_013",
    slug: "plantain-bunches-ikom",
    title: "Plantain bunches",
    localName: "Ọ̀gẹ̀dẹ̀ agbagba · Ogede",
    category: "fruits",
    state: "Cross River",
    lga: "Ikom",
    price: 6500,
    unit: "bunch",
    minOrder: 50,
    available: 1200,
    grade: "A",
    verified: true,
    harvestedOn: "2026-09-23",
    image: "/img/market/plantain-crossriver.jpg",
    description:
      "Big, full-fingered Agbagba plantain harvested green-mature for the long trip to Lagos and Abuja. 30–40 fingers per bunch.",
    seller: { name: "Ikom Plantain Network", type: "Aggregator", since: 2025, rating: 4.5, trades: 38, verified: true },
    trace: [{ label: "Harvested green-mature", date: "2026-09-23", place: "Ikom, Cross River" }],
  },
  {
    id: "lst_014",
    slug: "soybeans-mokwa",
    title: "Soybeans (TGX 1951)",
    localName: "Waken suya",
    category: "grains",
    state: "Niger",
    lga: "Mokwa",
    price: 780000,
    unit: "tonne",
    minOrder: 3,
    available: 95,
    grade: "B",
    verified: false,
    harvestedOn: "2026-01-20",
    image: "/img/market/soybeans-niger.jpg",
    description:
      "Clean, uniform soybeans for feed mills and oil crushers. Moisture 11%, foreign matter under 2%. Stored in hermetic bags.",
    seller: { name: "Mokwa Grain Hub", type: "Aggregator", since: 2026, rating: 4.2, trades: 5, verified: false },
    trace: [{ label: "Harvested & bagged", date: "2026-01-20", place: "Mokwa, Niger" }],
  },
];
