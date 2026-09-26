"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowDown, ChevronDown } from "lucide-react";
import WorkoutCard from "./WorkoutCard";

const API = "https://api.abcz.workers.dev/api/fitlog";

export default function HomeClient()  {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState("duration");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(API);
        if (!res.ok) throw new Error("Could not fetch workouts");
        setWorkouts(await res.json());
      } catch (e) {
        setError(e.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const sorted = useMemo(() => {
    const data = [...workouts];
    if (sortBy === "duration") return data.sort((a, b) => a.duration - b.duration);
    if (sortBy === "calories") return data.sort((a, b) => a.caloriesBurned - b.caloriesBurned);
    return data.sort((a, b) => b.rating - a.rating);
  }, [workouts, sortBy]);

  return (
    <>
      <section className="container-shell py-8 sm:py-10 lg:py-14">
        <div className="grid min-h-[520px] overflow-hidden rounded-2xl border border-[#262c31] bg-[#1a1e22] px-7 py-10 shadow-[0_18px_50px_rgba(0,0,0,.28)] sm:px-10 sm:py-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-10 lg:px-12 xl:px-14">
          <div className="relative z-10">
            <div className="mb-5 text-xs font-black uppercase tracking-[.24em] text-[#ccff00]">Workout Library</div>
            <h1 className="display-font max-w-2xl text-5xl uppercase leading-[.95] sm:text-6xl lg:text-[64px] xl:text-[72px]">Train with intent. Log every set.</h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-[#c0c5c9] sm:text-lg">FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.</p>
            <a href="#library" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#ccff00] px-6 py-3.5 text-sm font-black text-black transition hover:brightness-110">BROWSE WORKOUTS <ArrowDown size={18} /></a>
          </div>

          <div className="mt-8 flex items-end justify-center self-stretch lg:mt-0 lg:justify-end">
            <img
              src="/banner.png"
              alt="Gym illustration"
              className="max-h-[360px] w-auto object-contain drop-shadow-[0_28px_48px_rgba(0,0,0,.35)] sm:max-h-[410px] lg:max-h-[445px]"
            />
          </div>
        </div>
      </section>

      {/* <section id="library" className="container-shell scroll-mt-28 py-8">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="display-font text-4xl uppercase sm:text-5xl">The Library</h2>
            <p className="mt-2 text-[#969da3]">Twelve lifts covering every major muscle group.</p>
          </div>
          <label className="relative w-full sm:w-52">
            <span className="mb-2 block text-[10px] font-black uppercase tracking-[.18em] text-[#7f878d]">Sort By</span>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full appearance-none rounded-xl border border-[#31373c] bg-[#111416] px-4 py-3 pr-10 text-sm font-bold outline-none focus:border-[#ccff00]">
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
            <ChevronDown size={16} className="pointer-events-none absolute bottom-3.5 right-3 text-[#9da4aa]" />
          </label>
        </div>

        {loading && (
          <div className="grid min-h-64 place-items-center rounded-2xl border border-[#242a2e] bg-[#0e1113]">
            <div className="text-center">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#30373c] border-t-[#ccff00]" />
              <p className="mt-4 text-sm text-[#a6adb2]">Loading workouts…</p>
            </div>
          </div>
        )}
        {error && <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-5 text-red-300">{error}</div>}
        {!loading && !error && <div className="card-grid">{sorted.map((workout) => <WorkoutCard key={workout.id} workout={workout} />)}</div>}
      </section> */}
    </>
  );
}
