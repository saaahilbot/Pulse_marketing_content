"use client";

import { useEffect, useState, useTransition } from "react";
import { Loader2, Download, CheckCircle2, X } from "lucide-react";
import clsx from "clsx";
import type { Blog } from "@/lib/types";
import { fetchBlogDataFromUrl, type ImportedBlogData } from "@/app/actions";

const CATEGORIES = [
  "Survey Strategy & Best Practices",
  "Feedback, Results & Action",
  "Question Banks & Templates",
  "Pulse Surveys & Tools",
  "Employee Engagement",
  "Retention",
  "Company Culture & Climate",
];

const CONTENT_TYPES = [
  { value: "pillar",              label: "Pillar" },
  { value: "educational",         label: "Educational" },
  { value: "how-to",              label: "How-To" },
  { value: "listicle",            label: "Listicle" },
  { value: "comparison",          label: "Comparison" },
  { value: "data-driven",         label: "Data-Driven" },
  { value: "product-educational", label: "Product Educational" },
  { value: "buyer-guide",         label: "Buyer Guide" },
  { value: "template",            label: "Template" },
];

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").replace(/-+/g, "-");
}

function Field({ label, required, hint, children }: {
  label: string; required?: boolean; hint?: string; children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-700 mb-1.5">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {children}
      {hint && <p className="text-[11px] text-gray-400 mt-1">{hint}</p>}
    </div>
  );
}

const inputCls    = "w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-vc-orange/40 focus:border-vc-orange bg-white placeholder:text-gray-300";
const selectCls   = inputCls;
const textareaCls = inputCls + " resize-none";

