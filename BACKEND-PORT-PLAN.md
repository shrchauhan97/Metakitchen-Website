# MetaKitchen Content Backend — Port Plan

Author: Architect (planning only — no code changes)
Date: 2026-05-17
Status: Draft for founder review

---

## TL;DR recommendation

**Pick Option B: standalone Next.js admin app at `admin.metakitchen.io`, marketing SPA stays Vite.** It is the only option that gives Manisha a hosted UI today without re-shipping the marketing site, without touching any of the GSAP / shadergradient / @react-three / framer-motion render code that already works on metakitchen.io, and without forcing a multi-day Vite→Next migration risk that has zero user-visible payoff. The EVAA backend (`lib/auth.js`, `lib/mongo.js`, `lib/research-store.js`, `app/api/admin/research/*`, `app/admin/*`) ports almost as-is — basic auth, single MongoDB collection with a `kind` discriminator, CRUD routes, basic-auth-gated React panel. The v3 SPA gains one new route (`/journal`) that does `fetch('https://admin.metakitchen.io/api/posts')` on mount. **Realistic time to live: 6–9 hours of focused work**, mostly schema rename + content-type tweak + Vercel project setup + CORS + the ADMIN_GUIDE regen for Manisha. Ship Option B now. Option A (Next migration) is the right *eventual* answer but not the right *now* answer.

---

## What exists today (inventory)

### EVAA backend (source of the port)
- **Framework:** Next.js 14+ App Router, `runtime = "nodejs"`, `dynamic = "force-dynamic"` on API routes.
- **Auth:** `lib/auth.js` — `x-admin-auth` header is base64(`user:password`), validated against `ADMIN_USER` / `ADMIN_PASSWORD` env via `timingSafeEqual`. No sessions, no cookies. Re-prompt per write.
- **DB:** `lib/mongo.js` — cached `MongoClient` on `globalThis`, `MONGODB_URI` + `MONGODB_DB` (default `evaa`). Friendly error messages for Atlas IP/TLS/DNS failures.
- **Store:** `lib/research-store.js` — single `research` collection, `kind: "feed" | "brief"` discriminator, seed-on-first-read with default content, indexes on `{slug: 1}` (unique sparse) and `{kind: 1, publishedAt: -1}`. CRUD: `listAll`, `listFeedItems`, `listBriefs`, `getBriefBySlug`, `createItem`, `updateItem`, `deleteItem`. Briefs hold long-form `mdxBody`, slug, SEO fields, hero stat, tags, PDF link. Feed items hold external URL + summary + source class (`x|linkedin|substack`).
- **API:**
  - `GET /api/admin/research` — public list (no auth — used by public site too).
  - `POST /api/admin/research` — create (auth required), calls `revalidatePath("/")`, `/research`, `/research/[slug]`.
  - `PUT /api/admin/research/[id]` — update (auth), same revalidation.
  - `DELETE /api/admin/research/[id]` — delete (auth).
  - Plus `/api/admin/jobs/*`, `/api/admin/applications/[id]`, `/api/jobs/[id]/apply` — out of scope for MetaKitchen v1.
- **Admin UI:** `app/admin/page.js` → `AdminShell.jsx` (Research / Jobs section toggle) → `AdminPanel.jsx` (tabs: brief vs feed, full form, list with edit/delete, basic-auth modal prompt per write).
- **Docs:** `ADMIN_GUIDE.pdf` ships in `site/public/`.

### MetaKitchen v3 (target)
- **Framework:** Vite 8 + React 19, `react-router-dom` 7, `react-helmet-async`, framer-motion, GSAP, @react-three/fiber + drei, @paper-design/shaders-react, @shadergradient/react, liquid-glass-react.
- **Routes:** `/`, `/our-bread`, `/dr-aara`, `/science`, `/story`, `/privacy`, `/terms`.
- **Deploy:** Vercel SPA. `vercel.json` rewrites `/(.*)` → `/index.html`, strong CSP-adjacent headers (HSTS, X-Frame-Options DENY, Referrer-Policy, Permissions-Policy), immutable cache on `/assets/*`, `/img/*`, media extensions. **No server runtime.** No API routes.
- **Content:** `src/data/content.js` is a JS module imported at build time — fully static.
- **Status:** live in production. Marketing pages are working. Founder explicitly does not want a re-ship just to get Manisha posting.

