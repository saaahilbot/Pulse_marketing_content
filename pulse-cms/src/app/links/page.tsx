export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import Link from "next/link";
import { getLinkGraph } from "@/lib/linkGraph";
import Header from "@/components/Header";
import StatsCard from "@/components/StatsCard";
import LinkSuggestionsTable from "@/components/LinkSuggestionsTable";
import OrphanPostsPanel from "@/components/OrphanPostsPanel";
import { Link2, ArrowUpRight, ArrowDownLeft, Shuffle, AlertTriangle } from "lucide-react";
import clsx from "clsx";

export const metadata: Metadata = { title: "Link Graph" };

export default function LinksPage() {
  const graph = getLinkGraph();

  // Sort nodes by inbound desc for the per-post table
  const nodesSorted = [...graph.nodes].sort((a, b) => b.inboundCount - a.inboundCount);
  const orphanNodes = graph.nodes.filter((n) => n.isOrphan);

  return (
    <div className="space-y-8">
      <Header
        title="Link Graph"
        subtitle="Internal link health, orphan detection, and AI-scored linking opportunities"
        breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Link Graph" }]}
      />

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-4">
        <StatsCard title="Total Internal Links" value={graph.totalLinks} subtitle="Across all 43 posts" icon={Link2} accent />
        <StatsCard title="Avg Outbound / Post" value={graph.avgOutbound} subtitle="Target: ≥ 3 links" icon={ArrowUpRight} />
        <StatsCard title="Avg Inbound / Post" value={graph.avgInbound} subtitle="Target: ≥ 2 links" icon={ArrowDownLeft} />
        <StatsCard title="Orphan Posts" value={orphanNodes.length} subtitle="Zero in + out links" icon={AlertTriangle}
          accent={orphanNodes.length > 0} />
      </div>

      {/* Orphan posts */}
      <section>
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Orphan Posts</h2>
        <OrphanPostsPanel orphans={orphanNodes} />
      </section>

      {/* Per-post link counts */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-700">Link Counts Per Post</h2>
          <span className="text-[11px] text-gray-400">{graph.nodes.length} posts</span>
        </div>
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/70">
                  <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Post</th>
                  <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Category</th>
                  <th className="text-center px-4 py-2.5 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
                    <span className="flex items-center justify-center gap-1"><ArrowDownLeft size={11} /> Inbound</span>
                  </th>
                  <th className="text-center px-4 py-2.5 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
                    <span className="flex items-center justify-center gap-1"><ArrowUpRight size={11} /> Outbound</span>
                  </th>
                  <th className="text-center px-4 py-2.5 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Health</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {nodesSorted.map((node) => {
                  const inboundOk  = node.inboundCount  >= 2;
                  const outboundOk = node.outboundCount >= 2;
                  const healthy    = inboundOk && outboundOk;
                  const orphan     = node.isOrphan;

                  return (
                    <tr key={node.slug} className="hover:bg-gray-50/40 transition-colors group">
                      <td className="px-4 py-2.5 max-w-64">
                        <Link href={`/blogs/${node.slug}`}
                          className="text-sm font-medium text-gray-800 hover:text-vc-orange transition-colors line-clamp-1">
                          {node.title}
                        </Link>
                      </td>
                      <td className="px-4 py-2.5">
                        <span className="text-[11px] text-gray-400">{node.category.split(" & ")[0]}</span>
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        <span className={clsx("text-sm font-semibold tabular-nums",
                          node.inboundCount === 0 ? "text-red-500" : node.inboundCount < 2 ? "text-amber-500" : "text-emerald-600"
                        )}>
                          {node.inboundCount}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        <span className={clsx("text-sm font-semibold tabular-nums",
                          node.outboundCount === 0 ? "text-red-500" : node.outboundCount < 2 ? "text-amber-500" : "text-emerald-600"
                        )}>
                          {node.outboundCount}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        {orphan ? (
                          <span className="text-[11px] font-medium text-red-500 bg-red-50 border border-red-200 px-2 py-0.5 rounded">Orphan</span>
                        ) : healthy ? (
                          <span className="text-[11px] font-medium text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">Healthy</span>
                        ) : (
                          <span className="text-[11px] font-medium text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">Partial</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Suggestions */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-sm font-semibold text-gray-700">Suggested Internal Links</h2>
            <p className="text-[11px] text-gray-400 mt-0.5">
              Scored by category match, shared tags, keyword overlap, and funnel adjacency. Add the target slug to the source post&apos;s <code className="bg-gray-100 px-1 rounded">internal_links</code> field.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
            <Shuffle size={12} />
            {graph.suggestions.length} opportunities found
          </div>
        </div>
        <LinkSuggestionsTable suggestions={graph.suggestions} />
      </section>

      {/* How scoring works */}
      <section>
        <div className="card p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">How Scoring Works</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { signal: "Same category",    pts: "+30", desc: "Posts in the same category are the strongest natural link candidates." },
              { signal: "Shared tags",       pts: "+7/tag (max 20)", desc: "Posts sharing topic tags have strong semantic overlap." },
              { signal: "Keyword overlap",   pts: "+0–25 (Jaccard)", desc: "Similarity of primary and secondary keyword token sets." },
              { signal: "Funnel adjacent",   pts: "+15 same / +8 adj", desc: "Awareness ↔ Consideration ↔ Decision — guide readers through the funnel." },
              { signal: "Inbound deficit",   pts: "+10 if zero inbound", desc: "Prioritise linking to posts no-one links to yet — spreads link equity." },
            ].map((row) => (
              <div key={row.signal} className="bg-gray-50 rounded-lg px-3 py-2.5">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-gray-700">{row.signal}</span>
                  <span className="text-[11px] font-mono font-bold text-emerald-600">{row.pts}</span>
                </div>
                <p className="text-[11px] text-gray-400">{row.desc}</p>
              </div>
            ))}
            <div className="bg-vc-orange/5 border border-vc-orange/20 rounded-lg px-3 py-2.5">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-gray-700">Minimum threshold</span>
                <span className="text-[11px] font-mono font-bold text-vc-orange">35 pts</span>
              </div>
              <p className="text-[11px] text-gray-400">Suggestions below 35 are omitted as likely irrelevant.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
