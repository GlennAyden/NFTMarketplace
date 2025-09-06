import Image from "next/image";
import { cardBase } from "@/constants/styles";

interface MintImageProps {
  imageUrl?: string;
  alt: string;
}

export default function MintImage({ imageUrl, alt }: MintImageProps) {
  return (
    <section
      className={`${cardBase} w-full aspect-square overflow-hidden flex items-center justify-center`}
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={alt}
          fill
          className="object-cover"
          priority
        />
      ) : (
        <div className="h-full w-full grid place-items-center bg-[#8d8d8d] text-slate-800 text-lg">
          Image Mint
        </div>
      )}
    </section>
  );
}