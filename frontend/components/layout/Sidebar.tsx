"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, FileText, Grid2X2, MessageSquare, Settings } from "lucide-react";
import Logo from "@/components/ui/Logo";

const navItems = [
  { href: "/dashboard",            label: "Dashboard",   icon: Grid2X2 },
  { href: "/dashboard/reports",    label: "Reports",     icon: FileText },
  { href: "/dashboard/analytics",  label: "Analytics",   icon: BarChart3 },
  { href: "/dashboard/ask",        label: "Ask Clarity", icon: MessageSquare },
  { href: "/dashboard/settings",   label: "Settings",    icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden h-screen w-[280px] shrink-0 lg:flex lg:flex-col glass-sidebar">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/50">
        <Logo />
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 px-3 pt-6 pb-4">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`focus-ring flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all ${
                active ? "nav-active" : "nav-idle"
              }`}
            >
              <item.icon size={18} strokeWidth={active ? 2.2 : 1.9} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/50 px-5 py-4">
        <p className="text-xs font-medium text-[#8a97aa]">Clarity Lab · MVP</p>
        <p className="mt-0.5 text-xs text-[#a8b4c4]">Connect Clerk to go live</p>
      </div>
    </aside>
  );
}
