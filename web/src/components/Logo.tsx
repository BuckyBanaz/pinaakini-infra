// Placeholder brand mark until the official Pinaakini logo files are supplied.
export default function Logo({ light = false, className = "" }: { light?: boolean; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <svg width="38" height="38" viewBox="0 0 40 40" aria-hidden className="shrink-0">
        <rect width="40" height="40" rx="9" fill="#2563eb" />
        <path d="M9 19 20 10l11 9" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 30V20h7a4.5 4.5 0 0 1 0 9h-7" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className={`text-[19px] font-semibold tracking-[-0.01em] ${light ? "text-white" : "text-[#111827]"}`}>Pinaakini</span>
        <span className={`mt-1 text-[10px] font-medium uppercase tracking-[0.32em] ${light ? "text-white/70" : "text-[#2563eb]"}`}>Infra</span>
      </span>
    </span>
  );
}
