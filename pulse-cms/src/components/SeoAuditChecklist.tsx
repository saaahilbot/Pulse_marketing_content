"use client";

import { useState, useTransition } from "react";
import { CheckCircle, AlertCircle, XCircle, Loader2, RefreshCw } from "lucide-react";
import clsx from "clsx";
import type { Blog } from "@/lib/types";
import { fetchBlogDataFromUrl, type ImportedBlogData } from "@/app/actions";

type CheckStatus = "pass" | "warn" | "fail";
type AuditCheck  = { label: string; status: CheckStatus; detail: string };
type Section     = { name: string; checks: AuditCheck[] };

function auditCheck(label: string, status: CheckStatus, detail: string): AuditCheck {
  return { label, status, detail };
}

function computeAudit(blog: Blog, liveData: ImportedBlogData | null): Section[] {
  const kw = (blog.primary_keyword ?? "").toLowerCase();

  // ── Title ────────────────────────────────────────────────────────────────
  const titleLen = blog.meta_title?.length ?? 0;
  const titleChecks: AuditCheck[] = [
    blog.meta_title
      ? auditCheck("Meta title present", "pass", `"${blog.meta_title.slice(0, 60)}${blog.meta_title.length > 60 ? "…" : ""}"`)
      : auditCheck("Meta title present", "fail", "No meta title set"),
    titleLen === 0
      ? auditCheck("Meta title length", "fail", "No meta title to measure")
      : titleLen >= 50 && titleLen <= 60
        ? auditCheck("Meta title length", "pass", `${titleLen} chars — ideal 50–60`)
        : titleLen > 60 && titleLen <= 70
          ? auditCheck("Meta title length", "warn", `${titleLen} chars — slightly over 60, may truncate in SERPs`)
          : titleLen > 70
            ? auditCheck("Meta title length", "fail", `${titleLen} chars — too long, will truncate in SERPs`)
            : auditCheck("Meta title length", "warn", `${titleLen} chars — below 50, could be more descriptive`),
    kw && blog.meta_title
      ? blog.meta_title.toLowerCase().includes(kw)
          ? auditCheck("Primary keyword in title", "pass", `"${kw}" found in meta title`)
          : auditCheck("Primary keyword in title", "warn", `"${kw}" not found in meta title`)
      : auditCheck("Primary keyword in title", "warn", "No primary keyword set to check"),
  ];

  // ── Meta description ─────────────────────────────────────────────────────
  const descLen = blog.meta_description?.length ?? 0;
  const descChecks: AuditCheck[] = [
    blog.meta_description
      ? auditCheck("Meta description present", "pass", `${descLen} chars`)
      : auditCheck("Meta description present", "fail", "Missing — search engines will auto-generate a snippet"),
    descLen === 0
      ? auditCheck("Meta description length", "fail", "No meta description to measure")
      : descLen >= 140 && descLen <= 160
        ? auditCheck("Meta description length", "pass", `${descLen} chars — ideal 140–160`)
        : descLen > 160 && descLen <= 180
          ? auditCheck("Meta description length", "warn", `${descLen} chars — over 160, may truncate`)
          : descLen > 180
            ? auditCheck("Meta description length", "fail", `${descLen} chars — too long, will cut off`)
            : descLen >= 120
              ? auditCheck("Meta description length", "warn", `${descLen} chars — a bit short, aim for 140+`)
              : auditCheck("Meta description length", "fail", `${descLen} chars — too short`),
    kw && blog.meta_description
      ? blog.meta_description.toLowerCase().includes(kw)
          ? auditCheck("Keyword in description", "pass", `"${kw}" found in meta description`)
          : auditCheck("Keyword in description", "warn", `"${kw}" not found — add it naturally`)
      : auditCheck("Keyword in description", "warn", "No primary keyword set to check"),
  ];

  // ── URL / Slug ───────────────────────────────────────────────────────────
  const slugLen = blog.slug?.length ?? 0;
  const kwWords = kw.split(/\s+/).filter(Boolean);
  const slugWords = blog.slug?.split("-") ?? [];
  const kwInSlug = kwWords.length > 0 && kwWords.every((w) => slugWords.includes(w));
  const kwPartial = !kwInSlug && kwWords.some((w) => slugWords.includes(w));

  const urlChecks: AuditCheck[] = [
    kwInSlug
      ? auditCheck("Keyword in slug", "pass", `All words of "${kw}" appear in the slug`)
      : kwPartial
          ? auditCheck("Keyword in slug", "warn", `Only some keyword words in slug "${blog.slug}"`)
          : auditCheck("Keyword in slug", "warn", `"${kw}" not in slug "${blog.slug}"`),
    slugLen <= 50
      ? auditCheck("Slug length", "pass", `${slugLen} chars — concise`)
      : slugLen <= 70
        ? auditCheck("Slug length", "warn", `${slugLen} chars — a bit long`)
        : auditCheck("Slug length", "fail", `${slugLen} chars — too long`),
    blog.source_url
      ? auditCheck("Source URL set", "pass", blog.source_url)
      : auditCheck("Source URL set", "warn", "No live URL recorded"),
    (liveData?.canonical_url || blog.canonical_url)
      ? auditCheck("Canonical URL", "pass", liveData?.canonical_url || blog.canonical_url || "")
      : auditCheck("Canonical URL", "warn", "Canonical URL not stored — verify the live page has rel=canonical"),
  ];

  // ── Content ──────────────────────────────────────────────────────────────
  const wc = blog.word_count_estimate ?? 0;
  const secKwCount = blog.secondary_keywords?.length ?? 0;
  const internalCount = blog.internal_links?.length ?? 0;

  const contentChecks: AuditCheck[] = [
    wc >= 2000
      ? auditCheck("Word count", "pass", `~${wc.toLocaleString()} words — strong pillar content`)
      : wc >= 1200
        ? auditCheck("Word count", "pass", `~${wc.toLocaleString()} words — solid length`)
        : wc >= 700
          ? auditCheck("Word count", "warn", `~${wc.toLocaleString()} words — aim for 1200+ for competitive rankings`)
          : wc > 0
            ? auditCheck("Word count", "fail", `~${wc.toLocaleString()} words — thin content`)
            : auditCheck("Word count", "warn", "Word count not recorded"),
    secKwCount >= 4
      ? auditCheck("Secondary keywords", "pass", `${secKwCount} LSI / long-tail variants`)
      : secKwCount >= 2
        ? auditCheck("Secondary keywords", "warn", `${secKwCount} — aim for 4+ for better semantic coverage`)
        : auditCheck("Secondary keywords", "fail", `${secKwCount} — add LSI and long-tail variants`),
    internalCount >= 3
      ? auditCheck("Internal links (outbound)", "pass", `${internalCount} internal links`)
      : internalCount >= 1
        ? auditCheck("Internal links (outbound)", "warn", `${internalCount} internal link(s) — add more`)
        : auditCheck("Internal links (outbound)", "fail", "No internal links — isolated post"),
  ];

  // ── Schema — uses live-fetched data if available ──────────────────────────
  const hasSchemaData = liveData !== null
    ? liveData.has_schema
    : blog.has_schema;
  const schemaTypes = liveData !== null
    ? (liveData.schema_types ?? [])
    : (blog.schema_types ?? []);

  const schemaChecks: AuditCheck[] = [];
  if (hasSchemaData === undefined) {
    // No data yet — button is shown separately below
    schemaChecks.push(auditCheck("Schema markup", "warn", "Not yet checked — click \" Check Live\" to fetch from the published URL"));
  } else if (hasSchemaData) {
    schemaChecks.push(auditCheck("Schema markup (JSON-LD)", "pass", `Found: ${schemaTypes.join(", ") || "present"}`));
    const hasArticle = schemaTypes.some((t) => ["Article", "BlogPosting", "NewsArticle"].includes(t));
    schemaChecks.push(hasArticle
      ? auditCheck("Article schema", "pass", "BlogPosting / Article schema detected")
      : auditCheck("Article schema", "warn", "No Article/BlogPosting schema — add for rich results"));
    const hasFaq = schemaTypes.some((t) => t === "FAQPage");
    schemaChecks.push(hasFaq
      ? auditCheck("FAQ schema", "pass", "FAQPage schema detected — eligible for FAQ rich results")
      : auditCheck("FAQ schema", "warn", "No FAQPage schema — consider adding if post has Q&A sections"));
    const hasBreadcrumb = schemaTypes.some((t) => t === "BreadcrumbList");
    schemaChecks.push(hasBreadcrumb
      ? auditCheck("Breadcrumb schema", "pass", "BreadcrumbList schema detected")
      : auditCheck("Breadcrumb schema", "warn", "No BreadcrumbList schema"));
  } else {
    schemaChecks.push(auditCheck("Schema markup (JSON-LD)", "fail", "No structured data found — add Article + FAQ schema for rich results"));
  }

  // ── Conversion ───────────────────────────────────────────────────────────
  const conversionChecks: AuditCheck[] = [
    blog.has_product_mention
      ? auditCheck("Product mention", "pass", "Post mentions Vantage Pulse")
      : auditCheck("Product mention", "warn", "No Vantage Pulse mention"),
    blog.has_cta
      ? auditCheck("Has CTA", "pass", "Post has a demo / trial CTA")
      : auditCheck("Has CTA", "warn", "No CTA — add a demo link or trial prompt"),
  ];

  // ── Technical ────────────────────────────────────────────────────────────
  const tagCount = blog.tags?.length ?? 0;
  const technicalChecks: AuditCheck[] = [
    tagCount >= 3
      ? auditCheck("Tags", "pass", `${tagCount} tags`)
      : tagCount >= 1
        ? auditCheck("Tags", "warn", `${tagCount} tag(s) — add more for better categorisation`)
        : auditCheck("Tags", "fail", "No tags"),
    blog.author
      ? auditCheck("Author set", "pass", blog.author)
      : auditCheck("Author set", "warn", "No author — E-E-A-T signals benefit from a named author"),
  ];

  return [
    { name: "Title",            checks: titleChecks },
    { name: "Meta Description", checks: descChecks },
    { name: "URL & Slug",       checks: urlChecks },
    { name: "Content",          checks: contentChecks },
    { name: "Schema Markup",    checks: schemaChecks },
    { name: "Conversion",       checks: conversionChecks },
    { name: "Technical",        checks: technicalChecks },
  ];
}

