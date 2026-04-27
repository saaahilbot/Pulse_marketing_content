import { getAllBlogs } from "./blogs";
import type {
  Blog,
  LinkNode,
  LinkEdge,
  LinkSuggestion,
  SerializedLinkGraph,
  SuggestionReason,
  FunnelStage,
} from "./types";

// ── Stop words for keyword tokenisation ──────────────────────────────────────
const STOP_WORDS = new Set([
  "a","an","the","of","to","in","for","and","with","that","how","what",
  "why","are","is","do","does","was","be","by","as","from","on","at",
  "your","our","its","their","this","these","about","more","when","can",
  "will","have","has","not","all","get","we","you","they","employee",
  "employees","survey","surveys","team","teams",
]);

function tokenize(text: string): Set<string> {
  return new Set(
    text
      .toLowerCase()
      .split(/[\s\-_/]+/)
      .map((w) => w.replace(/[^a-z]/g, ""))
      .filter((w) => w.length >= 4 && !STOP_WORDS.has(w))
  );
}

function jaccard(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 && b.size === 0) return 0;
  let intersection = 0;
  a.forEach((t) => { if (b.has(t)) intersection++; });
  const union = a.size + b.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

function keywordTokens(blog: Blog): Set<string> {
  const text = [blog.primary_keyword, ...blog.secondary_keywords].join(" ");
  return tokenize(text);
}

function funnelRelation(
  a: FunnelStage,
  b: FunnelStage
): "same" | "adjacent" | "distant" {
  if (a === b) return "same";
  const order: Record<FunnelStage, number> = {
    awareness: 0,
    consideration: 1,
    decision: 2,
  };
  return Math.abs(order[a] - order[b]) === 1 ? "adjacent" : "distant";
}

