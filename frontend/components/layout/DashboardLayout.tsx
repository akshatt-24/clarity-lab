import Sidebar from "./Sidebar";
import Logo from "@/components/ui/Logo";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <div className="flex">
        <Sidebar />
        <div className="min-w-0 flex-1">
          {/* Mobile header */}
          <header className="sticky top-0 z-20 flex h-16 items-center justify-between px-5 glass-header lg:hidden">
            <Logo />
          </header>
          <main className="min-h-screen px-5 py-7 sm:px-7 lg:px-9 xl:px-10">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
