import Link from "next/link";
import AppBar, { Pill } from "@/components/AppBar";
import TallyStrip, { TallyKey } from "@/components/TallyStrip";
import StateSwitcher from "@/components/StateSwitcher";
import {
  getStudent,
  getScenario,
  getMarks,
  getDay,
  getShelf,
  getTotalDays,
  getTrack,
} from "@/lib/data";

/*
 * Route /dashboard
 *
 * The brief asks for streak, today's task, progress, completion and standing.
 * Tonight's task sits directly under the streak, ahead of standing, because at
 * 11 PM the only question a student is actually asking is "what am I doing
 * right now".
 *
 * Four states, all real:
 *   default  day 12, 11 nights kept
 *   fresh    night one, nothing earned yet, and nothing lost
 *   missed   a night went dark, streak paused rather than broken
 *   shipped  tonight is closed, no dead call to action left on screen
 *
 * The tone rule across all four: never shame. A student who missed a night is
 * one bad screen away from quitting entirely, and the copy is the difference.
 */

export default function DashboardPage({ searchParams }) {
  const scenario = getScenario(searchParams?.state);
  const student = getStudent(scenario);
  const total = getTotalDays();
  const today = getDay(student.currentDay);
  const track = getTrack(student.track);
  const shelf = getShelf(student, 3);
  const percent = Math.round((student.shipped / total) * 100);

  const isFirstNight = student.currentDay === 1 && student.shipped === 0;
  const hasDarkNight = student.missedDays.length > 0;

  const streakLabel = hasDarkNight
    ? "streak paused, not lost"
    : student.streak === 0
      ? "nights lit · starts tonight"
      : student.streak === 1
        ? "night lit"
        : "nights lit in a row";

  return (
    <main id="content" className="pb-4">
      <AppBar
        right={
          <>
            {student.shields > 0 && (
              <Pill tone="yellow">
                {student.shields} {student.shields === 1 ? "shield" : "shields"}
              </Pill>
            )}
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border-[1.5px] border-ink bg-blue font-mono text-[11px] font-medium text-white">
              {student.initials}
            </span>
          </>
        }
      />

      <section className="px-5 pt-5">
        <p className="eyebrow-quiet">{student.localTime}</p>
        <h1 className="mt-1.5 font-display text-[20px] font-bold tracking-tight">
          {student.todayShipped
            ? `Day ${student.currentDay} is done, ${student.name}.`
            : isFirstNight
              ? `Welcome in, ${student.name}.`
              : `Evening, ${student.name}.`}
        </h1>

        {/* A night went dark. Recovery, not a scolding. */}
        {hasDarkNight && (
          <div className="mt-4 rounded-2xl border-2 border-ink bg-ink p-5 text-white">
            <h2 className="font-display text-[17px] font-bold leading-tight tracking-tight">
              Day {student.missedDays[0]} went dark.
            </h2>
            <p className="mt-2 text-[13.5px] leading-relaxed opacity-85">
              Your {student.longestStreak}-night streak is paused, not gone.
              Ship day {student.missedDays[0]} and day {student.currentDay}{" "}
              before tonight&rsquo;s 2:00 AM deadline and the strip closes the
              gap. One shield gets spent.
            </p>
            <Link
              href={`/day/${student.missedDays[0]}?state=${scenario}`}
              className="mt-4 block rounded-xl border-[1.5px] border-white px-4 py-3 text-center text-[14px] font-semibold text-white"
            >
              Repair day {student.missedDays[0]}
            </Link>
          </div>
        )}

        {/* Streak, progress and completion. */}
        <div className="mt-4 rounded-2xl bg-card p-4 press">
          <div className="flex items-end justify-between">
            <div>
              <p className="font-display text-[42px] font-extrabold leading-none tracking-tight tabular">
                {student.streak}
              </p>
              <p className="mt-1.5 font-mono text-[10px] uppercase tracking-widest text-ink-faint">
                {streakLabel}
              </p>
            </div>
            <div className="text-right">
              <p className="font-mono text-[18px] font-medium leading-none tabular">
                {student.shipped}
                <span className="text-ink-faint">/{total}</span>
              </p>
              <p className="mt-1.5 font-mono text-[10px] uppercase tracking-widest text-ink-faint">
                {percent}% shipped
              </p>
            </div>
          </div>

          <TallyStrip marks={getMarks(student)} className="mt-4" />
          <TallyKey />

          {isFirstNight && (
            <p className="mt-3 border-t border-line pt-3 text-[13px] leading-relaxed text-ink-soft">
              Sixty pale marks and nothing else. That is what everyone&rsquo;s
              looks like tonight.
            </p>
          )}
        </div>

        {/* Tonight, or the closed day. Never both, never neither. */}
        {student.todayShipped ? (
          <div className="mt-3 rounded-2xl border-2 border-ink bg-green-deep p-5 text-white">
            <p className="font-mono text-[10px] uppercase tracking-widest">
              Shipped {student.shippedAt}
            </p>
            <h2 className="mt-2 font-display text-[19px] font-bold tracking-tight">
              Day {student.currentDay} is done.
            </h2>
            <p className="mt-2 text-[13.5px] leading-relaxed opacity-90">
              Commit and post both landed. Day {student.currentDay + 1} unlocks
              at 5:00 AM. Go to sleep.
            </p>
            <Link
              href={`/day/${student.currentDay}?state=${scenario}`}
              className="mt-4 block rounded-xl border-[1.5px] border-white px-4 py-3 text-center text-[14px] font-semibold text-white"
            >
              Review what you filed
            </Link>
          </div>
        ) : (
          <div className="mt-3 rounded-2xl border-2 border-ink bg-yellow p-5">
            <div className="flex items-baseline justify-between gap-3">
              <p className="font-mono text-[10px] font-medium uppercase tracking-widest">
                Tonight · Day {student.currentDay}
              </p>
              <p className="shrink-0 font-mono text-[10px] uppercase tracking-widest">
                ~{today.minutes} min
              </p>
            </div>

            <h2 className="mt-2.5 font-display text-[18px] font-bold leading-[1.25] tracking-tight">
              {today.title}
            </h2>
            <p className="mt-2 text-[13.5px] leading-relaxed">{today.brief}</p>

            <Link
              href={`/day/${student.currentDay}?state=${scenario}`}
              className="mt-4 block rounded-xl bg-ink px-4 py-3.5 text-center text-[15px] font-semibold text-white"
            >
              {isFirstNight ? "Start night one" : "Open tonight's task"}
            </Link>
            <p className="mt-2.5 text-center font-mono text-[10.5px] uppercase tracking-wider">
              {student.closesIn
                ? `Closes in ${student.closesIn}`
                : "Nothing is at stake yet. Tonight only has to happen."}
            </p>
          </div>
        )}
      </section>

      <section className="px-5 pt-8">
        <h2 className="font-display text-[19px] font-bold tracking-tight">
          Where you stand
        </h2>

        <dl className="mt-3 grid grid-cols-2 gap-2">
          {[
            [student.rank ? `#${student.rank}` : "—", `in ${track.name}`],
            [student.percentile ?? "Day one", "of the cohort"],
            [student.usualShipTime ?? "—", "usual ship time"],
            [student.longestStreak, "longest streak"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="rounded-xl border-[1.5px] border-ink bg-card p-3.5"
            >
              <dt className="sr-only">{label}</dt>
              <dd className="font-mono text-[21px] font-medium leading-none tracking-tight tabular">
                {value}
              </dd>
              <dd
                aria-hidden="true"
                className="mt-2 font-mono text-[9.5px] uppercase tracking-widest text-ink-faint"
              >
                {label}
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-3 text-[13px] leading-relaxed text-ink-soft">
          {isFirstNight
            ? "No rank tonight. Ranks appear once you have shipped something, so nobody starts at the bottom of a list."
            : "Rank counts nights shipped, not lines of code. Everyone starts at the bottom on day one."}
        </p>
      </section>

      <section className="px-5 pt-8">
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-[19px] font-bold tracking-tight">
            Your build shelf
          </h2>
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">
            {student.shipped} {student.shipped === 1 ? "repo" : "repos"}
          </span>
        </div>

        {shelf.length > 0 ? (
          <>
            <ul className="mt-3 space-y-2">
              {shelf.map((item) => (
                <li key={item.day}>
                  <Link
                    href={`/day/${item.day}?state=${scenario}`}
                    className="flex items-center gap-3.5 rounded-xl border-[1.5px] border-ink bg-card px-4 py-3"
                  >
                    <span className="font-mono text-[11px] font-medium tabular text-blue">
                      {String(item.day).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="block text-[14px] font-semibold leading-snug">
                        {item.title}
                      </span>
                      <span className="block text-[12px] leading-snug text-ink-soft">
                        {item.meta}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[13px] leading-relaxed text-ink-soft">
              Sixty of these is the point of the whole thing. The streak is only
              how you get there.
            </p>
          </>
        ) : (
          <div className="mt-3 rounded-xl border-[1.5px] border-dashed border-ink-faint bg-card p-5">
            <h3 className="text-[15px] font-semibold">
              The shelf is empty. That is the point.
            </h3>
            <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-soft">
              Tonight&rsquo;s build becomes your first public repo. In sixty
              nights this list is the reason you did any of it.
            </p>
          </div>
        )}
      </section>

      {!student.profileComplete && (
        <section className="px-5 pt-8">
          <div className="rounded-2xl border-2 border-ink bg-blue p-5 text-white">
            <h2 className="font-display text-[17px] font-bold leading-tight tracking-tight">
              Complete your public profile
            </h2>
            <p className="mt-2 text-[13.5px] leading-relaxed opacity-90">
              {student.shipped > 0
                ? `Add your city and one line about yourself, and recruiters searching ${track.name} can find these ${student.shipped} repos.`
                : `Add your city and one line about yourself. Do it tonight and everything you build from here is findable by recruiters searching ${track.name}.`}
            </p>
            <button
              type="button"
              className="mt-4 w-full rounded-xl border-[1.5px] border-white bg-transparent px-4 py-3 text-[14px] font-semibold text-white"
            >
              Finish profile · 2 min
            </button>
            <p className="mt-2.5 text-center font-mono text-[9.5px] uppercase tracking-wider opacity-70">
              Profile editing is outside this brief
            </p>
          </div>
        </section>
      )}

      <footer className="mt-10 border-t-[1.5px] border-ink px-5 py-6">
        <p className="font-mono text-[10.5px] uppercase tracking-wider text-ink-faint">
          Day {student.currentDay} of {total} · Cohort 12
        </p>
      </footer>

      <StateSwitcher current={scenario} base="/dashboard" />
    </main>
  );
}
