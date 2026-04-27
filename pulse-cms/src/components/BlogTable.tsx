"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { Blog, BlogStatus, BlogPriority, FunnelStage } from "@/lib/types";
import { StatusBadge, PriorityBadge, FunnelBadge } from "./StatusBadge";
import SeoScoreBar from "./SeoScoreBar";
import { Search, ChevronUp, ChevronDown, ExternalLink, Eye, X } from "lucide-react";
import clsx from "clsx";

type SortField = "title" | "seo_score" | "status" | "priority" | "category" | "word_count_estimate";
type SortDir = "asc" | "desc";

export default function BlogTable({ blogs, categories }: { blogs: Blog[]; categories: string[] }) {
  const [search, setSearch]             = useState("");
  const [catFilter, setCatFilter]       = useState("all");
  const [statusFilter, setStatusFilter] = useState<BlogStatus | "all">("all");
  const [priFilter, setPriFilter]       = useState<BlogPriority | "all">("all");
  const [funnelFilter, setFunnelFilter] = useState<FunnelStage | "all">("all");
  const [prodFilter, setProdFilter]     = useState<"all" | "yes" | "no">("all");
  const [sortField, setSortField]       = useState<SortField>("seo_score");
  const [sortDir, setSortDir]           = useState<SortDir>("desc");
  const [page, setPage]                 = useState(1);
  const PER = 15;

  const filtered = useMemo(() => {
    let r = [...blogs];
    if (search.trim()) {
      const q = search.toLowerCase();
      r = r.filter((b) =>
        b.title.toLowerCase().includes(q) ||
        b.primary_keyword.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q) ||
        b.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    if (catFilter    !== "all") r = r.filter((b) => b.category    === catFilter);
    if (statusFilter !== "all") r = r.filter((b) => b.status      === statusFilter);
    if (priFilter    !== "all") r = r.filter((b) => b.priority    === priFilter);
    if (funnelFilter !== "all") r = r.filter((b) => b.funnel_stage === funnelFilter);
    if (prodFilter   === "yes") r = r.filter((b) => b.has_product_mention);
    if (prodFilter   === "no")  r = r.filter((b) => !b.has_product_mention);

    r.sort((a, b) => {
      let av: string | number = a[sortField] as string | number;
      let bv: string | number = b[sortField] as string | number;
      if (typeof av === "string") av = av.toLowerCase();
      if (typeof bv === "string") bv = bv.toLowerCase();
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return r;
  }, [blogs, search, catFilter, statusFilter, priFilter, funnelFilter, prodFilter, sortField, sortDir]);

  const totalPages = Math.ceil(filtered.length / PER);
  const paginated  = filtered.slice((page - 1) * PER, page * PER);
  const hasFilters = !!(search || catFilter !== "all" || statusFilter !== "all" || priFilter !== "all" || funnelFilter !== "all" || prodFilter !== "all");

  function handleSort(f: SortField) {
    if (sortField === f) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortField(f); setSortDir("desc"); }
    setPage(1);
  }

  function SortIcon({ field }: { field: SortField }) {
    if (sortField !== field) return <ChevronUp size={12} className="text-gray-300" />;
    return sortDir === "asc"
      ? <ChevronUp size={12} className="text-vc-orange" />
      : <ChevronDown size={12} className="text-vc-orange" />;
  }

  const selectCls = "text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 bg-white text-gray-600 focus:outline-none focus:ring-1 focus:ring-vc-orange/40 focus:border-vc-orange";

  return (
    <div className="space-y-3">
      {/* Filters */}
      <div className="card p-3.5">
        <div className="flex flex-wrap gap-2 items-center">
          <div className="relative flex-1 min-w-48">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text" placeholder="Search title, keyword, tag…"
              value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-vc-orange/40 focus:border-vc-orange"
            />
          </div>
          <select value={catFilter} onChange={(e) => { setCatFilter(e.target.value); setPage(1); }} className={selectCls}>
            <option value="all">All Categories</option>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value as BlogStatus | "all"); setPage(1); }} className={selectCls}>
            <option value="all">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="needs-update">Needs Update</option>
            <option value="review">In Review</option>
          </select>
          <select value={priFilter} onChange={(e) => { setPriFilter(e.target.value as BlogPriority | "all"); setPage(1); }} className={selectCls}>
            <option value="all">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <select value={funnelFilter} onChange={(e) => { setFunnelFilter(e.target.value as FunnelStage | "all"); setPage(1); }} className={selectCls}>
            <option value="all">All Stages</option>
            <option value="awareness">Awareness</option>
            <option value="consideration">Consideration</option>
            <option value="decision">Decision</option>
          </select>
          <select value={prodFilter} onChange={(e) => { setProdFilter(e.target.value as "all" | "yes" | "no"); setPage(1); }} className={selectCls}>
            <option value="all">Product: All</option>
            <option value="yes">Has Mention</option>
            <option value="no">No Mention</option>
          </select>
          {hasFilters && (
            <button onClick={() => { setSearch(""); setCatFilter("all"); setStatusFilter("all"); setPriFilter("all"); setFunnelFilter("all"); setProdFilter("all"); setPage(1); }}
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 transition-colors">
              <X size={12} /> Clear
            </button>
          )}
        </div>
        <div className="flex items-center justify-between mt-2.5 pt-2.5 border-t border-gray-100">
          <p className="text-[11px] text-gray-400">
            {hasFilters ? <><span className="font-semibold text-gray-700">{filtered.length}</span> results</> : <><span className="font-semibold text-gray-700">{blogs.length}</span> articles</>}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-4 py-2.5 bg-gray-50/70">
                  <button onClick={() => handleSort("title")} className="flex items-center gap-1 text-[11px] font-semibold text-gray-500 uppercase tracking-wide hover:text-gray-700">
                    Title <SortIcon field="title" />
                  </button>
                </th>
                <th className="text-left px-4 py-2.5 bg-gray-50/70">
                  <button onClick={() => handleSort("category")} className="flex items-center gap-1 text-[11px] font-semibold text-gray-500 uppercase tracking-wide hover:text-gray-700">
                    Category <SortIcon field="category" />
                  </button>
                </th>
                <th className="text-left px-4 py-2.5 bg-gray-50/70">
                  <button onClick={() => handleSort("status")} className="flex items-center gap-1 text-[11px] font-semibold text-gray-500 uppercase tracking-wide hover:text-gray-700">
                    Status <SortIcon field="status" />
                  </button>
                </th>
                <th className="text-left px-4 py-2.5 bg-gray-50/70">
                  <button onClick={() => handleSort("priority")} className="flex items-center gap-1 text-[11px] font-semibold text-gray-500 uppercase tracking-wide hover:text-gray-700">
                    Priority <SortIcon field="priority" />
                  </button>
                </th>
                <th className="text-left px-4 py-2.5 bg-gray-50/70 min-w-36">
                  <button onClick={() => handleSort("seo_score")} className="flex items-center gap-1 text-[11px] font-semibold text-gray-500 uppercase tracking-wide hover:text-gray-700">
                    SEO <SortIcon field="seo_score" />
                  </button>
                </th>
                <th className="text-left px-4 py-2.5 bg-gray-50/70 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Funnel</th>
                <th className="text-right px-4 py-2.5 bg-gray-50/70 text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Links</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paginated.map((blog) => (
                <tr key={blog.slug} className="hover:bg-gray-50/40 transition-colors group">
                  <td className="px-4 py-3 max-w-64">
                    <Link href={`/blogs/${blog.slug}`} className="font-medium text-gray-900 hover:text-vc-orange transition-colors line-clamp-2 text-sm leading-snug">
                      {blog.title}
                    </Link>
                    <p className="text-[11px] text-gray-400 mt-0.5 truncate">{blog.primary_keyword}</p>
                    {blog.featured && <span className="text-[10px] text-vc-orange font-semibold">★ Featured</span>}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[11px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{blog.category.split(" & ")[0]}</span>
                  </td>
                  <td className="px-4 py-3"><StatusBadge status={blog.status} /></td>
                  <td className="px-4 py-3"><PriorityBadge priority={blog.priority} /></td>
                  <td className="px-4 py-3 min-w-36"><SeoScoreBar score={blog.seo_score} showLabel={false} size="sm" /></td>
                  <td className="px-4 py-3"><FunnelBadge stage={blog.funnel_stage} /></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href={`/blogs/${blog.slug}`} className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors" title="View">
                        <Eye size={13} />
                      </Link>
                      {blog.source_url && (
                        <a href={blog.source_url} target="_blank" rel="noopener noreferrer" className="p-1.5 text-gray-400 hover:text-vc-orange hover:bg-orange-50 rounded transition-colors" title="Open source">
                          <ExternalLink size={13} />
                        </a>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 bg-gray-50/40">
            <p className="text-[11px] text-gray-400">
              {(page - 1) * PER + 1}–{Math.min(page * PER, filtered.length)} of {filtered.length}
            </p>
            <div className="flex items-center gap-1">
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
                className="px-2.5 py-1 text-[11px] rounded border border-gray-200 text-gray-500 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed">
                ← Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button key={p} onClick={() => setPage(p)}
                  className={clsx("w-7 h-7 text-[11px] rounded font-medium transition-colors",
                    p === page ? "bg-vc-orange text-white" : "text-gray-500 hover:bg-gray-100 border border-gray-200")}>
                  {p}
                </button>
              ))}
              <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                className="px-2.5 py-1 text-[11px] rounded border border-gray-200 text-gray-500 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed">
                Next →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
