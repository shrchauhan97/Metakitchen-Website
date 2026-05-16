# MetaKitchen SEO + GEO Audit — v1

**Audit date:** 2026-05-17
**Live URL audited:** https://metakitchen.io (and https://metakitchen.vercel.app)
**Stack:** Vite 8 + React 19 SPA → Vercel (rewrite all routes → `/index.html`)
**Repo path:** `C:\Users\shrch\Desktop\websites\metakitchen-websites\metakitchen-website v3\repo\`

---

## 1. Executive summary

1. **The site is invisible to non-JS crawlers.** Every route (`/`, `/our-bread`, `/dr-aara`, `/science`, `/story`) returns the **identical 1,850-byte SPA shell** to any crawler. There is no rendered HTML body — only the index template. Googlebot can execute JS so it will eventually index, but **AI crawlers (GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot) and Bing's older indexer either do not execute JS or do so unreliably.** Result: zero citation surface for AI search. This is the single biggest GEO blocker. Fix: add a build-time prerender step (e.g. `vite-plugin-prerender-spa` or `react-snap`) — no architectural change, just adds static HTML snapshots to `dist/`.
2. **Social previews are broken.** `og:image` points to `https://metakitchen.io/og-cover.png` but **that file does not exist** in `public/` — the URL returns the SPA shell as `text/html`. Any LinkedIn / X / WhatsApp / Slack share will show a blank or fallback preview. Fix: generate a 1200×630 PNG, drop in `public/og-cover.png`, ship.
3. **No `robots.txt`, no `sitemap.xml`, no canonicals, no JSON-LD.** Search engines have no map of the site, no preferred URL signal, and zero structured data to extract product/organization facts. The Vercel preview domain (`metakitchen.vercel.app`) serves identical content with no canonical — **duplicate content liability**. Fix bundle: 4 small files (`robots.txt`, `sitemap.xml`, per-page `<link rel="canonical">`, JSON-LD blocks) — all low effort, high SEO + GEO impact.
4. **Per-route `<Helmet>` tags ship title + description only — no OG/Twitter per route, no canonical, no JSON-LD per page.** Every sub-page inherits the homepage OG image and copy. Sharing `/dr-aara` shows the bread preview. Fix in `src/data/content.js`: extend each route's SEO entry with `ogTitle`, `ogDescription`, `ogImage`, `canonical` — render them in each page's `<Helmet>`.
5. **The Science page is the highest-value GEO page on the site but has no FAQPage schema and no explicit Q&A surface area.** The numbered list ("The test / The scale / Honest about edges / The rest of the line / The context") is excellent citable copy — but LLMs and AI Overviews look hardest at `FAQPage` JSON-LD and `<h3>` question-form headings. Rewrite the list as 5 Q&As + add `FAQPage` schema. Same play on `/dr-aara` ("What is Dr. Aara? / How do I talk to her? / What languages? / Is she a doctor?") and `/our-bread` ("What is the GI of MetaKitchen bread? / What is in it? / How long does it last?").

---

## 2. Classical SEO audit

### Meta tags per route

Source: `src/data/content.js` lines 178–212 + per-page `<Helmet>` blocks.

| Route | Title | Description | Canonical | Score |
|---|---|---|---|---|
| `/` | "MetaKitchen — The bread you already eat. Behaves differently." (62 chars, sharp brand voice, no keyword stuffing) | "A chef-led loaf, lab-tested at GI 38. The Daily White is the flagship. The line follows." (89 chars, brand-voiced, weak on keywords) | ❌ none | **7/10** — strong voice, weak on classical keyword signals ("low-GI bread India" never appears in title/desc) |
| `/our-bread` | "Our Bread — MetaKitchen" (24 chars, generic) | "The Daily White, lab-tested at GI 38. A staple upgrade, built like a chef would build it. One loaf, then a kitchen." (118 chars) | ❌ none | **5/10** — title is the weakest on the site; "Our Bread" alone has zero search value. Should be "The Daily White — Low-GI Bread, Lab-Tested at GI 38 \| MetaKitchen" |
| `/dr-aara` | "Dr. Aara — MetaKitchen" (22 chars, brand-only) | "An AI avatar you can see and talk to. Scan the QR, her face shows up, you start talking. Built on our own conversation engine." (126 chars) | ❌ none | **5/10** — Dr. Aara is unknown so the brand title alone won't get clicks. Better: "Dr. Aara — Multilingual AI Nutrition Avatar \| MetaKitchen" |
| `/science` | "How we test — MetaKitchen" (25 chars) | "One loaf. One lab. One number. The Daily White, predictive GI protocol, accredited Indian lab. The number came back at 38." (124 chars) | ❌ none | **7/10** — voice is strong; title could be "Predictive GI Testing — Daily White at GI 38 \| MetaKitchen" |
| `/story` | "The Story — MetaKitchen" (23 chars) | "A chef's thesis on what bread should be. Built four versions. The last one made it past the people eating it every morning." (123 chars) | ❌ none | **6/10** — could lean into Indian diabetes context to capture intent traffic |
| `/privacy` | "Privacy — MetaKitchen" | "How we handle your data." (24 chars — too thin) | ❌ none | **6/10** — fine for a privacy page; add `noindex` |
| `/terms` | "Terms — MetaKitchen" | "Terms of use for metakitchen.io." | ❌ none | **6/10** — fine; add `noindex` |

**Site-wide gaps:** no `<link rel="canonical">` anywhere; no `<meta name="robots">` per page; legal pages should be `noindex,follow`.

### OG / Twitter Card tags

