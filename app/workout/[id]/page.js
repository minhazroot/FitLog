"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Clock3, Flame, Star } from "lucide-react";
import DetailActions from "@/components/DetailActions";

export default function WorkoutDetailPage() {
  const { id } = useParams();
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    async function load() {
      try {
        const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`);
        if (!res.ok) throw new Error("Workout not found");
        setWorkout(await res.json());
      } catch (e) {
        setError(e.message || "Workout not found");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) return <div className="container-shell grid min-h-[60vh] place-items-center"><div className="text-center"><div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#30373c] border-t-[#ccff00]"/><p className="mt-4 text-[#9da4aa]">Loading workout…</p></div></div>;
  if (error || !workout) return <div className="container-shell py-24"><h1 className="display-font text-5xl">WORKOUT NOT FOUND</h1><p className="mt-4 text-[#9da4aa]">{error}</p></div>;

  const specs = [
    ["EQUIPMENT", workout.equipment],
    ["DIFFICULTY", workout.difficulty],
    ["SETS", workout.sets],
    ["REPS", workout.reps],
    ["DURATION", `${workout.duration} min`],
    ["CALORIES", `${workout.caloriesBurned} kcal`],
    ["RATING", workout.rating],
  ];

  return (
    <section className="container-shell py-10 lg:py-16">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="overflow-hidden rounded-3xl border border-[#2b3135] bg-[#131719]">
          <img src={workout.image} alt={workout.name} className="h-full min-h-[420px] w-full object-cover" />
        </div>
        <div>
          <div className="mb-4 flex flex-wrap gap-2">{workout.muscleGroups.map((group) => <span key={group} className="rounded-full border border-[#455057] px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#ccff00]">{group}</span>)}</div>
          <h1 className="display-font text-5xl uppercase leading-[.95] sm:text-6xl">{workout.name}</h1>
          <p className="mt-5 text-base leading-7 text-[#a0a7ad]">{workout.description}</p>

          <div className="mt-7 flex gap-5 text-sm text-[#cbd0d4]">
            <span className="flex items-center gap-2"><Clock3 size={16} className="text-[#ff5a5f]" />{workout.duration} min</span>
            <span className="flex items-center gap-2"><Flame size={16} className="text-[#ff5a5f]" />{workout.caloriesBurned} kcal</span>
            <span className="flex items-center gap-2"><Star size={16} className="text-[#ff5a5f]" />{workout.rating}</span>
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-[#2b3236]">
            {specs.map(([label, value]) => (
              <div key={label} className="grid grid-cols-[130px_1fr] border-b border-[#252b2f] bg-[#111416] px-4 py-3 last:border-b-0">
                <span className="text-[11px] font-black tracking-[.14em] text-[#7f888e]">{label}</span>
                <span className="text-sm font-bold">{value}</span>
              </div>
            ))}
          </div>

          <div className="mt-9">
            <h2 className="display-font text-3xl uppercase">Instructions</h2>
            <ol className="mt-5 space-y-4">
              {workout.instructions.map((step, index) => (
                <li key={step} className="grid grid-cols-[34px_1fr] gap-3 text-sm leading-6 text-[#b5bcc1]"><span className="grid h-8 w-8 place-items-center rounded-full bg-[#ccff00] text-xs font-black text-black">{index + 1}</span><span>{step}</span></li>
              ))}
            </ol>
          </div>

          <DetailActions workout={workout} />
        </div>
      </div>
    </section>
  );
}
