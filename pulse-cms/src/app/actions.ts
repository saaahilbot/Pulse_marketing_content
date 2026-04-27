"use server";

import fs from "fs";
import path from "path";
import { redirect } from "next/navigation";
import * as cheerio from "cheerio";

const BLOGS_DIR = path.join(process.cwd(), "content/blogs");

export async function createBlog(formData: FormData) {
  const title          = (formData.get("title") as string)?.trim();
  const slug           = (formData.get("slug") as string)?.trim();
  const category       = formData.get("category") as string;
  const status         = formData.get("status") as string;
  const priority       = formData.get("priority") as string;
  const source_url     = (formData.get("source_url") as string)?.trim();
  const meta_title     = (formData.get("meta_title") as string)?.trim();
  const meta_desc      = (formData.get("meta_description") as string)?.trim();
  const primary_kw     = (formData.get("primary_keyword") as string)?.trim();
  const secondary_kws  = (formData.get("secondary_keywords") as string)?.trim();
  const tags_raw       = (formData.get("tags") as string)?.trim();
  const seo_score      = parseInt(formData.get("seo_score") as string) || 0;
  const content_type   = formData.get("content_type") as string;
  const funnel_stage   = formData.get("funnel_stage") as string;
  const word_count     = parseInt(formData.get("word_count_estimate") as string) || 0;
  const has_product    = formData.get("has_product_mention") === "on";
  const has_cta        = formData.get("has_cta") === "on";
  const featured       = formData.get("featured") === "on";
  const notes          = (formData.get("notes") as string)?.trim();
  const body           = (formData.get("body") as string)?.trim();
  const publish_date   = (formData.get("publish_date") as string)?.trim();
  const author         = (formData.get("author") as string)?.trim() || "Vantage Circle";
  const canonical_url  = (formData.get("canonical_url") as string)?.trim();
  const has_schema     = formData.get("has_schema") === "on";
  const schema_raw     = (formData.get("schema_types") as string)?.trim();

  if (!title || !slug) throw new Error("Title and slug are required.");

  const filePath = path.join(BLOGS_DIR, `${slug}.md`);
  if (fs.existsSync(filePath)) throw new Error(`A blog with slug "${slug}" already exists.`);

  const tagsArr       = tags_raw ? tags_raw.split(",").map((t) => t.trim()).filter(Boolean) : [];
  const secondaryArr  = secondary_kws ? secondary_kws.split(",").map((t) => t.trim()).filter(Boolean) : [];
  const schemaArr     = schema_raw ? schema_raw.split(",").map((t) => t.trim()).filter(Boolean) : [];
  const today         = publish_date || new Date().toISOString().split("T")[0];

  const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
slug: "${slug}"
category: "${category}"
tags: [${tagsArr.map((t) => `"${t}"`).join(", ")}]
status: "${status}"
priority: "${priority}"
source_url: "${source_url}"
canonical_url: "${canonical_url ?? ""}"
meta_title: "${(meta_title ?? "").replace(/"/g, '\\"')}"
meta_description: "${(meta_desc ?? "").replace(/"/g, '\\"')}"
featured: ${featured}
author: "${author}"
publish_date: "${today}"
last_updated: "${today}"
word_count_estimate: ${word_count}
seo_score: ${seo_score}
has_product_mention: ${has_product}
has_cta: ${has_cta}
has_schema: ${has_schema}
schema_types: [${schemaArr.map((t) => `"${t}"`).join(", ")}]
primary_keyword: "${primary_kw ?? ""}"
secondary_keywords: [${secondaryArr.map((k) => `"${k}"`).join(", ")}]
internal_links: []
content_type: "${content_type}"
funnel_stage: "${funnel_stage}"
notes: "${(notes ?? "").replace(/"/g, '\\"')}"
---