- **Site-wide (in `index.html` lines 15–24):** OG title, description, type, URL, image + Twitter card, title, description, image. **Good structure, broken image link.**
- **Per route:** **zero** OG/Twitter overrides in any page's `<Helmet>` (verified — every page sets only `<title>` and `<meta name="description">`). LinkedIn previewing `/dr-aara` will show the homepage bread image, not Aara's portrait.
- **og:image** points to `/og-cover.png` which returns `text/html` (1,850 bytes — the SPA shell). **Image is missing.** All current shares are broken.
- **og:url** hard-coded to `https://metakitchen.io` even when shared from `metakitchen.vercel.app` or any sub-route — this is OK as a canonical-style signal but should be set per-route to match the page actually being shared.
- No `og:locale` (should be `en_IN`), no `og:site_name`, no `twitter:site`.

### Headings

| Page | H1 | H2 sample | Doing SEO work? |
|---|---|---|---|
| `/` | "The bread you already eat. Behaves differently." | "Three things had to be true at once.", "Dr. Aara. The conversation comes with the bread.", "How it works.", "Get on the list." | **H1 is pure brand poetry** — no keyword. **H2s are scannable** (LLMs love them) but contain no demand keywords. AI summarization will struggle: nothing says "low-GI bread", "diabetic-friendly bread", "Indian bread brand". |
| `/our-bread` | "A staple upgrade. Built like a chef would build it." | "GI 38, lab-tested.", "A loaf that earns its place at breakfast.", "What is in it. What is not.", "Flatter curve. That is the whole point." | H1 again brand-poetic, no keywords. H2s improving — "GI 38, lab-tested" is excellent citable phrasing. |
| `/dr-aara` | "Meet Dr. Aara." | "Three things her engine actually does.", "Aara, on the line.", "Open the bread. See her face. Start talking.", "What she is not." | Same problem. "What she is not" is brilliant brand copy but invisible to search intent. |
| `/science` | "One loaf. One lab. One number." | "Lower peak. Slower rise. Steadier finish.", "Four versions to get here." | Strong voice, weak keyword surface. The numbered list under "What the lab does, and what it means" is the most citable copy on the site but it is inside a `<ol>` with no `<h3>` question framing. |
| `/story` | "A chef's thesis on what bread should be." | "Bread itself, better.", "Bread is the wedge. The line is the longer arc.", "Why this exists." | Same. |

**Bottom line:** H1s/H2s are on-brand and AI-summarizable for "what is this brand" type queries, but they cede the entire keyword surface for demand-driven queries ("low GI bread India", "diabetic bread", "atta vs maida bread"). Fix without sacrificing voice: keep poetic H1s, add **descriptive `<h2>` eyebrows** or **a single explanatory sentence** below each H1 that introduces the keyword honestly.

### Canonical URLs

**Absent everywhere.** No `<link rel="canonical">` in `index.html` or any page Helmet. Critical issue because:
- `metakitchen.vercel.app` and `metakitchen.io` serve identical HTML — Google may pick the wrong one as canonical
- Trailing slash redirect in `vercel.json` is correct but no canonical means accidental query strings (`?utm=...`) won't consolidate

### robots.txt + sitemap.xml

**Both absent.** Confirmed by `curl https://metakitchen.io/robots.txt` and `curl https://metakitchen.io/sitemap.xml` → both return the **1,850-byte SPA shell** because `vercel.json` rewrites all routes to `index.html`. This means even if you add files in `public/`, the rewrite rule will swallow them. **Fix: exclude these files from the rewrite** by listing them in `vercel.json` `rewrites.source` negative pattern, or simpler — ensure the files are in `public/` and Vercel will serve them before the rewrite (static assets take priority over rewrites in Vercel; verify after deploy).

Sitemap should contain all 7 public routes with `lastmod` dates and priorities (home + 4 substantive pages = 1.0/0.8, legal = 0.3).

### Internal linking

- **Nav.jsx**: 4 links to substantive pages — good. Anchor text matches page titles ("Our Bread", "Dr. Aara", "Science", "Story").
- **Footer.jsx**: same 4 links + 2 legal — good.
- **Body-to-body internal linking is thin.** Examples I found:
  - Home → "/our-bread", "/dr-aara" via CTA buttons (anchor: "See the loaf", "Meet Dr. Aara") — anchor text is brand voice, not keyword.
  - `/our-bread` → "/science" (anchor: "How we test", and inline `<a href="/science">How we test →</a>`) — good.
  - `/dr-aara` → "/our-bread" (anchor: "See the loaf she comes with", "See the bread")
  - `/story` → "/our-bread#waitlist" + "/science"
  - `/science` → "/our-bread#waitlist"
- **What's missing:** keyword-rich anchor links between content. E.g., on `/science`, a sentence like "we measured the Daily White's [glycemic index in a predictive GI test](/science)" is what AI Overviews extract. Currently anchors are pure-brand ("See the loaf").

### Image alt text

Reviewed all `<img>` tags across all 5 substantive pages:

| Page | Image | Alt | Verdict |
|---|---|---|---|
| Home | `breakfast-spread.webp` | "Indian breakfast spread: sliced bread, butter, eggs, masala chai" | Good |
| Home (Nav) | `mk-logo-original.png` | "MetaKitchen" | Acceptable (logo) |
| `/our-bread` | `hero-loaf.webp` | "Whole seeded multigrain loaf on linen — top-down editorial shot" | Good |
| `/our-bread` | `crumb-cross-section.webp` | "Cross-section of multigrain bread showing open crumb and seeds" | Good |
| `/our-bread` | `grains-macro.webp` | "Mixed whole grains and oats macro" | OK (could add "stone-ground") |
| `/our-bread` | `hands-breaking-bread.webp` | "Hands gently tearing a slice of fresh multigrain bread" | Good |
| `/our-bread` | `packaging-mockup.webp` | "Kraft-paper packaging with seeded multigrain loaf" | Good |
| `/our-bread` (story img) | `hands-breaking-bread.webp` | "Hands gently tearing a slice of fresh multigrain MetaKitchen bread" | Good |
| `/dr-aara` | `aara-portrait.webp` / `-2`/`-3` | "Dr. Aara — {caption}" | OK (could be richer: "Dr. Aara, MetaKitchen's multilingual AI nutrition avatar") |
| `/dr-aara` (phone avatar) | `aara-portrait.webp` | empty `alt=""` with `aria-hidden="true"` | Correct for decorative use |
| `/story` | `packaging-mockup.webp` | "MetaKitchen-style kraft packaging with sage monogram and a seeded multigrain loaf" | Good |
| `/story` | `breakfast-spread.webp` | "MetaKitchen multigrain bread on a real morning table" | Good |
| Footer | `mk-logo-original.png` | "MetaKitchen" | OK |