export default function EditBlogForm({
  blog,
  action,
}: {
  blog: Blog;
  action: (formData: FormData) => Promise<void>;
}) {
  // Controlled fields
  const [title, setTitle]             = useState(blog.title);
  const [slug, setSlug]               = useState(blog.slug);
  const [metaDescLen, setMetaLen]     = useState(blog.meta_description?.length ?? 0);
  const [slugChanged, setSlugChanged] = useState(false);

  // Submit
  const [isPending, startTransition]  = useTransition();
  const [error, setError]             = useState<string | null>(null);

  // URL import
  const [importUrl, setImportUrl]           = useState(blog.source_url ?? "");
  const [importing, startImportTransition]  = useTransition();
  const [importError, setImportError]       = useState<string | null>(null);
  const [imported, setImported]             = useState<ImportedBlogData | null>(null);

  // Sync meta description length when import fires
  useEffect(() => {
    if (imported?.meta_description !== undefined) {
      setMetaLen(imported.meta_description.length);
    }
  }, [imported?.meta_description]);

  function handleTitleChange(val: string) {
    setTitle(val);
  }

  function handleSlugChange(val: string) {
    const newSlug = slugify(val);
    setSlug(newSlug);
    setSlugChanged(newSlug !== blog.slug);
  }

  function handleImport() {
    if (!importUrl) return;
    setImportError(null);
    startImportTransition(async () => {
      const data = await fetchBlogDataFromUrl(importUrl);
      if (data.error) { setImportError(data.error); return; }
      // Update title if fetched (keep slug unchanged to avoid breaking URL)
      if (data.title) setTitle(data.title);
      setImported(data);
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      try {
        await action(formData);
      } catch (err: unknown) {
        if (err instanceof Error && !err.message.includes("NEXT_REDIRECT")) {
          setError(err.message);
        }
      }
    });
  }

  const importKey = imported ? "imported" : "original";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="card p-4 border-l-2 border-l-red-400 bg-red-50">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* ── Update from URL ─────────────────────────────────────── */}
      <div className={clsx(
        "card p-5 border-l-2",
        imported ? "border-l-emerald-400 bg-emerald-50/30" : "border-l-blue-400 bg-blue-50/30"
      )}>
        <h2 className={clsx("text-xs font-semibold uppercase tracking-wider mb-1",
          imported ? "text-emerald-600" : "text-blue-600")}>
          Update from Live URL
        </h2>
        <p className="text-[11px] text-gray-500 mb-3">
          Paste the live URL to auto-refresh the title, meta tags, schema, keywords, and word count from the published page.
        </p>
        <div className="flex gap-2">
          <input
            type="url"
            value={importUrl}
            onChange={(e) => setImportUrl(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleImport(); } }}
            placeholder="https://www.vantagecircle.com/en/blog/…"
            className={inputCls + " flex-1"}
          />
          <button
            type="button"
            disabled={importing || !importUrl}
            onClick={handleImport}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40 transition-colors flex-shrink-0"
          >
            {importing ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
            {importing ? "Fetching…" : "Fetch & Update"}
          </button>
          {imported && (
            <button
              type="button"
              onClick={() => { setImported(null); setTitle(blog.title); setMetaLen(blog.meta_description?.length ?? 0); }}
              className="px-3 py-2 rounded-lg text-xs text-gray-500 border border-gray-200 hover:bg-gray-50 flex items-center gap-1"
            >
              <X size={12} /> Undo
            </button>
          )}
        </div>
        {importError && <p className="text-xs text-red-500 mt-2">{importError}</p>}
        {imported && !importError && (
          <div className="flex flex-wrap gap-2 mt-3">
            {[
              { label: "Title",       ok: !!imported.title },
              { label: "Meta title",  ok: !!imported.meta_title },
              { label: "Meta desc",   ok: !!imported.meta_description },
              { label: "Canonical",   ok: !!imported.canonical_url },
              { label: "Schema",      ok: imported.has_schema === true },
              { label: "Keyword",     ok: !!imported.primary_keyword },
              { label: "Word count",  ok: (imported.word_count_estimate ?? 0) > 0 },
            ].map(({ label, ok }) => (
              <span key={label} className={clsx(
                "flex items-center gap-1 text-[11px] px-2 py-0.5 rounded border",
                ok ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                   : "bg-gray-50 text-gray-400 border-gray-200"
              )}>
                {ok && <CheckCircle2 size={10} />}{label}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* ── Core Identity ──────────────────────────────────────────── */}
      <div className="card p-6">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-5">Post Identity</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <Field label="Title" required>
              <input name="title" type="text" required value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className={inputCls} />
            </Field>
          </div>

          <Field label="Slug" required hint={slugChanged ? "⚠️ Slug changed — old URL will break." : "Changing the slug breaks the old URL."}>
            <input name="slug" type="text" required value={slug}
              onChange={(e) => handleSlugChange(e.target.value)}
              className={clsx(inputCls, "font-mono text-xs", slugChanged && "border-amber-300 focus:border-amber-400")} />
          </Field>

          <Field label="Source URL">
            <input name="source_url" type="url"
              key={importKey + "-source"}
              defaultValue={imported?.source_url ?? blog.source_url ?? ""}
              className={inputCls} />
          </Field>

          <Field label="Category" required>
            <select name="category" required defaultValue={blog.category} className={selectCls}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>

          <Field label="Author">
            <input name="author" type="text" defaultValue={blog.author} className={inputCls} />
          </Field>
        </div>
      </div>

      {/* ── Status & Classification ─────────────────────────────────── */}
      <div className="card p-6">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-5">Status & Classification</h2>
        <div className="grid grid-cols-3 gap-4">
          <Field label="Status">
            <select name="status" defaultValue={blog.status} className={selectCls}>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="needs-update">Needs Update</option>
              <option value="review">In Review</option>
            </select>
          </Field>
          <Field label="Priority">
            <select name="priority" defaultValue={blog.priority} className={selectCls}>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </Field>
          <Field label="Publish Date">
            <input name="publish_date" type="date" defaultValue={blog.publish_date} className={inputCls} />
          </Field>
          <Field label="Content Type">
            <select name="content_type" defaultValue={blog.content_type} className={selectCls}>
              {CONTENT_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </Field>
          <Field label="Funnel Stage">
            <select name="funnel_stage" defaultValue={blog.funnel_stage} className={selectCls}>
              <option value="awareness">Awareness</option>
              <option value="consideration">Consideration</option>
              <option value="decision">Decision</option>
            </select>
          </Field>
          <Field label="Word Count">
            <input name="word_count_estimate" type="number" min={0}
              key={importKey + "-wc"}
              defaultValue={imported?.word_count_estimate ?? blog.word_count_estimate}
              className={inputCls} />
          </Field>
        </div>
        <div className="flex items-center gap-6 mt-4 pt-4 border-t border-gray-100">
          {[
            { name: "featured",            label: "Featured post",            checked: blog.featured },
            { name: "has_product_mention", label: "Has Vantage Pulse mention", checked: blog.has_product_mention },
            { name: "has_cta",             label: "Has demo/trial CTA",       checked: blog.has_cta },
          ].map(({ name, label, checked }) => (
            <label key={name} className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" name={name} defaultChecked={checked}
                className="w-4 h-4 rounded border-gray-300 text-vc-orange focus:ring-vc-orange/40 cursor-pointer" />
              <span className="text-sm text-gray-600 group-hover:text-gray-800">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* ── SEO ────────────────────────────────────────────────────── */}
      <div className="card p-6" key={importKey + "-seo"}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">SEO</h2>
          {imported?.has_schema !== undefined && (
            <span className={clsx(
              "text-[11px] px-2 py-0.5 rounded border font-medium",
              imported.has_schema
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : "bg-red-50 text-red-500 border-red-200"
            )}>
              {imported.has_schema
                ? `Schema: ${imported.schema_types?.join(", ") || "present"}`
                : "No schema detected on live page"}
            </span>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Primary Keyword">
            <input name="primary_keyword" type="text"
              defaultValue={imported?.primary_keyword ?? blog.primary_keyword}
              className={inputCls} />
          </Field>
          <Field label="SEO Score" hint="0–100. 75+ Strong · 65–74 Moderate · <65 Needs Work">
            <input name="seo_score" type="number" min={0} max={100}
              defaultValue={blog.seo_score}
              className={inputCls} />
          </Field>
          <Field label="Meta Title" hint="Keep under 60 characters.">
            <input name="meta_title" type="text"
              defaultValue={imported?.meta_title ?? blog.meta_title}
              className={inputCls} />
          </Field>
          <Field label="Secondary Keywords" hint="Comma-separated">
            <input name="secondary_keywords" type="text"
              defaultValue={imported?.secondary_keywords ?? blog.secondary_keywords.join(", ")}
              className={inputCls} />
          </Field>
          <div className="col-span-2">
            <Field label="Meta Description" hint={`Target 140–160 chars · current: ${metaDescLen}`}>
              <textarea name="meta_description" rows={2}
                defaultValue={imported?.meta_description ?? blog.meta_description}
                onChange={(e) => setMetaLen(e.target.value.length)}
                className={clsx(textareaCls, metaDescLen > 160 && "border-red-300")} />
              {metaDescLen > 160 && <p className="text-[11px] text-red-500 mt-1">{metaDescLen - 160} chars over limit</p>}
            </Field>
          </div>
          <Field label="Canonical URL">
            <input name="canonical_url" type="url"
              defaultValue={imported?.canonical_url ?? blog.canonical_url ?? ""}
              className={inputCls} />
          </Field>
          <div className="col-span-2">
            <Field label="Tags" hint="Comma-separated">
              <input name="tags" type="text" defaultValue={blog.tags.join(", ")} className={inputCls} />
            </Field>
          </div>
          <input type="hidden" name="has_schema"    value={imported?.has_schema    ?? blog.has_schema    ? "on" : "off"} />
          <input type="hidden" name="schema_types"  value={imported?.schema_types?.join(", ") ?? blog.schema_types?.join(", ") ?? ""} />

          {imported?.has_schema !== undefined && (
            <div className="col-span-2 bg-gray-50 border border-gray-100 rounded-lg px-4 py-3">
              <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-2">Detected Schema Types</p>
              {imported.has_schema && imported.schema_types && imported.schema_types.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {imported.schema_types.map((t) => (
                    <span key={t} className="text-[11px] bg-blue-50 border border-blue-100 text-blue-700 px-2 py-0.5 rounded font-mono">{t}</span>
                  ))}
                </div>
              ) : (
                <p className="text-[11px] text-red-500">No JSON-LD schema found on the live page.</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Content ────────────────────────────────────────────────── */}
      <div className="card p-6">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-5">Content</h2>
        <Field label="Body" hint="Markdown supported">
          <textarea name="body" rows={20} defaultValue={blog.content}
            className={textareaCls + " font-mono text-xs leading-relaxed"} />
        </Field>
      </div>

      {/* ── Internal Links ─────────────────────────────────────────── */}
      <div className="card p-6">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Internal Links</h2>
        <p className="text-[11px] text-gray-400 mb-3">Outbound links to other posts in this CMS.</p>
        <div className="flex flex-wrap gap-1.5">
          {blog.internal_links.length > 0
            ? blog.internal_links.map((s) => (
                <span key={s} className="text-[11px] font-mono bg-gray-50 border border-gray-200 text-gray-600 px-2 py-0.5 rounded">{s}</span>
              ))
            : <span className="text-[11px] text-gray-300">No internal links yet</span>
          }
        </div>
      </div>

      {/* ── Notes ──────────────────────────────────────────────────── */}
      <div className="card p-6">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-5">Editorial Notes</h2>
        <Field label="Notes" hint="Internal notes — not published">
          <textarea name="notes" rows={3} defaultValue={blog.notes} className={textareaCls} />
        </Field>
      </div>

      {/* ── Submit ─────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between py-2">
        <p className="text-[11px] text-gray-400">
          Last updated: <span className="font-medium">{blog.last_updated}</span>
          {slugChanged && <span className="text-amber-500 ml-2">· Slug changed — old URL will break</span>}
          {imported && <span className="text-emerald-600 ml-2">· Live data applied</span>}
        </p>
        <div className="flex items-center gap-3">
          <a href={`/blogs/${blog.slug}`} className="text-sm text-gray-500 hover:text-gray-700 transition-colors px-4 py-2">
            Cancel
          </a>
          <button type="submit" disabled={isPending || !title || !slug}
            className={clsx(
              "flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-colors",
              isPending || !title || !slug
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-vc-orange text-white hover:bg-orange-600"
            )}>
            {isPending && <Loader2 size={14} className="animate-spin" />}
            {isPending ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>
    </form>
  );
}
