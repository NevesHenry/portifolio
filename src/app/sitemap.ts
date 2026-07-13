import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/about", "/experience", "/projects", "/contact"].map(
    (path) => ({
      url: `${siteUrl}${path}`,
    })
  );
}
