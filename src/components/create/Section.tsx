import React from "react";
import { cardBase } from "@/constants/styles";

export default function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className={`${cardBase} p-4 sm:p-6`}>
      <h3 className="text-base sm:text-lg font-semibold mb-3">{title}</h3>
      {children}
    </section>
  );
}

