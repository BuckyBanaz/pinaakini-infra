import { Compass } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-ivory text-ink">
      <div className="w-12 h-12 rounded-xl bg-forest flex items-center justify-center text-[#c6ae82] shadow-lg animate-pulse">
        <Compass className="w-6 h-6 text-[#c6ae82] animate-spin" style={{ animationDuration: "3s" }} />
      </div>
      <p className="mt-4 font-display text-lg tracking-wider text-ink font-light">
        PINAAKINI INFRA
      </p>
      <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-bronze mt-1">
        Loading Architectural Experience...
      </span>
    </div>
  );
}
