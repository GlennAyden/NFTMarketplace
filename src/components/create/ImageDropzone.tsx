"use client";

import React, { useCallback, useRef, useState } from "react";

type Props = {
  label?: string;
  hint?: string;
  onFiles?: (files: FileList) => void;
  accept?: string;
  maxSizeMB?: number;
};

export default function ImageDropzone({ label = "Drop your artwork here to upload", hint, onFiles, accept = ".jpg,.jpeg,.png,.gif", maxSizeMB = 10 }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isOver, setIsOver] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const files = e.target.files;
    const f = files[0];
    if (maxSizeMB && f.size > maxSizeMB * 1024 * 1024) {
      alert(`File too large. Max ${maxSizeMB}MB`);
      return;
    }
    setPreviewUrl(URL.createObjectURL(f));
    onFiles?.(files);
  }, [onFiles, maxSizeMB]);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = e.dataTransfer.files;
      const f = files[0];
      if (maxSizeMB && f.size > maxSizeMB * 1024 * 1024) {
        alert(`File too large. Max ${maxSizeMB}MB`);
        return;
      }
      setPreviewUrl(URL.createObjectURL(f));
      onFiles?.(files);
      e.dataTransfer.clearData();
    }
  }, [onFiles, maxSizeMB]);

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setIsOver(true); }}
      onDragLeave={() => setIsOver(false)}
      onDrop={onDrop}
      className={`rounded-xl border border-dashed ${isOver ? 'border-sky-500 bg-sky-500/10' : 'border-white/20 bg-white/5'} p-4 sm:p-6 text-center`}
    >
      {previewUrl ? (
        <div className="relative mx-auto max-w-sm">
          <img src={previewUrl} alt="Preview" className="rounded-lg w-full object-cover" />
        </div>
      ) : (
        <>
          <div className="text-3xl">⬆️</div>
          <div className="mt-2 text-sm text-slate-200">{label}</div>
          <div className="text-xs text-slate-400">File types allowed: {accept}. Max file size: {maxSizeMB}MB</div>
        </>
      )}
      {hint ? <div className="mt-2 text-xs text-slate-400">{hint}</div> : null}
      <div className="mt-3">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 text-sm hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0f14]"
        >
          Choose Image...
        </button>
        <input ref={inputRef} type="file" accept={accept} className="hidden" onChange={onChange} />
      </div>
    </div>
  );
}

