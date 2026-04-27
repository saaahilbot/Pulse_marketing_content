import clsx from "clsx";

interface SeoScoreBarProps {
  score: number;
  showLabel?: boolean;
  size?: "sm" | "md";
}

export function getSeoColor(score: number) {
  if (score >= 75) return { bar: "bg-emerald-400", text: "text-emerald-600", label: "Strong" };
  if (score >= 65) return { bar: "bg-amber-400",   text: "text-amber-600",   label: "Moderate" };
  return              { bar: "bg-red-400",     text: "text-red-500",     label: "Weak" };
}

export default function SeoScoreBar({ score, showLabel = true, size = "md" }: SeoScoreBarProps) {
  const { bar, text, label } = getSeoColor(score);
  return (
    <div className="flex items-center gap-2">
      <div className={clsx("flex-1 bg-gray-100 rounded-full overflow-hidden", size === "sm" ? "h-1" : "h-1.5")}>
        <div className={clsx("h-full rounded-full", bar)} style={{ width: `${score}%` }} />
      </div>
      <span className={clsx("font-semibold tabular-nums flex-shrink-0", text, size === "sm" ? "text-[11px] w-5" : "text-xs w-6")}>
        {score}
      </span>
      {showLabel && (
        <span className={clsx("text-[11px] font-medium flex-shrink-0 w-14", text)}>{label}</span>
      )}
    </div>
  );
}
