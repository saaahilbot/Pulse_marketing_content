import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Blog, AnalyticsData, CategoryStats, BlogStatus, BlogPriority, FunnelStage } from "./types";

const BLOGS_DIR = path.join(process.cwd(), "content/blogs");

export function getAllBlogs(): Blog[] {
  if (!fs.existsSync(BLOGS_DIR)) return [];

  const files = fs.readdirSync(BLOGS_DIR).filter((f) => f.endsWith(".md"));

  const blogs: Blog[] = files.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const filePath = path.join(BLOGS_DIR, filename);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    return {
      slug: data.slug || slug,
      title: data.title || slug,
      category: data.category || "Uncategorised",
      tags: data.tags || [],
      status: data.status || "draft",
      priority: data.priority || "medium",
      content_type: data.content_type || "educational",
      funnel_stage: data.funnel_stage || "awareness",
      source_url: data.source_url || "",
      meta_title: data.meta_title || data.title || "",
      meta_description: data.meta_description || "",
      primary_keyword: data.primary_keyword || "",
      secondary_keywords: data.secondary_keywords || [],
      seo_score: data.seo_score || 0,
      featured: data.featured || false,
      author: data.author || "Vantage Circle",
      publish_date: data.publish_date || "",
      last_updated: data.last_updated || "",
      word_count_estimate: data.word_count_estimate || 0,
      has_product_mention: data.has_product_mention || false,
      has_cta: data.has_cta || false,
      internal_links: data.internal_links || [],
      notes: data.notes || "",
      content,
      canonical_url: data.canonical_url || undefined,
      has_schema: data.has_schema ?? undefined,
      schema_types: data.schema_types || undefined,
    } as Blog;
  });

  // Sort by priority then by seo_score desc
  return blogs.sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return b.seo_score - a.seo_score;
  });
}

export function getBlogBySlug(slug: string): Blog | null {
  const filePath = path.join(BLOGS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug: data.slug || slug,
    title: data.title || slug,
    category: data.category || "Uncategorised",
    tags: data.tags || [],
    status: data.status || "draft",
    priority: data.priority || "medium",
    content_type: data.content_type || "educational",
    funnel_stage: data.funnel_stage || "awareness",
    source_url: data.source_url || "",
    meta_title: data.meta_title || data.title || "",
    meta_description: data.meta_description || "",
    primary_keyword: data.primary_keyword || "",
    secondary_keywords: data.secondary_keywords || [],
    seo_score: data.seo_score || 0,
    featured: data.featured || false,
    author: data.author || "Vantage Circle",
    publish_date: data.publish_date || "",
    last_updated: data.last_updated || "",
    word_count_estimate: data.word_count_estimate || 0,
    has_product_mention: data.has_product_mention || false,
    has_cta: data.has_cta || false,
    internal_links: data.internal_links || [],
    notes: data.notes || "",
    content,
  } as Blog;
}

export function getCategories(): string[] {
  const blogs = getAllBlogs();
  const cats = new Set(blogs.map((b) => b.category));
  return Array.from(cats).sort();
}

export function getBlogsByCategory(category: string): Blog[] {
  return getAllBlogs().filter((b) => b.category === category);
}

export function getAnalytics(): AnalyticsData {
  const blogs = getAllBlogs();

  const byStatus = blogs.reduce(
    (acc, b) => {
      acc[b.status] = (acc[b.status] || 0) + 1;
      return acc;
    },
    {} as Record<BlogStatus, number>
  );

  const byPriority = blogs.reduce(
    (acc, b) => {
      acc[b.priority] = (acc[b.priority] || 0) + 1;
      return acc;
    },
    {} as Record<BlogPriority, number>
  );

  const byFunnelStage = blogs.reduce(
    (acc, b) => {
      acc[b.funnel_stage] = (acc[b.funnel_stage] || 0) + 1;
      return acc;
    },
    {} as Record<FunnelStage, number>
  );

  // Category stats
  const categoryMap = new Map<string, Blog[]>();
  blogs.forEach((b) => {
    const list = categoryMap.get(b.category) || [];
    list.push(b);
    categoryMap.set(b.category, list);
  });

  const byCategory: CategoryStats[] = Array.from(categoryMap.entries()).map(
    ([name, catBlogs]) => ({
      name,
      count: catBlogs.length,
      published: catBlogs.filter((b) => b.status === "published").length,
      needsUpdate: catBlogs.filter((b) => b.status === "needs-update").length,
      draft: catBlogs.filter((b) => b.status === "draft").length,
      avgSeoScore: Math.round(
        catBlogs.reduce((s, b) => s + b.seo_score, 0) / catBlogs.length
      ),
      highPriority: catBlogs.filter((b) => b.priority === "high").length,
    })
  );

  // Top keywords (from primary_keyword)
  const keywordMap = new Map<string, number>();
  blogs.forEach((b) => {
    if (b.primary_keyword) {
      const words = b.primary_keyword.toLowerCase().split(" ");
      words.forEach((w) => {
        if (w.length > 4) {
          keywordMap.set(w, (keywordMap.get(w) || 0) + 1);
        }
      });
    }
  });
  const topKeywords = Array.from(keywordMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .map(([keyword, count]) => ({ keyword, count }));

  return {
    totalBlogs: blogs.length,
    byStatus,
    byCategory,
    byPriority,
    byFunnelStage,
    avgSeoScore: Math.round(blogs.reduce((s, b) => s + b.seo_score, 0) / blogs.length),
    withProductMention: blogs.filter((b) => b.has_product_mention).length,
    withCta: blogs.filter((b) => b.has_cta).length,
    featured: blogs.filter((b) => b.featured).length,
    totalWordCount: blogs.reduce((s, b) => s + b.word_count_estimate, 0),
    topKeywords,
  };
}

export function getRelatedBlogs(blog: Blog, limit = 4): Blog[] {
  const all = getAllBlogs();
  return all
    .filter((b) => b.slug !== blog.slug)
    .filter(
      (b) =>
        b.category === blog.category ||
        blog.internal_links.includes(b.slug)
    )
    .slice(0, limit);
}

export function getSeoHealthColor(score: number): string {
  if (score >= 75) return "text-green-600";
  if (score >= 65) return "text-yellow-600";
  return "text-red-600";
}

export function getSeoHealthLabel(score: number): string {
  if (score >= 75) return "Strong";
  if (score >= 65) return "Moderate";
  return "Needs Work";
}
