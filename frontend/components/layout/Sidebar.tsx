"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, FileText, Grid2X2, MessageSquare, Settings } from "lucide-react";
import Logo from "@/components/ui/Logo";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Grid2X2 },
  { href: "/dashboard/reports", label: "Reports", icon: FileText },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/ask", label: "Ask Clarity", icon: MessageSquare },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden h-screen w-[318px] shrink-0 border-r border-[#10213f]/10 bg-white/76 backdrop-blur-xl lg:flex lg:flex-col">
      <div className="border-b border-[#10213f]/10 p-6">
        <Logo />
      </div>
      <nav className="flex-1 space-y-2 p-4 pt-8">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`focus-ring flex items-center gap-4 rounded-2xl px-4 py-4 text-lg font-semibold transition ${
                active
                  ? "brand-gradient text-white shadow-lg shadow-[#258a72]/18"
                  : "text-[#60728f] hover:bg-[#edf3f8] hover:text-[#10213f]"
              }`}
            >
              <item.icon size={24} strokeWidth={2} />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-[#10213f]/10 p-5 text-sm text-[#8a97aa]">
        MVP workspace
      </div>
    </aside>
  );
}
