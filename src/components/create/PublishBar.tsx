"use client";

import React from "react";

export default function PublishBar({ disabled, onPublish, chainLabel }: { disabled?: boolean; onPublish?: () => void; chainLabel?: string }) {
  return (
    <div className="sticky bottom-0 inset-x-0 z-30 border-t border-white/10 bg-[#0b0f14]/80 backdrop-blur p-3">
      <div className="mx-auto max-w-7xl flex items-center justify-end">
        <button
          type="button"
          disabled={disabled}
          onClick={onPublish}
          className={`rounded-xl px-6 py-3 font-semibold text-sm tracking-wide transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0f14] ${disabled ? 'bg-slate-600 cursor-not-allowed text-white/80' : 'bg-pink-600 hover:bg-pink-700 text-white'}`}
        >
          Publish on {chainLabel || 'Selected Chain'}
        </button>
      </div>
    </div>
  );
}

