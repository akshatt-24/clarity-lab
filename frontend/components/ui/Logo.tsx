import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 focus-ring rounded-xl">
      <span className="brand-gradient grid h-8 w-8 place-items-center rounded-xl text-white shadow-sm">
        <Sparkles size={17} strokeWidth={2.4} />
      </span>
      <span className="text-sm font-semibold tracking-tight text-[#0e1d38]">
        Clarity Lab
      </span>
    </Link>
  );
}
