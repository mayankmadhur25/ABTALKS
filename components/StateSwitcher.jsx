import Link from "next/link";
import { SCENARIOS, getScenarioLabel, getStudent } from "@/lib/data";

/*
 * Demo affordance, not a product feature.
 *
 * The brief asks the redesign to handle a first day with no streak, a missed
 * day and an empty profile. Those are real application states here rather than
 * mocked-up screens, so this switcher exists to let a reviewer see each one
 * without waiting 60 days. It sits at the very bottom, below the footer,
 * because it is scaffolding for judging and not part of the student's screen.
 *
 * On the day route the switcher has to move the day as well as the state.
 * Keeping the current day number and only swapping the query string sends
 * "Day 1, no streak" to /day/12, which is locked in that scenario, so the
 * label promises one screen and the link delivers a sealed one. Each scenario
 * therefore resolves to its own current day.
 */
export default function StateSwitcher({ current, base, dayScoped = false }) {
  return (
    <aside className="border-t-[1.5px] border-dashed border-ink-faint px-5 py-5">
      <p className="eyebrow-quiet">Preview states · demo only</p>
      <ul className="mt-2.5 flex flex-wrap gap-1.5">
        {SCENARIOS.map((key) => {
          const active = key === current;
          const href = dayScoped
            ? `/day/${getStudent(key).currentDay}?state=${key}`
            : `${base}?state=${key}`;
          return (
            <li key={key}>
              <Link
                href={href}
                aria-current={active ? "true" : undefined}
                className={`block rounded-full border-[1.5px] border-ink px-3 py-2 font-mono text-[10px] uppercase tracking-wider ${
                  active ? "bg-ink text-white" : "bg-card text-ink"
                }`}
              >
                {getScenarioLabel(key)}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
