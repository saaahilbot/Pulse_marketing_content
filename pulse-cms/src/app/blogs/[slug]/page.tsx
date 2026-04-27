export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllBlogs, getBlogBySlug, getRelatedBlogs } from "@/lib/blogs";
import { getInboundLinks, getSuggestionsForSlug } from "@/lib/linkGraph";
import Header from "@/components/Header";
import { StatusBadge, PriorityBadge, FunnelBadge, ContentTypeBadge } from "@/components/StatusBadge";
import SeoScoreBar from "@/components/SeoScoreBar";
import SeoAuditChecklist from "@/components/SeoAuditChecklist";
import DeleteBlogButton from "@/components/DeleteBlogButton";
import {
  ExternalLink, Calendar, RefreshCw, FileText, Tag,
  Target, Megaphone, Link2, Edit3, AlertCircle,
  CheckCircle, ArrowDownLeft, ArrowRight, Shuffle,
} from "lucide-react";
import clsx from "clsx";

interface Props { params: { slug: string } }


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const blog = getBlogBySlug(params.slug);
  return blog ? { title: blog.title } : { title: "Not Found" };
}

export default function BlogDetailPage({ params }: Props) {
  const blog = getBlogBySlug(params.slug);
  if (!blog) notFound();

  const related      = getRelatedBlogs(blog);
  const inbound      = getInboundLinks(params.slug);
  const suggestions  = getSuggestionsForSlug(params.slug, 4);

  return (
    <div>
      <Header
        title={blog.title}
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "Blogs", href: "/blogs" },
          { label: blog.title },
        ]}
        actions={
          <div className="flex items-center gap-2">
            {blog.source_url && (
              <a href={blog.source_url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-gray-500 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
                <ExternalLink size={12} /> View Live
              </a>
            )}
            <DeleteBlogButton slug={blog.slug} title={blog.title} />
            <Link href={`/blogs/${blog.slug}/edit`}
              className="flex items-center gap-1.5 bg-vc-orange text-white text-xs px-3 py-1.5 rounded-lg font-medium hover:bg-orange-600 transition-colors">
              <Edit3 size={12} /> Edit
            </Link>
          </div>
        }
      />

      <div className="grid grid-cols-3 gap-5">
        {/* ── Main column ──────────────────────────────────────────── */}
        <div className="col-span-2 space-y-5">

          {/* Classification */}
          <div className="card p-4">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Classification</p>
            <div className="flex flex-wrap gap-2">
              <StatusBadge status={blog.status} />
              <PriorityBadge priority={blog.priority} />
              <FunnelBadge stage={blog.funnel_stage} />
              <ContentTypeBadge type={blog.content_type} />
              {blog.featured && (
                <span className="inline-flex items-center px-2 py-0.5 rounded border border-amber-200 text-[11px] font-medium text-amber-600 bg-amber-50">★ Featured</span>
              )}
            </div>
          </div>

          {/* SEO Overview */}
          <div className="card p-5">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-4">SEO Overview</p>
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1.5 text-xs text-gray-500">
                <span>Stored SEO score</span>
                <span className="text-gray-400 text-[11px]">Target: 75+</span>
              </div>
              <SeoScoreBar score={blog.seo_score} />
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <div>
                <p className="text-[10px] text-gray-400 mb-1">Primary Keyword</p>
                <p className="text-xs font-medium text-gray-800 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-lg">
                  {blog.primary_keyword || <span className="text-gray-300">Not set</span>}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 mb-1">Word Count</p>
                <p className="text-xs font-medium text-gray-800 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-lg">
                  ~{blog.word_count_estimate.toLocaleString()} words
                </p>
              </div>
            </div>

            {blog.secondary_keywords.length > 0 && (
              <div className="mt-3">
                <p className="text-[10px] text-gray-400 mb-1.5">Secondary Keywords ({blog.secondary_keywords.length})</p>
                <div className="flex flex-wrap gap-1.5">
                  {blog.secondary_keywords.map((kw) => (
                    <span key={kw} className="text-[11px] bg-gray-50 border border-gray-100 text-gray-600 px-2 py-0.5 rounded">{kw}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-4 pt-4 border-t border-gray-100 space-y-2.5">
              <div>
                <p className="text-[10px] text-gray-400 mb-0.5">Meta Title</p>
                <p className="text-xs text-gray-700">{blog.meta_title || <span className="text-gray-300 italic">Not set</span>}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 mb-0.5">Meta Description</p>
                <p className="text-xs text-gray-600 leading-relaxed">{blog.meta_description || <span className="text-gray-300 italic">Not set</span>}</p>
                {blog.meta_description && (
                  <span className={clsx("text-[10px] font-medium mt-1 flex items-center gap-1",
                    blog.meta_description.length <= 160 ? "text-emerald-600" : "text-red-500")}>
                    {blog.meta_description.length <= 160
                      ? <><CheckCircle size={10} /> {blog.meta_description.length}/160 chars</>
                      : <><AlertCircle size={10} /> {blog.meta_description.length}/160 — too long</>
                    }
                  </span>
                )}
              </div>
              {blog.canonical_url && (
                <div>
                  <p className="text-[10px] text-gray-400 mb-0.5">Canonical URL</p>
                  <p className="text-[11px] text-gray-500 break-all">{blog.canonical_url}</p>
                </div>
              )}
              {blog.schema_types && blog.schema_types.length > 0 && (
                <div>
                  <p className="text-[10px] text-gray-400 mb-1">Schema Types</p>
                  <div className="flex flex-wrap gap-1">
                    {blog.schema_types.map((t) => (
                      <span key={t} className="text-[10px] bg-blue-50 border border-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-mono">{t}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* SEO Audit */}
          <SeoAuditChecklist blog={blog} />

          {/* Content preview */}
          <div className="card p-5">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-4">Content Preview</p>
            <div className="prose max-w-none text-sm">
              {blog.content.split("\n").slice(0, 30).map((line, i) => {
                if (line.startsWith("## ")) return <h2 key={i}>{line.slice(3)}</h2>;
                if (line.startsWith("# "))  return <h1 key={i}>{line.slice(2)}</h1>;
                if (line.startsWith("### ")) return <h3 key={i}>{line.slice(4)}</h3>;
                if (line.startsWith("> "))   return <blockquote key={i}>{line.slice(2)}</blockquote>;
                if (line.trim() === "")      return <br key={i} />;
                return <p key={i}>{line}</p>;
              })}
            </div>
            {blog.source_url && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <a href={blog.source_url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-vc-orange hover:underline">
                  <ExternalLink size={12} /> Read full article on VantageCircle.com
                </a>
              </div>
            )}
          </div>
        </div>

        {/* ── Sidebar ──────────────────────────────────────────────── */}
        <div className="space-y-4">

          {/* Details */}
          <div className="card p-4">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Details</p>
            <div className="space-y-2.5 text-xs">
              {[
                { icon: Calendar,   label: "Published",    value: blog.publish_date  || "—" },
                { icon: RefreshCw,  label: "Last Updated", value: blog.last_updated  || "—" },
                { icon: FileText,   label: "Author",       value: blog.author },
                { icon: Tag,        label: "Category",     value: blog.category },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-2.5">
                  <Icon size={13} className="text-gray-300 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[10px] text-gray-400">{label}</p>
                    <p className="text-gray-700 font-medium">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Conversion */}
          <div className="card p-4">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Conversion Signals</p>
            <div className="space-y-2">
              {[
                { icon: Megaphone, label: "Product Mention", ok: blog.has_product_mention },
                { icon: Target,    label: "Has CTA",         ok: blog.has_cta },
              ].map(({ icon: Icon, label, ok }) => (
                <div key={label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Icon size={13} className="text-gray-300" /> {label}
                  </div>
                  <span className={clsx("text-[11px] font-medium px-2 py-0.5 rounded border",
                    ok ? "text-emerald-700 bg-emerald-50 border-emerald-200" : "text-red-500 bg-red-50 border-red-200")}>
                    {ok ? "Yes" : "Missing"}
                  </span>
                </div>
              ))}
              {(!blog.has_product_mention || !blog.has_cta) && (
                <p className="text-[11px] text-amber-600 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 mt-2">
                  {!blog.has_product_mention && "Add a Vantage Pulse mention. "}
                  {!blog.has_cta && "Add a demo/trial CTA."}
                </p>
              )}
            </div>
          </div>

          {/* ── Inbound Links ───────────────────────────── */}
          <div className="card p-4">
            <div className="flex items-center gap-2 mb-3">
              <ArrowDownLeft size={13} className="text-gray-400" />
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                Inbound Links ({inbound.length})
              </p>
            </div>
            {inbound.length === 0 ? (
              <p className="text-[11px] text-amber-600 bg-amber-50 border border-amber-100 rounded px-3 py-2">
                No other posts link to this one yet.{" "}
                <Link href="/links" className="underline text-amber-700 hover:text-amber-900">View link suggestions →</Link>
              </p>
            ) : (
              <div className="space-y-1.5">
                {inbound.map((node) => (
                  <Link key={node.slug} href={`/blogs/${node.slug}`}
                    className="flex items-center gap-2 text-xs text-gray-700 hover:text-vc-orange transition-colors">
                    <ArrowRight size={11} className="text-gray-300 flex-shrink-0" />
                    <span className="line-clamp-1">{node.title}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* ── Outbound Links ──────────────────────────── */}
          {blog.internal_links.length > 0 && (
            <div className="card p-4">
              <div className="flex items-center gap-2 mb-3">
                <Link2 size={13} className="text-gray-400" />
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                  Outbound Links ({blog.internal_links.length})
                </p>
              </div>
              <div className="space-y-1.5">
                {blog.internal_links.map((slug) => (
                  <Link key={slug} href={`/blogs/${slug}`}
                    className="flex items-center gap-2 text-xs text-gray-700 hover:text-vc-orange transition-colors">
                    <ArrowRight size={11} className="text-gray-300 flex-shrink-0" />
                    <span className="line-clamp-1">{slug.replace(/-/g, " ")}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* ── Suggested Links ─────────────────────────── */}
          {suggestions.length > 0 && (
            <div className="card p-4">
              <div className="flex items-center gap-2 mb-3">
                <Shuffle size={13} className="text-gray-400" />
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Suggested Links</p>
              </div>
              <div className="space-y-2.5">
                {suggestions.map((s) => (
                  <div key={s.toSlug} className="flex items-start gap-2.5 group">
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded tabular-nums mt-0.5 flex-shrink-0">
                      {s.score}
                    </span>
                    <div className="flex-1 min-w-0">
                      <Link href={`/blogs/${s.toSlug}`}
                        className="text-xs font-medium text-gray-700 hover:text-vc-orange transition-colors line-clamp-1">
                        {s.toTitle}
                      </Link>
                      <p className="text-[10px] text-gray-400 mt-0.5">
                        {s.reasons.join(" · ").replace(/-/g, " ")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/links" className="flex items-center gap-1 text-[11px] text-vc-orange hover:underline mt-3">
                View all suggestions <ArrowRight size={11} />
              </Link>
            </div>
          )}

          {/* Tags */}
          {blog.tags.length > 0 && (
            <div className="card p-4">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Tags</p>
              <div className="flex flex-wrap gap-1.5">
                {blog.tags.map((tag) => (
                  <span key={tag} className="text-[11px] bg-gray-50 border border-gray-100 text-gray-500 px-2 py-0.5 rounded">{tag}</span>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          {blog.notes && (
            <div className="card p-4 border-l-2 border-l-amber-300">
              <p className="text-[10px] font-semibold text-amber-600 mb-2">Editorial Notes</p>
              <p className="text-[11px] text-gray-500 leading-relaxed">{blog.notes}</p>
            </div>
          )}
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-8">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Related in Category</h2>
          <div className="grid grid-cols-4 gap-3">
            {related.map((r) => (
              <Link key={r.slug} href={`/blogs/${r.slug}`}
                className="card p-4 block hover:shadow-card-hover transition-shadow group border-t-2 border-t-transparent hover:border-t-vc-orange">
                <StatusBadge status={r.status} />
                <h3 className="mt-2 text-sm font-medium text-gray-800 group-hover:text-vc-orange transition-colors line-clamp-2">{r.title}</h3>
                <p className="text-[11px] text-gray-400 mt-1.5">SEO {r.seo_score}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
