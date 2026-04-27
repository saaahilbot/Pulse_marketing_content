export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import Link from "next/link";
import { getAllBlogs, getAnalytics } from "@/lib/blogs";
import { getLinkGraph } from "@/lib/linkGraph";
import StatsCard from "@/components/StatsCard";
import { StatusBadge, PriorityBadge } from "@/components/StatusBadge";
import SeoScoreBar from "@/components/SeoScoreBar";
import {
  FileText, TrendingUp, Star, AlertCircle, Tag,
  CheckCircle, Target, Megaphone, ArrowRight,
  Link2, Shuffle, ExternalLink,
} from "lucide-react";

export const metadata: Metadata = { title: "Dashboard" };

export default function DashboardPage() {
  const blogs     = getAllBlogs();
  const analytics = getAnalytics();
  const graph     = getLinkGraph();

  const featured       = blogs.filter((b) => b.featured);
  const needsUpdate    = blogs.filter((b) => b.status === "needs-update");
  const highPriority   = blogs.filter((b) => b.priority === "high").slice(0, 8);
  const orphanCount    = graph.orphans.length;
  const avgWordCount   = Math.round(analytics.totalWordCount / analytics.totalBlogs);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 tracking-tight">Dashboard</h1>
          <p className="text-sm text-gray-400 mt-0.5">{analytics.totalBlogs} articles · {analytics.byCategory.length} categories · last updated Mar 2025</p>
        </div>
        <Link href="/blogs" className="flex items-center gap-1.5 bg-vc-orange text-white text-xs px-3.5 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors">
          All Blogs <ArrowRight size={13} />
        </Link>
      </div>

      {/* Primary stats */}
      <div className="grid grid-cols-4 gap-4">
        <StatsCard title="Total Articles"   value={analytics.totalBlogs}          subtitle="Across 7 categories"   icon={FileText}    />
        <StatsCard title="Published"         value={analytics.byStatus.published ?? 0} subtitle={`${analytics.byStatus["needs-update"] ?? 0} need update`} icon={CheckCircle} />
        <StatsCard title="Avg SEO Score"     value={analytics.avgSeoScore}         subtitle="Target: 75+"           icon={TrendingUp}  />
        <StatsCard title="Featured"          value={analytics.featured}            subtitle="High-priority posts"   icon={Star}        accent />
      </div>

      {/* Secondary stats */}
      <div className="grid grid-cols-4 gap-4">
        <StatsCard title="High Priority"     value={analytics.byPriority.high ?? 0}  subtitle="Need immediate work"   icon={AlertCircle} />
        <StatsCard title="Has Product CTA"   value={analytics.withProductMention}    subtitle={`${analytics.totalBlogs - analytics.withProductMention} missing`} icon={Megaphone} />
        <StatsCard title="Link Suggestions"  value={graph.suggestions.length}        subtitle={`${orphanCount} orphan posts`} icon={Shuffle} />
        <StatsCard title="Avg Word Count"    value={avgWordCount.toLocaleString()}   subtitle={`${analytics.totalWordCount.toLocaleString()} total`} icon={Target} />
      </div>

      {/* Three column section */}
      <div className="grid grid-cols-3 gap-5">
        {/* Funnel mix */}
        <div className="card p-5">
          <h2 className="text-xs font-semibold text-gray-700 mb-4">Funnel Stage Mix</h2>
          <div className="space-y-3.5">
            {(["awareness", "consideration", "decision"] as const).map((stage) => {
              const count = analytics.byFunnelStage[stage] ?? 0;
              const pct   = Math.round((count / analytics.totalBlogs) * 100);
              const cfg   = {
                awareness:     { bar: "bg-sky-300",    text: "text-sky-700",    label: "Awareness"     },
                consideration: { bar: "bg-violet-300", text: "text-violet-700", label: "Consideration" },
                decision:      { bar: "bg-orange-400", text: "text-orange-700", label: "Decision"      },
              }[stage];
              return (
                <div key={stage}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className={`font-medium ${cfg.text}`}>{cfg.label}</span>
                    <span className="text-gray-400 tabular-nums">{count} ({pct}%)</span>
                  </div>
                  <div className="h-1 bg-gray-100 rounded-full">
                    <div className={`h-full rounded-full ${cfg.bar}`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-[11px] text-gray-400">Most content is awareness-stage. Add decision-stage comparison posts to close the funnel.</p>
          </div>
        </div>

        {/* Category breakdown */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-semibold text-gray-700">By Category</h2>
            <Link href="/categories" className="text-[11px] text-vc-orange hover:underline flex items-center gap-1">All <ArrowRight size={10} /></Link>
          </div>
          <div className="space-y-2">
            {analytics.byCategory.map((cat) => (
              <div key={cat.name} className="flex items-center gap-2">
                <span className="text-[11px] text-gray-500 flex-1 truncate">{cat.name}</span>
                {cat.needsUpdate > 0 && <span className="text-[10px] text-amber-500 font-medium">{cat.needsUpdate}⚠</span>}
                <span className="text-xs font-bold text-gray-700 w-4 text-right">{cat.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Issues */}
        <div className="card p-5">
          <h2 className="text-xs font-semibold text-gray-700 mb-4">Action Items</h2>
          <div className="space-y-3">
            {needsUpdate.length > 0 && (
              <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg">
                <p className="text-[11px] font-semibold text-amber-700 mb-2">Needs Update ({needsUpdate.length})</p>
                {needsUpdate.slice(0, 3).map((b) => (
                  <Link key={b.slug} href={`/blogs/${b.slug}`} className="block text-[11px] text-amber-600 hover:text-amber-800 truncate py-0.5">→ {b.title}</Link>
                ))}
              </div>
            )}
            <div className="p-3 bg-gray-50 border border-gray-100 rounded-lg">
              <p className="text-[11px] font-semibold text-gray-600 mb-1">No Product Mention</p>
              <p className="text-[11px] text-gray-400">{analytics.totalBlogs - analytics.withProductMention} posts missing Vantage Pulse mention.</p>
            </div>
            {orphanCount > 0 && (
              <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
                <p className="text-[11px] font-semibold text-red-600 mb-1">Orphan Posts ({orphanCount})</p>
                <p className="text-[11px] text-red-400">Posts with no inbound or outbound links.</p>
                <Link href="/links" className="text-[11px] text-vc-orange hover:underline mt-1 block">Fix in Link Graph →</Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* High priority table */}
      <div className="card overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
          <h2 className="text-xs font-semibold text-gray-700">High Priority Posts</h2>
          <Link href="/blogs" className="text-[11px] text-vc-orange hover:underline flex items-center gap-1">View all <ArrowRight size={10} /></Link>
        </div>
        <div className="divide-y divide-gray-50">
          {highPriority.map((blog) => (
            <div key={blog.slug} className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50/50 transition-colors group">
              <div className="flex-1 min-w-0">
                <Link href={`/blogs/${blog.slug}`} className="text-sm font-medium text-gray-800 hover:text-vc-orange transition-colors truncate block">
                  {blog.title}
                </Link>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[11px] text-gray-400">{blog.category}</span>
                  <span className="text-gray-200">·</span>
                  <StatusBadge status={blog.status} />
                </div>
              </div>
              <div className="w-32 flex-shrink-0">
                <SeoScoreBar score={blog.seo_score} showLabel={false} size="sm" />
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                <Link href={`/blogs/${blog.slug}`} className="text-[11px] text-gray-400 hover:text-gray-600 px-2 py-1 border border-gray-200 rounded hover:bg-white transition-colors">View</Link>
                {blog.source_url && (
                  <a href={blog.source_url} target="_blank" rel="noopener noreferrer" className="p-1.5 text-gray-300 hover:text-vc-orange transition-colors">
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured + Keywords row */}
      <div className="grid grid-cols-3 gap-5">
        {/* Featured */}
        <div className="col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-semibold text-gray-700">Featured Posts</h2>
            <span className="text-[11px] text-gray-400">{featured.length} articles</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {featured.map((blog) => (
              <Link key={blog.slug} href={`/blogs/${blog.slug}`}
                className="card p-4 block hover:shadow-card-hover transition-shadow group border-t-2 border-t-transparent hover:border-t-vc-orange">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] text-vc-orange font-semibold">★ Featured</span>
                  <StatusBadge status={blog.status} />
                </div>
                <h3 className="text-sm font-medium text-gray-800 group-hover:text-vc-orange transition-colors line-clamp-2 mb-2">{blog.title}</h3>
                <p className="text-[11px] text-gray-400 mb-2">{blog.category.split(" & ")[0]}</p>
                <SeoScoreBar score={blog.seo_score} size="sm" showLabel={false} />
              </Link>
            ))}
          </div>
        </div>

        {/* Keywords */}
        <div className="card p-5">
          <h2 className="text-xs font-semibold text-gray-700 mb-4">Top Keyword Themes</h2>
          <div className="flex flex-wrap gap-1.5">
            {analytics.topKeywords.map(({ keyword, count }) => (
              <div key={keyword} className="flex items-center gap-1 bg-gray-50 border border-gray-100 text-[11px] px-2 py-1 rounded-full"
                style={{ opacity: 0.5 + count * 0.15 }}>
                <Tag size={9} className="text-vc-orange" />
                <span className="text-gray-600">{keyword}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Link health quick stats */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Link2 size={14} className="text-gray-400" />
            <h2 className="text-xs font-semibold text-gray-700">Link Health</h2>
          </div>
          <Link href="/links" className="text-[11px] text-vc-orange hover:underline flex items-center gap-1">
            Full graph <ArrowRight size={10} />
          </Link>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Total links",    value: graph.totalLinks },
            { label: "Avg outbound",   value: graph.avgOutbound },
            { label: "Avg inbound",    value: graph.avgInbound },
            { label: "Orphan posts",   value: orphanCount },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-[11px] text-gray-400 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-[11px] text-gray-400">
            <span className="font-medium text-vc-orange">{graph.suggestions.length} link opportunities</span> identified.
            Add slugs to <code className="bg-gray-100 px-1 rounded">internal_links</code> field to improve SEO.
          </p>
        </div>
      </div>
    </div>
  );
}
