export type BlogStatus = "published" | "draft" | "needs-update" | "review";
export type BlogPriority = "high" | "medium" | "low";
export type ContentType =
  | "pillar" | "educational" | "how-to" | "listicle" | "comparison"
  | "data-driven" | "product-educational" | "buyer-guide" | "template";
export type FunnelStage = "awareness" | "consideration" | "decision";

export interface Blog {
  slug: string;
  title: string;
  category: string;
  tags: string[];
  status: BlogStatus;
  priority: BlogPriority;
  content_type: ContentType;
  funnel_stage: FunnelStage;
  source_url: string;
  meta_title: string;
  meta_description: string;
  primary_keyword: string;
  secondary_keywords: string[];
  seo_score: number;
  featured: boolean;
  author: string;
  publish_date: string;
  last_updated: string;
  word_count_estimate: number;
  has_product_mention: boolean;
  has_cta: boolean;
  internal_links: string[];
  notes: string;
  content: string;
  canonical_url?: string;
  has_schema?: boolean;
  schema_types?: string[];
}

export interface CategoryStats {
  name: string;
  count: number;
  published: number;
  needsUpdate: number;
  draft: number;
  avgSeoScore: number;
  highPriority: number;
}

export interface AnalyticsData {
  totalBlogs: number;
  byStatus: Record<BlogStatus, number>;
  byCategory: CategoryStats[];
  byPriority: Record<BlogPriority, number>;
  byFunnelStage: Record<FunnelStage, number>;
  avgSeoScore: number;
  withProductMention: number;
  withCta: number;
  featured: number;
  totalWordCount: number;
  topKeywords: { keyword: string; count: number }[];
}

export interface BlogFilters {
  search: string;
  category: string;
  status: BlogStatus | "all";
  priority: BlogPriority | "all";
  funnel_stage: FunnelStage | "all";
  has_product_mention: boolean | "all";
}

// ── Link Graph ────────────────────────────────────────────────────────────────

export type SuggestionReason =
  | "same-category"
  | "shared-tag"
  | "keyword-overlap"
  | "funnel-adjacent"
  | "inbound-deficit";

export interface LinkNode {
  slug: string;
  title: string;
  category: string;
  funnel_stage: FunnelStage;
  tags: string[];
  primary_keyword: string;
  secondary_keywords: string[];
  outboundSlugs: string[];
  inboundSlugs: string[];
  outboundCount: number;
  inboundCount: number;
  isOrphan: boolean;
  isSink: boolean;
  isSource: boolean;
}

export interface LinkEdge {
  from: string;
  to: string;
}

export interface LinkSuggestion {
  fromSlug: string;
  fromTitle: string;
  toSlug: string;
  toTitle: string;
  score: number;
  reasons: SuggestionReason[];
  funnelRelation: "same" | "adjacent" | "distant";
}

export interface SerializedLinkGraph {
  nodes: LinkNode[];
  edges: LinkEdge[];
  orphans: string[];
  sinks: string[];
  sources: string[];
  totalLinks: number;
  avgOutbound: number;
  avgInbound: number;
  suggestions: LinkSuggestion[];
}