// ── Build the link graph ──────────────────────────────────────────────────────
export function getLinkGraph(): SerializedLinkGraph {
  const blogs = getAllBlogs();
  const blogMap = new Map<string, Blog>(blogs.map((b) => [b.slug, b]));

  // Build nodes
  const nodeMap = new Map<string, LinkNode>();
  for (const blog of blogs) {
    nodeMap.set(blog.slug, {
      slug: blog.slug,
      title: blog.title,
      category: blog.category,
      funnel_stage: blog.funnel_stage,
      tags: blog.tags,
      primary_keyword: blog.primary_keyword,
      secondary_keywords: blog.secondary_keywords,
      outboundSlugs: blog.internal_links.filter((s) => blogMap.has(s)),
      inboundSlugs: [],
      outboundCount: 0,
      inboundCount: 0,
      isOrphan: false,
      isSink: false,
      isSource: false,
    });
  }

  // Compute inbound links
  Array.from(nodeMap.values()).forEach((node) => {
    node.outboundSlugs.forEach((targetSlug) => {
      const target = nodeMap.get(targetSlug);
      if (target) target.inboundSlugs.push(node.slug);
    });
  });

  // Compute counts and flags
  const edges: LinkEdge[] = [];
  Array.from(nodeMap.values()).forEach((node) => {
    node.outboundCount = node.outboundSlugs.length;
    node.inboundCount = node.inboundSlugs.length;
    node.isOrphan = node.inboundCount === 0 && node.outboundCount === 0;
    node.isSink = node.inboundCount === 0;
    node.isSource = node.outboundCount === 0;
    node.outboundSlugs.forEach((target) => {
      edges.push({ from: node.slug, to: target });
    });
  });

  const orphans = Array.from(nodeMap.values())
    .filter((n) => n.isOrphan)
    .map((n) => n.slug);

  const sinks = Array.from(nodeMap.values())
    .filter((n) => n.isSink && !n.isOrphan)
    .map((n) => n.slug);

  const sources = Array.from(nodeMap.values())
    .filter((n) => n.isSource && !n.isOrphan)
    .map((n) => n.slug);

  const totalLinks = edges.length;
  const avgOutbound =
    nodeMap.size > 0
      ? Math.round(
          (Array.from(nodeMap.values()).reduce((s, n) => s + n.outboundCount, 0) /
            nodeMap.size) *
            10
        ) / 10
      : 0;
  const avgInbound =
    nodeMap.size > 0
      ? Math.round(
          (Array.from(nodeMap.values()).reduce((s, n) => s + n.inboundCount, 0) /
            nodeMap.size) *
            10
        ) / 10
      : 0;

  // ── Generate link suggestions ─────────────────────────────────────────────
  const suggestions: LinkSuggestion[] = [];
  const blogList = blogs;

  // Build keyword token sets once
  const tokenCache = new Map<string, Set<string>>();
  for (const blog of blogList) {
    tokenCache.set(blog.slug, keywordTokens(blog));
  }

  // Build existing link set for O(1) lookup
  const existingLinks = new Set<string>(
    edges.map((e) => `${e.from}→${e.to}`)
  );

  for (let i = 0; i < blogList.length; i++) {
    const a = blogList[i];
    const nodeA = nodeMap.get(a.slug)!;
    const tokensA = tokenCache.get(a.slug)!;

    for (let j = 0; j < blogList.length; j++) {
      if (i === j) continue;
      const b = blogList[j];

      // Skip if already linked in this direction
      if (existingLinks.has(`${a.slug}→${b.slug}`)) continue;

      const nodeB = nodeMap.get(b.slug)!;
      const tokensB = tokenCache.get(b.slug)!;

      const reasons: SuggestionReason[] = [];
      let score = 0;

      // Same category (+30)
      if (a.category === b.category) {
        score += 30;
        reasons.push("same-category");
      }

      // Shared tags (+7 per tag, max 20)
      const sharedTags = a.tags.filter((t) => b.tags.includes(t));
      if (sharedTags.length > 0) {
        score += Math.min(sharedTags.length * 7, 20);
        reasons.push("shared-tag");
      }

      // Keyword overlap (+0–25 via Jaccard)
      const sim = jaccard(tokensA, tokensB);
      if (sim > 0.1) {
        score += Math.round(sim * 25);
        reasons.push("keyword-overlap");
      }

      // Funnel adjacency
      const fr = funnelRelation(a.funnel_stage, b.funnel_stage);
      if (fr === "same") {
        score += 15;
        reasons.push("funnel-adjacent");
      } else if (fr === "adjacent") {
        score += 8;
        reasons.push("funnel-adjacent");
      }

      // Inbound deficit bonus (+10 if target has 0 inbound, +5 if 1)
      if (nodeB.inboundCount === 0) {
        score += 10;
        reasons.push("inbound-deficit");
      } else if (nodeB.inboundCount === 1) {
        score += 5;
      }

      if (score >= 35) {
        suggestions.push({
          fromSlug: a.slug,
          fromTitle: a.title,
          toSlug: b.slug,
          toTitle: b.title,
          score,
          reasons,
          funnelRelation: fr,
        });
      }
    }
  }

  // Sort by score desc, cap at 200
  suggestions.sort((a, b) => b.score - a.score);
  const topSuggestions = suggestions.slice(0, 200);

  return {
    nodes: Array.from(nodeMap.values()),
    edges,
    orphans,
    sinks,
    sources,
    totalLinks,
    avgOutbound,
    avgInbound,
    suggestions: topSuggestions,
  };
}

// ── Helpers for individual blog pages ────────────────────────────────────────
export function getInboundLinks(slug: string): LinkNode[] {
  const graph = getLinkGraph();
  const node = graph.nodes.find((n) => n.slug === slug);
  if (!node) return [];
  return graph.nodes.filter((n) => node.inboundSlugs.includes(n.slug));
}

export function getSuggestionsForSlug(
  slug: string,
  limit = 4
): LinkSuggestion[] {
  const graph = getLinkGraph();
  return graph.suggestions
    .filter((s) => s.fromSlug === slug)
    .slice(0, limit);
}

export function getOrphans(): LinkNode[] {
  const graph = getLinkGraph();
  return graph.nodes.filter((n) => n.isOrphan);
}
