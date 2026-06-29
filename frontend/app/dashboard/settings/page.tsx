import { Bell, KeyRound, ShieldCheck, UserRound } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

const settings = [
  { title: "Profile", body: "Name, email, and patient context", icon: UserRound },
  { title: "Authentication", body: "Clerk sign-in and route protection in the next phase", icon: KeyRound },
  { title: "Privacy", body: "Prepare HIPAA-aware controls before public release", icon: ShieldCheck },
  { title: "Notifications", body: "Report processing and follow-up reminders", icon: Bell },
];

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-[1200px]">
        <div>
          <h1 className="text-4xl font-semibold text-[#10213f]">Settings</h1>
          <p className="mt-3 text-xl text-[#5f7192]">Configure the account and production readiness layers</p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {settings.map((item) => (
            <article key={item.title} className="glass-card rounded-2xl p-7">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#edf3f8] text-[#258a72]">
                <item.icon size={28} />
              </div>
              <h2 className="mt-6 text-2xl font-semibold text-[#10213f]">{item.title}</h2>
              <p className="mt-3 text-lg leading-relaxed text-[#5f7192]">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
