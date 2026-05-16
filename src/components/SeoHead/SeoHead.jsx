import { Helmet } from 'react-helmet-async'
import { SEO } from '../../data/content.js'

/**
 * Shared SEO head — renders title, description, canonical, OG/Twitter, robots.
 * Accepts children for per-page JSON-LD blocks (Product, FAQPage, BreadcrumbList, etc.).
 *
 * Usage:
 *   <SeoHead route="/our-bread">
 *     <script type="application/ld+json">{JSON.stringify(productLd)}</script>
 *   </SeoHead>
 */
export default function SeoHead({ route, children }) {
  const meta = SEO[route] || SEO['/']
  const {
    title,
    description,
    canonical,
    ogImage,
    ogImageAlt,
    noindex,
  } = meta

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}
      {noindex && <meta name="robots" content="noindex,follow" />}

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:site_name" content="MetaKitchen" />
      {ogImage && <meta property="og:image" content={ogImage} />}
      {ogImageAlt && <meta property="og:image:alt" content={ogImageAlt} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@metakitchen" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      {children}
    </Helmet>
  )
}
