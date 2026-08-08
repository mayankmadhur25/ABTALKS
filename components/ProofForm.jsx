"use client";

import { useState } from "react";
import Link from "next/link";
import { Pill } from "@/components/AppBar";

/*
 * The submission flow, and the one thoughtful idea of the redesign.
 *
 * The GitHub commit is easy: the student already has the editor open. The
 * LinkedIn post is what actually breaks the streak. Writing publicly, in
 * English, at 11:40 PM, about work you think is trivial, is the real friction
 * in this product. So the post is drafted from the task and the student edits
 * it rather than facing an empty box.
 */

/*
 * The brief asks for a repository or a commit, so an issue or a pull request
 * is not proof of work. This accepts a repo root or a commit URL and nothing
 * else.
 */
const GITHUB =
  /^https?:\/\/(www\.)?github\.com\/[\w.-]+\/[\w.-]+(\/commit\/[0-9a-f]{7,40})?\/?$/i;
/*
 * A LinkedIn profile URL is not a post. The challenge asks for proof of work,
 * so the link has to point at something published: a post, or a feed update.
 */
const LINKEDIN =
  /^https?:\/\/([a-z]{2,3}\.)?linkedin\.com\/(posts|feed\/update|pulse)\/[^/\s?#]+/i;

export default function ProofForm({
  dayNumber,
  currentDay,
  total,
  scenario,
  isRepair,
  drafts,
  shields,
}) {
  const [repo, setRepo] = useState("");
  const [post, setPost] = useState("");
  const [draft, setDraft] = useState(drafts[0]);
  const [variant, setVariant] = useState(0);
  const [copied, setCopied] = useState(false);
  const [shipped, setShipped] = useState(false);

  const repoOk = GITHUB.test(repo.trim());
  const postOk = LINKEDIN.test(post.trim());
  const ready = repoOk && postOk;

  function rewrite() {
    const next = (variant + 1) % drafts.length;
    setVariant(next);
    setDraft(drafts[next]);
  }

  async function copyDraft() {
    try {
      await navigator.clipboard.writeText(draft);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  /*
   * Three different outcomes, because shipping is not one event.
   * A repair closes an old night and leaves tonight still open, so sending the
   * student to a "day shipped" dashboard would be a lie.
   */
  if (shipped) {
    const isFinalNight = dayNumber === total;

    const title = isRepair
      ? `Day ${dayNumber} repaired.`
      : isFinalNight
        ? "That was night sixty."
        : `Day ${dayNumber} is done.`;

    const body = isRepair
      ? `One shield spent, ${Math.max(shields - 1, 0)} left. Day ${currentDay} is still open. Finish it before 2:00 AM and the streak is whole again.`
      : isFinalNight
        ? "Sixty nights, sixty things you built. Your build log is public from now on."
        : `Both proofs landed. Day ${dayNumber + 1} unlocks at 5:00 AM. Go to sleep.`;

    const href = isRepair
      ? `/day/${currentDay}?state=${scenario}`
      : "/dashboard?state=shipped";

    const cta = isRepair
      ? `Go to day ${currentDay}`
      : isFinalNight
        ? "See all sixty"
        : "Back to your dashboard";

    return (
      <div className="mt-5 rounded-2xl border-2 border-ink bg-green-deep p-5 text-white">
        <p className="font-mono text-[10px] uppercase tracking-widest">
          {isRepair ? "Repaired just now" : "Shipped just now"}
        </p>
        <h2 className="mt-2 font-display text-[19px] font-bold tracking-tight">
          {title}
        </h2>
        <p className="mt-2 text-[13.5px] leading-relaxed opacity-90">{body}</p>
        <Link
          href={href}
          className="mt-4 block rounded-xl border-[1.5px] border-white px-4 py-3 text-center text-[14px] font-semibold text-white"
        >
          {cta}
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="mt-5 flex items-baseline justify-between">
        <h2 className="font-display text-[19px] font-bold tracking-tight">
          Tonight&rsquo;s proof
        </h2>
        <Pill tone={ready ? "green" : "plain"}>
          {(repoOk ? 1 : 0) + (postOk ? 1 : 0)} of 2
        </Pill>
      </div>
      <p className="mt-2 text-[13.5px] leading-relaxed text-ink-soft">
        Both go public. That is the whole mechanism.
      </p>
      <p aria-live="polite" className="sr-only">
        {ready
          ? "Both links look valid. Ready to ship."
          : `${(repoOk ? 1 : 0) + (postOk ? 1 : 0)} of 2 links added.`}
      </p>

      <div className="mt-4 rounded-2xl border-2 border-ink bg-card p-5">
        <div className="flex items-baseline justify-between gap-3">
          <p className="eyebrow">Proof 1 · the commit</p>
          <Pill tone={repo === "" ? "plain" : repoOk ? "green" : "pink"}>
            {repo === "" ? "Waiting" : repoOk ? "Valid link" : "Not GitHub"}
          </Pill>
        </div>

        <label htmlFor="repo" className="mt-4 block">
          GitHub commit or repo URL
        </label>
        <input
          id="repo"
          type="url"
          inputMode="url"
          value={repo}
          onChange={(e) => setRepo(e.target.value)}
          placeholder="https://github.com/you/day12-profilecard"
          aria-describedby="repo-help"
          aria-invalid={repo !== "" && !repoOk}
          className="w-full rounded-xl border-[1.5px] border-ink bg-card p-3 font-mono text-[12.5px]"
        />
        <p
          id="repo-help"
          aria-live="polite"
          className="mt-2 text-[12.5px] leading-relaxed text-ink-soft"
        >
          {repo !== "" && !repoOk
            ? "That needs to be a repo or a commit: github.com/you/repo, or the /commit/ link."
            : "The repository or the commit. An issue or a pull request is not proof of work."}
        </p>
      </div>

      <div className="mt-2.5 rounded-2xl border-2 border-ink bg-card p-5">
        <div className="flex items-baseline justify-between gap-3">
          <p className="eyebrow">Proof 2 · the post</p>
          <Pill tone={post === "" ? "plain" : postOk ? "green" : "pink"}>
            {post === "" ? "Waiting" : postOk ? "Valid link" : "Not a post link"}
          </Pill>
        </div>

        <p className="mt-3 text-[13.5px] leading-relaxed">
          <b>This is where most people quit.</b> So we write the first draft
          from tonight&rsquo;s task, and you make it yours.
        </p>

        <label htmlFor="draft" className="mt-4 block">
          Your draft
        </label>
        <textarea
          id="draft"
          rows={9}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          className="w-full rounded-xl border-[1.5px] border-ink bg-card p-3 font-mono text-[12.5px] leading-relaxed"
        />

        <div className="mt-2.5 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={rewrite}
            className="rounded-xl border-[1.5px] border-ink px-3 py-3 text-[13px] font-semibold"
          >
            Rewrite draft
          </button>
          <button
            type="button"
            onClick={copyDraft}
            className="rounded-xl border-[1.5px] border-ink px-3 py-3 text-[13px] font-semibold"
          >
            {copied ? "Copied" : "Copy draft"}
          </button>
        </div>

        <label htmlFor="post" className="mt-4 block">
          LinkedIn post URL
        </label>
        <input
          id="post"
          type="url"
          inputMode="url"
          value={post}
          onChange={(e) => setPost(e.target.value)}
          placeholder="https://linkedin.com/posts/your-post-id"
          aria-describedby="post-help"
          aria-invalid={post !== "" && !postOk}
          className="w-full rounded-xl border-[1.5px] border-ink bg-card p-3 font-mono text-[12.5px]"
        />
        <p
          id="post-help"
          aria-live="polite"
          className="mt-2 text-[12.5px] leading-relaxed text-ink-soft"
        >
          {post !== "" && !postOk
            ? "That looks like a profile, not a post. Open the post itself and copy the link from there."
            : "The link to the post, not to your profile."}
        </p>
      </div>

      <p className="mt-3.5 text-[12.5px] leading-relaxed text-ink-soft">
        {shields === 0
          ? "No shields yet. Ship 7 nights in a row and you earn one. A shield holds your streak through a night that goes wrong."
          : `You have ${shields} ${shields === 1 ? "shield" : "shields"}. If tonight goes dark, a shield holds the streak until tomorrow's 2:00 AM deadline. You earn one every 7 nights shipped.`}
      </p>

      <div className="sticky bottom-0 z-20 -mx-5 mt-6 border-t-[1.5px] border-ink bg-paper px-5 pb-5 pt-4">
        <button
          type="button"
          disabled={!ready}
          onClick={() => setShipped(true)}
          className={`w-full rounded-xl px-4 py-4 text-[15px] font-semibold ${
            ready
              ? "bg-blue text-white press"
              : "cursor-not-allowed border-[1.5px] border-ink-faint bg-line text-ink-faint"
          }`}
        >
          {ready
            ? isRepair
              ? `Repair Day ${dayNumber} · 1 shield`
              : `Ship Day ${dayNumber}`
            : repoOk || postOk
              ? "One proof left"
              : "Add both links to ship"}
        </button>
        <p className="mt-2.5 text-center font-mono text-[10.5px] uppercase tracking-wider text-ink-faint">
          Every night closes at 2:00 AM IST. After that it counts as dark.
        </p>
      </div>
    </>
  );
}
