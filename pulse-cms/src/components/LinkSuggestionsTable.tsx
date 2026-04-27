"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { LinkSuggestion, SuggestionReason } from "@/lib/types";
import { ArrowRight, Search, Check, X } from "lucide-react";
import clsx from "clsx";

const REASON_LABELS: Record<SuggestionReason, { label: string; color: string }> = {
  "same-category":  { label: "Same category",    color: "bg-blue-50 text-blue-600 border-blue-200" },
  "shared-tag":     { label: "Shared tag",        color: "bg-purple-50 text-purple-600 border-purple-200" },
  "keyword-overlap":{ label: "Keyword overlap",   color: "bg-emerald-50 text-emerald-600 border-emerald-200" },
  "funnel-adjacent":{ label: "Funnel adjacent",   color: "bg-violet-50 text-violet-600 border-violet-200" },
  "inbound-deficit":{ label: "No inbound links",  color: "bg-amber-50 text-amber-600 border-amber-200" },
};

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 70 ? "text-emerald-600 bg-emerald-50" : score >= 50 ? "text-amber-600 bg-amber-50" : "text-gray-500 bg-gray-50";
  return (
    <span className={clsx("text-xs font-bold px-2 py-0.5 rounded tabular-nums", color)}>{score}</span>
  );
}

export default function LinkSuggestionsTable({ suggestions }: { suggestions: LinkSuggestion[] }) {
  const [search, setSearch]         = useState("");
  const [scoreMin, setScoreMin]     = useState(35);
  const [copied, setCopied]         = useState<string | null>(null);

  const filtered = useMemo(() => {
    let r = suggestions.filter((s) => s.score >= scoreMin);
    if (search.trim()) {
      const q = search.toLowerCase();
      r = r.filter((s) =>
        s.fromTitle.toLowerCase().includes(q) ||
        s.toTitle.toLowerCase().includes(q) ||
        s.fromSlug.toLowerCase().includes(q) ||
        s.toSlug.toLowerCase().includes(q)
      );
    }
    return r;
  }, [suggestions, search, scoreMin]);

  function copySlug(slug: string) {
    navigator.clipboard.writeText(slug);
    setCopied(slug);
    setTimeout(() => setCopied(null), 1500);
  }

  return (
    <div className="space-y-3">
      {/* Controls */}
      <div className="flex flex-wrap gap-2 items-center">
        <div className="relative flex-1 min-w-48">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Filter by post title or slug…"
            value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-vc-orange/40 focus:border-vc-orange" />
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>Min score:</span>
          <select value={scoreMin} onChange={(e) => setScoreMin(Number(e.target.value))}
            className="border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs bg-white focus:outline-none">
            <option value={35}>35+</option>
            <option value={50}>50+</option>
            <option value={65}>65+</option>
            <option value={75}>75+</option>
          </select>
        </div>
        <span className="text-[11px] text-gray-400">{filtered.length} suggestions</span>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/70">
                <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-gray-500 uppercase tracking-wide w-12">Score</th>
                <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">From Post</th>
                <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">To Post</th>
                <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Why</th>
                <th className="text-right px-4 py-2.5 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.slice(0, 50).map((s, i) => (
                <tr key={`${s.fromSlug}-${s.toSlug}-${i}`} className="hover:bg-gray-50/40 transition-colors group">
                  <td className="px-4 py-3"><ScoreBadge score={s.score} /></td>
                  <td className="px-4 py-3 max-w-52">
                    <Link href={`/blogs/${s.fromSlug}`} className="text-sm font-medium text-gray-800 hover:text-vc-orange transition-colors line-clamp-2">
                      {s.fromTitle}
                    </Link>
                    <p className="text-[10px] text-gray-400 mt-0.5 font-mono">{s.fromSlug}</p>
                  </td>
                  <td className="px-4 py-3 max-w-52">
                    <div className="flex items-center gap-1.5">
                      <ArrowRight size={12} className="text-gray-300 flex-shrink-0" />
                      <div>
                        <Link href={`/blogs/${s.toSlug}`} className="text-sm font-medium text-gray-800 hover:text-vc-orange transition-colors line-clamp-2">
                          {s.toTitle}
                        </Link>
                        <p className="text-[10px] text-gray-400 mt-0.5 font-mono">{s.toSlug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 max-w-48">
                    <div className="flex flex-wrap gap-1">
                      {s.reasons.map((r) => (
                        <span key={r} className={clsx("text-[10px] px-1.5 py-0.5 rounded border font-medium", REASON_LABELS[r]?.color)}>
                          {REASON_LABELS[r]?.label ?? r}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 justify-end">
                      <button
                        onClick={() => copySlug(s.toSlug)}
                        title="Copy target slug to clipboard"
                        className={clsx("flex items-center gap-1 text-[11px] px-2 py-1 rounded border transition-all",
                          copied === s.toSlug
                            ? "border-emerald-200 text-emerald-600 bg-emerald-50"
                            : "border-gray-200 text-gray-500 hover:border-vc-orange/40 hover:text-vc-orange hover:bg-orange-50"
                        )}
                      >
                        {copied === s.toSlug ? <><Check size={10} /> Copied</> : "Copy slug"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-sm text-gray-400">No suggestions match your filters.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {filtered.length > 50 && (
          <div className="px-4 py-2.5 border-t border-gray-100 bg-gray-50/40 text-[11px] text-gray-400">
            Showing top 50 of {filtered.length} suggestions. Raise the min score to narrow results.
          </div>
        )}
      </div>
    </div>
  );
}
