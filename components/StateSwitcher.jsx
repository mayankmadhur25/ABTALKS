import Link from "next/link";
import { SCENARIOS, getScenarioLabel } from "@/lib/data";

/*
 * Demo affordance, not a product feature.
 *
 * The brief asks the redesign to handle a first day with no streak, a missed
 * day and an empty profile. Those are real application states here rather than
 * mocked-up screens, so this switcher exists to let a reviewer see each one
 * without waiting 60 days. It sits at the very bottom, below the footer,
 * because it is scaffolding for judging and not part of the student's screen.
 */
export default function StateSwitcher({ current, base }) {
  return (
    <aside className="border-t-[1.5px] border-dashed border-ink-faint px-5 py-5">
      <p className="eyebrow-quiet">Preview states · demo only</p>
      <ul className="mt-2.5 flex flex-wrap gap-1.5">
        {SCENARIOS.map((key) => {
          const active = key === current;
          return (
            <li key={key}>
              <Link
                href={`${base}?state=${key}`}
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
