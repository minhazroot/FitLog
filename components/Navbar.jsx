"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dumbbell, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useFitLog } from "@/context/FitLogContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved, hydrated } = useFitLog();
  const [menuOpen, setMenuOpen] = useState(false);

  const planCount = hydrated ? plan.length : 0;
  const savedCount = hydrated ? saved.length : 0;

  // Close the mobile drawer after navigation.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const workoutActive = pathname === "/";
  const planActive = pathname.startsWith("/my-plan");

  return (
    <header className="sticky top-0 z-50 border-b border-[#252a2e] bg-[#090b0c]/95 backdrop-blur">
      <div className="container-shell relative flex min-h-[72px] items-center justify-between gap-2">
        {/* Mobile: hamburger + brand. Desktop: brand only. */}
        <div className="flex min-w-0 items-center gap-2">
          <button
            type="button"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-md text-[#d8dde0] transition hover:bg-[#171b1e] hover:text-white sm:hidden"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <Link href="/" className="flex min-w-0 items-center gap-2 font-black tracking-wide">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#ccff00] text-black">
              <Dumbbell size={19} />
            </span>
            <span className="text-lg sm:text-xl">FITLOG</span>
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 sm:flex">
          <Link
            className={`text-sm font-bold transition ${workoutActive ? "text-[#ccff00]" : "text-[#a8afb4] hover:text-white"}`}
            href="/"
          >
            WORKOUT
          </Link>
          <Link
            className={`text-sm font-bold transition ${planActive ? "text-[#ccff00]" : "text-[#a8afb4] hover:text-white"}`}
            href="/my-plan"
          >
            MY PLAN
          </Link>
        </nav>

        {/* Counters remain visible on mobile, like the Figma/live demo. */}
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <Link
            href="/my-plan"
            className="rounded-full bg-[#ccff00] px-2.5 py-1.5 text-[10px] font-black text-black sm:px-3 sm:py-2 sm:text-xs"
          >
            PLAN {planCount}
          </Link>
          <Link
            href="/my-plan"
            className="rounded-full border border-[#596168] px-2.5 py-1.5 text-[10px] font-black text-white sm:px-3 sm:py-2 sm:text-xs"
          >
            SAVED {savedCount}
          </Link>
        </div>

        {/* Mobile drawer/dropdown */}
        {menuOpen && (
          <>
            <button
              type="button"
              aria-label="Close navigation menu"
              className="fixed inset-0 top-[72px] z-40 bg-black/25 sm:hidden"
              onClick={() => setMenuOpen(false)}
            />

            <nav
              id="mobile-navigation"
              className="absolute left-0 top-[64px] z-50 w-[185px] overflow-hidden rounded-xl border border-[#252a2e] bg-[#15191d] p-1.5 shadow-2xl sm:hidden"
            >
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className={`block rounded-lg px-3 py-2.5 text-xs font-bold transition ${
                  workoutActive
                    ? "bg-[#20252a] text-[#ccff00]"
                    : "text-[#e4e8ea] hover:bg-[#20252a] hover:text-white"
                }`}
              >
                Workout
              </Link>
              <Link
                href="/my-plan"
                onClick={() => setMenuOpen(false)}
                className={`block rounded-lg px-3 py-2.5 text-xs font-bold transition ${
                  planActive
                    ? "bg-[#20252a] text-[#ccff00]"
                    : "text-[#e4e8ea] hover:bg-[#20252a] hover:text-white"
                }`}
              >
                My Plan
              </Link>
            </nav>
          </>
        )}
      </div>
    </header>
  );
}
