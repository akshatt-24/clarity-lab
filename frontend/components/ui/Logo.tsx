import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3 focus-ring rounded-xl">
      <span className="brand-gradient grid h-12 w-12 place-items-center rounded-2xl text-white shadow-sm">
        <Sparkles size={27} strokeWidth={2.4} />
      </span>
      <span className="text-2xl font-semibold tracking-normal text-[#1f2b3d]">
        Clarity Lab
      </span>
    </Link>
  );
}
