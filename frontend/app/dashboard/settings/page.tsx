import { Bell, KeyRound, ShieldCheck, UserRound } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

const settings = [
  { title: "Profile",         body: "Name, email, and patient context",                               icon: UserRound,  glow: "hover-glow" },
  { title: "Authentication",  body: "Clerk sign-in and route protection — connect in the next phase", icon: KeyRound,   glow: "hover-glow-teal" },
  { title: "Privacy",         body: "Prepare HIPAA-aware controls before public release",             icon: ShieldCheck,glow: "hover-glow" },
  { title: "Notifications",   body: "Report processing and follow-up reminders",                      icon: Bell,       glow: "hover-glow-orange" },
];

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-[1100px]">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-[#0e1d38]">Settings</h1>
          <p className="mt-1.5 text-sm text-[#5a6b86]">Configure account and production-readiness layers</p>
        </div>

        <div className="mt-7 grid gap-4 md:grid-cols-2">
          {settings.map((item) => (
            <article key={item.title} className={`glass-card ${item.glow} cursor-pointer rounded-2xl p-6`}>
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#edf3f8] text-[#1f8068]">
                <item.icon size={22} strokeWidth={1.9} />
              </div>
              <h2 className="mt-5 text-sm font-semibold text-[#0e1d38]">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#5a6b86]">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
