import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { projects } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/about",
    "/experience",
    "/projects",
    "/contact",
    ...projects.map((project) => `/projects/${project.slug}`),
  ];

  return paths.map((path) => ({ url: `${siteUrl}${path}` }));
}