${body || ""}
`.trimEnd() + "\n";

  fs.writeFileSync(filePath, frontmatter, "utf-8");
  redirect(`/blogs/${slug}`);
}

// ── Delete ────────────────────────────────────────────────────────────────────

export async function deleteBlog(slug: string) {
  const filePath = path.join(BLOGS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) throw new Error(`Blog "${slug}" not found.`);
  fs.unlinkSync(filePath);
  redirect("/blogs");
}

// ── Update ────────────────────────────────────────────────────────────────────

export async function updateBlog(originalSlug: string, formData: FormData) {
  const title         = (formData.get("title") as string)?.trim();
  const slug          = (formData.get("slug") as string)?.trim();
  const category      = formData.get("category") as string;
  const status        = formData.get("status") as string;
  const priority      = formData.get("priority") as string;
  const source_url    = (formData.get("source_url") as string)?.trim();
  const meta_title    = (formData.get("meta_title") as string)?.trim();
  const meta_desc     = (formData.get("meta_description") as string)?.trim();
  const primary_kw    = (formData.get("primary_keyword") as string)?.trim();
  const secondary_kws = (formData.get("secondary_keywords") as string)?.trim();
  const tags_raw      = (formData.get("tags") as string)?.trim();
  const seo_score     = parseInt(formData.get("seo_score") as string) || 0;
  const content_type  = formData.get("content_type") as string;
  const funnel_stage  = formData.get("funnel_stage") as string;
  const word_count    = parseInt(formData.get("word_count_estimate") as string) || 0;
  const has_product   = formData.get("has_product_mention") === "on";
  const has_cta       = formData.get("has_cta") === "on";
  const featured      = formData.get("featured") === "on";
  const notes         = (formData.get("notes") as string)?.trim();
  const body          = (formData.get("body") as string)?.trim();
  const publish_date  = (formData.get("publish_date") as string)?.trim();
  const author        = (formData.get("author") as string)?.trim() || "Vantage Circle";
  const canonical_url = (formData.get("canonical_url") as string)?.trim();
  const has_schema    = formData.get("has_schema") === "on";
  const schema_raw    = (formData.get("schema_types") as string)?.trim();

  if (!title || !slug) throw new Error("Title and slug are required.");

  const originalPath = path.join(BLOGS_DIR, `${originalSlug}.md`);
  if (!fs.existsSync(originalPath)) throw new Error(`Blog "${originalSlug}" not found.`);

  // If slug changed, make sure new slug isn't already taken
  if (slug !== originalSlug) {
    const newPath = path.join(BLOGS_DIR, `${slug}.md`);
    if (fs.existsSync(newPath)) throw new Error(`A blog with slug "${slug}" already exists.`);
  }

  const tagsArr      = tags_raw ? tags_raw.split(",").map((t) => t.trim()).filter(Boolean) : [];
  const secondaryArr = secondary_kws ? secondary_kws.split(",").map((t) => t.trim()).filter(Boolean) : [];
  const schemaArr    = schema_raw ? schema_raw.split(",").map((t) => t.trim()).filter(Boolean) : [];
  const today        = new Date().toISOString().split("T")[0];

  const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
slug: "${slug}"
category: "${category}"
tags: [${tagsArr.map((t) => `"${t}"`).join(", ")}]
status: "${status}"
priority: "${priority}"
source_url: "${source_url ?? ""}"
canonical_url: "${canonical_url ?? ""}"
meta_title: "${(meta_title ?? "").replace(/"/g, '\\"')}"
meta_description: "${(meta_desc ?? "").replace(/"/g, '\\"')}"
featured: ${featured}
author: "${author}"
publish_date: "${publish_date}"
last_updated: "${today}"
word_count_estimate: ${word_count}
seo_score: ${seo_score}
has_product_mention: ${has_product}
has_cta: ${has_cta}
has_schema: ${has_schema}
schema_types: [${schemaArr.map((t) => `"${t}"`).join(", ")}]
primary_keyword: "${primary_kw ?? ""}"
secondary_keywords: [${secondaryArr.map((k) => `"${k}"`).join(", ")}]
internal_links: []
content_type: "${content_type}"
funnel_stage: "${funnel_stage}"
notes: "${(notes ?? "").replace(/"/g, '\\"')}"
---

${body || ""}
`.trimEnd() + "\n";

  const newFilePath = path.join(BLOGS_DIR, `${slug}.md`);

  // Write new file first, then delete old if slug changed
  fs.writeFileSync(newFilePath, frontmatter, "utf-8");
  if (slug !== originalSlug) fs.unlinkSync(originalPath);

  redirect(`/blogs/${slug}`);
}

