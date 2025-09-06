import { DropStatus } from "@/types";

interface StatusChipProps {
  status: DropStatus;
  label: string;
}

export default function StatusChip({ status }: StatusChipProps) {
  const base = "inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] border";

  if (status === "live") {
    return <span className={`${base} border-emerald-400/30 bg-emerald-400/10 text-emerald-300`}>● Live</span>;
  }
  if (status === "upcoming") {
    return <span className={`${base} border-amber-400/30 bg-amber-400/10 text-amber-300`}>⏳ Upcoming</span>;
  }
  return <span className={`${base} border-white/15 bg-white/5 text-slate-300`}>✓ Ended</span>;
}

