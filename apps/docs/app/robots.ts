import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://www.axionjs.com/sitemap.xml",
    host: "https://www.axionjs.com",
  };
}
