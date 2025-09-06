import { cardBase } from "@/constants/styles";
import { DropCard as DropCardType } from "@/types";
import StatusChip from "./StatusChip";

interface DropCardProps {
  drop: DropCardType;
}

export default function DropCard({ drop }: DropCardProps) {
  const { creatorName, priceEth, items, mintedPercent, status, endsAt } = drop;

  return (
    <article className={`${cardBase} overflow-hidden hover:bg-white/10 transition focus-within:ring-2 focus-within:ring-white/30`}>
      {/* Header image area */}
      <div className="relative">
        <div className="h-40 w-full bg-gradient-to-b from-sky-700/70 to-sky-900/70" />
        <div className="absolute inset-0 flex items-center justify-center text-xs text-white/70">Creator image / Profile</div>
      </div>

      {/* Blue name bar */}
      <div className="bg-sky-700 text-white px-4 py-3">
        <div className="text-sm font-semibold">{creatorName}</div>
      </div>

      {/* Body info */}
      <div className="px-4 py-3 grid grid-cols-3 gap-3 text-xs text-slate-200">
        <div>
          <div className="text-slate-400 text-[11px]">Price</div>
          <div className="font-medium">{typeof priceEth === "number" ? `${priceEth.toFixed(2)} ETH` : `${priceEth} ETH`}</div>
        </div>
        <div>
          <div className="text-slate-400 text-[11px]">Items</div>
          <div className="font-medium">{items}</div>
        </div>
        <div>
          <div className="text-slate-400 text-[11px]">Minted</div>
          <div className="font-medium">{mintedPercent}%</div>
        </div>
      </div>

      {/* Footer status */}
      <div className="px-4 pb-4 flex items-center justify-between">
        <StatusChip status={status} />
        <span className="inline-flex items-center gap-1 rounded-lg border border-white/15 bg-white/5 px-2 py-1 text-[11px] text-slate-200">⏳ Ends: {endsAt}</span>
      </div>
    </article>
  );
}
