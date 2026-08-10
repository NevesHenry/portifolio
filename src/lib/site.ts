// The canonical origin — feeds `metadataBase` (canonical + OG URLs),
// `sitemap.xml` and `robots.txt`.
//
// Resolution order:
//   1. NEXT_PUBLIC_SITE_URL — set this once a custom domain is in play.
//   2. VERCEL_PROJECT_PRODUCTION_URL — Vercel injects the project's production
//      domain here, so renaming the project (or attaching a domain) is picked
//      up on the next deploy with no code change.
//   3. localhost, for `next dev` / `next build` outside Vercel.
//
// Never hardcode a *.vercel.app host here: that namespace is global, and the
// name you assume is free may already belong to someone else's project.
const configured =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined);

export const siteUrl = (configured ?? "http://localhost:3000").replace(
  /\/+$/,
  ""
);

export const siteName = "henrique.dev";

export const githubUser = "NevesHenry";
