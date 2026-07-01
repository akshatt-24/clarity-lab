"use client";

import { useState } from "react";
import { Bot, Send, Sparkles, UserRound } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

const starterMessages = [
  {
    role: "assistant",
    text: "Hi, I'm Clarity. Ask me about uploaded report findings, reference ranges, or what to discuss with your clinician.",
  },
  {
    role: "user",
    text: "What should I pay attention to in my latest blood test?",
  },
  {
    role: "assistant",
    text: "Once your report is uploaded, I can summarize flagged values, explain likely meaning in plain language, and suggest careful follow-up questions.",
  },
];

const suggestions = ["Explain flagged biomarkers", "Compare two reports", "Prepare doctor questions"];

export default function AskPage() {
  const [message, setMessage] = useState("");

  return (
    <DashboardLayout>
      <div className="mx-auto grid max-w-[1400px] gap-6 xl:grid-cols-[1fr_300px]">
        {/* Chat panel */}
        <section className="glass-card flex min-h-[calc(100vh-7rem)] flex-col rounded-2xl p-5">
          <div className="border-b border-white/60 pb-5">
            <h1 className="text-base font-semibold text-[#0e1d38]">Ask Clarity</h1>
            <p className="mt-1 text-sm text-[#5a6b86]">Chat with your RAG assistant about reports and clinical context</p>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto py-6">
            {starterMessages.map((item, index) => (
              <div key={`${item.role}-${index}`} className={`flex gap-3 ${item.role === "user" ? "justify-end" : ""}`}>
                {item.role === "assistant" && (
                  <span className="brand-gradient grid h-8 w-8 shrink-0 place-items-center rounded-full text-white">
                    <Bot size={16} />
                  </span>
                )}
                <div
                  className={`max-w-[680px] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    item.role === "user"
                      ? "bg-[#2f7de8] text-white"
                      : "bg-white/72 text-[#344764] shadow-sm"
                  }`}
                >
                  {item.text}
                </div>
                {item.role === "user" && (
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#edf3f8] text-[#8a97aa]">
                    <UserRound size={16} />
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Input bar */}
          <div className="flex gap-2.5 rounded-xl glass-input p-2.5">
            <input
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Ask about symptoms, biomarkers, or uploaded results…"
              className="min-h-10 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-[#a8b4c4]"
            />
            <button
              type="button"
              className="focus-ring brand-gradient grid h-10 w-10 place-items-center rounded-lg text-white transition hover:brightness-110"
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </div>
        </section>

        {/* Suggestions */}
        <aside className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8a97aa]">Quick prompts</p>
          {suggestions.map((item) => (
            <button
              key={item}
              className="glass-card hover-glow focus-ring flex w-full items-center gap-3 rounded-xl p-4 text-left text-sm font-semibold text-[#0e1d38]"
            >
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#edf3f8] text-[#1f8068]">
                <Sparkles size={16} />
              </span>
              {item}
            </button>
          ))}
        </aside>
      </div>
    </DashboardLayout>
  );
}
