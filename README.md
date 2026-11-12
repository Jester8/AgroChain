# 🌾 AgroChain

**AgroChain** is the trust and coordination layer for African agriculture, starting in Nigeria. It gives farmers a verified record of every harvest and connects them to buyers who pay fairly, from the farm gate in Benue to processors in Lagos.

> *Proof. Pricing. Prosperity.*

---

## What's in this repo

This repo is the **website**: Next.js 16 (App Router), Tailwind CSS v4 and Montserrat, hosted on Vercel.

The API it talks to lives in its own repo, **[Jester8/Agrochain-backend](https://github.com/Jester8/Agrochain-backend)** (NestJS). It runs on Render, with Postgres on Neon and email through Brevo, and it's shared with the mobile app.

### Website pages

- `/`, homepage with the market-board price ticker and the Harvest Passport
- `/marketplace`, search and filter produce by category, state and verification; `/marketplace/[slug]` shows the harvest trace and a make-an-offer form
- `/blog`, the journal, with categories; `/blog/[slug]` articles
- `/about`
- Auth: `/signup` (farmer, cooperative, buyer or aggregator; +234 phone; all 36 states + FCT), `/verify-email` (6-digit code), `/signin`, `/forgot-password`, `/reset-password`

If the API isn't reachable, the site falls back to the sample data in `lib/data/`, so pages always render. The marketplace shows a "preview" notice when it's using sample data.

### Design system

Defined in `app/globals.css`:

- **Colour tokens:** forest (brand), leaf, harvest gold, laterite clay, adire indigo, cream.
- **Signature textures:** `.aso-oke` (woven stripe divider), `.adire` / `.adire-light` (resist-dye pattern), `.grain`.
- **Brand assets:** `public/logo/logo.png` (white, for dark surfaces) and `logo-green.png` (for light surfaces). Photos: `public/img/main.jpg` and `public/img/more.jpg`.
- **Image slots:** planned images are listed in [`IMAGE_PROMPTS.md`](IMAGE_PROMPTS.md). Until a file exists, a branded placeholder tile is shown; drop the file at its path and it appears automatically.

---

## Local development

```bash
# 1. Start the API (see the Agrochain-backend README), which listens on http://localhost:4000
# 2. Then, in this repo:
cp .env.example .env.local   # NEXT_PUBLIC_API_URL=http://localhost:4000
npm install
npm run dev                  # http://localhost:3000
```

With no API running, the site still renders using the sample data in `lib/data/`. Signing in and
making offers need the API.

`lib/data/` is also the source of the backend's seed data. After changing it, re-export it:

```bash
npx tsx -e 'import {listings} from "./lib/data/listings"; import {posts} from "./lib/data/posts"; import {marketPrices} from "./lib/data/prices"; require("fs").writeFileSync("../Agrochain-backend/prisma/seed-data.json", JSON.stringify({listings, posts, marketPrices}, null, 2) + "\n")'
```

## How the site uses the API

- **Server rendering:** `lib/api.ts` fetches listings, posts and prices, caches them briefly and
  falls back to the sample data if the API is unreachable.
- **In the browser:** `lib/client-api.ts` handles sign-up, 4-digit email codes, sign-in and
  password reset.
  - The API's access and refresh tokens are kept in `localStorage`, the same scheme the mobile
    app uses.
  - An expired access token is refreshed automatically.

## Deploying to Vercel

Import the repo (root directory `/`) and set:

```
NEXT_PUBLIC_API_URL=https://api.agrochain.africa
NEXT_PUBLIC_SITE_URL=https://agrochain.africa
```

On the API, add the site's origin to `CORS_ORIGINS`.

---

## 📜 License

MIT © Lazerjet Technologies LTD