### Content type for MetaKitchen (rename map)
EVAA's `brief` → MetaKitchen `post` (chef notes, recipe stories, brand updates, science explainers). `feed` items are optional but useful (mirror chef Manisha's Instagram / a Substack if one exists). Reuse the SEO/hero/tags shape almost as-is. Rename `mdxBody` → `body` (still Markdown). Drop `pdfPath` unless needed. Add an optional `coverImage` URL field. Categories: `Chef Note | Recipe Story | Brand Update | Science Explainer`.

---

## Option A — Migrate v3 to Next.js (App Router)

**What:** Convert the Vite SPA to Next.js so the admin + API can live in the same project as the marketing site, exactly like EVAA.

**Work:**
1. New `next` project, copy `src/pages/*` → `app/(marketing)/*/page.jsx`, each page becomes a client component (`"use client"` at top because of framer-motion, GSAP, three, shadergradient, all of which need browser APIs).
2. Replace `react-router-dom` 7 routing with Next's file-system routing. Lose `<AnimatePresence mode="wait">` page transitions wrapping all routes — Next's `template.jsx` can replicate but not identically; the per-route framer-motion enter animations will need rewiring.
3. Replace `react-helmet-async` with Next's `export const metadata` per page.
4. Move `public/icons.svg`, `mockups/`, `dist/icons.svg` → Next `public/`.
5. Rewrite `main.jsx` + `App.jsx` (HelmetProvider, BrowserRouter, ScrollToTop, Nav, Footer, Analytics, SpeedInsights) into `app/layout.jsx` + a client wrapper for the route-change scroll behaviour.
6. Vite-specific config (none custom here, plain `@vitejs/plugin-react`) is a non-issue.
7. Port the EVAA `lib/*` and `app/admin/*` and `app/api/admin/research/*` files directly. Adapt to "post" terminology.
8. Re-ship to Vercel as a Next.js project (delete the existing Vite project or in-place change framework preset — both have risk of a bad deploy if any client component fails on first hydration).
9. Set Vercel env: `MONGODB_URI`, `MONGODB_DB`, `ADMIN_USER`, `ADMIN_PASSWORD`.

**What survives:** GSAP, three, framer-motion, shadergradient, paper-design/shaders all run client-side in `"use client"` components. No fundamental incompatibility. SSR for these would be wrong anyway — they must be client-rendered.

**What gets lost / risky:**
- `<AnimatePresence>` route-change choreography in `App.jsx` requires a Next equivalent that is not 1:1.
- `react-helmet-async` calls inside every page need conversion to `metadata` exports or moved into a client `<Head>` shim (fragile).
- Vercel `vercel.json` rewrites and the immutable-asset headers all need re-expression for Next (Next has its own `headers()` config in `next.config.js`).
- React 19 + Next 15+ has known edge-case warnings around third-party WebGL libs in StrictMode — likely fine but needs a smoke test on every page.
- High risk of breaking a live marketing site as collateral damage. The founder explicitly asked us not to re-ship marketing just to enable admin.

**Estimate:** **16–24 hours** including a full smoke test of every page on every breakpoint. Plus a rollback window.

**Risk:** High. The blast radius of a bad Next migration is the entire site.

---

## Option B — Standalone Next.js admin app on `admin.metakitchen.io`

**What:** Net-new Next.js project containing only `lib/`, `app/admin/`, `app/api/admin/posts/*`, `app/api/posts/route.js` (public read with CORS). Deploy as a second Vercel project under a subdomain. v3 SPA stays untouched except for one new route that fetches posts.

