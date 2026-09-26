"use client";

import Link from "next/link";
import { Check, Clock3, Flame, Star, X } from "lucide-react";

export default function PlanItem({ workout, showDone, isDone, onDone, onRemove }) {
  return (
    <div className="grid gap-4 rounded-2xl border border-[#2a3034] bg-[#111416] p-4 sm:grid-cols-[150px_1fr_auto] sm:items-center">
      <img src={workout.image} alt={workout.name} className="h-28 w-full rounded-xl object-cover sm:h-24 sm:w-[150px]" />
      <div>
        <div className="flex flex-wrap items-center gap-2"><h3 className="display-font text-2xl uppercase">{workout.name}</h3>{isDone && <span className="rounded-full bg-[#ccff00] px-2.5 py-1 text-[10px] font-black text-black">DONE</span>}</div>
        <p className="mt-1 text-sm text-[#90989e]">{workout.equipment}</p>
        <div className="mt-3 flex flex-wrap gap-4 text-xs text-[#c6ccd0]"><span className="flex items-center gap-1"><Clock3 size={13} className="text-[#ff5a5f]" />{workout.duration} min</span><span className="flex items-center gap-1"><Flame size={13} className="text-[#ff5a5f]" />{workout.caloriesBurned} kcal</span><span className="flex items-center gap-1"><Star size={13} className="text-[#ff5a5f]" />{workout.rating}</span></div>
      </div>
      <div className="flex flex-wrap gap-2 sm:max-w-[190px] sm:justify-end">
        <Link href={`/workout/${workout.id}`} className="rounded-lg border border-[#4a5359] px-3 py-2 text-xs font-black">VIEW DETAILS</Link>
        {showDone && <button disabled={isDone} onClick={onDone} className="inline-flex items-center gap-1 rounded-lg bg-[#ccff00] px-3 py-2 text-xs font-black text-black disabled:opacity-45"><Check size={14} />{isDone ? "DONE" : "MARK AS DONE"}</button>}
        <button onClick={onRemove} aria-label="Remove workout" className="grid h-9 w-9 place-items-center rounded-lg border border-[#633a3d] text-[#ff777b] hover:bg-red-500/10"><X size={16} /></button>
      </div>
    </div>
  );
}
