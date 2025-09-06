import { cardBase } from "@/constants/styles";

interface OverviewCardProps {
  overview: string;
}

export default function OverviewCard({ overview }: OverviewCardProps) {
  return (
    <section className={`${cardBase} mt-6 p-6`}>
      <h3 className="text-base font-semibold mb-3">Overview</h3>
      <p className="text-sm leading-relaxed text-slate-300">{overview}</p>
    </section>
  );
}