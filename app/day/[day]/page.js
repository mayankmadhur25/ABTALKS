import Link from "next/link";
import { notFound } from "next/navigation";
import AppBar, { Pill } from "@/components/AppBar";
import StateSwitcher from "@/components/StateSwitcher";
import TallyStrip from "@/components/TallyStrip";
import ProofForm from "@/components/ProofForm";
import {
  getDay,
  getDayState,
  getMarks,
  getStudent,
  getScenario,
  getTotalDays,
  getTrack,
  composePost,
} from "@/lib/data";

/*
 * Route /day/[day]
 *
 * Every day from 1 to 60 resolves with a real task. A day renders in one of
 * four states, because a day is not always today:
 *   today   the full experience, task plus submission
 *   done    already shipped, task plus the two proof links, read only
 *   dark    the night was missed, with a way to repair it
 *   locked  not reached yet, title visible, body sealed
 */

export default function ChallengeDayPage({ params, searchParams }) {
  const day = getDay(params.day);
  if (!day) notFound();

  const scenario = getScenario(searchParams?.state);
  const student = getStudent(scenario);
  const total = getTotalDays();
  const track = getTrack(student.track);
  const state = getDayState(day.day, student);
  const drafts = [0, 1, 2].map((v) => composePost(day, v, total));

  return (
    <main className="pb-4">
      <AppBar
        back={`/dashboard?state=${scenario}`}
        title={`Day ${day.day}`}
        right={
          <Pill
            tone={
              state === "today" ? "pink" : state === "done" ? "green" : "plain"
            }
          >
            {state === "today"
              ? "Tonight"
              : state === "done"
                ? "Shipped"
                : state === "dark"
                  ? "Went dark"
                  : "Locked"}
          </Pill>
        }
      />

      <div className="px-5 pt-4">
        <TallyStrip marks={getMarks(student)} size="sm" />
        <p className="eyebrow-quiet mt-1.5">
          Day {day.day} of {total} · {track.name} · ~{day.minutes} min
        </p>

        <h1 className="mt-5 font-display text-[23px] font-extrabold leading-[1.2] tracking-tight">
          {day.title}
        </h1>
        <p className="mt-3 text-[14.5px] leading-relaxed text-ink-soft">
          {day.why}
        </p>

        {state === "locked" ? (
          <div className="mt-6 rounded-2xl border-2 border-dashed border-ink-faint p-5">
            <h2 className="font-display text-[16px] font-bold tracking-tight">
              This night has not happened yet
            </h2>
            <p className="mt-2 text-[13.5px] leading-relaxed text-ink-soft">
              Day {day.day} unlocks after you close day {student.currentDay}.
              You can see what is coming, but reading ahead does not help as
              much as you think.
            </p>
            <Link
              href={`/day/${student.currentDay}?state=${scenario}`}
              className="mt-4 block rounded-xl bg-blue px-4 py-3.5 text-center text-[15px] font-semibold text-white press"
            >
              Go to tonight, day {student.currentDay}
            </Link>
          </div>
        ) : (
          <>
            <section className="mt-6 rounded-2xl border-2 border-ink bg-card p-5">
              <p className="eyebrow">Build this</p>
              <p className="mt-2.5 text-[14.5px] leading-relaxed">{day.build}</p>

              <hr className="my-4 border-line" />

              <p className="eyebrow-quiet">Done when</p>
              <ul className="mt-3 space-y-2.5">
                {day.doneWhen.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span
                      aria-hidden="true"
                      className="mt-[3px] h-3.5 w-3.5 shrink-0 rounded border-[1.5px] border-ink"
                    />
                    <span className="text-[13.5px] leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <hr className="my-4 border-line" />

              <p className="eyebrow-quiet">If you have time left</p>
              <p className="mt-2 text-[13.5px] leading-relaxed text-ink-soft">
                {day.stretch}
              </p>
            </section>

            <details className="mt-2.5 rounded-2xl border-[1.5px] border-ink bg-card p-4">
              <summary className="cursor-pointer text-[14px] font-semibold">
                Stuck? Open a hint
              </summary>
              <p className="mt-3 text-[13.5px] leading-relaxed text-ink-soft">
                {day.hint} Hints do not affect your streak.
              </p>
            </details>
          </>
        )}

        {state === "dark" && (
          <div className="mt-4 rounded-2xl border-2 border-ink bg-ink p-5 text-white">
            <h2 className="font-display text-[16px] font-bold leading-tight tracking-tight">
              This night went dark
            </h2>
            <p className="mt-2 text-[13.5px] leading-relaxed opacity-85">
              You can still repair it. Ship this task and tonight&rsquo;s before
              midnight and the strip closes the gap. One shield gets spent.
            </p>
          </div>
        )}

        {state === "done" && (
          <section className="mt-4 rounded-2xl border-2 border-ink bg-card p-5">
            <div className="flex items-baseline justify-between gap-3">
              <p className="eyebrow">Proof, filed</p>
              <Pill tone="green">Shipped</Pill>
            </div>
            <ul className="mt-3 space-y-2">
              <li className="rounded-xl border-[1.5px] border-ink bg-paper px-3.5 py-3 font-mono text-[12px] break-all">
                github.com/aarav/day{day.day}
              </li>
              <li className="rounded-xl border-[1.5px] border-ink bg-paper px-3.5 py-3 font-mono text-[12px] break-all">
                linkedin.com/posts/aarav-day{day.day}
              </li>
            </ul>
            <p className="mt-3 text-[12.5px] leading-relaxed text-ink-soft">
              Closed nights cannot be resubmitted. The record is the point.
            </p>
          </section>
        )}

        {(state === "today" || state === "dark") && (
          <ProofForm
            dayNumber={day.day}
            drafts={drafts}
            shields={student.shields}
          />
        )}
      </div>

      <StateSwitcher current={scenario} base={`/day/${day.day}`} />
    </main>
  );
}