**New project structure:**
```
metakitchen-admin/
  app/
    admin/
      page.js          // basic-auth-gated admin shell
      AdminPanel.jsx   // ported from EVAA, rename brief→post, drop jobs
      admin.css
    api/
      admin/
        posts/
          route.js           // GET (list), POST (create, authed)
          [id]/route.js      // PUT, DELETE (authed)
      posts/
        route.js             // GET (public, CORS-enabled)
        [slug]/route.js      // GET single post (public, CORS-enabled)
    layout.jsx
  lib/
    auth.js              // copy verbatim from EVAA
    mongo.js             // copy verbatim, change MONGODB_DB default to "metakitchen"
    posts-store.js       // renamed research-store.js, schema below
  public/
    ADMIN_GUIDE.pdf      // regenerate for Manisha
  next.config.js
  package.json
```

**Schema (posts collection):**
```
{
  kind: "post",                  // future-proof discriminator
  slug: "chef-manisha-on-roti",  // unique, URL-safe
  title: "...",
  summary: "...",                // card subtitle
  category: "Chef Note",         // enum, drives badge color
  author: "Chef Manisha",
  dateLabel: "12 May 2026",      // human-readable display
  publishedAt: ISODate,          // for sort
  coverImage: "https://..."|"",  // optional hero image URL
  tags: [...],
  body: "...markdown...",
  metaTitle: "...",              // SEO
  metaDescription: "...",
  status: "published"|"draft",   // simple gate; public API filters by published
  createdAt, updatedAt
}
```

**CORS:** Public read endpoints (`/api/posts`, `/api/posts/[slug]`) return:
```
Access-Control-Allow-Origin: https://metakitchen.io
Access-Control-Allow-Methods: GET, OPTIONS
Access-Control-Allow-Headers: Content-Type
```
Plus `OPTIONS` handler returning 204. Admin writes are same-origin (admin UI lives on the admin subdomain), so no CORS needed for them.

**v3 SPA changes (one-time, small):**
1. Add `src/pages/Journal/Journal.jsx` — list view, fetches `https://admin.metakitchen.io/api/posts`.
2. Add `src/pages/Journal/PostDetail.jsx` — single view, fetches `/api/posts/[slug]`, renders markdown via a lightweight lib (e.g. `marked` or `react-markdown`).
3. Add `<Route path="/journal" element={<Journal />} />` and `<Route path="/journal/:slug" element={<PostDetail />} />` in `App.jsx`.
4. Add nav link to `/journal` in `Nav.jsx`.
5. Env var `VITE_ADMIN_API_BASE=https://admin.metakitchen.io` so dev can point at localhost.

