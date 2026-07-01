import Link from "next/link";
import Image from "next/image";
import { ClipboardPlus, ExternalLink, FileText, ShieldCheck, Sparkles, Upload, CheckCircle2 } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import Logo from "@/components/ui/Logo";

const featureCards = [
  {
    title: "Upload Reports",
    body: "Easily upload images of your health reports, lab results, or medical documents.",
    icon: Upload,
    gradient: "from-[#2f7de8] to-[#1a5eb8]",
    glow: "hover-glow",
  },
  {
    title: "Expert-Backed Analysis",
    body: "Reports are interpreted using clinical reference ranges and trusted medical context.",
    icon: Sparkles,
    gradient: "from-[#1f8068] to-[#28893e]",
    glow: "hover-glow-teal",
  },
  {
    title: "Clear Summaries",
    body: "Get easy-to-read summaries with concerning areas highlighted for quick attention.",
    icon: FileText,
    gradient: "from-[#f07c00] to-[#d96b00]",
    glow: "hover-glow-orange",
  },
];

const steps = [
  ["Create Account", "Sign up in seconds"],
  ["Upload Report", "Take a photo or upload an image"],
  ["Data Matched", "Values checked against clinical ranges"],
  ["Review Results", "Get clear, actionable insights"],
];

const trustBadges = [
  "HIPAA-aware design",
  "End-to-End Encryption",
  "Privacy First",
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      {/* Header */}
      <header className="glass-header sticky top-0 z-30">
        <div className="mx-auto flex h-[60px] max-w-[1480px] items-center justify-between px-6 sm:px-10 lg:px-14">
          <Logo />
          <div className="flex items-center gap-3">
            <Link href="/auth" className="ghost-button focus-ring rounded-xl px-5 py-2 text-sm font-semibold transition">
              Sign In
            </Link>
            <Link href="/auth" className="orange-button focus-ring rounded-xl px-5 py-2 text-sm font-semibold transition">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-[1100px] gap-10 px-6 py-14 text-center sm:px-10 lg:px-12">
        <div className="mx-auto max-w-[700px]">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#2f7de8]/20 bg-[#2f7de8]/08 px-4 py-1.5 text-xs font-semibold text-[#2f7de8]">
            <ShieldCheck size={13} strokeWidth={2.4} />
            Clinical-grade AI · HIPAA-aware design
          </span>
          <h1 className="mt-5 text-3xl font-semibold leading-[1.18] tracking-[-0.02em] text-[#0e1d38] sm:text-4xl lg:text-5xl">
            Your Health Reports,
            <span className="mt-2 block bg-gradient-to-r from-[#2f7de8] via-[#1f8068] to-[#28893e] bg-clip-text text-transparent">
              Made Simple
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-[560px] text-base leading-relaxed text-[#5a6b86] sm:text-lg">
            Upload your health reports and get clear, data-backed summaries in plain language.
            Understand what matters, spot concerns, and take control.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link href="/auth" className="orange-button focus-ring inline-flex rounded-xl px-7 py-3 text-sm font-semibold transition">
              Get Started Free
            </Link>
            <Link href="#how" className="ghost-button focus-ring inline-flex rounded-xl px-7 py-3 text-sm font-semibold transition">
              See How It Works
            </Link>
          </div>
        </div>

        {/* Hero visual */}
        <div className="mx-auto h-[240px] w-full max-w-[1020px] overflow-hidden rounded-2xl glass-panel">
          <div className="relative h-full bg-[linear-gradient(135deg,#edf6ff_0%,#ffffff_46%,#e8f7ee_100%)]">
            <div className="absolute left-[6%] top-[-20%] h-[480px] w-28 rotate-[42deg] rounded-full bg-gradient-to-b from-[#78c84f] to-[#19885a] opacity-80 blur-[1px]" />
            <div className="absolute left-[16%] top-[10%] h-32 w-32 rounded-full border border-white/80 bg-white/48 backdrop-blur-md" />
            <div className="absolute right-[11%] top-[16%] grid h-28 w-28 place-items-center rounded-[1.5rem] bg-white/72 shadow-xl backdrop-blur-md">
              <ClipboardPlus className="text-[#2f7de8]" size={52} strokeWidth={1.6} />
            </div>
            <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2.5 rounded-full bg-white/80 px-5 py-2.5 text-sm text-[#5a6b86] shadow-md backdrop-blur">
              <ShieldCheck size={16} className="text-[#1f8068]" />
              Clinical reference ranges matched in seconds
            </div>
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="border-y border-[#0e1d38]/06 bg-white/32 py-14">
        <div className="mx-auto max-w-[1240px] px-6 sm:px-10 lg:px-12">
          <div className="text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-[#0e1d38] sm:text-3xl">What Clarity Lab Does</h2>
            <p className="mt-3 text-base text-[#5a6b86]">
              Transforming complex medical reports into insights you can understand
            </p>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {featureCards.map((feature) => (
              <div key={feature.title} className={`glass-card ${feature.glow} rounded-2xl p-6 text-left cursor-default`}>
                <div className={`bg-gradient-to-br ${feature.gradient} grid h-12 w-12 place-items-center rounded-xl text-white shadow-sm`}>
                  <feature.icon size={24} strokeWidth={2} />
                </div>
                <h3 className="mt-5 text-base font-semibold text-[#0e1d38]">{feature.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#5a6b86]">{feature.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-14">
        <div className="mx-auto max-w-[1240px] px-6 sm:px-10 lg:px-12">
          <div className="text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-[#0e1d38] sm:text-3xl">How It Works</h2>
            <p className="mt-3 text-base text-[#5a6b86]">Simple, secure, and designed for everyone</p>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-4">
            {steps.map(([title, body], index) => (
              <div key={title} className="relative glass-card hover-glow rounded-2xl p-6 cursor-default">
                {index < steps.length - 1 && (
                  <span className="absolute -right-3.5 top-1/2 hidden h-0.5 w-7 bg-gradient-to-r from-[#2f7de8] to-[#1f8068] lg:block" />
                )}
                <div className="brand-gradient grid h-10 w-10 place-items-center rounded-full text-sm font-bold text-white shadow-sm">
                  {index + 1}
                </div>
                <h3 className="mt-5 text-sm font-semibold text-[#0e1d38]">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#5a6b86]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About the Creator ─────────────────────────────── */}
      <section className="border-t border-[#0e1d38]/06 bg-white/32 py-16">
        <div className="mx-auto max-w-[900px] px-6 sm:px-10 lg:px-12">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2f7de8]">Behind the build</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#0e1d38] sm:text-3xl">About the Creator</h2>
          </div>

          <div className="mt-10 glass-card hover-glow rounded-3xl p-8 sm:p-10">
            <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start">

              {/* Photo */}
              <div className="relative shrink-0">
                <div className="h-[120px] w-[120px] overflow-hidden rounded-2xl shadow-lg ring-2 ring-white/80 sm:h-[140px] sm:w-[140px]"
                     style={{ boxShadow: "0 12px 32px rgba(47,125,232,0.18), 0 0 0 2px rgba(255,255,255,0.85)" }}>
                  <Image
                    src="/akshat.jpeg"
                    alt="Akshat Kumar"
                    width={140}
                    height={140}
                    className="h-full w-full object-cover object-top"
                    priority
                  />
                </div>
                {/* Subtle glow ring */}
                <div className="absolute -inset-1.5 -z-10 rounded-[18px] bg-gradient-to-br from-[#2f7de8]/20 to-[#1f8068]/15 blur-md" />
              </div>

              {/* Text content */}
              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                  <h3 className="text-xl font-semibold tracking-tight text-[#0e1d38]">Akshat Kumar</h3>
                  <span className="badge-blue rounded-full px-3 py-0.5 text-xs font-semibold">
                    3rd Year · MNIT Jaipur
                  </span>
                </div>

                <p className="mt-1 text-sm font-medium text-[#2f7de8]">
                  Mechanical Engineering · Pursuing Software &amp; AI Roles
                </p>

                <p className="mt-4 text-sm leading-relaxed text-[#5a6b86]">
                  Akshat is a pre-final year engineering student at MNIT Jaipur with a sharp pivot into software and AI.
                  He builds full-stack AI applications, RAG pipelines, and deep learning systems aimed at
                  real-world impact — Clarity Lab being one of them. Driven by curiosity and a bias for
                  shipping, he is actively seeking technical roles in software engineering and AI where he can
                  contribute from day one.
                </p>

                {/* Tags */}
                <div className="mt-5 flex flex-wrap justify-center gap-2 sm:justify-start">
                  {["Full-Stack AI", "RAG Systems", "Deep Learning", "Open to Opportunities"].map((tag) => (
                    <span key={tag} className="rounded-full border border-[#0e1d38]/08 bg-[#f0f5fb] px-3 py-1 text-xs font-medium text-[#5a6b86]">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/akshat-kumar-30553b313/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-xl border border-[#0a66c2]/20 bg-[#0a66c2]/07 px-4 py-2 text-xs font-semibold text-[#0a66c2] transition hover:bg-[#0a66c2]/14 hover:shadow-sm"
                >
                  <FaLinkedin size={14} strokeWidth={2} />
                  Connect on LinkedIn
                </a>
              </div>
            </div>

            {/* Trust badges row */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-5 border-t border-[#0e1d38]/06 pt-7 sm:justify-start">
              {trustBadges.map((badge) => (
                <span key={badge} className="inline-flex items-center gap-1.5 text-xs font-medium text-[#28893e]">
                  <CheckCircle2 size={14} strokeWidth={2.2} />
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ─────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20">
        {/* Gradient background */}
        <div className="absolute inset-0 brand-gradient opacity-90" />
        {/* Subtle noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.04]"
             style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "24px 24px" }} />
        {/* Glow blobs */}
        <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-white/10 blur-[60px]" />
        <div className="absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-white/10 blur-[50px]" />

        <div className="relative mx-auto max-w-[680px] px-6 text-center sm:px-10">
          <h2 className="text-2xl font-semibold leading-tight tracking-[-0.02em] text-white sm:text-3xl lg:text-4xl">
            Ready to Understand Your Health?
          </h2>
          <p className="mx-auto mt-4 max-w-[480px] text-base leading-relaxed text-white/80">
            Join others who are taking control of their health information — clear insights, no medical jargon.
          </p>
          <Link
            href="/auth"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#f07c00] px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:bg-[#d96b00] hover:shadow-xl hover:-translate-y-0.5"
            style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.20)" }}
          >
            Sign Up Now
          </Link>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer className="border-t border-[#0e1d38]/08 bg-[#0b1628] py-6">
        <div className="mx-auto max-w-[1240px] px-6 sm:px-10 lg:px-12">
          <p className="text-center text-xs text-[#4a5a72]">
            © 2026 Clarity Lab. All rights reserved. · Your health, your clarity.
          </p>
        </div>
      </footer>
    </main>
  );
}
