import Link from "next/link";

export default function Logo() {
  return (
    <Link 
      href="/" 
      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0f14] transition-colors"
    >
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-purple-600 flex items-center justify-center shadow-lg">
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none"
          className="text-white"
        >
          {/* NFT-inspired geometric design */}
          <path
            d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z"
            fill="currentColor"
            fillOpacity="0.8"
          />
          <path
            d="M6 6h2v2H6zM16 6h2v2h-2zM6 16h2v2H6zM16 16h2v2h-2z"
            fill="currentColor"
            fillOpacity="0.4"
          />
        </svg>
      </div>
      
      <span className="text-sm font-semibold text-white/90">
        Collectible
      </span>
    </Link>
  );
}