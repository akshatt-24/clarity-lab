import { AlertCircle, Clock3, FileText } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import UploadCard from "@/components/report/UploadCard";

const stats = [
  { label: "Total Reports", value: "0", icon: FileText, color: "bg-[#2f80ed]" },
  { label: "Recent Uploads", value: "0", icon: Clock3, color: "bg-[#2f9342]" },
  { label: "Flagged Items", value: "0", icon: AlertCircle, color: "bg-[#ff8a00]" },
];

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-[1500px]">
        <div>
          <h1 className="text-4xl font-semibold text-[#10213f]">Dashboard</h1>
          <p className="mt-3 text-xl text-[#5f7192]">Upload and manage your health reports</p>
        </div>

        <div className="mt-10 grid gap-7 lg:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="glass-card rounded-2xl p-8">
              <div className={`${stat.color} grid h-16 w-16 place-items-center rounded-2xl text-white`}>
                <stat.icon size={32} strokeWidth={2} />
              </div>
              <p className="mt-7 text-lg text-[#5f7192]">{stat.label}</p>
              <p className="mt-3 text-4xl font-semibold text-[#10213f]">{stat.value}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-12 text-2xl font-semibold text-[#10213f]">Upload New Report</h2>
        <UploadCard />
      </div>
    </DashboardLayout>
  );
}
