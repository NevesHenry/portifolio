// The canonical origin — feeds `metadataBase` (canonical + OG URLs),
// `sitemap.xml` and `robots.txt`.
//
// A *.vercel.app host may be named here ONLY because this one is verified to
// belong to this project. That namespace is global, and getting it wrong is not
// hypothetical: this file previously hardcoded henrique-dev.vercel.app, which is
// a live portfolio belonging to a different person, so every canonical link and
// sitemap entry pointed at their domain. Verify ownership before changing it.
//
// Not derived from VERCEL_PROJECT_PRODUCTION_URL: the project has more than one
// production alias and that variable resolves to the older generated one
// (portifolio-seven-eta-91), which would put the wrong host in the sitemap.
const canonicalDomain = "https://henrique-neves.vercel.app";

// Set NEXT_PUBLIC_SITE_URL in Vercel when a custom domain lands — it overrides
// the constant above, so that migration needs no code change.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? canonicalDomain
).replace(/\/+$/, "");

export const siteName = "henrique.dev";

export const githubUser = "NevesHenry";
