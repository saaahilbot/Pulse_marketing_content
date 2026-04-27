export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { getAnalytics, getAllBlogs } from "@/lib/blogs";
import Header from "@/components/Header";
import SeoScoreBar from "@/components/SeoScoreBar";
import { StatusBadge, PriorityBadge } from "@/components/StatusBadge";
import StatsCard from "@/components/StatsCard";
import Link from "next/link";
import { TrendingUp, TrendingDown, Target, CheckCircle } from "lucide-react";
import clsx from "clsx";

export const metadata: Metadata = { title: "Analytics" };

export default function AnalyticsPage() {
  const analytics = getAnalytics();
  const blogs     = getAllBlogs();

  const strong   = blogs.filter((b) => b.seo_score >= 75);
  const moderate = blogs.filter((b) => b.seo_score >= 65 && b.seo_score < 75);
  const weak     = blogs.filter((b) => b.seo_score < 65);
  const topSeo   = [...blogs].sort((a, b) => b.seo_score - a.seo_score).slice(0, 10);
  const bottomSeo= [...blogs].sort((a, b) => a.seo_score - b.seo_score).slice(0, 10);
  const noConvert= blogs.filter((b) => !b.has_product_mention && !b.has_cta);

  const contentTypes: Record<string, number> = {};
  blogs.forEach((b) => { contentTypes[b.content_type] = (contentTypes[b.content_type] || 0) + 1; });

  return (
    <div className="space-y-8">
      <Header
        title="Analytics"
        subtitle="SEO health, conversion readiness, content coverage"
        breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Analytics" }]}
      />

      {/* SEO distribution */}
      <section>
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">SEO Health Distribution</h2>
        <div className="grid grid-cols-3 gap-4 mb-5">
          {[
            { label: "Strong (75+)",    count: strong.length,   color: "emerald", icon: CheckCircle },
            { label: "Moderate (65–74)",count: moderate.length, color: "amber",   icon: TrendingUp },
            { label: "Weak (<65)",      count: weak.length,     color: "red",     icon: TrendingDown },
          ].map(({ label, count, color, icon }) => (
            <div key={label} className="card p-5">
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs font-medium text-${color}-600`}>{label}</span>
                <span className={`text-2xl font-bold text-${color}-600`}>{count}</span>
              </div>
              <p className="text-[11px] text-gray-400">{Math.round((count / blogs.length) * 100)}% of portfolio</p>
              <div className="mt-2 h-1 bg-gray-100 rounded-full">
                <div className={`h-full bg-${color}-400 rounded-full`} style={{ width: `${(count / blogs.length) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div className="card overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
              <TrendingUp size={13} className="text-emerald-500" />
              <h3 className="text-xs font-semibold text-gray-700">Top 10 by SEO Score</h3>
            </div>
            <div className="divide-y divide-gray-50">
              {topSeo.map((blog) => (
                <Link key={blog.slug} href={`/blogs/${blog.slug}`}
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors group">
                  <span className="text-xs font-bold text-emerald-600 w-6 tabular-nums flex-shrink-0">{blog.seo_score}</span>
                  <span className="flex-1 text-sm text-gray-700 group-hover:text-vc-orange transition-colors line-clamp-1">{blog.title}</span>
                  <StatusBadge status={blog.status} />
                </Link>
              ))}
            </div>
          </div>
          <div className="card overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
              <TrendingDown size={13} className="text-red-500" />
              <h3 className="text-xs font-semibold text-gray-700">Bottom 10 — Improvement Targets</h3>
            </div>
            <div className="divide-y divide-gray-50">
              {bottomSeo.map((blog) => (
                <Link key={blog.slug} href={`/blogs/${blog.slug}`}
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors group">
                  <span className="text-xs font-bold text-red-500 w-6 tabular-nums flex-shrink-0">{blog.seo_score}</span>
                  <span className="flex-1 text-sm text-gray-700 group-hover:text-vc-orange transition-colors line-clamp-1">{blog.title}</span>
                  <PriorityBadge priority={blog.priority} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Conversion */}
      <section>
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Conversion Readiness</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {[
            { label: "Product Mention Coverage", count: analytics.withProductMention, color: "bg-vc-navy" },
            { label: "CTA Coverage",             count: analytics.withCta,            color: "bg-vc-orange" },
          ].map(({ label, count, color }) => (
            <div key={label} className="card p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs font-semibold text-gray-700">{label}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    <span className="font-medium text-red-500">{analytics.totalBlogs - count}</span> missing
                  </p>
                </div>
                <p className="text-2xl font-bold text-gray-900">{count}<span className="text-sm text-gray-400 font-normal">/{analytics.totalBlogs}</span></p>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${color}`} style={{ width: `${(count / analytics.totalBlogs) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
        {noConvert.length > 0 && (
          <div className="card p-4 border-l-2 border-l-red-300">
            <p className="text-xs font-semibold text-red-600 mb-2">{noConvert.length} posts have no product mention AND no CTA</p>
            <div className="grid grid-cols-2 gap-1.5">
              {noConvert.map((blog) => (
                <Link key={blog.slug} href={`/blogs/${blog.slug}`}
                  className="flex items-center gap-1.5 text-[11px] text-red-500 hover:text-red-700 transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-300 flex-shrink-0" />
                  <span className="truncate">{blog.title}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Content type + category SEO */}
      <section>
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Content Mix</h2>
        <div className="grid grid-cols-2 gap-5">
          <div className="card p-5">
            <h3 className="text-xs font-semibold text-gray-700 mb-4">By Content Type</h3>
            <div className="space-y-2.5">
              {Object.entries(contentTypes).sort((a, b) => b[1] - a[1]).map(([type, count]) => {
                const pct = Math.round((count / blogs.length) * 100);
                return (
                  <div key={type}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-600 capitalize">{type.replace(/-/g, " ")}</span>
                      <span className="text-gray-400 tabular-nums">{count} ({pct}%)</span>
                    </div>
                    <div className="h-1 bg-gray-100 rounded-full">
                      <div className="h-full bg-vc-navy rounded-full" style={{ width: `${pct}%`, opacity: 0.4 + pct * 0.01 }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="card overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100">
              <h3 className="text-xs font-semibold text-gray-700">Category SEO Rankings</h3>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50/70 border-b border-gray-100">
                  <th className="text-left px-4 py-2 text-[11px] font-semibold text-gray-500">Category</th>
                  <th className="text-left px-4 py-2 text-[11px] font-semibold text-gray-500 min-w-32">Avg SEO</th>
                  <th className="text-center px-4 py-2 text-[11px] font-semibold text-gray-500">Posts</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {analytics.byCategory.sort((a, b) => b.avgSeoScore - a.avgSeoScore).map((cat) => (
                  <tr key={cat.name} className="hover:bg-gray-50/40 transition-colors">
                    <td className="px-4 py-2.5 text-xs text-gray-700 font-medium">{cat.name.split(" & ")[0]}</td>
                    <td className="px-4 py-2.5 min-w-32"><SeoScoreBar score={cat.avgSeoScore} size="sm" showLabel={false} /></td>
                    <td className="px-4 py-2.5 text-center text-xs text-gray-500">{cat.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