**Videos** (`/bread-hero.mp4`, `/draara.mp4`, `/aara-clip.mp4`) have no `<track>` captions and no descriptive surrounding text in many cases. Add `aria-label` on each `<video>` element for accessibility + descriptive `<figcaption>` siblings where they don't exist.

**Score: 8/10** on alt text — solid, with minor opportunities to enrich for image search.

### Page weight + Core Web Vitals

From `dist/assets/`:

| File | Size |
|---|---|
| `dist-D6qyL3WZ.js` (three.js chunk) | **1,091 KB** |
| `index-BtJjQLil.js` (main app) | **553 KB** |
| `index-Dx0k4PMr.css` | 64 KB |
| `jsx-runtime` | 12 KB |
| **Total JS+CSS** | **~1.72 MB uncompressed** (rough estimate ~500-600 KB gzipped) |

Plus videos: `bread-hero.mp4`, `draara.mp4`, `aara-clip.mp4`, `manisha-founder.mp4` — sizes not measured but `.mp4` autoplay on hero is the LCP risk.

**LCP risks:**
1. Hero video on `/` starts loading immediately, large file, autoplay → **LCP delayed until video first frame**. Poster image (`/img/bread-crosssection.png` — a `.png`, not `.webp`, on the hero) helps but is itself unoptimized.
2. ShaderGradient + three.js loaded on hero of `/` — 1.09 MB chunk just for shader backdrop.
3. ShadergradientReact also pulled in.

**Recommendations (no architecture change):**
- Code-split three.js so it only loads on routes that use it. If hero shader is only on `/`, dynamic-import it inside Home.jsx with `React.lazy()` + `<Suspense>`.
- Convert `bread-crosssection.png` poster to `.webp`.
- Add `preload` hint for the hero video on `/` only (in Home component, not site-wide).
- Run `lighthouse` on production to get actual LCP/CLS/INP numbers — current scores not measured here.
- Consider lazy-loading the Aara teaser video on Home (`preload="none"` + intersection observer trigger) — currently it autoplays even before scrolled into view.

---

## 3. Generative Engine Optimization (GEO / AI SEO) audit

### Citability

The site has **strong citable raw material** but it is locked behind JS rendering. When (and if) crawlers do render the page, here's what's good:

**Highly citable phrases already on the site:**
- "The Daily White was sent to an accredited Indian lab. The standard predictive glycemic index protocol. The number came back at 38." (`/science` hero)
- "237 million Indians have diabetes or pre-diabetes." (`/story`)
- "76.6% of diagnosed diabetics have poor glycemic control despite medication (TIGHT Study, BMJ 2019)." (`/science`)
- "Below the FSSAI low-GI threshold of 55. White bread sits at 70." (`/our-bread`, `/science`)
- "A long, quiet rise. Develops the crumb. Lowers the GI." (`/our-bread`)

These are exactly the kind of self-contained claim-with-evidence sentences that AI Overviews and Perplexity quote. Excellent.

**Anti-citable copy (poetic, brand voice only):**
- "Three things had to be true at once."
- "Or the loaf was not worth baking."
- "Behaves differently."
- "From the kitchen, then to the lab."

These work as brand poetry but won't be quoted by AI. **Do not change them** — instead, the strategy is to add **complementary** factual sentences (in JSON-LD descriptions, FAQ answers, and a couple of explanatory subheads) so the AI has both surfaces.

### Structured data / JSON-LD

**None present.** Confirmed by reading the entire `index.html` and all page JSX. Adding the following will materially help AI extraction:

1. **`Organization`** (in `index.html`, site-wide) — identifies the brand to Google's Knowledge Graph and to LLMs.
2. **`Product`** (on `/our-bread`) — for the Daily White; supports rich snippets and product-grid surfaces.
3. **`FAQPage`** (on `/science`) — wraps the existing 5 numbered points reformatted as Q&A. AI Overviews quote `FAQPage` more readily than any other schema.
4. **`BreadcrumbList`** (on every non-home page) — small win for SERP appearance and structural understanding.
5. **`WebSite` + `SearchAction`** — optional but useful if you ever add site search.

See Section 6 for ready-to-paste JSON-LD blocks for each of these.

### Q&A surface area

**Currently zero explicit Q&A pairs.** The `/science` page has a 5-item numbered list ("The test / The scale / Honest about edges / The rest of the line / The context") that is *almost* Q&A — but lacks the question framing and the `FAQPage` schema. 

**Recommended new Q&A blocks** (writing in the on-brand voice — every answer below is composed only from the existing content.js facts):

For `/science` (replace or supplement the numbered list):
- **Q: What is the glycemic index of MetaKitchen bread?**
  A: The Daily White, MetaKitchen's flagship loaf, is lab-tested at GI 38 — below the FSSAI low-GI threshold of 55. White bread sits at 70.
