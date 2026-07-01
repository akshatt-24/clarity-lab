"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Eye, EyeOff, Lock, Mail, ShieldCheck, Sparkles, User, ArrowRight,
} from "lucide-react";
import Logo from "@/components/ui/Logo";

export default function AuthPage() {
  const [mode, setMode]           = useState<"signin" | "signup">("signin");
  const [showPass, setShowPass]   = useState(false);
  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [name, setName]           = useState("");

  const isSignUp = mode === "signup";

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12">
      {/* Ambient background blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-[-10%] h-[500px] w-[500px] rounded-full bg-[#2f7de8]/10 blur-[90px]" />
        <div className="absolute -bottom-16 right-[-8%] h-[420px] w-[420px] rounded-full bg-[#1f8068]/09 blur-[80px]" />
        <div className="absolute left-[40%] top-[60%] h-[300px] w-[300px] rounded-full bg-[#f07c00]/06 blur-[70px]" />
      </div>

      <div className="relative z-10 grid w-full max-w-[940px] overflow-hidden rounded-3xl shadow-2xl lg:grid-cols-[1fr_1fr]"
           style={{ boxShadow: "0 40px 80px rgba(14,29,56,0.12), 0 0 0 1px rgba(255,255,255,0.80)" }}>

        {/* ── Left Panel – visual / brand ─────────────────── */}
        <div className="relative hidden flex-col justify-between overflow-hidden p-10 lg:flex brand-gradient">
          {/* Shimmer overlay */}
          <div className="absolute inset-0 opacity-20 shimmer" />

          {/* Decorative rings */}
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full border border-white/20 pulse-ring" />
          <div className="absolute -right-8 -top-8 h-44 w-44 rounded-full border border-white/14 pulse-ring" style={{ animationDelay: "1s" }} />
          <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full border border-white/10" />

          {/* Logo */}
          <div className="relative flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/20 backdrop-blur-sm">
              <Sparkles size={20} strokeWidth={2.2} className="text-white" />
            </span>
            <span className="text-base font-semibold tracking-tight text-white">Clarity Lab</span>
          </div>

          {/* Center illustration */}
          <div className="relative z-10 mx-auto float-anim">
            <div className="grid h-28 w-28 place-items-center rounded-[2rem] bg-white/20 shadow-2xl backdrop-blur-md mx-auto">
              <ShieldCheck size={56} strokeWidth={1.4} className="text-white" />
            </div>
            <div className="mt-8 text-center">
              <h2 className="text-xl font-semibold text-white">Health Insights,<br />Made Clear</h2>
              <p className="mt-3 text-sm leading-relaxed text-white/75 max-w-[220px] mx-auto">
                Upload reports · Get clinical context · Track your biomarkers over time
              </p>
            </div>
          </div>

          {/* Bottom trust badges */}
          <div className="relative flex flex-wrap gap-2">
            {["Clinical-grade AI", "HIPAA-aware", "Private by design"].map((tag) => (
              <span key={tag} className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* ── Right Panel – form ───────────────────────────── */}
        <div className="flex flex-col justify-center px-8 py-10 glass-strong"
             style={{ background: "linear-gradient(160deg, rgba(255,255,255,0.92), rgba(240,248,255,0.78))", backdropFilter: "blur(30px)" }}>

          {/* Mobile logo */}
          <div className="mb-7 lg:hidden">
            <Logo />
          </div>

          {/* Mode toggle tabs */}
          <div className="flex rounded-xl bg-[#edf3f8] p-1">
            {(["signin", "signup"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 rounded-lg py-2 text-xs font-semibold transition-all ${
                  mode === m
                    ? "bg-white text-[#0e1d38] shadow-sm"
                    : "text-[#8a97aa] hover:text-[#5a6b86]"
                }`}
              >
                {m === "signin" ? "Sign In" : "Create Account"}
              </button>
            ))}
          </div>

          {/* Heading */}
          <div className="mt-7">
            <h1 className="text-xl font-semibold tracking-tight text-[#0e1d38]">
              {isSignUp ? "Create your account" : "Welcome back"}
            </h1>
            <p className="mt-1.5 text-sm text-[#5a6b86]">
              {isSignUp
                ? "Start understanding your health reports today."
                : "Sign in to access your reports and insights."}
            </p>
          </div>

          {/* Form */}
          <div className="mt-7 space-y-4">
            {/* Name field (sign-up only) */}
            {isSignUp && (
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[#5a6b86]">Full Name</label>
                <div className="relative">
                  <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#a8b4c4]" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Akshat Kumar"
                    className="glass-input focus-ring w-full rounded-xl py-2.5 pl-9 pr-4 text-sm text-[#0e1d38] placeholder:text-[#c0cad6]"
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#5a6b86]">Email address</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#a8b4c4]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="glass-input focus-ring w-full rounded-xl py-2.5 pl-9 pr-4 text-sm text-[#0e1d38] placeholder:text-[#c0cad6]"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-xs font-semibold text-[#5a6b86]">Password</label>
                {!isSignUp && (
                  <button className="text-xs font-medium text-[#2f7de8] hover:underline">Forgot password?</button>
                )}
              </div>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#a8b4c4]" />
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={isSignUp ? "Create a strong password" : "Enter your password"}
                  className="glass-input focus-ring w-full rounded-xl py-2.5 pl-9 pr-10 text-sm text-[#0e1d38] placeholder:text-[#c0cad6]"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#a8b4c4] hover:text-[#5a6b86]"
                  aria-label={showPass ? "Hide password" : "Show password"}
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="button"
              className="orange-button focus-ring mt-1 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition"
            >
              {isSignUp ? "Create Account" : "Sign In"}
              <ArrowRight size={15} />
            </button>
          </div>

          {/* Divider */}
          <div className="mt-5 flex items-center gap-3">
            <span className="h-px flex-1 bg-[#0e1d38]/08" />
            <span className="text-xs text-[#a8b4c4]">or continue with</span>
            <span className="h-px flex-1 bg-[#0e1d38]/08" />
          </div>

          {/* OAuth placeholders */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            {["Google", "GitHub"].map((provider) => (
              <button
                key={provider}
                type="button"
                className="ghost-button focus-ring flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-semibold text-[#0e1d38]"
              >
                {provider === "Google" ? (
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                ) : (
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                  </svg>
                )}
                {provider}
              </button>
            ))}
          </div>

          {/* Footer note */}
          <p className="mt-6 text-center text-xs text-[#a8b4c4]">
            {isSignUp ? (
              <>
                Already have an account?{" "}
                <button onClick={() => setMode("signin")} className="font-semibold text-[#2f7de8] hover:underline">
                  Sign in
                </button>
              </>
            ) : (
              <>
                Don&apos;t have an account?{" "}
                <button onClick={() => setMode("signup")} className="font-semibold text-[#2f7de8] hover:underline">
                  Sign up free
                </button>
              </>
            )}
          </p>

          {/* Clerk note */}
          <div className="mt-4 flex items-center justify-center gap-1.5 rounded-xl bg-[#edf3f8] px-3 py-2">
            <ShieldCheck size={13} className="text-[#1f8068]" />
            <p className="text-[11px] text-[#8a97aa]">
              Connect <span className="font-semibold text-[#0e1d38]">Clerk</span> to enable secure authentication
            </p>
          </div>

          {/* Back home */}
          <Link href="/" className="mt-4 block text-center text-xs font-medium text-[#a8b4c4] hover:text-[#5a6b86]">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