// ── URL Import ────────────────────────────────────────────────────────────────

export type ImportedBlogData = {
  title?: string;
  slug?: string;
  source_url?: string;
  meta_title?: string;
  meta_description?: string;
  canonical_url?: string;
  has_schema?: boolean;
  schema_types?: string[];
  primary_keyword?: string;
  secondary_keywords?: string;
  word_count_estimate?: number;
  error?: string;
};

export async function fetchBlogDataFromUrl(url: string): Promise<ImportedBlogData> {
  // Validate URL
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(url);
  } catch {
    return { error: "Invalid URL — please include https://" };
  }

  // Fetch with timeout
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 7000);

  let html: string;
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml",
      },
      cache: "no-store",
    });
    clearTimeout(timeout);
    if (!res.ok) return { error: `Could not fetch page (HTTP ${res.status})` };
    html = await res.text();
  } catch (err) {
    clearTimeout(timeout);
    const msg = err instanceof Error ? err.message : "Network error";
    return { error: msg.includes("abort") ? "Request timed out after 7s" : msg };
  }

  try {
    const $ = cheerio.load(html);

    // ── Title ────────────────────────────────────────────────────────────────
    const h1     = $("h1").first().text().trim();
    const ogTitle = $('meta[property="og:title"]').attr("content")?.trim() ?? "";
    const pageTitle = $("title").text().trim();
    const cleanPageTitle = pageTitle.replace(/\s*[|–—\-].*$/, "").trim();
    const title = h1 || ogTitle || cleanPageTitle;

    // ── Meta description ─────────────────────────────────────────────────────
    const metaDesc =
      $('meta[name="description"]').attr("content")?.trim() ??
      $('meta[property="og:description"]').attr("content")?.trim() ??
      "";

    // ── Canonical ────────────────────────────────────────────────────────────
    const canonicalRaw = $('link[rel="canonical"]').attr("href") ?? "";
    let canonical = "";
    if (canonicalRaw) {
      try { canonical = new URL(canonicalRaw, url).href; } catch { canonical = canonicalRaw; }
    }

    // ── Schema / JSON-LD ─────────────────────────────────────────────────────
    const schemaTypes: string[] = [];
    let hasSchema = false;
    $('script[type="application/ld+json"]').each((_, el) => {
      try {
        const parsed = JSON.parse($(el).html() ?? "");
        hasSchema = true;
        const extractTypes = (node: Record<string, unknown>) => {
          const t = node["@type"];
          if (typeof t === "string") schemaTypes.push(t);
          else if (Array.isArray(t)) t.forEach((v) => { if (typeof v === "string") schemaTypes.push(v); });
          if (Array.isArray(node["@graph"])) {
            (node["@graph"] as Record<string, unknown>[]).forEach(extractTypes);
          }
        };
        extractTypes(parsed);
      } catch {}
    });

    // ── Keywords ─────────────────────────────────────────────────────────────
    const metaKw = $('meta[name="keywords"]').attr("content") ?? "";
    const kwArr  = metaKw.split(",").map((k) => k.trim()).filter(Boolean);

    // ── Slug from path ───────────────────────────────────────────────────────
    const segments = parsedUrl.pathname.replace(/\/$/, "").split("/").filter(Boolean);
    const slug = segments[segments.length - 1] ?? "";

    // ── Word count ───────────────────────────────────────────────────────────
    const bodyText =
      $("article").text() ||
      $("main").text() ||
      $("body").text();
    const wordCount = Math.min(
      bodyText.split(/\s+/).filter((w) => w.length > 2).length,
      15000
    );

    return {
      title,
      slug,
      source_url: url,
      meta_title: pageTitle,
      meta_description: metaDesc,
      canonical_url: canonical,
      has_schema: hasSchema,
      schema_types: Array.from(new Set(schemaTypes)),
      primary_keyword: kwArr[0] ?? "",
      secondary_keywords: kwArr.slice(1).join(", "),
      word_count_estimate: wordCount,
    };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to parse page" };
  }
}
