/** Sample market-board prices shown in the ticker when the API is unavailable. Illustrative only. */
export type MarketPrice = {
  commodity: string;
  market: string;
  unit: string;
  price: number;
  /** Week-on-week change in percent. */
  change: number;
};

export const marketPrices: MarketPrice[] = [
  { commodity: "Tomatoes", market: "Mile 12, Lagos", unit: "basket", price: 32000, change: -6.2 },
  { commodity: "White yam", market: "Wurukum, Makurdi", unit: "tuber", price: 4100, change: 1.8 },
  { commodity: "Maize", market: "Dawanau, Kano", unit: "100kg", price: 60500, change: -2.4 },
  { commodity: "Local rice", market: "Bodija, Ibadan", unit: "50kg", price: 74000, change: 0.6 },
  { commodity: "Garri (white)", market: "Ogbete, Enugu", unit: "50kg", price: 41000, change: 3.1 },
  { commodity: "Onions", market: "Mile 12, Lagos", unit: "100kg", price: 91000, change: 4.5 },
  { commodity: "Beans (oloyin)", market: "Oja-Oba, Ilorin", unit: "50kg", price: 118000, change: -1.1 },
  { commodity: "Irish potato", market: "Farin Gada, Jos", unit: "50kg", price: 47000, change: 2.2 },
  { commodity: "Palm oil", market: "Ariaria, Aba", unit: "25L", price: 61000, change: -0.8 },
  { commodity: "Soybeans", market: "Wuse, Abuja", unit: "tonne", price: 790000, change: 1.3 },
];
