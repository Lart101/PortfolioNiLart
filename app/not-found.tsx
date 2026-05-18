import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background text-foreground grain-overlay overflow-x-hidden items-center justify-center">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] rounded-full bg-[radial-gradient(circle,_oklch(0.55_0.12_45_/_0.08)_0%,_transparent_70%)]" />
        <div className="absolute top-[10%] right-[-5%] w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] rounded-full bg-[radial-gradient(circle,_oklch(0.65_0.18_85_/_0.06)_0%,_transparent_70%)]" />
        <div className="absolute bottom-[20%] left-[10%] w-[180px] sm:w-[250px] h-[180px] sm:h-[250px] rounded-full bg-[radial-gradient(circle,_oklch(0.55_0.12_45_/_0.05)_0%,_transparent_70%)]" />
        <div className="absolute -bottom-20 right-[20%] w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] rounded-full bg-[radial-gradient(circle,_oklch(0.65_0.18_85_/_0.04)_0%,_transparent_70%)]" />
        <div className="absolute top-[30%] left-0 w-px h-[20%] bg-gradient-to-b from-transparent via-[oklch(0.55_0.12_45_/_0.1)] to-transparent hidden sm:block" />
        <div className="absolute top-[50%] right-[5%] w-px h-[25%] bg-gradient-to-b from-transparent via-[oklch(0.65_0.18_85)_/_0.08)] to-transparent hidden sm:block" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-5 sm:gap-6 px-6 text-center max-w-sm sm:max-w-md">
        <div className="inline-flex items-center gap-2 sm:gap-3 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-[oklch(0.55_0.12_45_/_0.08)] rounded-full border border-[oklch(0.55_0.12_45)_/_0.15]">
          <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[oklch(0.55_0.12_45)] animate-pulse" />
          <span className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[oklch(0.55_0.12_45)]">
            404
          </span>
        </div>

        <h1 className="text-3xl sm:text-6xl lg:text-7xl font-heading font-semibold tracking-tight text-foreground leading-[1]">
          Data Not Found
        </h1>

        <p className="text-sm sm:text-lg text-foreground/70 font-sans">
          Could not load portfolio data. The source may be temporarily unavailable.
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2.5 px-6 py-3 bg-[oklch(0.55_0.12_45)] text-white rounded-xl font-medium text-sm hover:bg-[oklch(0.5_0.1_45)] transition-all shadow-xl shadow-[oklch(0.55_0.12_45)_/_0.25] hover:scale-105 min-h-[44px] w-full sm:w-auto"
        >
          Try Again
        </Link>
      </div>
    </div>
  );
}
