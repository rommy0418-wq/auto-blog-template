import type { MetadataRoute } from "next";
import pool from "@/lib/db";

// Posts are published directly to the database, independently of deployments.
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://aitrans-lab.com").replace(/\/+$/, "");

  const { rows } = await pool.query(
    "SELECT slug, updated_at FROM posts WHERE status = 'published' ORDER BY published_at DESC"
  );

  const postEntries: MetadataRoute.Sitemap = rows.map((post) => ({
    url: `${siteUrl}/posts/${post.slug}`,
    lastModified: new Date(post.updated_at),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/about`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteUrl}/contact`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteUrl}/privacy`,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/terms`,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/contents`,
      changeFrequency: "weekly",
      priority: 0.6,
    },
  ];

  return [...staticPages, ...postEntries];
}