function CheckRow({ c }: { c: AuditCheck }) {
  return (
    <div className="flex items-start gap-2.5 py-2 border-b border-gray-50 last:border-0">
      {c.status === "pass"
        ? <CheckCircle size={13} className="text-emerald-500 flex-shrink-0 mt-0.5" />
        : c.status === "warn"
          ? <AlertCircle size={13} className="text-amber-400 flex-shrink-0 mt-0.5" />
          : <XCircle size={13} className="text-red-400 flex-shrink-0 mt-0.5" />
      }
      <div className="min-w-0">
        <p className="text-xs font-medium text-gray-700">{c.label}</p>
        <p className="text-[11px] text-gray-400 mt-0.5 break-words">{c.detail}</p>
      </div>
    </div>
  );
}

export default function SeoAuditChecklist({ blog }: { blog: Blog }) {
  const [liveData, setLiveData] = useState<ImportedBlogData | null>(null);
  const [liveError, setLiveError] = useState<string | null>(null);
  const [checking, startChecking] = useTransition();

  function handleLiveCheck() {
    if (!blog.source_url) return;
    setLiveError(null);
    startChecking(async () => {
      const data = await fetchBlogDataFromUrl(blog.source_url);
      if (data.error) { setLiveError(data.error); return; }
      setLiveData(data);
    });
  }

  const sections = computeAudit(blog, liveData);
  const allChecks = sections.flatMap((s) => s.checks);
  const passes = allChecks.filter((c) => c.status === "pass").length;
  const warns  = allChecks.filter((c) => c.status === "warn").length;
  const fails  = allChecks.filter((c) => c.status === "fail").length;
  const total  = allChecks.length;
  const score  = Math.round(((passes * 2 + warns) / (total * 2)) * 100);

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">SEO Audit</p>
        <div className="flex items-center gap-2">
          {blog.source_url && (
            <button
              onClick={handleLiveCheck}
              disabled={checking}
              className="flex items-center gap-1 text-[11px] text-blue-500 hover:text-blue-700 border border-blue-200 bg-blue-50 px-2 py-0.5 rounded transition-colors disabled:opacity-50"
            >
              {checking ? <Loader2 size={10} className="animate-spin" /> : <RefreshCw size={10} />}
              {liveData ? "Re-check Live" : "Check Live"}
            </button>
          )}
          <span className="text-[11px] text-emerald-600 font-medium">{passes}✓</span>
          <span className="text-[11px] text-amber-500 font-medium">{warns}!</span>
          <span className="text-[11px] text-red-400 font-medium">{fails}✗</span>
          <span className={clsx(
            "text-[11px] font-bold px-2 py-0.5 rounded border",
            score >= 75 ? "bg-emerald-50 text-emerald-700 border-emerald-200"
            : score >= 55 ? "bg-amber-50 text-amber-700 border-amber-200"
            : "bg-red-50 text-red-600 border-red-200"
          )}>{score}%</span>
        </div>
      </div>

      {liveError && (
        <p className="text-[11px] text-red-500 bg-red-50 border border-red-100 rounded px-3 py-2 mb-3">{liveError}</p>
      )}
      {liveData && (
        <p className="text-[11px] text-emerald-600 bg-emerald-50 border border-emerald-100 rounded px-3 py-2 mb-3">
          Live data fetched — schema, canonical and word count updated from the published page.
        </p>
      )}

      <div className="space-y-4">
        {sections.map((section) => {
          const sPass = section.checks.filter((c) => c.status === "pass").length;
          const sFail = section.checks.filter((c) => c.status === "fail").length;
          const sWarn = section.checks.filter((c) => c.status === "warn").length;
          return (
            <div key={section.name}>
              <div className="flex items-center gap-2 mb-1">
                <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">{section.name}</p>
                <div className="flex gap-1">
                  {sPass > 0 && <span className="text-[9px] bg-emerald-50 text-emerald-600 border border-emerald-100 px-1 rounded">{sPass}✓</span>}
                  {sWarn > 0 && <span className="text-[9px] bg-amber-50 text-amber-600 border border-amber-100 px-1 rounded">{sWarn}!</span>}
                  {sFail > 0 && <span className="text-[9px] bg-red-50 text-red-500 border border-red-100 px-1 rounded">{sFail}✗</span>}
                </div>
              </div>
              <div>
                {section.checks.map((c) => <CheckRow key={c.label} c={c} />)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
