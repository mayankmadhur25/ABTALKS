import TallyStrip, { TallyKey } from "@/components/TallyStrip";
import {
  getMarks,
  getStudent,
  getCohortMarks,
  SCENARIOS,
  getScenarioLabel,
} from "@/lib/data";

/*
 * Temporary component preview. Replaced by the real landing page in commit 4.
 * It exists so the tokens and the TallyStrip can be checked on a real phone
 * before three screens are built on top of them.
 */
export default function TokenPreview() {
  return (
    <main className="px-5 py-12">
      <p className="eyebrow">Commit 3 · component preview</p>
      <h1 className="mt-3 font-display text-[30px] font-extrabold leading-[1.05] tracking-tight">
        Screenprint
      </h1>
      <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
        Not the landing page. A working preview of the design system so it can
        be checked at 390px before the screens are built.
      </p>

      <section className="mt-10">
        <p className="eyebrow-quiet">Five inks, one job each</p>
        <div className="mt-3 space-y-2">
          {[
            ["Blue", "var(--blue)", "Actions, links, nights shipped", true],
            ["Pink", "var(--pink)", "Tonight, and only tonight", true],
            ["Yellow", "var(--yellow)", "The task in front of you", false],
            ["Green", "var(--green)", "A confirmed submission", true],
            ["Ink", "var(--ink)", "A night that went dark", true],
          ].map(([name, value, job, light]) => (
            <div
              key={name}
              className="flex items-center justify-between rounded-xl border-[1.5px] border-ink px-4 py-3"
              style={{ background: value, color: light ? "#fff" : "var(--ink)" }}
            >
              <span className="font-display text-sm font-bold">{name}</span>
              <span className="font-mono text-[10px] uppercase tracking-wider opacity-90">
                {job}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <p className="eyebrow-quiet">Type</p>
        <p className="mt-3 font-display text-[26px] font-extrabold leading-none tracking-tight">
          Unbounded
        </p>
        <p className="mt-2 text-[15px] text-ink-soft">
          Instrument Sans carries the reading.
        </p>
        <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-ink-faint">
          DM Mono · 11/60 · 2h 46m
        </p>
      </section>

      <section className="mt-10">
        <p className="eyebrow-quiet">Tally strip, all four states</p>
        <div className="mt-3 space-y-3">
          {SCENARIOS.map((key) => (
            <div key={key} className="rounded-2xl bg-card p-4 press">
              <p className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">
                {getScenarioLabel(key)}
              </p>
              <TallyStrip marks={getMarks(getStudent(key))} className="mt-2" />
            </div>
          ))}
        </div>
        <TallyKey />
      </section>

      <section className="mt-10">
        <p className="eyebrow-quiet">Small size, used on the day screen</p>
        <div className="mt-3 rounded-2xl bg-card p-4 press">
          <TallyStrip marks={getCohortMarks()} size="sm" />
          <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-ink-faint">
            Cohort 11 · day 41 · 3 dark · 1 repaired
          </p>
        </div>
      </section>

      <section className="mt-10">
        <p className="eyebrow-quiet">Tonight, and the button</p>
        <div
          className="mt-3 rounded-2xl p-5 press-lg"
          style={{ background: "var(--yellow)" }}
        >
          <p className="font-mono text-[10px] uppercase tracking-widest">
            Tonight · Day 12
          </p>
          <h2 className="mt-2 font-display text-[19px] font-bold leading-tight tracking-tight">
            Make a component that survives bad data
          </h2>
          <button
            type="button"
            className="mt-4 w-full rounded-xl bg-ink px-4 py-3.5 font-sans text-[15px] font-semibold text-white"
          >
            Open tonight&rsquo;s task
          </button>
        </div>
      </section>

      <p className="mt-10 text-xs leading-relaxed text-ink-faint">
        Sixty marks, one per night. Tonight is the only pink mark and the only
        one that moves.
      </p>
    </main>
  );
}
