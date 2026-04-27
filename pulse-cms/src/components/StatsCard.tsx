import clsx from "clsx";
import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  accent?: boolean;
  trend?: { value: string; positive: boolean };
}

export default function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  accent = false,
  trend,
}: StatsCardProps) {
  return (
    <div className="card p-5 group">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wide">{title}</p>
          <p className={clsx("text-3xl font-bold tracking-tight", accent ? "text-vc-orange" : "text-gray-900")}>
            {value}
          </p>
          {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
          {trend && (
            <p className={clsx("text-xs font-medium mt-1.5", trend.positive ? "text-emerald-600" : "text-red-500")}>
              {trend.positive ? "↑" : "↓"} {trend.value}
            </p>
          )}
        </div>
        <div className={clsx(
          "w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors",
          accent ? "bg-orange-50 text-vc-orange" : "bg-gray-50 text-gray-400 group-hover:bg-gray-100"
        )}>
          <Icon size={17} />
        </div>
      </div>
    </div>
  );
}