- **Q: How was the glycemic index measured?**
  A: The standard predictive Glycemic Index protocol at an accredited Indian lab, using the Goñi et al. regression — the methodology used by the FAO and food research bodies worldwide.
- **Q: How does this compare to regular bread?**
  A: White bread sits around GI 70. Most "healthy multigrain" loaves on Indian shelves land between 55 and 70. Watermelon is 76. An apple is 36. Lentils are around 30. The Daily White came back at 38.
- **Q: Is this bread safe for diabetics?**
  A: It is bread that has been lab-tested for its glycemic index — useful for blood-sugar-aware eating, not a treatment. For diabetics on medication, your physician's guidance is what matters.
- **Q: Where is MetaKitchen bread made?**
  A: Made in India, by chefs from the country's most senior kitchens. The line starts with the Daily White, with chia ciabatta, sourdough variants, and jalapeño cheese to follow.

For `/dr-aara`:
- **Q: What is Dr. Aara?** A: An AI avatar you can see and talk to. Scan the QR on the loaf, her face shows up on your phone, you talk to her like a video call.
- **Q: What languages does she speak?** A: Hindi, English, Tamil, Bengali, Marathi, Telugu — and the way you actually mix them.
- **Q: Is Dr. Aara a doctor?** A: No. She is an AI trained for nutrition and food conversations, not a physician. For prescriptions and personal medical decisions, talk to a human one.
- **Q: How much does Dr. Aara cost?** A: She comes with the loaf. No subscription. No app to download. The QR is on every pack.

For `/our-bread`:
- **Q: What is in MetaKitchen bread?** A: Whole grains, stone-ground; cultured fats; salt. No maida, no added sugar, no preservatives, no emulsifiers, no bromates, no seed oils.
- **Q: How long does it last?** A: Five days on the counter. No preservatives, no plastic-wrap tricks.

### AI crawler accessibility (the big one)

**Tested directly:**
```
curl -A "OAI-SearchBot/1.0" https://metakitchen.io     → 1,850 bytes, SPA shell, zero body content
curl -A "Mozilla/5.0 (compatible; ClaudeBot/1.0)" https://metakitchen.io/science → 1,850 bytes, SPA shell
```

**What the bot sees:** title, meta description, OG tags. That's it. No H1, no copy, no proof points, no citations. ClaudeBot, OAI-SearchBot, PerplexityBot, and Bing's BingBot do not reliably execute JS. Googlebot does, but with latency and only sometimes — and Google AI Overviews increasingly pull from the initial HTML, not the rendered DOM.

**This is the single biggest GEO gap.** Without prerendering, the entire content rewrite is invisible to AI search.

**Solutions, ranked by effort and effectiveness:**

1. **Add prerendering in the Vite build** (recommended — **Small/Medium effort, no architecture change**). Use `vite-plugin-prerender` or `@prerenderer/rollup-plugin` or `vite-react-ssg`. At build time, the plugin spins up a headless Chrome, renders each route to static HTML, and writes `dist/our-bread/index.html`, `dist/science/index.html`, etc. with the fully rendered DOM. Vercel serves these static files directly to crawlers. Users still hydrate to the SPA experience. This is the **right fix** and gets you 90% of SSR benefit with zero refactor.

2. **Migrate to Next.js or vite-plugin-ssr/Astro** (Large effort, fully architectural). Not recommended as a primary fix per founder's constraint.

3. **Cloudflare/Vercel edge prerender service** (Small effort, recurring cost). Vercel offers no built-in prerender for SPAs as of writing — would need a third-party service like Prerender.io that detects bot user-agents and serves cached HTML.

**Recommendation:** Add `vite-plugin-prerender-spa` to the build. Plus `puppeteer` as a devDep. CI/build time goes up ~30 sec per route; deploy size goes up ~50 KB per page. Worth it.

### llms.txt

