import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://axionjs.com";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/docs`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/blocks`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/theme`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/charts`,
      lastModified: new Date(),
    },
  ];
}
