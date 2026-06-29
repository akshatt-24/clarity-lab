"use client";

import { useState } from "react";
import { Bot, Send, Sparkles, UserRound } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

const starterMessages = [
  {
    role: "assistant",
    text: "Hi, I am Clarity. Ask me about uploaded report findings, reference ranges, or what to discuss with your clinician.",
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

export default function AskPage() {
  const [message, setMessage] = useState("");

  return (
    <DashboardLayout>
      <div className="mx-auto grid max-w-[1500px] gap-8 xl:grid-cols-[1fr_360px]">
        <section className="glass-card flex min-h-[calc(100vh-5rem)] flex-col rounded-3xl p-6">
          <div className="border-b border-[#10213f]/10 pb-6">
            <h1 className="text-4xl font-semibold text-[#10213f]">Ask Clarity</h1>
            <p className="mt-3 text-xl text-[#5f7192]">Chat with your RAG assistant about reports and clinical context</p>
          </div>

          <div className="flex-1 space-y-5 overflow-y-auto py-8">
            {starterMessages.map((item, index) => (
              <div key={`${item.role}-${index}`} className={`flex gap-4 ${item.role === "user" ? "justify-end" : ""}`}>
                {item.role === "assistant" && (
                  <span className="brand-gradient grid h-11 w-11 shrink-0 place-items-center rounded-full text-white">
                    <Bot size={22} />
                  </span>
                )}
                <div className={`max-w-[760px] rounded-3xl px-6 py-4 text-lg leading-relaxed ${
                  item.role === "user"
                    ? "bg-[#2f80ed] text-white"
                    : "bg-white/72 text-[#344764] shadow-sm"
                }`}>
                  {item.text}
                </div>
                {item.role === "user" && (
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#edf3f8] text-[#60728f]">
                    <UserRound size={22} />
                  </span>
                )}
              </div>
            ))}
          </div>

          <form className="flex gap-3 rounded-3xl bg-white/76 p-3 shadow-sm">
            <input
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Ask about symptoms, biomarkers, or uploaded results..."
              className="min-h-14 flex-1 bg-transparent px-4 text-lg outline-none placeholder:text-[#8a97aa]"
            />
            <button
              type="button"
              className="focus-ring brand-gradient grid h-14 w-14 place-items-center rounded-2xl text-white"
              aria-label="Send message"
            >
              <Send size={22} />
            </button>
          </form>
        </section>

        <aside className="space-y-5">
          {["Explain flagged biomarkers", "Compare two reports", "Prepare doctor questions"].map((item) => (
            <button key={item} className="glass-card focus-ring flex w-full items-center gap-4 rounded-2xl p-5 text-left text-lg font-semibold text-[#10213f]">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#edf3f8] text-[#258a72]">
                <Sparkles size={22} />
              </span>
              {item}
            </button>
          ))}
        </aside>
      </div>
    </DashboardLayout>
  );
}
