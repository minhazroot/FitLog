import { Dumbbell } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-[#252a2e] bg-[#0c0e10] py-10">
      <div className="container-shell flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3 font-black tracking-wide">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-[#ccff00] text-black"><Dumbbell size={18} /></span>
          FITLOG
        </div>
        <p className="text-sm text-[#8c949a]">© 2026 FitLog — Workout Library. Train hard, log honest.</p>
      </div>
    </footer>
  );
}

