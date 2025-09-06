"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { container } from "@/constants/styles";
import Logo from "./Logo";
import { NAV_LINKS } from "@/constants/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0b0f14]/80 backdrop-blur">
      <div className={`grid grid-cols-12 items-center gap-4 py-4 ${container}`}>
        {/* Left: Logo and Navigation */}
        <nav
          className="col-span-12 xs:col-span-6 sm:col-span-4 lg:col-span-4 flex items-center gap-1 overflow-x-auto shrink-0"
          aria-label="Primary"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <Logo />
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={pathname === l.href ? "true" : undefined}
              className="text-sm px-3 py-2 rounded-lg hover:bg-white/10 aria-[current=true]:bg-white/15 aria-[current=true]:text-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0f14]"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Center: Search */}
        <div className="col-span-12 sm:col-span-5 lg:col-span-5 min-w-0 justify-self-center">
          <div className="relative mx-auto w-full max-w-md md:max-w-lg lg:max-w-xl">
            <form action="/search" method="get">
              <input
                type="search"
                name="q"
                placeholder={pathname === "/mint" ? "Search Collections" : "Search Collectibles"}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm placeholder:text-slate-400 focus:border-white/20 focus:ring-2 focus:ring-white/20 focus-visible:outline-none min-w-0"
                aria-label={pathname === "/mint" ? "Search Collections" : "Search Collectibles"}
              />
            </form>
          </div>
        </div>

        {/* Right: Connect Button */}
        <div className="col-span-12 sm:col-span-3 lg:col-span-3 flex justify-end">
          <ConnectButton />
        </div>
      </div>
    </header>
  );
}
