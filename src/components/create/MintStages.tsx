import React from "react";

type Stage = {
  id: string;
  name: string;
  priceEth: string;
  start: string;
  end?: string;
  free?: boolean;
};

export default function MintStages({ stages }: { stages: Stage[] }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
      {stages.length === 0 ? (
        <div className="text-sm text-slate-300">No stages yet.</div>
      ) : (
        <ul className="space-y-2">
          {stages.map((s) => (
            <li key={s.id} className="rounded-lg border border-white/10 bg-black/20 p-3">
              <div className="flex items-center justify-between">
                <div className="font-medium">
                  {s.name} {s.free ? <span className="ml-2 text-emerald-400 text-xs">FREE</span> : null}
                </div>
                <div className="text-sm text-slate-300">{s.priceEth} ETH</div>
              </div>
              <div className="mt-1 text-xs text-slate-400">{s.start}{s.end ? ` — Ends: ${s.end}` : ''}</div>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-3">
        <button type="button" className="inline-flex items-center rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 text-sm hover:bg-white/15">+ Add Allowlist Stage</button>
      </div>
    </div>
  );
}

