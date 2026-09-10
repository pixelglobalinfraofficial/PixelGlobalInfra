import { Search } from "lucide-react";

/**
 * Hero search field. Submits to the projects listing as a plain GET form, so
 * it works without JavaScript and needs no client component.
 */
export function HeroSearch() {
  return (
    <form
      action="/projects"
      method="get"
      className="mx-auto flex w-full max-w-[680px] items-stretch gap-0 border border-white/25 bg-white/10 p-[6px] backdrop-blur-[2px]"
    >
      <label htmlFor="hero-search" className="sr-only">
        Search by area, budget or property type
      </label>
      <input
        id="hero-search"
        name="q"
        type="search"
        placeholder="Area, budget, or property type..."
        className="text-primary placeholder:text-primary/45 min-w-0 flex-1 bg-[var(--cream)] px-5 py-4 text-[15px] outline-none"
      />
      <button
        type="submit"
        className="bg-primary text-primary-foreground hover:bg-primary-hover inline-flex shrink-0 items-center gap-2 px-6 py-4 text-[12px] font-semibold tracking-[0.16em] uppercase transition-colors sm:px-9"
      >
        <Search className="size-4 sm:hidden" aria-hidden="true" />
        <span className="hidden sm:inline">Search Portfolio</span>
        <span className="sr-only sm:hidden">Search Portfolio</span>
      </button>
    </form>
  );
}
