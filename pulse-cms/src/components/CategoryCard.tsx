import Link from "next/link";
import type { CategoryStats } from "@/lib/types";
import { AlertCircle } from "lucide-react";
import clsx from "clsx";

export default function CategoryCard({ stats }: { stats: CategoryStats }) {
  const slug = encodeURIComponent(stats.name);
  const seoOk = stats.avgSeoScore >= 75;
  const seoMid = stats.avgSeoScore >= 65;

  return (
    <Link
      href={`/categories/${slug}`}
      className="card p-4 block hover:shadow-card-hover transition-shadow group border-t-2 border-t-transparent hover:border-t-vc-orange"
    >
      <div className="flex items-start justify-between mb-3">
        <p className="text-sm font-semibold text-gray-900 leading-snug group-hover:text-vc-orange transition-colors max-w-[9rem]">
          {stats.name}
        </p>
        <span className="text-2xl font-bold text-gray-900 ml-2 flex-shrink-0">{stats.count}</span>
      </div>

      <div className="space-y-1.5 text-[12px] text-gray-500 mb-3">
        <div className="flex justify-between">
          <span>Published</span>
          <span className="font-medium text-emerald-600">{stats.published}</span>
        </div>
        {stats.needsUpdate > 0 && (
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-1"><AlertCircle size={10} className="text-amber-500" />Update needed</span>
            <span className="font-medium text-amber-600">{stats.needsUpdate}</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-2.5 border-t border-gray-100 text-[11px]">
        <span className="text-gray-400">Avg SEO</span>
        <span className={clsx("font-semibold", seoOk ? "text-emerald-600" : seoMid ? "text-amber-600" : "text-red-500")}>
          {stats.avgSeoScore}
        </span>
      </div>
    </Link>
  );
}
