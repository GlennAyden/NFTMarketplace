"use client";

import React from "react";
import ImageDropzone from "./ImageDropzone";

type ArtType = "same" | "unique";

type Props = {
  artType: ArtType;
  onChange: (v: ArtType) => void;
};

export default function ArtTypeSelector({ artType, onChange }: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      <div className="lg:col-span-5">
        <div className="grid grid-cols-1 gap-3">
          <button
            type="button"
            onClick={() => onChange("same")}
            className={`text-left rounded-xl border px-4 py-3 ${artType === 'same' ? 'border-emerald-400/40 bg-emerald-400/10' : 'border-white/10 bg-white/5'} hover:bg-white/10`}
          >
            <div className="font-medium">Same Artwork</div>
            <div className="text-xs text-slate-300">An ERC‑1155 collection where everyone mints the same artwork</div>
          </button>
          <button
            type="button"
            onClick={() => onChange("unique")}
            className={`text-left rounded-xl border px-4 py-3 ${artType === 'unique' ? 'border-emerald-400/40 bg-emerald-400/10' : 'border-white/10 bg-white/5'} hover:bg-white/10`}
          >
            <div className="font-medium">Unique Artwork</div>
            <div className="text-xs text-slate-300">An ERC‑721 collection where everyone mints a unique artwork</div>
          </button>
        </div>
      </div>
      <div className="lg:col-span-7">
        <label className="block text-xs text-slate-300 mb-1">Artwork Upload</label>
        <ImageDropzone hint="File types allowed: .jpg, .png. Max file size: 10MB" />
      </div>
    </div>
  );
}

