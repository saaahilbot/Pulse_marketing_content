import clsx from "clsx";
import type { BlogStatus, BlogPriority, FunnelStage, ContentType } from "@/lib/types";

export function StatusBadge({ status }: { status: BlogStatus }) {
  const map: Record<BlogStatus, string> = {
    published:       "text-emerald-700 border-emerald-200 bg-emerald-50",
    draft:           "text-gray-500 border-gray-200 bg-gray-50",
    "needs-update":  "text-amber-700 border-amber-200 bg-amber-50",
    review:          "text-blue-700 border-blue-200 bg-blue-50",
  };
  const labels: Record<BlogStatus, string> = {
    published: "Published",
    draft: "Draft",
    "needs-update": "Needs Update",
    review: "In Review",
  };
  return (
    <span className={clsx("inline-flex items-center px-2 py-0.5 rounded border text-[11px] font-medium", map[status] ?? map.draft)}>
      {labels[status]}
    </span>
  );
}

export function PriorityBadge({ priority }: { priority: BlogPriority }) {
  const map: Record<BlogPriority, { cls: string; dot: string }> = {
    high:   { cls: "text-red-600",    dot: "bg-red-400"    },
    medium: { cls: "text-amber-600",  dot: "bg-amber-400"  },
    low:    { cls: "text-gray-400",   dot: "bg-gray-300"   },
  };
  const { cls, dot } = map[priority] ?? map.medium;
  return (
    <span className={clsx("inline-flex items-center gap-1.5 text-[11px] font-medium", cls)}>
      <span className={clsx("w-1.5 h-1.5 rounded-full", dot)} />
      Priority: {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </span>
  );
}

export function FunnelBadge({ stage }: { stage: FunnelStage }) {
  const map: Record<FunnelStage, string> = {
    awareness:     "text-sky-600 bg-sky-50 border-sky-200",
    consideration: "text-violet-600 bg-violet-50 border-violet-200",
    decision:      "text-orange-600 bg-orange-50 border-orange-200",
  };
  const labels: Record<FunnelStage, string> = {
    awareness: "Awareness",
    consideration: "Consideration",
    decision: "Decision",
  };
  return (
    <span className={clsx("inline-flex items-center px-2 py-0.5 rounded border text-[11px] font-medium", map[stage])}>
      Funnel: {labels[stage]}
    </span>
  );
}

export function ContentTypeBadge({ type }: { type: ContentType }) {
  const labels: Record<ContentType, string> = {
    pillar: "Pillar", educational: "Educational", "how-to": "How-To",
    listicle: "Listicle", comparison: "Comparison", "data-driven": "Data",
    "product-educational": "Product", "buyer-guide": "Buyer Guide", template: "Template",
  };
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded border border-gray-200 text-[11px] font-medium text-gray-500 bg-gray-50">
      Type: {labels[type] ?? type}
    </span>
  );
}
