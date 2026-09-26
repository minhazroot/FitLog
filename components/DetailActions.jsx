"use client";

import { Bookmark, CalendarPlus } from "lucide-react";
import { useFitLog } from "@/context/FitLogContext";

export default function DetailActions({ workout }) {
  const { addToPlan, saveForLater, plan, saved } = useFitLog();
  const inPlan = plan.some((item) => item.id === workout.id);
  const inSaved = saved.some((item) => item.id === workout.id);

  return (
    <div className="mt-7 flex flex-col gap-3 sm:flex-row">
      <button onClick={() => addToPlan(workout)} disabled={inPlan || plan.length >= 5} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#ccff00] px-5 py-4 text-sm font-black text-black disabled:cursor-not-allowed disabled:opacity-45">
        <CalendarPlus size={18} /> {inPlan ? "Already in today's plan" : "Add to today's plan"}
      </button>
      <button onClick={() => saveForLater(workout)} disabled={inSaved} className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#424a50] bg-[#131719] px-5 py-4 text-sm font-black text-white disabled:cursor-not-allowed disabled:opacity-45">
        <Bookmark size={18} /> {inSaved ? "Saved" : "Save for later"}
      </button>
    </div>
  );
}
