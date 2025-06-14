import { MetadataRoute } from "next";

export const dynamic = "force-static"; // Ensures it's statically generated

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://quietpages.ashutosh007.xyz/",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: "https://quietpages.ashutosh007.xyz/blogs",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: "https://quietpages.ashutosh007.xyz/my-blogs",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },

  ];
}