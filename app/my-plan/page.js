"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Dumbbell, Clock3, Flame, ChevronDown } from "lucide-react";
import PlanItem from "@/components/PlanItem";
import { useFitLog } from "@/context/FitLogContext";

function toNumber(value) {
  if (typeof value === "number") return Number.isFinite(value) ? value : 0;
  const parsed = parseFloat(String(value ?? "").replace(/[^0-9.-]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

export default function MyPlanPage() {
  const {
    plan,
    saved,
    doneIds,
    hydrated,
    removeFromPlan,
    removeFromSaved,
    markDone,
  } = useFitLog();

  const [tab, setTab] = useState("plan");
  const [sortBy, setSortBy] = useState("duration");

  // The summary always reflects the ACTIVE tab, matching the reference site.
  const activeList = tab === "plan" ? plan : saved;

  const metrics = useMemo(
    () => ({
      exercises: activeList.length,
      minutes: activeList.reduce(
        (sum, item) => sum + toNumber(item.duration),
        0
      ),
      calories: activeList.reduce(
        (sum, item) => sum + toNumber(item.caloriesBurned),
        0
      ),
    }),
    [activeList]
  );

  const sortedList = useMemo(() => {
    return [...activeList].sort((a, b) => {
      if (sortBy === "calories") {
        return toNumber(b.caloriesBurned) - toNumber(a.caloriesBurned);
      }
      if (sortBy === "rating") {
        return toNumber(b.rating) - toNumber(a.rating);
      }
      return toNumber(a.duration) - toNumber(b.duration);
    });
  }, [activeList, sortBy]);

  return (
    <section className="container-shell py-12 lg:py-16">
      <h1 className="display-font text-5xl uppercase sm:text-6xl">My Plan</h1>
      <p className="mt-3 text-[#9ba2a8]">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          ["Exercises", metrics.exercises, Dumbbell],
          ["Minutes", metrics.minutes, Clock3],
          ["Calories", metrics.calories, Flame],
        ].map(([label, value, Icon]) => (
          <div
            key={label}
            className="rounded-2xl border border-[#2b3135] bg-[#111416] p-5"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-[.16em] text-[#7f878d]">
                {label}
              </span>
              <Icon size={18} className="text-[#ccff00]" />
            </div>
            <div className="display-font mt-3 text-4xl">{value}</div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-col gap-5 border-b border-[#2a3034] pb-0 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => setTab("plan")}
            className={`border-b-2 px-4 py-3 text-sm font-black ${
              tab === "plan"
                ? "border-[#ccff00] text-[#ccff00]"
                : "border-transparent text-[#8f979d]"
            }`}
          >
            TODAY&apos;S PLAN ({plan.length})
          </button>
          <button
            onClick={() => setTab("saved")}
            className={`border-b-2 px-4 py-3 text-sm font-black ${
              tab === "saved"
                ? "border-[#ccff00] text-[#ccff00]"
                : "border-transparent text-[#8f979d]"
            }`}
          >
            SAVED ({saved.length})
          </button>
        </div>

        <label className="mb-3 block w-full sm:w-72">
          <span className="mb-2 block text-sm font-bold text-white">Sort By</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full appearance-none rounded-xl border border-[#343b40] bg-[#0d1012] px-4 py-3 pr-10 text-sm font-bold text-white outline-none focus:border-[#ccff00]"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#a8afb4]"
            />
          </div>
        </label>
      </div>

      {!hydrated ? (
        <div className="grid min-h-64 place-items-center">
          <div className="text-center">
            <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-[#30373c] border-t-[#ccff00]" />
            <p className="mt-4 text-[#9da4aa]">Loading workouts…</p>
          </div>
        </div>
      ) : sortedList.length === 0 ? (
        <div className="mt-8 grid min-h-[330px] place-items-center rounded-2xl border border-dashed border-[#353c41] bg-[#0e1113] p-8 text-center">
          <div>
            <h2 className="display-font text-4xl uppercase">Nothing Here Yet</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#959da3]">
              Browse the library and add a lift to get today moving.
            </p>
            <Link
              href="/"
              className="mt-6 inline-block rounded-xl bg-[#ccff00] px-5 py-3 text-sm font-black text-black"
            >
              GO TO WORKOUTS
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {sortedList.map((workout) => (
            <PlanItem
              key={workout.id}
              workout={workout}
              showDone={tab === "plan"}
              isDone={doneIds.includes(workout.id)}
              onDone={() => markDone(workout.id)}
              onRemove={() =>
                tab === "plan"
                  ? removeFromPlan(workout.id)
                  : removeFromSaved(workout.id)
              }
            />
          ))}
        </div>
      )}
    </section>
  );
}