**Deploy steps:**
1. Create MongoDB Atlas free-tier cluster (or reuse EVAA's cluster with a `metakitchen` DB — both work, separate cluster is cleaner).
2. Create new Vercel project from new repo `metakitchen-admin`.
3. Set env vars: `MONGODB_URI`, `MONGODB_DB=metakitchen`, `ADMIN_USER`, `ADMIN_PASSWORD`.
4. Add custom domain `admin.metakitchen.io` in Vercel → DNS CNAME at the registrar.
5. Deploy v3 SPA changes as a normal incremental ship of the existing project.
6. Add `https://admin.metakitchen.io` to a `connect-src` CSP if/when one is added — current `vercel.json` has no CSP so this is fine for now.
7. Regenerate `ADMIN_GUIDE.pdf` with Manisha's screenshots ("Go to admin.metakitchen.io, log in, click Post…").

**Estimate:** **6–9 hours**. Most time is the renaming + the CORS handlers + Vercel domain setup + the markdown renderer choice + the guide PDF.

**Risk:** Low. Marketing site is touched only to add the `/journal` route — and that route gracefully degrades if the API is down (empty list, no broken render).

---

## Option C — Static markdown in repo, no admin UI

**What:** Manisha writes posts as markdown files. Someone (you or Awadh) commits them. Vite picks them up at build time via `import.meta.glob('./content/posts/*.md', { as: 'raw', eager: true })` and renders them.

**Work:**
1. Add `src/content/posts/*.md` directory.
2. Add `src/pages/Journal/Journal.jsx` + `PostDetail.jsx` reading the glob at build time.
3. Pick frontmatter parser (`gray-matter`) and markdown renderer (`marked`).
4. Document the markdown frontmatter schema for whoever commits on Manisha's behalf.

**Estimate:** **3–4 hours**.

**Risk:** Manisha cannot self-serve. Every post requires a developer's involvement and a redeploy. Fails the founder's core requirement ("Chef Manisha (non-technical) to be able to log in and publish posts").

---

## Option D — Hybrid: Option C now, Option B later

**What:** Ship the rendering path (Vite + markdown) today so the `/journal` URL exists and the design is locked in. Add the admin app in a follow-up sprint. Manisha still can't self-serve in phase 1.

**Estimate:** **3–4 hours now + 5–7 hours later = 8–11 hours total**. Worse than Option B in total hours, and *does not* solve Manisha's blocker any sooner because phase 1 still requires a dev to publish.

**Risk:** Sunk cost — the build-time markdown render pipeline gets thrown away when the admin lands (different data shape, different routing assumptions). Pointless intermediate step.

---

## Decision matrix

| Option | Hours to live | Manisha self-serve? | Long-term correct? | Deploy complexity | Risk of breaking marketing site |
|--------|---------------|---------------------|--------------------|-----|---------------------------------|
| A — Migrate v3 to Next | 16–24 | Yes | Yes (unified codebase) | High (replaces deployed site) | **High** |
| B — Standalone admin subdomain | **6–9** | **Yes** | Yes (decoupled, normal) | Medium (new Vercel project + DNS) | **Very low** |
| C — Static markdown | 3–4 | **No** | No | Trivial | Very low |
| D — Hybrid C-then-B | 8–11 total | No (in phase 1) | No (throwaway phase 1) | Medium | Very low |

---

## Recommended-option plan — Option B in detail

### Files to create in `metakitchen-admin/`
- `package.json` — Next.js 14+, `mongodb`, `react`, `react-dom`. No other deps for v1.
- `next.config.js` — standard, no special config needed.
- `app/layout.jsx` — minimal, no analytics, no fonts beyond system.
- `app/admin/page.js` — `export const dynamic = "force-dynamic"`, renders `<AdminPanel />`.
- `app/admin/AdminPanel.jsx` — port of EVAA's `AdminPanel.jsx` with `BRIEF` fields renamed/trimmed to the post schema above. Drop the feed/brief tab toggle (single "post" type for v1). Drop the jobs panel entirely.
- `app/admin/admin.css` — copy from EVAA.
- `app/api/admin/posts/route.js` — `GET` (list incl drafts, authed for admin convenience) + `POST` (create, authed).
- `app/api/admin/posts/[id]/route.js` — `PUT`, `DELETE`, both authed.
- `app/api/posts/route.js` — public `GET` filtered to `status: "published"`, sorted by `publishedAt desc`. Returns CORS headers. `OPTIONS` returns 204.
- `app/api/posts/[slug]/route.js` — public `GET` single post by slug. Same CORS.
- `lib/auth.js` — verbatim copy.
- `lib/mongo.js` — verbatim copy, change `MONGODB_DB` default to `"metakitchen"`.
- `lib/posts-store.js` — adapted from `research-store.js`. Drop the dual-kind discriminator (or keep for future). Drop EVAA seed content. Optionally seed one welcome post so the empty state is friendly.
- `public/ADMIN_GUIDE.pdf` — regenerated with MetaKitchen screenshots and Manisha-targeted wording.

### Env vars (Vercel project settings)
- `MONGODB_URI` — Atlas connection string (use a `metakitchen-admin` DB user with `readWrite` only on the `metakitchen` DB).
- `MONGODB_DB=metakitchen`
- `ADMIN_USER` — e.g. `manisha`
- `ADMIN_PASSWORD` — strong random, share with Manisha via 1Password / signal / in-person.

MongoDB Atlas: a single new database `metakitchen` with one collection `posts` is enough. Use the free shared tier; this is well within the 512MB limit. Network Access list must include `0.0.0.0/0` (or Vercel's egress range) — Atlas IP issues are the most common deploy failure mode (see `lib/mongo.js` error mapping).

### Vercel project setup
1. New project from the `metakitchen-admin` repo.
2. Framework preset: Next.js (autodetect).
3. Env vars as above.
4. Domains → add `admin.metakitchen.io`. Vercel will show the required CNAME (`cname.vercel-dns.com`).
5. At the registrar, add CNAME `admin → cname.vercel-dns.com`. TTL 300.
6. Wait for cert provisioning (~1–5 min).
7. Verify by visiting `https://admin.metakitchen.io/admin` — should show the admin shell and prompt for credentials on first write.

### API contract the v3 SPA consumes

```
GET https://admin.metakitchen.io/api/posts
  → { posts: [{ id, slug, title, summary, category, author,
                dateLabel, publishedAt, coverImage, tags }] }
  CORS: Access-Control-Allow-Origin: https://metakitchen.io

GET https://admin.metakitchen.io/api/posts/[slug]
  → { post: { id, slug, title, summary, category, author,
              dateLabel, publishedAt, coverImage, tags,
              body, metaTitle, metaDescription } }
  404 if not found or status !== "published"
```

### v3 SPA add (skeleton, NOT to be implemented yet)

In `src/App.jsx`:
- Import `Journal` and `PostDetail` lazy components.
- Add `<Route path="/journal" element={<Journal />} />` and `<Route path="/journal/:slug" element={<PostDetail />} />` inside `<AnimatedRoutes>`.

In `src/pages/Journal/Journal.jsx` (contract, not code):
- On mount, `fetch(import.meta.env.VITE_ADMIN_API_BASE + '/api/posts')`.
- Render `<PostsList posts={posts} />` — card grid styled to match MetaKitchen's existing aesthetic (use `BRAND` tokens from `src/data/content.js`, framer-motion entry animation matching the other pages).
- Empty state: "Chef's notes coming soon" with a CSS-only placeholder so SSR-less first paint is not jarring.
- Error state: silent, log to console; never break the page.

In `src/pages/Journal/PostDetail.jsx`:
- `useParams()` for slug, fetch single post, render markdown with `react-markdown` or `marked`. Use `<Helmet>` for `metaTitle` / `metaDescription`.

In `src/components/Nav/Nav.jsx`:
- Add a `Journal` link to the existing nav array.

Env var added to v3 (`.env`):
- `VITE_ADMIN_API_BASE=https://admin.metakitchen.io` (production)
- `VITE_ADMIN_API_BASE=http://localhost:3000` (dev with admin running locally)

### Admin guide for Manisha
Regenerate `ADMIN_GUIDE.pdf` with: (1) URL + login screenshot, (2) "Post" tab walkthrough, (3) markdown cheat sheet (headings, bold, lists, links), (4) "after you click Post the new entry appears on metakitchen.io/journal within seconds — no rebuild needed", (5) escalation contact if anything looks broken.

---

## Open questions for the founder

1. Confirm content types for v1 — is a single "post" type enough, or do we want `Chef Note | Recipe Story | Brand Update | Science Explainer` as the only structured distinction (handled via the `category` field, no schema fork)?
2. Should the URL be `/journal` or `/posts`? Recommend `/journal` — warmer, fits MetaKitchen voice better.
3. Image hosting — Atlas blobs are not the right home. Recommend either (a) Manisha uploads to Cloudinary / Vercel Blob and pastes URL into `coverImage`, or (b) phase 2 adds an upload button in the admin. Phase 1: paste-URL only.
4. Do we want a `draft` toggle in v1, or only published-on-create? Recommend `draft|published` toggle from day one — Manisha will appreciate it the first time she wants to save work in progress.
5. Reuse EVAA's MongoDB Atlas cluster (cheaper, one cluster to maintain) or stand up a separate MetaKitchen cluster (cleaner separation, easier to hand off later)? Recommend separate — MetaKitchen is a JV, not EVAA.
