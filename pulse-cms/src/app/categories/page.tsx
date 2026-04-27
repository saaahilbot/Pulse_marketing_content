export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { getAnalytics } from "@/lib/blogs";
import Header from "@/components/Header";
import CategoryCard from "@/components/CategoryCard";
import clsx from "clsx";

export const metadata: Metadata = { title: "Categories" };

export default function CategoriesPage() {
  const analytics = getAnalytics();
  const totalNeedsUpdate = analytics.byCategory.reduce((s, c) => s + c.needsUpdate, 0);

  return (
    <div>
      <Header
        title="Categories"
        subtitle={`${analytics.byCategory.length} content categories · ${analytics.totalBlogs} articles`}
        breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Categories" }]}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {analytics.byCategory.map((cat) => <CategoryCard key={cat.name} stats={cat} />)}
      </div>

      <div className="card overflow-hidden">
        <div className="px-5 py-3.5 border-b border-gray-100">
          <h2 className="text-xs font-semibold text-gray-700">Category Breakdown</h2>
          {totalNeedsUpdate > 0 && (
            <p className="text-[11px] text-amber-600 mt-0.5">{totalNeedsUpdate} articles need updating</p>
          )}
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50/70 border-b border-gray-100">
              {["Category", "Total", "Published", "Needs Update", "Draft", "Avg SEO", "High Priority"].map((h) => (
                <th key={h} className={clsx("py-2.5 text-[11px] font-semibold text-gray-500 uppercase tracking-wide", h === "Category" ? "text-left px-5" : "text-center px-4")}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {analytics.byCategory.sort((a, b) => b.count - a.count).map((cat) => (
              <tr key={cat.name} className="hover:bg-gray-50/40 transition-colors">
                <td className="px-5 py-3 text-sm font-medium text-gray-800">{cat.name}</td>
                <td className="px-4 py-3 text-center font-bold text-gray-900">{cat.count}</td>
                <td className="px-4 py-3 text-center text-emerald-600 font-medium text-xs">{cat.published}</td>
                <td className="px-4 py-3 text-center text-xs">
                  {cat.needsUpdate > 0 ? <span className="text-amber-600 font-medium">{cat.needsUpdate}</span> : <span className="text-gray-300">—</span>}
                </td>
                <td className="px-4 py-3 text-center text-xs text-gray-500">{cat.draft > 0 ? cat.draft : <span className="text-gray-300">—</span>}</td>
                <td className="px-4 py-3 text-center text-xs">
                  <span className={clsx("font-semibold", cat.avgSeoScore >= 75 ? "text-emerald-600" : cat.avgSeoScore >= 65 ? "text-amber-600" : "text-red-500")}>
                    {cat.avgSeoScore}
                  </span>
                </td>
                <td className="px-4 py-3 text-center text-xs text-gray-500">{cat.highPriority}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