The `/llms.txt` proposal (https://llmstxt.org/) is an emerging convention: a single text file at the root that gives LLMs a structured, plain-text overview of the site. Anthropic and other AI labs are starting to respect it as a discovery hint.

**Recommended `public/llms.txt`** for MetaKitchen:

```
# MetaKitchen

> A chef-led low-glycemic-index Indian bread brand. The flagship loaf — the Daily White — is lab-tested at GI 38 (below the FSSAI low-GI threshold of 55). Made in India. The line will extend to chia ciabatta, sourdough variants, and jalapeño cheese.

## Pages
- [Home](https://metakitchen.io/): brand overview and flagship intro
- [Our Bread](https://metakitchen.io/our-bread): the Daily White — ingredients, proof, the line
- [Dr. Aara](https://metakitchen.io/dr-aara): multilingual AI avatar accessed via QR code on the pack
- [Science](https://metakitchen.io/science): how the GI was tested, accredited Indian lab, predictive GI protocol
- [Story](https://metakitchen.io/story): the chef-led thesis and the diabetes context

## Key facts
- The Daily White: lab-tested at Glycemic Index 38 (predictive GI protocol, accredited Indian lab, Goñi et al. regression)
- FSSAI low-GI threshold: 55. White bread: ~70. The Daily White: 38.
- 48-hour slow ferment, every loaf
- No maida, no added sugar, no preservatives, no emulsifiers, no bromates, no seed oils
- 237 million Indians live with diabetes or pre-diabetes (ICMR-INDIAB / Lancet 2023)
- Made in India

## Contact
contact@evaa.enterprises
```

Drop in `public/llms.txt`. Will be served at `https://metakitchen.io/llms.txt` after the vercel.json rewrite fix.

### AI bot opt-in/out

**Recommend explicitly allowing** these bots in `robots.txt`:
- `GPTBot` (OpenAI training crawler)
- `OAI-SearchBot` (OpenAI's search-time crawler — for ChatGPT search and SearchGPT)
- `ChatGPT-User` (real-time ChatGPT browsing)
- `ClaudeBot` (Anthropic)
- `anthropic-ai` (legacy Anthropic bot name)
- `Google-Extended` (Google's separate Bard / Gemini training opt-in — Googlebot covers search)
- `PerplexityBot` (Perplexity)
- `cohere-ai` (Cohere)
- `Bytespider` (TikTok / ByteDance)
- `Applebot-Extended` (Apple Intelligence training)

For a brand that wants to be cited in AI answers, **explicitly allowing these is the right call**. The default (no robots.txt) is permissive but ambiguous — some bots fall back to "disallow if no signal". Explicit allowance + a sitemap directive maximises crawl.

Sample in Section 6.

---

## 4. Indian-market SEO specifics

### Hreflang

**Not needed yet.** The site is English-only and targets English-reading Indian households (which is the realistic demographic for an English-language D2C bread brand at this stage). Adding `hreflang="en-IN"` to indicate the regional variant is a free win:

```html
<link rel="alternate" hreflang="en-IN" href="https://metakitchen.io/" />
<link rel="alternate" hreflang="x-default" href="https://metakitchen.io/" />
```

When Hindi/Tamil/Bengali pages launch later (likely tied to Dr. Aara's language coverage), revisit hreflang with full per-route mappings.

### Local schema

The site doesn't have a public-facing physical address (D2C, Made in India), so don't claim a `LocalBusiness`. Instead:

- **Organization schema** with `address.addressCountry: IN` and `areaServed: IN` is correct.
- **Product schema** for the Daily White should include `countryOfOrigin: IN`.
- Add `inLanguage: "en-IN"` on Organization and on each page's WebPage if you add WebPage schemas.

### FSSAI / regulatory compliance touchpoints

For Google's product review and shopping policies:
- The site claims GI 38. Google will reward making the claim, the test methodology, and the standard explicit. ✅ Already done in copy.
- **Add to Product JSON-LD**: `additionalProperty` with the GI claim, the test type, and the regulatory threshold reference. This makes the claim machine-readable.
- FSSAI license number, when packaged loaves ship — add to product schema's `manufacturer` block.
- "Made in India" is on the page; add as `countryOfOrigin` in Product schema.
- Do NOT claim "medical food" or "diabetic food" — those are FSSAI-regulated categories with separate requirements. Current copy correctly says "useful for blood-sugar-aware eating; not a treatment". Maintain.

### Search intent gaps

Queries the brand should rank for (Indian search demand, no keyword stuffing):

| Query | Monthly volume (rough) | Currently covered? | Where to add |
|---|---|---|---|
| "low GI bread India" | Med-high | **No** — phrase doesn't appear anywhere | `/our-bread` H2 or subhead |
| "low glycemic index bread India" | Medium | **No** | `/science` |
| "diabetic friendly bread India" | High | **No** — only "bread for diabetics" appears | `/our-bread`, `/story` |
| "best bread for diabetics" | High | Partial — copy says "useful for blood-sugar-aware eating" | `/our-bread` FAQ section |
| "atta vs maida bread" | High | Partial — copy says "no maida" but doesn't compare | New blog/insight page candidate, or `/science` |
| "is multigrain bread good for diabetics" | Medium | **No** — copy actually disputes most multigrain (GI 55–70) but doesn't surface as Q&A | `/science` FAQ |
| "GI 38" / "GI 38 bread" | Brand-specific, rising | Yes — strong | `/our-bread`, `/science` |
| "AI nutritionist India" | Low but growing | Partial — Dr. Aara page | `/dr-aara` FAQ |
| "MetaKitchen bread" | Brand query, low now | Yes | Everywhere |

**How to add without slop:** the brand voice rules out "Best Low-GI Bread India 2026" type H2s. Instead, work the phrases naturally into the existing copy. Example for `/our-bread`:

> Current H2: "GI 38, lab-tested."
> Tighter for SEO without sacrificing voice: "GI 38, lab-tested. The lowest-GI bread we have measured in India."

Adds the phrase "lowest-GI bread India" organically. Same idea on `/science`.

Add an FAQ at the bottom of `/our-bread` answering:
- "Is this bread safe for people with diabetes?"
- "How does this compare to multigrain bread?"
- "Is there maida in MetaKitchen bread?"
Each answer in 1–2 brand-voiced sentences, content already exists in `data/content.js`. Wrap in `FAQPage` schema.

---

## 5. Concrete fixes — prioritized backlog

| # | WHAT | WHERE | WHY | EFFORT |
|---|---|---|---|---|
| 1 | Add prerendering to Vite build (vite-plugin-prerender or vite-react-ssg) | `vite.config.js`, `package.json` | Without this, AI crawlers see zero content. Single biggest GEO unlock. | **M** |
| 2 | Create `public/og-cover.png` (1200×630, brand image w/ "The Daily White — GI 38" overlay) | `public/og-cover.png` | Every social share is currently broken | **S** |
| 3 | Add `public/robots.txt` allowing major + AI bots + sitemap directive | `public/robots.txt` + verify Vercel doesn't rewrite it | Bots have no instructions, no sitemap; AI bots ambiguous | **S** |
| 4 | Add `public/sitemap.xml` listing all 7 routes | `public/sitemap.xml` | No crawl map currently exists | **S** |
| 5 | Add `Organization` JSON-LD site-wide in `index.html` | `index.html` head | Knowledge Graph signal, AI extraction | **S** |
| 6 | Add `Product` JSON-LD for the Daily White on `/our-bread` | `src/pages/OurBread/OurBread.jsx` `<Helmet>` | Product rich snippets, AI extracts product facts | **S** |
| 7 | Add `FAQPage` JSON-LD on `/science` + reframe the 5-item numbered list as 5 explicit Q&As (use the on-brand draft in §3) | `src/pages/Science/Science.jsx` lines 234–266 + `<Helmet>` | Highest-leverage AI Overview citation surface | **M** |
| 8 | Add `FAQPage` JSON-LD on `/dr-aara` with 4 Q&As (draft in §3) | `src/pages/DrAara/DrAara.jsx` + new Q&A section | Captures "what is Dr. Aara" and "AI nutrition India" intent | **M** |
| 9 | Add `FAQPage` JSON-LD on `/our-bread` with 3 Q&As (draft in §3) | `src/pages/OurBread/OurBread.jsx` + new Q&A section | Captures "what is in this bread" / "diabetic bread" intent | **M** |
| 10 | Add `BreadcrumbList` JSON-LD on each non-home page | each page `<Helmet>` | Improves SERP appearance; structural signal | **S** |
| 11 | Add per-route OG/Twitter overrides in `<Helmet>` (`ogTitle`, `ogDescription`, `ogImage`) — extend `SEO` object in `content.js` | `src/data/content.js` lines 178–212, then each page | Currently every sub-page inherits the homepage social card | **M** |
| 12 | Add `<link rel="canonical">` per route (in each `<Helmet>`) pointing to `https://metakitchen.io{route}` | each page `<Helmet>` | Prevents duplicate content between `.io` and `.vercel.app` | **S** |
| 13 | Add `<meta name="robots" content="noindex,follow">` to `/privacy` and `/terms` Helmets | Privacy.jsx, Terms.jsx | Legal pages shouldn't compete with content pages in SERPs | **S** |
| 14 | Strengthen `<title>` and `<meta description>` for `/our-bread` and `/dr-aara` (currently weakest) | `src/data/content.js` lines 184–193 | Both currently brand-only titles with no demand keywords | **S** |
| 15 | Add `public/llms.txt` (draft in §3) | `public/llms.txt` | Discoverability for AI agents that respect the convention | **S** |
| 16 | Add hreflang `en-IN` and `x-default` to `index.html` | `index.html` head | Free regional signal for India-targeted search | **S** |
| 17 | Add `og:locale`, `og:site_name`, `twitter:site` to `index.html` | `index.html` head | Completes the OG block | **S** |
| 18 | Code-split three.js / ShaderGradient with `React.lazy()` so they only load on `/` | `src/pages/Home/Home.jsx`, `src/App.jsx` | Currently 1.09 MB chunk loads on every route — LCP hit | **M** |
| 19 | Convert `public/img/bread-crosssection.png` to `.webp` and update reference in Home hero | `src/pages/Home/Home.jsx` line 190 | Hero video poster, currently unoptimized PNG | **S** |
| 20 | Add `<video aria-label="…">` to hero, Aara, Manisha videos for crawlers + a11y | Home.jsx, DrAara.jsx | Crawlers and screen readers get no signal from videos otherwise | **S** |
| 21 | Add `preload="metadata"` (not `none`, not `auto`) on hero videos; keep `autoplay loop muted playsinline` | Home.jsx, DrAara.jsx | Reduces unnecessary bytes shipped before scroll | **S** |
| 22 | Add inline `<noscript>` HTML body in `index.html` with brand summary + key facts | `index.html` body | Last-resort signal for non-JS crawlers if prerender slips | **S** |
| 23 | Add a single sentence under each page H1 that introduces the demand keyword honestly (e.g., on `/our-bread`: "A low-GI Indian bread, lab-tested at GI 38.") | each page H1 area | Captures keyword intent without breaking brand voice | **S** |
| 24 | Submit sitemap to Google Search Console and Bing Webmaster Tools | manual ops | Accelerates indexing — should be done day 1 after fix #4 ships | **S** |
| 25 | Add Vercel's `metakitchen.vercel.app` → `metakitchen.io` 301 redirect via Vercel project domain settings | Vercel dashboard | Removes the duplicate-content shadow domain | **S** |

---

## 6. Implementation snippets

### Fix #3 — `public/robots.txt`

```
# robots.txt for metakitchen.io
# Default: allow everything

User-agent: *
Allow: /
Disallow: /privacy
Disallow: /terms

# AI search & training crawlers — explicitly allowed
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: cohere-ai
Allow: /

User-agent: Bytespider
Allow: /

User-agent: CCBot
Allow: /

Sitemap: https://metakitchen.io/sitemap.xml
```

**Important:** `vercel.json` currently rewrites `/(.*)` to `/index.html`, which will swallow `/robots.txt`. Vercel serves static files in `public/` *before* applying rewrites, so this should work as-is — but **verify** after deploy with `curl https://metakitchen.io/robots.txt | head`. If it returns HTML, change the rewrite pattern in `vercel.json` to exclude these:

```json
{
  "rewrites": [
    { "source": "/((?!robots\\.txt|sitemap\\.xml|llms\\.txt|og-cover\\.png).*)", "destination": "/index.html" }
  ]
}
```

### Fix #4 — `public/sitemap.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://metakitchen.io/</loc>
    <lastmod>2026-05-17</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://metakitchen.io/our-bread</loc>
    <lastmod>2026-05-17</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://metakitchen.io/dr-aara</loc>
    <lastmod>2026-05-17</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://metakitchen.io/science</loc>
    <lastmod>2026-05-17</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://metakitchen.io/story</loc>
    <lastmod>2026-05-17</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://metakitchen.io/privacy</loc>
    <lastmod>2026-05-15</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.2</priority>
  </url>
  <url>
    <loc>https://metakitchen.io/terms</loc>
    <lastmod>2026-05-15</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.2</priority>
  </url>
</urlset>
```

### Fix #5 — `Organization` JSON-LD (paste into `index.html` head before closing `</head>`)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "MetaKitchen",
  "url": "https://metakitchen.io",
  "logo": "https://metakitchen.io/img/mk-logo-original.png",
  "description": "A chef-led low-glycemic-index Indian D2C bread brand. The flagship Daily White is lab-tested at GI 38.",
  "email": "contact@evaa.enterprises",
  "foundingDate": "2026",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "IN"
  },
  "areaServed": {
    "@type": "Country",
    "name": "India"
  },
  "sameAs": []
}
</script>
```

### Fix #6 — `Product` JSON-LD for the Daily White (paste inside `<Helmet>` in `OurBread.jsx`)

```jsx
<script type="application/ld+json">
{JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "The Daily White",
  "brand": {
    "@type": "Brand",
    "name": "MetaKitchen"
  },
  "category": "Bread / Low-GI Bread",
  "description": "A chef-led, stone-ground, slow-fermented multigrain loaf. Lab-tested at Glycemic Index 38 — below the FSSAI low-GI threshold of 55. No maida, no added sugar, no preservatives, no seed oils.",
  "image": "https://metakitchen.io/img/hero-loaf.webp",
  "countryOfOrigin": "IN",
  "additionalProperty": [
    {
      "@type": "PropertyValue",
      "name": "Glycemic Index (lab-tested)",
      "value": 38,
      "description": "Predictive GI protocol, accredited Indian lab, Goñi et al. regression"
    },
    {
      "@type": "PropertyValue",
      "name": "FSSAI low-GI threshold",
      "value": 55
    },
    {
      "@type": "PropertyValue",
      "name": "Fermentation time",
      "value": "48 hours"
    },
    {
      "@type": "PropertyValue",
      "name": "Added sugar",
      "value": "0g"
    }
  ],
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/PreOrder",
    "url": "https://metakitchen.io/our-bread#waitlist",
    "priceCurrency": "INR",
    "seller": {
      "@type": "Organization",
      "name": "MetaKitchen"
    }
  }
})}
</script>
```

### Fix #7 — `FAQPage` JSON-LD for `/science` (paste inside `<Helmet>` in `Science.jsx`)

```jsx
<script type="application/ld+json">
{JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the glycemic index of MetaKitchen bread?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Daily White, MetaKitchen's flagship loaf, is lab-tested at GI 38 — below the FSSAI low-GI threshold of 55. White bread sits at 70."
      }
    },
    {
      "@type": "Question",
      "name": "How was the glycemic index measured?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The standard predictive Glycemic Index protocol at an accredited Indian lab, using the Goñi et al. regression — the methodology used by the FAO and food research bodies worldwide."
      }
    },
    {
      "@type": "Question",
      "name": "How does this compare to regular bread?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "White bread sits around GI 70. Most 'healthy multigrain' loaves on Indian shelves land between 55 and 70. Watermelon is 76. An apple is 36. Lentils are around 30. The Daily White came back at 38."
      }
    },
    {
      "@type": "Question",
      "name": "Is this bread safe for diabetics?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It is bread that has been lab-tested for its glycemic index — useful for blood-sugar-aware eating, not a treatment. For diabetics on medication, your physician's guidance is what matters."
      }
    },
    {
      "@type": "Question",
      "name": "Where is MetaKitchen bread made?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Made in India, by chefs from the country's most senior kitchens. The line starts with the Daily White, with chia ciabatta, sourdough variants, and jalapeño cheese to follow."
      }
    }
  ]
})}
</script>
```

**Important:** For FAQPage schema to be valid + eligible for AI Overview citation, the same questions and answers **must be visible on the page**. So this snippet pairs with reformatting the existing 5-item numbered list in `Science.jsx` (lines 234–266) as actual `<h3>`Q-`<p>`A pairs. Suggested JSX:

```jsx
<section className="science-faq">
  <div className="container">
    <div className="science-faq__inner reveal">
      <h3>What the lab does, and what it means.</h3>
      <dl className="science-faq__list">
        <dt>What is the glycemic index of MetaKitchen bread?</dt>
        <dd>The Daily White, MetaKitchen's flagship loaf, is lab-tested at GI {PROOF.gi} — below the FSSAI low-GI threshold of 55. White bread sits at 70.</dd>
        <dt>How was the glycemic index measured?</dt>
        <dd>The standard predictive Glycemic Index protocol at an accredited Indian lab, using the Goñi et al. regression — the methodology used by the FAO and food research bodies worldwide.</dd>
        {/* ...etc */}
      </dl>
    </div>
  </div>
</section>
```

### Fix #11 + #12 — Per-route OG + canonical (extend `content.js` SEO + each page Helmet)

Extend the `SEO` export in `src/data/content.js`:

```js
export const SEO = {
  '/': {
    title: 'MetaKitchen — The bread you already eat. Behaves differently.',
    description: 'A chef-led loaf, lab-tested at GI 38. The Daily White is the flagship. The line follows.',
    canonical: 'https://metakitchen.io/',
    ogImage: 'https://metakitchen.io/og-cover.png',
    ogImageAlt: 'MetaKitchen — The Daily White, lab-tested at GI 38',
  },
  '/our-bread': {
    title: 'The Daily White — Low-GI Indian Bread, Lab-Tested at GI 38 | MetaKitchen',
    description: 'A staple upgrade, built like a chef would build it. Lab-tested at GI 38 — below the FSSAI low-GI threshold of 55. No maida, no added sugar, no preservatives.',
    canonical: 'https://metakitchen.io/our-bread',
    ogImage: 'https://metakitchen.io/og-cover-bread.png',
    ogImageAlt: 'The Daily White — MetaKitchen low-GI bread',
  },
  '/dr-aara': {
    title: 'Dr. Aara — Multilingual AI Nutrition Avatar | MetaKitchen',
    description: 'An AI avatar you can see and talk to in Hindi, English, Tamil, Bengali, Marathi, Telugu. Scan the QR on the loaf, start a conversation. Built on our own engine.',
    canonical: 'https://metakitchen.io/dr-aara',
    ogImage: 'https://metakitchen.io/og-cover-aara.png',
    ogImageAlt: 'Dr. Aara — MetaKitchen multilingual AI nutrition avatar',
  },
  '/science': {
    title: 'How We Tested the Daily White — Predictive GI Protocol | MetaKitchen',
    description: 'One loaf. One lab. One number. The Daily White, predictive GI protocol at an accredited Indian lab. The number came back at 38.',
    canonical: 'https://metakitchen.io/science',
    ogImage: 'https://metakitchen.io/og-cover.png',
    ogImageAlt: 'How we tested the Daily White at GI 38',
  },
  '/story': {
    title: 'The Story — A Chef-led Low-GI Bread for India | MetaKitchen',
    description: '237 million Indians have diabetes or pre-diabetes. Most eat bread every morning. The Daily White is a chef's thesis on what that bread should be.',
    canonical: 'https://metakitchen.io/story',
    ogImage: 'https://metakitchen.io/og-cover.png',
    ogImageAlt: 'MetaKitchen — a chef-led low-GI bread for India',
  },
  '/privacy': {
    title: 'Privacy — MetaKitchen',
    description: 'How we handle your data.',
    canonical: 'https://metakitchen.io/privacy',
    noindex: true,
  },
  '/terms': {
    title: 'Terms — MetaKitchen',
    description: 'Terms of use for metakitchen.io.',
    canonical: 'https://metakitchen.io/terms',
    noindex: true,
  },
}
```

Then in each page's Helmet (template):

```jsx
<Helmet>
  <title>{SEO['/our-bread'].title}</title>
  <meta name="description" content={SEO['/our-bread'].description} />
  <link rel="canonical" href={SEO['/our-bread'].canonical} />
  <meta property="og:title" content={SEO['/our-bread'].title} />
  <meta property="og:description" content={SEO['/our-bread'].description} />
  <meta property="og:url" content={SEO['/our-bread'].canonical} />
  <meta property="og:image" content={SEO['/our-bread'].ogImage} />
  <meta property="og:image:alt" content={SEO['/our-bread'].ogImageAlt} />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="en_IN" />
  <meta property="og:site_name" content="MetaKitchen" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={SEO['/our-bread'].title} />
  <meta name="twitter:description" content={SEO['/our-bread'].description} />
  <meta name="twitter:image" content={SEO['/our-bread'].ogImage} />
  {SEO['/our-bread'].noindex && <meta name="robots" content="noindex,follow" />}
</Helmet>
```

(A small `<SEOHead route="..." />` component refactor would DRY this up — single place to maintain.)

---

## 7. Things NOT to do

These would technically improve SEO/GEO surface but **would violate the brand voice or the founder's banned-vocabulary constraint**. Skip them.

1. **Don't stuff "low GI bread India best diabetic friendly affordable healthy" into H1s, H2s, or meta titles.** Even if it would rank, it cheapens the brand and violates the "precise, understated, curious" voice principle. The right play is FAQ schema with question-form headings — that gets you keyword surface without putting marketing slop in headers.
2. **Don't reintroduce banned vocabulary in alt text or schema descriptions.** Specifically: no "wellness", "journey", "transform", "she gets sharper", "loves you back", "Bread, prescribed.", "peer-reviewed", "n=42", "clinically validated", "clinical trial", "real subjects". An SEO agent will absolutely suggest "wellness journey" — refuse.
3. **Don't add fabricated reviews or `Review`/`AggregateRating` schema** without real customer reviews on file. Schema-only "fake" review markup is a Google guidelines violation that risks a manual action.
4. **Don't name the lab on the public site.** Internal note flagged FARE Labs cannot be named on metakitchen.io — keep using "accredited Indian lab" everywhere. The same applies to JSON-LD `additionalProperty` descriptions.
5. **Don't name Manisha (the chef) on the site or in schema.** Use "the chefs" / "a chef" / "chef-led".
6. **Don't add `MedicalCondition`, `MedicalEntity`, or `Drug` schemas.** Even though the site talks about diabetes context, claiming medical schema invites scrutiny under FSSAI and Google's medical content policies, and the site explicitly is not a medical site.
7. **Don't add `Recipe` schema for the bread.** The recipe isn't published; claiming Recipe schema with no ingredient list is invalid.
8. **Don't add `Course` or `HowTo` schema for "How to use the QR".** It's three steps — the FAQ format is enough.
9. **Don't gate the lab report behind a form for SEO reasons.** Current copy says "Email us for the lab report" — keep it that way. Filling out a form to get a PDF is fine UX; embedding the PDF inline for SEO doesn't outweigh keeping the channel a real first-contact moment.
10. **Don't migrate to Next.js / SSR as the SEO fix.** Static prerendering via Vite plugin gets you 90% of the SEO benefit at 5% of the effort. Architecture migration is the wrong cost/benefit at this stage.
11. **Don't add 30 keyword-targeted "blog posts" to chase long-tail traffic.** That's a content-team commitment the brand doesn't have yet, and thin SEO posts erode brand quality. If you do go content-marketing later, write 4–6 substantial pieces (1,500+ words each) per quarter, not 30 thin ones.
12. **Don't use Google Tag Manager or third-party analytics tags.** The Privacy page explicitly says "We do not run third-party analytics or advertising trackers." Adding them for SEO would break that promise. Vercel Analytics + Speed Insights are already in use; keep it that way.
13. **Don't add an interstitial cookie banner unless required.** Vercel Analytics is cookie-less. Privacy page says no advertising trackers. No banner needed today — it would only hurt CWV.
