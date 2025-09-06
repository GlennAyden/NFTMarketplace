import { heading } from "@/constants/styles";
import DropCard from "./DropCard";
import { DropCard as Drop } from "@/types";

type DropsSectionProps = {
  drops: Drop[];
};

export default function DropsSection({ drops }: DropsSectionProps) {
  return (
    <section className="mt-8 sm:mt-10">
      <h3 className={`text-base sm:text-lg ${heading}`}>NFT Drops Calendar</h3>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {drops.map((drop, i) => (
          <DropCard key={i} drop={drop} />
        ))}
      </div>
    </section>
  );
}
