import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-shell grid min-h-[65vh] place-items-center py-16 text-center">
      <div>
        <div className="display-font text-8xl text-[#ccff00]">404</div>
        <h1 className="display-font mt-2 text-4xl uppercase">Page not found</h1>
        <p className="mt-4 text-[#969da3]">That route does not exist in FitLog.</p>
        <Link href="/" className="mt-7 inline-block rounded-xl bg-[#ccff00] px-5 py-3 text-sm font-black text-black">BACK TO WORKOUTS</Link>
      </div>
    </section>
  );
}
