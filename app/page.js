import Link from "next/link";
import TallyStrip from "@/components/TallyStrip";
import {
  getCohort,
  getCohortMarks,
  getGraduates,
  getHonesty,
  getHowItWorks,
  getTracks,
  getTotalDays,
} from "@/lib/data";

/*
 * Route /
 *
 * Written for a student who has never heard of ABTalks, reading on a phone.
 * The fold has to answer three questions before a thumb moves: what is this,
 * what will it cost me, and is anyone actually doing it.
 *
 * The trust device is candour rather than testimonials. The proof section
 * includes someone who quit at day 31, and a block that states plainly what
 * this is not. A sceptical 20 year old discounts praise and rewards honesty.
 */

export default function LandingPage() {
  const cohort = getCohort();
  const prev = cohort.previous;
  const total = getTotalDays();

  return (
    <main id="content" className="pb-4">
      <header className="flex items-center justify-between border-b-[1.5px] border-ink px-5 py-3.5">
        <span className="font-display text-[15px] font-extrabold tracking-tight">
          AB<span className="text-blue">Talks</span>
        </span>
        <span className="rounded-full border-[1.5px] border-ink bg-yellow px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider">
          {cohort.label}
        </span>
      </header>

      {/* Fold: this is the automated 390px screenshot. */}
      <section className="px-5 pt-8">
        <p className="eyebrow">Applications close {cohort.applicationsCloseAt}</p>

        <h1 className="mt-3 font-display text-[27px] font-extrabold leading-[1.12] tracking-tight">
          60 nights.
          <br />
          60 things
          <br />
          you built.
        </h1>

        <p className="mt-4 text-[15.5px] leading-relaxed text-ink-soft">
          Pick one track. Build something small every night after college. Push
          the commit, post the proof. After 60 days you have a public build
          record that no r&eacute;sum&eacute; can fake.
        </p>

        <div className="mt-6 rounded-2xl bg-card p-4 press">
          <div className="flex items-baseline justify-between">
            <p className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">
              Cohort {prev.number} · live right now
            </p>
            <p className="font-mono text-[10px] font-medium uppercase tracking-widest text-pink">
              Day {prev.currentDay}
            </p>
          </div>

          <TallyStrip marks={getCohortMarks()} className="mt-3" />

          <div className="mt-3 flex items-baseline justify-between border-t border-line pt-3">
            <p className="font-mono text-[13px] font-medium tabular">
              {prev.builders.toLocaleString("en-IN")} builders
            </p>
            <p className="text-[12.5px] text-ink-soft">
              {prev.stillLitPercent}% still going
            </p>
          </div>
        </div>
      </section>

      {/* Sticky action. Thumb reach, and it follows the whole scroll. */}
      <div className="sticky bottom-0 z-20 mt-8 border-t-[1.5px] border-ink bg-paper px-5 pb-5 pt-4">
        <Link
          href="/dashboard"
          className="block rounded-xl bg-blue px-4 py-4 text-center font-sans text-[15px] font-semibold text-white press"
        >
          Claim a seat in Cohort {cohort.number}
        </Link>
        <p className="mt-2.5 text-center font-mono text-[10.5px] uppercase tracking-wider text-ink-faint">
          Free · GitHub sign-in · leave any time
        </p>
      </div>

      <section className="px-5 pt-10">
        <h2 className="font-display text-[21px] font-bold leading-tight tracking-tight">
          How the {total} days work
        </h2>

        <ol className="mt-5 space-y-5">
          {getHowItWorks().map((step, i) => (
            <li key={step.title} className="flex gap-3.5">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border-[1.5px] border-ink bg-yellow font-mono text-[12px] font-medium">
                {i + 1}
              </span>
              <div>
                <h3 className="text-[15.5px] font-semibold leading-snug">
                  {step.title}
                </h3>
                <p className="mt-1 text-[13.5px] leading-relaxed text-ink-soft">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="px-5 pt-10">
        <h2 className="font-display text-[21px] font-bold leading-tight tracking-tight">
          Pick your track
        </h2>
        <p className="mt-2 text-[13.5px] text-ink-soft">
          Seats left in Cohort {cohort.number}, out of {cohort.seats}.
        </p>

        <ul className="mt-4 space-y-2">
          {getTracks().map((track) => (
            <li
              key={track.id}
              className="flex items-center gap-3.5 rounded-xl border-[1.5px] border-ink bg-card px-4 py-3"
            >
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg font-mono text-[13px] font-medium tabular ${
                  track.seatsLeft <= 2 ? "bg-pink text-white" : "bg-paper text-ink"
                }`}
              >
                {track.seatsLeft}
              </span>
              <div>
                <h3 className="text-[14.5px] font-semibold leading-snug">
                  {track.name}
                </h3>
                <p className="text-[12.5px] leading-snug text-ink-soft">
                  {track.blurb}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="px-5 pt-10">
        <h2 className="font-display text-[21px] font-bold leading-tight tracking-tight">
          What last cohort actually got
        </h2>

        <ul className="mt-4 space-y-2">
          {getGraduates().map((grad) => (
            <li
              key={grad.name}
              className="rounded-xl border-[1.5px] border-ink bg-card p-4"
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-[14.5px] font-semibold">{grad.name}</h3>
                <span className="shrink-0 font-mono text-[11px] font-medium tabular text-blue">
                  {grad.shipped}/{total}
                </span>
              </div>
              <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-ink-faint">
                {grad.detail}
              </p>
              <p className="mt-2 text-[13.5px] leading-relaxed text-ink-soft">
                {grad.outcome}
              </p>
            </li>
          ))}
        </ul>

        <p className="mt-3 text-[13px] leading-relaxed text-ink-soft">
          We show the people who stopped too. Half of every cohort does.
        </p>
      </section>

      <section className="px-5 pt-10">
        <div className="rounded-2xl border-2 border-ink bg-yellow p-5">
          <h2 className="font-display text-[19px] font-bold leading-tight tracking-tight">
            Before you sign up
          </h2>
          <ul className="mt-4 space-y-3">
            {getHonesty().map((line) => (
              <li key={line} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-[7px] h-[3px] w-3 shrink-0 bg-ink"
                />
                <span className="text-[14px] leading-relaxed">{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <footer className="mt-10 border-t-[1.5px] border-ink px-5 py-6">
        <p className="font-mono text-[10.5px] uppercase leading-relaxed tracking-wider text-ink-faint">
          ABTalks · Built by students who kept the streak
        </p>
      </footer>
    </main>
  );
}
