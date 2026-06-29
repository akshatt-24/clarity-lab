import Link from "next/link";
import { ClipboardPlus, FileText, ShieldCheck, Sparkles, Upload } from "lucide-react";
import Logo from "@/components/ui/Logo";

const featureCards = [
  {
    title: "Upload Reports",
    body: "Easily upload images of your health reports, lab results, or medical documents.",
    icon: Upload,
    color: "bg-[#2f80ed]",
  },
  {
    title: "Expert-Backed Analysis",
    body: "Reports are interpreted using clinical reference ranges and trusted medical context.",
    icon: Sparkles,
    color: "bg-[#2f9342]",
  },
  {
    title: "Clear Summaries",
    body: "Get easy-to-read summaries with concerning areas highlighted for quick attention.",
    icon: FileText,
    color: "bg-[#ff8a00]",
  },
];

const steps = [
  ["Create Account", "Sign up in seconds"],
  ["Upload Report", "Take a photo or upload an image"],
  ["Data Matched", "Values are checked against clinical reference ranges"],
  ["Review Results", "Get clear, actionable insights"],
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      <header className="border-b border-[#10213f]/10 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-24 max-w-[1540px] items-center justify-between px-6 sm:px-10 lg:px-14">
          <Logo />
          <Link
            href="/dashboard"
            className="orange-button focus-ring rounded-2xl px-8 py-4 text-lg font-semibold transition"
          >
            Sign Up
          </Link>
        </div>
      </header>

      <section className="mx-auto grid max-w-[1320px] gap-14 px-6 py-20 text-center sm:px-10 lg:px-14">
        <div className="mx-auto max-w-[850px]">
          <h1 className="text-5xl font-semibold leading-tight text-[#1f2b3d] sm:text-6xl lg:text-7xl">
            Your Health Reports,
            <span className="mt-4 block bg-gradient-to-r from-[#3f7fe1] via-[#2f91a5] to-[#2f9342] bg-clip-text text-transparent">
              Made Simple
            </span>
          </h1>
          <p className="mx-auto mt-9 max-w-[820px] text-2xl leading-relaxed text-[#5f7192]">
            Upload your health reports and get clear, data-backed summaries in plain language.
            Understand what matters, spot concerns, and take control of your health.
          </p>
          <Link
            href="/dashboard"
            className="orange-button focus-ring mt-11 inline-flex rounded-2xl px-10 py-5 text-lg font-semibold transition"
          >
            Get Started Free
          </Link>
        </div>

        <div className="mx-auto h-[330px] w-full max-w-[1280px] overflow-hidden rounded-3xl glass-panel">
          <div className="relative h-full bg-[linear-gradient(135deg,#edf6ff_0%,#ffffff_46%,#e8f7ee_100%)]">
            <div className="absolute left-[7%] top-[-18%] h-[520px] w-32 rotate-[42deg] rounded-full bg-gradient-to-b from-[#78c84f] to-[#19885a] opacity-90 blur-[1px]" />
            <div className="absolute left-[17%] top-[7%] h-40 w-40 rounded-full border border-white/80 bg-white/45 backdrop-blur-md" />
            <div className="absolute right-[12%] top-[19%] grid h-44 w-44 place-items-center rounded-[2rem] bg-white/70 shadow-xl backdrop-blur-md">
              <ClipboardPlus className="text-[#2f80ed]" size={78} strokeWidth={1.7} />
            </div>
            <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full bg-white/80 px-5 py-3 text-[#5f7192] shadow-md backdrop-blur">
              <ShieldCheck size={20} className="text-[#258a72]" />
              Clinical-grade structure for your MVP
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#10213f]/5 bg-white/55 py-20">
        <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-14">
          <div className="text-center">
            <h2 className="text-5xl font-semibold text-[#10213f]">What Clarity Lab Does</h2>
            <p className="mt-6 text-2xl text-[#5f7192]">
              Transforming complex medical reports into insights you can understand
            </p>
          </div>
          <div className="mt-20 grid gap-10 lg:grid-cols-3">
            {featureCards.map((feature) => (
              <div key={feature.title} className="glass-card rounded-2xl p-10 text-left">
                <div className={`${feature.color} grid h-20 w-20 place-items-center rounded-2xl text-white shadow-sm`}>
                  <feature.icon size={38} strokeWidth={2.1} />
                </div>
                <h3 className="mt-9 text-2xl font-semibold text-[#10213f]">{feature.title}</h3>
                <p className="mt-5 text-xl leading-relaxed text-[#5f7192]">{feature.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-14">
          <div className="text-center">
            <h2 className="text-5xl font-semibold text-[#10213f]">How It Works</h2>
            <p className="mt-6 text-2xl text-[#5f7192]">Simple, secure, and designed for everyone</p>
          </div>
          <div className="mt-20 grid gap-8 lg:grid-cols-4">
            {steps.map(([title, body], index) => (
              <div key={title} className="relative rounded-2xl glass-card p-8">
                {index < steps.length - 1 && (
                  <span className="absolute -right-4 top-1/2 hidden h-1 w-8 bg-gradient-to-r from-[#2f80ed] to-[#258a72] lg:block" />
                )}
                <div className="brand-gradient grid h-16 w-16 place-items-center rounded-full text-2xl font-semibold text-white">
                  {index + 1}
                </div>
                <h3 className="mt-8 text-2xl font-semibold text-[#10213f]">{title}</h3>
                <p className="mt-4 text-lg text-[#5f7192]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
