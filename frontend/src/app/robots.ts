import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/auth/", "/api/"],
    },
    sitemap: "https://tattoo-client.vercel.app/sitemap.xml",
  };
}
