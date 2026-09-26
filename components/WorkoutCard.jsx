import Link from "next/link";
import { Clock3, Flame, Star } from "lucide-react";

export default function WorkoutCard({ workout }) {
  return (
    <Link href={`/workout/${workout.id}`} className="group overflow-hidden rounded-2xl border border-[#272d31] bg-[#111416] transition hover:-translate-y-1 hover:border-[#ccff00]/60">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#171b1e]">
        <img src={workout.image} alt={workout.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#111416] to-transparent" />
      </div>
      <div className="p-5">
        <div className="mb-3 flex flex-wrap gap-2">
          {workout.muscleGroups.map((group) => (
            <span key={group} className="rounded-full border border-[#3a4247] px-2.5 py-1 text-[10px] font-black tracking-wider text-[#ccff00]">{group.toUpperCase()}</span>
          ))}
        </div>
        <h3 className="display-font text-2xl uppercase leading-tight">{workout.name}</h3>
        <p className="mt-2 text-sm text-[#959da3]">{workout.equipment}</p>
        <div className="mt-5 flex items-center gap-4 border-t border-[#272d31] pt-4 text-xs text-[#c6ccd0]">
          <span className="flex items-center gap-1.5"><Clock3 size={14} className="text-[#ff5a5f]" />{workout.duration} min</span>
          <span className="flex items-center gap-1.5"><Flame size={14} className="text-[#ff5a5f]" />{workout.caloriesBurned} kcal</span>
          <span className="flex items-center gap-1.5"><Star size={14} className="text-[#ff5a5f]" />{workout.rating}</span>
        </div>
      </div>
    </Link>
  );
}
