"use client";

import Link from "next/link";
import type { LinkNode } from "@/lib/types";
import { AlertTriangle, ExternalLink } from "lucide-react";

export default function OrphanPostsPanel({ orphans }: { orphans: LinkNode[] }) {
  if (orphans.length === 0) {
    return (
      <div className="card p-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
          <span className="text-emerald-600 text-base">✓</span>
        </div>
        <p className="text-sm text-gray-600">No orphan posts — every article has at least one inbound or outbound link.</p>
      </div>
    );
  }

  // Group by category
  const byCategory: Record<string, LinkNode[]> = {};
  orphans.forEach((n) => {
    if (!byCategory[n.category]) byCategory[n.category] = [];
    byCategory[n.category].push(n);
  });

  return (
    <div className="card overflow-hidden">
      <div className="px-5 py-3.5 border-b border-gray-100 flex items-center gap-2 bg-amber-50/60">
        <AlertTriangle size={14} className="text-amber-500 flex-shrink-0" />
        <p className="text-sm font-medium text-amber-700">
          {orphans.length} orphan post{orphans.length > 1 ? "s" : ""} — no inbound or outbound links
        </p>
      </div>
      <div className="divide-y divide-gray-50">
        {Object.entries(byCategory).map(([category, nodes]) => (
          <div key={category} className="px-5 py-3">
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">{category}</p>
            <div className="space-y-1.5">
              {nodes.map((node) => (
                <div key={node.slug} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                  <Link href={`/blogs/${node.slug}`} className="flex-1 text-sm text-gray-700 hover:text-vc-orange transition-colors truncate">
                    {node.title}
                  </Link>
                  <span className="text-[10px] text-gray-400 font-mono flex-shrink-0">{node.slug}</span>
                  <Link href={`/links?from=${node.slug}`} className="text-[11px] text-vc-orange hover:underline flex items-center gap-0.5 flex-shrink-0">
                    Suggest links <ExternalLink size={10} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
