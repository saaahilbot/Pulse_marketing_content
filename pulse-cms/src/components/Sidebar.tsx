"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  LayoutDashboard,
  FileText,
  Tag,
  BarChart3,
  Settings,
  Link2,
  ExternalLink,
  Sparkles,
} from "lucide-react";

const NAV = [
  { href: "/",           label: "Dashboard",  icon: LayoutDashboard },
  { href: "/blogs",      label: "All Blogs",  icon: FileText,  badge: "43" },
  { href: "/links",      label: "Link Graph", icon: Link2 },
  { href: "/categories", label: "Categories", icon: Tag },
  { href: "/analytics",  label: "Analytics",  icon: BarChart3 },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-56 bg-sidebar flex flex-col z-40">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-vc-orange rounded-lg flex items-center justify-center flex-shrink-0">
            <Sparkles size={13} className="text-white" />
          </div>
          <div>
            <p className="text-white text-sm font-semibold tracking-tight leading-none">Pulse CMS</p>
            <p className="text-white/30 text-[10px] mt-0.5">Vantage Circle</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <p className="text-white/25 text-[10px] font-semibold uppercase tracking-widest px-2 pb-2 pt-1">
          Content
        </p>
        {NAV.map((item) => {
          const Icon = item.icon;
          const active =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] font-medium transition-colors",
                active
                  ? "bg-vc-orange text-white"
                  : "text-white/50 hover:text-white/80 hover:bg-white/[0.06]"
              )}
            >
              <Icon size={15} className="flex-shrink-0" />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className={clsx(
                  "text-[10px] px-1.5 py-0.5 rounded font-semibold",
                  active ? "bg-white/20 text-white" : "bg-white/10 text-white/40"
                )}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}

        <div className="pt-4">
          <p className="text-white/25 text-[10px] font-semibold uppercase tracking-widest px-2 pb-2">
            Admin
          </p>
          <Link
            href="/admin"
            className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] font-medium text-white/50 hover:text-white/80 hover:bg-white/[0.06] transition-colors"
          >
            <Settings size={15} />
            <span className="flex-1">CMS Editor</span>
            <ExternalLink size={11} className="opacity-30" />
          </Link>
        </div>
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-white/[0.06]">
        <p className="text-white/20 text-[11px]">43 articles · 7 categories</p>
      </div>
    </aside>
  );
}
