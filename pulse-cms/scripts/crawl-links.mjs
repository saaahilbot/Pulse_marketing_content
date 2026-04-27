/**
 * Crawl all live blog URLs, extract real internal links to other VC blog posts,
 * and update the internal_links field in each markdown file.
 *
 * Usage: node scripts/crawl-links.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOGS_DIR = path.join(__dirname, "../content/blogs");

// Parse frontmatter manually (avoid pulling in gray-matter as a script dep)
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return { data: {}, body: content };
  const raw = match[1];
  const data = {};
  for (const line of raw.split("\n")) {
    const colon = line.indexOf(":");
    if (colon === -1) continue;
    const key = line.slice(0, colon).trim();
    let val = line.slice(colon + 1).trim();
    // Strip surrounding quotes
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    // Parse arrays  e.g.  ["a", "b"]
    if (val.startsWith("[")) {
      try {
        data[key] = JSON.parse(val.replace(/'/g, '"'));
      } catch {
        data[key] = [];
      }
    } else {
      data[key] = val;
    }
  }
  return { data, body: content.slice(match[0].length) };
}

// Replace internal_links array in raw file content
function setInternalLinks(content, links) {
  const arr = JSON.stringify(links);
  return content.replace(
    /^internal_links:.*$/m,
    `internal_links: ${arr}`
  );
}

// Extract slug from a VC blog URL
// e.g. https://www.vantagecircle.com/en/blog/anonymous-employee-survey/ → anonymous-employee-survey
function extractSlug(href) {
  try {
    const url = new URL(href);
    if (!url.hostname.includes("vantagecircle.com")) return null;
    const parts = url.pathname.replace(/\/$/, "").split("/");
    // path is /en/blog/<slug> or /blog/<slug>
    const blogIdx = parts.indexOf("blog");
    if (blogIdx === -1 || blogIdx === parts.length - 1) return null;
    return parts[blogIdx + 1] || null;
  } catch {
    return null;
  }
}

async function fetchLinks(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10000);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { "User-Agent": "Mozilla/5.0 (compatible; PulseCMS-LinkCrawler/1.0)" },
    });
    clearTimeout(timer);
    if (!res.ok) return [];
    const html = await res.text();
    // Extract all href= attributes
    const hrefs = [];
    const re = /href=["']([^"']+)["']/gi;
    let m;
    while ((m = re.exec(html)) !== null) {
      hrefs.push(m[1]);
    }
    return hrefs;
  } catch {
    clearTimeout(timer);
    return [];
  }
}

async function main() {
  const files = fs.readdirSync(BLOGS_DIR).filter((f) => f.endsWith(".md"));

  // Build slug → filename map from all local blogs
  const slugMap = new Map(); // slug → filename
  for (const file of files) {
    const content = fs.readFileSync(path.join(BLOGS_DIR, file), "utf8");
    const { data } = parseFrontmatter(content);
    if (data.slug) slugMap.set(data.slug, file);
  }

  console.log(`Found ${slugMap.size} local blogs.\n`);

  const results = []; // { file, slug, sourceUrl, foundLinks }

  for (const file of files) {
    const filePath = path.join(BLOGS_DIR, file);
    const content = fs.readFileSync(filePath, "utf8");
    const { data } = parseFrontmatter(content);
    const sourceUrl = data.source_url;
    const localSlug = data.slug;

    if (!sourceUrl) {
      console.log(`⏭  ${file} — no source_url, skipping`);
      continue;
    }

    process.stdout.write(`🔍 Fetching ${sourceUrl} ... `);
    const hrefs = await fetchLinks(sourceUrl);

    // Find hrefs that map to another local blog slug
    const linkedSlugs = new Set();
    for (const href of hrefs) {
      // Make absolute if relative
      let absolute = href;
      if (href.startsWith("/")) absolute = "https://www.vantagecircle.com" + href;
      const slug = extractSlug(absolute);
      if (slug && slug !== localSlug && slugMap.has(slug)) {
        linkedSlugs.add(slug);
      }
    }

    const links = Array.from(linkedSlugs).sort();
    console.log(`${links.length} internal links found`);

    // Update the file
    const updated = setInternalLinks(content, links);
    fs.writeFileSync(filePath, updated, "utf8");

    results.push({ file, slug: localSlug, sourceUrl, links });
  }

  console.log("\n✅ Done. Summary:\n");
  let totalLinks = 0;
  for (const r of results) {
    if (r.links.length > 0) {
      console.log(`  ${r.slug}: [${r.links.join(", ")}]`);
      totalLinks += r.links.length;
    }
  }
  console.log(`\nTotal outbound internal links written: ${totalLinks}`);
  const withLinks = results.filter((r) => r.links.length > 0).length;
  console.log(`Blogs with at least 1 internal link: ${withLinks} / ${results.length}`);
}

main().catch(console.error);
