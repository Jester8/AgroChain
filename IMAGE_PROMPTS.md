# AgroChain — Image Prompts

The site currently uses only two photos: `public/img/main.jpg` (homepage hero) and
`public/img/more.jpg` (the "problem" section). Every other image slot shows a designed
placeholder tile until a file is added at the path below. Drop a file in at its exact path
and it replaces the placeholder automatically — no code changes needed.

Each prompt works as a brief for a photographer or for an image generator. Real photos of
AgroChain farmers, field agents and partner cooperatives are always the first choice.

## Shared style (add to the end of every prompt)

> Authentic documentary photography in Nigeria. Natural warm light, real skin tones rendered
> accurately and richly, candid rather than posed, shallow depth of field, 35mm or 85mm lens
> look, subtle film grain. Colour palette of deep greens, harvest gold and red laterite earth.
> No text, no logos, no watermarks, no misspelled signage. No poverty stereotypes — people look
> dignified, capable and modern. Photorealistic, no illustration, no CGI look.

## Export specs

| Group | Folder | Ratio | Minimum size | Target file size |
|---|---|---|---|---|
| Marketplace | `public/img/market/` | 4:3 | 1600×1200 | under 350 KB |
| Journal covers | `public/img/blog/` | 16:10 | 1920×1200 | under 400 KB |
| Auth pages | `public/img/auth/` | 4:5 portrait | 1600×2000 | under 400 KB |
| About page | `public/img/about/` | 16:9 | 2400×1350 | under 500 KB |

JPEG, quality around 80, sRGB. Keep the main subject away from the bottom 25% of marketplace
and blog images, because cards overlay badges near the edges.

---

## 1. Marketplace listings (`public/img/market/`)

1. **yam-benue.jpg** — Neatly stacked pyramids of large white yam tubers inside a ventilated wooden
   yam barn in Makurdi, Benue State. Late-afternoon sun slants through gaps in the planks onto red
   earth. A Tiv farmer's weathered hands rest on the top tuber. Earthy browns with warm gold light.
2. **rice-kebbi.jpg** — Close-up of an open 50kg woven polypropylene sack of parboiled long-grain
   local rice, a carved calabash scoop half-buried in the glossy grains. More stacked sacks behind,
   and the interior of a small rice mill in Argungu, Kebbi State, softly out of focus.
3. **ginger-kaduna.jpg** — Split yellow ginger drying on raised woven mats in Southern Kaduna
   (Kachia). A Hausa woman in a patterned wrapper and headscarf turns the pieces by hand. Rolling
   green hills behind, bright dry-season light, visible texture on the ginger.
4. **tomatoes-kano.jpg** — Stacked plastic crates of firm Roma tomatoes, from breaker to deep red,
   at the edge of an irrigated farm in Kura, Kano State, at dawn. A young farmer in a kaftan lifts
   one crate. An irrigation channel glints in low sunlight.
5. **potatoes-plateau.jpg** — Freshly harvested Irish potatoes spilling from a jute sack onto dark
   volcanic soil in Bokkos, Jos Plateau. Cool, misty highland morning with terraced fields
   receding into haze.
6. **cassava-ogun.jpg** — Bundles of freshly uprooted cassava tubers, brown bark with bright white
   cut ends, loaded into a wheelbarrow on a farm near Abeokuta, Ogun State. Oil palms and a Yoruba
   farmer softly in the background.
7. **cocoa-ondo.jpg** — Fermented brown cocoa beans drying on a raised bamboo platform in Idanre,
   Ondo State, with the Idanre hills hazy behind. A farmer's hand rakes the beans. Golden
   mid-morning light.
8. **sesame-jigawa.jpg** — Macro shot of creamy-white sesame seeds pouring from cupped hands into an
   open sack. Sahel landscape as a soft blur behind, bright light diffused and softened. Hadejia,
   Jigawa State.
9. **onions-sokoto.jpg** — Heaps of glossy red onions with dried tops at an irrigation-scheme farm in
   Goronyo, Sokoto State. A traditional mud-and-thatch rumbu storage hut behind, with two farmers
   sorting onions into netted bags.
