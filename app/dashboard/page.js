import Link from "next/link";
import AppBar, { Pill } from "@/components/AppBar";
import TallyStrip, { TallyKey } from "@/components/TallyStrip";
import {
  getStudent,
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
 * The ordering is a judgement call: tonight's task sits directly under the
 * streak, because at 11 PM the only question a student is actually asking is
 * "what am I doing right now".
 *
 * The Build Shelf is the argument of the redesign. A streak is a habit
 * mechanic; the artifacts are the payoff. Showing what you made, not only how
 * often, is what makes 60 days worth finishing.
 */

export default function DashboardPage() {
  const student = getStudent("default");
  const total = getTotalDays();
  const today = getDay(student.currentDay);
  const track = getTrack(student.track);
  const shelf = getShelf(student, 3);
  const percent = Math.round((student.shipped / total) * 100);

  return (
    <main className="pb-4">
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
          Evening, {student.name}.
        </h1>

        {/* Streak, progress and completion in one card. */}
        <div className="mt-4 rounded-2xl bg-card p-4 press">
          <div className="flex items-end justify-between">
            <div>
              <p className="font-display text-[42px] font-extrabold leading-none tracking-tight tabular">
                {student.streak}
              </p>
              <p className="mt-1.5 font-mono text-[10px] uppercase tracking-widest text-ink-faint">
                nights lit in a row
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
        </div>

        {/* Tonight. The one lit thing on the screen. */}
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
            href={`/day/${student.currentDay}`}
            className="mt-4 block rounded-xl bg-ink px-4 py-3.5 text-center text-[15px] font-semibold text-white"
          >
            Open tonight&rsquo;s task
          </Link>
          <p className="mt-2.5 text-center font-mono text-[10.5px] uppercase tracking-wider">
            Closes in {student.closesIn}
          </p>
        </div>
      </section>

      <section className="px-5 pt-8">
        <h2 className="font-display text-[19px] font-bold tracking-tight">
          Where you stand
        </h2>

        <dl className="mt-3 grid grid-cols-2 gap-2">
          {[
            [`#${student.rank}`, `in ${track.name}`],
            [student.percentile, "of the cohort"],
            [student.usualShipTime, "usual ship time"],
            [student.longestStreak, "longest streak"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="rounded-xl border-[1.5px] border-ink bg-card p-3.5"
            >
              <dd className="font-mono text-[21px] font-medium leading-none tracking-tight tabular">
                {value}
              </dd>
              <dt className="mt-2 font-mono text-[9.5px] uppercase tracking-widest text-ink-faint">
                {label}
              </dt>
            </div>
          ))}
        </dl>

        <p className="mt-3 text-[13px] leading-relaxed text-ink-soft">
          Rank counts nights shipped, not lines of code. Everyone starts at the
          bottom on day one.
        </p>
      </section>

      <section className="px-5 pt-8">
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-[19px] font-bold tracking-tight">
            Your build shelf
          </h2>
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">
            {student.shipped} repos
          </span>
        </div>

        <ul className="mt-3 space-y-2">
          {shelf.map((item) => (
            <li key={item.day}>
              <Link
                href={`/day/${item.day}`}
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
          Sixty of these is the point of the whole thing. The streak is only how
          you get there.
        </p>
      </section>

      {!student.profileComplete && (
        <section className="px-5 pt-8">
          <div className="rounded-2xl border-2 border-ink bg-blue p-5 text-white">
            <h2 className="font-display text-[17px] font-bold leading-tight tracking-tight">
              Your build shelf is private right now
            </h2>
            <p className="mt-2 text-[13.5px] leading-relaxed opacity-90">
              Add a track, a city and one line about yourself, and recruiters can
              find these {student.shipped} repos.
            </p>
            <button
              type="button"
              className="mt-4 w-full rounded-xl border-[1.5px] border-white bg-transparent px-4 py-3 text-[14px] font-semibold text-white"
            >
              Finish profile · 2 min
            </button>
          </div>
        </section>
      )}

      <footer className="mt-10 border-t-[1.5px] border-ink px-5 py-6">
        <p className="font-mono text-[10.5px] uppercase tracking-wider text-ink-faint">
          Day {student.currentDay} of {total} · Cohort 12
        </p>
      </footer>
    </main>
  );
}
