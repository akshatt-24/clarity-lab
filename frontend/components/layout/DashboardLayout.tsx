import Sidebar from "./Sidebar";
import Logo from "@/components/ui/Logo";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="flex">
        <Sidebar />
        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-[#10213f]/10 bg-white/80 px-5 backdrop-blur-xl lg:hidden">
            <Logo />
          </header>
          <main className="min-h-screen px-5 py-8 sm:px-8 lg:px-10 xl:px-12">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