10. **maize-oyo.jpg** — Shelled white maize kernels heaped in a large enamel basin in a farm
    compound in Ogbomoso, Oyo State. Dried maize cobs and filled sacks nearby, warm afternoon
    light on the grain.
11. **pepper-enugu.jpg** — Glossy, wrinkled Nsukka yellow peppers (ose Nsukka) in a woven raffia
    basket at an Enugu market stall, shot from slightly overhead. Vibrant yellow against dark
    wood, with a trader's hands at the edge of the frame.
12. **palm-oil-abia.jpg** — Bright red palm oil being poured into a clear 25-litre keg at a small
    cooperative mill in Isiala Ngwa, Abia State. Palm fruit bunches and a little rising steam in
    the background.
13. **plantain-crossriver.jpg** — Large green Agbagba plantain bunches stacked along a roadside in
    Ikom, Cross River State. Dense rainforest green behind, and a buyer inspecting one bunch.
14. **soybeans-niger.jpg** — Clean golden soybeans in an open hermetic storage bag at a grain hub in
    Mokwa, Niger State. Shafts of sunlight fall across the beans, with sacks stacked in neat rows
    behind.

## 2. Journal covers (`public/img/blog/`)

15. **harvest-record.jpg** — A middle-aged Nigerian farmer and a young field agent in a plain
    forest-green polo stand shoulder to shoulder in a yam field, looking at a smartphone together
    and smiling. Mutual respect, warm light.
16. **mile-12.jpg** — Wide dawn shot of Mile 12 market, Lagos: trucks unloading tomato crates,
    traders in motion, busy but orderly, golden haze and long shadows.
17. **benue-coop.jpg** — A cooperative meeting under a large mango tree in a Benue village: about 12
    farmers of mixed ages seated on wooden benches, a woman leader standing and speaking, a stacked
    yam harvest nearby.
18. **storage.jpg** — Onions curing in a shaded, ventilated store in Northern Nigeria. Light filters
    through the thatch onto rows of netted onion bags. Calm and practical.
19. **credit.jpg** — A young Nigerian woman farmer seated at a small microfinance office desk with
    her documents and phone on the table, a loan officer across from her. A warm, respectful
    conversation in natural window light.
20. **ginger.jpg** — A healthy, lush ginger field in Southern Kaduna just after rain. A farmer kneels
    to inspect a plant, with droplets on the leaves. Hopeful, fresh mood.

## 3. Auth pages (`public/img/auth/`)

21. **signin.jpg** — Portrait of a confident Nigerian woman farmer in her 30s wearing an Ankara
    headwrap, standing in a green maize field at golden hour, holding a phone and looking just
    off-camera. Leave calm space above her head.
22. **signup.jpg** — Three generations of a Nigerian farming family (grandfather, mother, teenage
    son) walking a farm path together carrying hoes and a woven basket, backlit by the evening sun.
23. **reset.jpg** — Quiet close-up of a farmer's hands holding a smartphone, with a little soil on
    the fingers and green leaves blurred behind. Calm and reassuring.

## 4. About page (`public/img/about/`)

24. **field-team.jpg** — An AgroChain field team of four young Nigerians (two women, two men) in
    plain forest-green polos, standing with two farmers beside a motorcycle on a red dirt road
    between fields. Candid laughter, midday light softened by cloud.

## Optional upgrades

25. **public/img/og.jpg** (1200×630) — Social-sharing image. A wide, cinematic Nigerian farmland
    landscape at golden hour with a single farmer silhouetted on the right, and generous empty
    space on the left for the logo and a headline. Until this exists, `main.jpg` is used.
26. **Homepage "Who it's for" tile** (4:5, 1600×2000) — A buyer and a farmer shaking hands beside
    sacks of produce at a rural collection point, with a cooperative lead holding a phone showing
    a record. This is only needed if you want a photo in that tile; it currently uses a designed
    brand panel.
