import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://axionjs.com/sitemap.xml",
    host: "https://axionjs.com",
  };
}
