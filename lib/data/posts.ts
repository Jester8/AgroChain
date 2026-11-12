/**
 * Journal articles. Used directly when the API is unavailable and by
 * backend/db/seed.ts to seed Postgres.
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: "Farmer stories" | "Markets" | "Guides" | "Finance" | "Product";
  author: string;
  publishedAt: string;
  readMinutes: number;
  cover: string;
  featured?: boolean;
  body: Block[];
};

export const posts: Post[] = [
  {
    slug: "a-harvest-record-is-worth-more-than-a-handshake",
    title: "Why a harvest record is worth more than a handshake",
    excerpt:
      "Nigerian agriculture runs on trust between people who know each other. Here's how a simple digital record lets that trust travel further than the village.",
    category: "Product",
    author: "AgroChain Editorial",
    publishedAt: "2026-09-15",
    readMinutes: 5,
    cover: "/img/blog/harvest-record.jpg",
    featured: true,
    body: [
      { type: "p", text: "Ask any yam farmer in Zaki Biam how they sell and you'll hear about relationships. The buyer who has come every season for ten years. The aunty at Wurukum market who always pays on the second trip. That trust is real, and it is valuable, but it stops at the edge of who you already know." },
      { type: "p", text: "When a processor in Lagos or an exporter in Apapa wants to buy, they have no way of knowing that your tubers are Grade A, that your ginger was dried properly, or that you have delivered on time for five seasons. So they either don't buy, or they buy through a middleman who takes a large share for carrying that risk." },
      { type: "h2", text: "Turning reputation into a record" },
      { type: "p", text: "AgroChain starts with something every farmer already has: a phone. You log what you planted, when you harvested, how much and what grade. A field agent or cooperative lead confirms it. Each confirmed harvest becomes part of your record: a history that belongs to you." },
      { type: "quote", text: "Your word has always been good. Now it can be checked by someone who has never met you." },
      { type: "h2", text: "What changes when buyers can check" },
      { type: "list", items: [
        "Buyers can pay closer to fair market price because they carry less risk.",
        "Rejections at the gate drop, because grade and moisture were agreed up front.",
        "Cooperatives can show combined volume and win bigger contracts.",
        "Lenders can see years of real production instead of guessing.",
      ] },
      { type: "p", text: "None of this replaces the handshake. It makes the handshake travel: from Makurdi to Mile 12, from Kachia to Rotterdam." },
    ],
  },
  {
    slug: "reading-mile-12-tomato-prices",
    title: "Reading Mile 12: what really moves tomato prices between Kano and Lagos",
    excerpt:
      "A basket of tomatoes can triple in price in a few weeks. Understanding the season, the road and the rain helps farmers time their harvest and their sales.",
    category: "Markets",
    author: "AgroChain Editorial",
    publishedAt: "2026-09-02",
    readMinutes: 6,
    cover: "/img/blog/mile-12.jpg",
    body: [
      { type: "p", text: "Most of the tomatoes eaten in Lagos are grown hundreds of kilometres north (in Kano, Kaduna, Katsina and Plateau) and trucked down to Mile 12 market. That long journey is why tomato prices swing so hard." },
      { type: "h2", text: "The three forces behind the swing" },
      { type: "list", items: [
        "Season: dry-season irrigated tomatoes from the north flood the market from roughly January to April, pushing prices down. When that supply ends and the rains begin, prices climb.",
        "Road and fuel: every increase in diesel, every bad stretch of road, every checkpoint delay adds cost and spoils fruit.",
        "Losses: tomatoes packed in raffia baskets and stacked high can lose a large share of the load before arrival. Scarcity at the destination drives prices up.",
      ] },
      { type: "h2", text: "What a farmer can do with this" },
      { type: "p", text: "If you can stagger planting so part of your harvest lands at the edge of the glut, you can sell into better prices. If you can move to plastic crates, you arrive with more saleable fruit. And if you can see prices at Mile 12 and Dawanau before you load a truck, you can decide where to send it." },
      { type: "quote", text: "The farmer who knows the price at the destination negotiates differently at the farm gate." },
      { type: "p", text: "That's why AgroChain shows a market board with prices from the major produce markets. Prices on the board are reported by traders and field agents and refreshed through the week. Use them as a guide, not a guarantee." },
    ],
  },
  {
    slug: "benue-cooperatives-pooling-yam",
    title: "Stronger together: how Benue yam cooperatives are pooling their harvest",
    excerpt:
      "One farmer with 300 tubers has little bargaining power. Forty farmers with 12,000 graded tubers can call the buyer.",
    category: "Farmer stories",
    author: "AgroChain Editorial",
    publishedAt: "2026-08-20",
    readMinutes: 4,
    cover: "/img/blog/benue-coop.jpg",
    body: [
      { type: "p", text: "Benue calls itself the Food Basket of the Nation for good reason: its yams are sold in markets across Nigeria. But individual farmers often sell early, at the farm gate, for whatever the first buyer offers." },
      { type: "p", text: "Cooperatives change that. By pooling harvests, grading together and storing in shared barns, members can wait for better prices and sell in volumes that serious buyers want." },
      { type: "h2", text: "What makes pooling work" },
      { type: "list", items: [
        "Clear grading rules everyone agrees to before harvest.",
        "A shared record of who contributed what, so payouts are fair.",
        "Proper storage: ventilated, shaded barns that keep tubers sound for months.",
        "One trusted voice to negotiate on behalf of the group.",
      ] },
      { type: "p", text: "AgroChain gives cooperative leads a simple dashboard to log each member's contribution, attach grades and share a verified batch with buyers. When the sale is done, everyone can see exactly how the money was split." },
      { type: "quote", text: "Transparency inside the cooperative is what keeps it together season after season." },
    ],
  },
  {
    slug: "storage-fixes-onions-tomatoes",
    title: "Five low-cost storage fixes that cut losses on onions and tomatoes",
    excerpt:
      "You don't need a cold room to keep more of your harvest. Practical steps that farmers across the north already use.",
    category: "Guides",
    author: "AgroChain Editorial",
    publishedAt: "2026-08-05",
    readMinutes: 5,
    cover: "/img/blog/storage.jpg",
    body: [
      { type: "p", text: "Post-harvest losses quietly eat into every farmer's income. Much of that loss happens in the days between harvest and sale. The good news: several of the most effective fixes are cheap." },
      { type: "h2", text: "For onions" },
      { type: "list", items: [
        "Cure before storing: leave onions in a shaded, airy place for one to two weeks until the necks are dry and tight.",
        "Store in a rumbu or raised, ventilated store, never on bare, damp ground.",
        "Sort out bruised or soft bulbs early; one rotten onion spreads to its neighbours.",
      ] },
      { type: "h2", text: "For tomatoes" },
      { type: "list", items: [
        "Pick at breaker stage (first blush of colour) if the fruit will travel far.",
        "Use plastic crates instead of deep raffia baskets so fruit isn't crushed.",
        "Harvest in the cool of the morning and keep crates in shade until loading.",
      ] },
      { type: "p", text: "Logging your storage method on AgroChain also helps buyers: a batch of properly cured onions from a known store is worth more than an unknown lot." },
    ],
  },
  {
    slug: "what-lenders-want-to-see",
    title: "Getting credit as a smallholder: what lenders actually want to see",
    excerpt:
      "Banks and microfinance lenders aren't against farmers. They're against guessing. Here's the information that changes their answer.",
    category: "Finance",
    author: "AgroChain Editorial",
    publishedAt: "2026-07-18",
    readMinutes: 6,
    cover: "/img/blog/credit.jpg",
    body: [
      { type: "p", text: "Most smallholder farmers in Nigeria have never had a formal loan. The usual reason given is 'no collateral', but the deeper problem is information. A lender can't see your farm, your yields or your buyers from an office in the city." },
      { type: "h2", text: "What a lender looks for" },
      { type: "list", items: [
        "Identity: a verified name, phone number and, ideally, BVN or NIN.",
        "Location: where your farm is and how big it is.",
        "History: what you've produced over several seasons.",
        "Sales: proof that someone actually bought your produce, and at what price.",
        "Group backing: membership of a cooperative that shares responsibility.",
      ] },
      { type: "p", text: "Each of these can be captured, season by season, as part of your AgroChain record. With your permission, you can share that record with a lender, and only the parts you choose." },
      { type: "quote", text: "Your data belongs to you. You decide who sees it, and why." },
      { type: "p", text: "We're working with partner lenders on input loans that are repaid at harvest through the marketplace. If you'd like to be part of the first group, join the waitlist and tell us what you grow." },
    ],
  },
  {
    slug: "ginger-lessons-southern-kaduna",
    title: "Ginger after the blight: lessons from Southern Kaduna",
    excerpt:
      "After a devastating disease outbreak, ginger farmers are rebuilding with cleaner seed, better records and closer ties to buyers.",
    category: "Farmer stories",
    author: "AgroChain Editorial",
    publishedAt: "2026-06-30",
    readMinutes: 5,
    cover: "/img/blog/ginger.jpg",
    body: [
      { type: "p", text: "Southern Kaduna (Kachia, Jaba, Kagarko and the surrounding communities) grows most of Nigeria's ginger. In 2023 a fungal blight swept through the fields and many families lost almost their entire crop." },
      { type: "p", text: "Recovery has meant changing how ginger is grown and sold. Farmers are sourcing clean planting material, rotating fields and paying closer attention to drainage." },
      { type: "h2", text: "Why records matter more now" },
      { type: "p", text: "Exporters and processors who buy Nigerian ginger want reassurance: where it was grown, how it was dried, whether it has been tested. A farmer who can show this sells faster and at a better price." },
      { type: "list", items: [
        "Record the source of your planting material.",
        "Log drying method and days: raised mats beat bare ground.",
        "Keep test results (moisture, aflatoxin) attached to each batch.",
      ] },
      { type: "quote", text: "A good harvest is the start. A trusted harvest is what gets paid well." },
    ],
  },
];

export const postCategories = ["Farmer stories", "Markets", "Guides", "Finance", "Product"] as const;
