export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCategories, getBlogsByCategory } from "@/lib/blogs";
import Header from "@/components/Header";
import { StatusBadge, PriorityBadge } from "@/components/StatusBadge";
import SeoScoreBar from "@/components/SeoScoreBar";
import { ExternalLink } from "lucide-react";

interface Props {
  params: { name: string };
}


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const name = decodeURIComponent(params.name);
  return { title: name };
}

export default function CategoryDetailPage({ params }: Props) {
  const name = decodeURIComponent(params.name);
  const blogs = getBlogsByCategory(name);

  if (blogs.length === 0) notFound();

  const avgSeo = Math.round(blogs.reduce((s, b) => s + b.seo_score, 0) / blogs.length);
  const published = blogs.filter((b) => b.status === "published").length;

  return (
    <div>
      <Header
        title={name}
        subtitle={`${blogs.length} articles · ${published} published · Avg SEO ${avgSeo}`}
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "Categories", href: "/categories" },
          { label: name },
        ]}
      />

      <div className="bg-white rounded-xl shadow-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-5 py-3 font-semibold text-gray-600">Title</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Status</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Priority</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600 min-w-36">SEO Score</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Word Count</th>
              <th className="text-right px-4 py-3 font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {blogs.map((blog) => (
              <tr key={blog.slug} className="hover:bg-gray-50/50 group transition-colors">
                <td className="px-5 py-3 max-w-sm">
                  <Link href={`/blogs/${blog.slug}`} className="font-medium text-vc-navy hover:text-vc-orange transition-colors line-clamp-2">
                    {blog.title}
                  </Link>
                  <p className="text-xs text-gray-400 mt-0.5">{blog.primary_keyword}</p>
                </td>
                <td className="px-4 py-3"><StatusBadge status={blog.status} /></td>
                <td className="px-4 py-3"><PriorityBadge priority={blog.priority} /></td>
                <td className="px-4 py-3 min-w-36"><SeoScoreBar score={blog.seo_score} showLabel={false} size="sm" /></td>
                <td className="px-4 py-3 text-xs text-gray-500 tabular-nums">{blog.word_count_estimate.toLocaleString()}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link href={`/blogs/${blog.slug}`} className="text-xs px-2 py-1 border border-gray-200 rounded text-gray-600 hover:bg-gray-50">View</Link>
                    {blog.source_url && (
                      <a href={blog.source_url} target="_blank" rel="noopener noreferrer" className="p-1.5 text-gray-400 hover:text-vc-orange">
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
    </div>
  );
}
