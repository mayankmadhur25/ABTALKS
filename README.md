# ABTalks, redesigned

A mobile-first redesign of the ABTalks 60 day build challenge for Indian
college students.

**Live:** https://abtalks-beta.vercel.app

## AI usage

Two records, kept separate on purpose.

- **[PROMPTS.md](./PROMPTS.md)** is the raw transcript: every prompt I sent, in
  order, unedited. Typos included.
- **[AI-USAGE-LOG.md](./AI-USAGE-LOG.md)** is the curated version: what each
  prompt produced, which commit it maps to, and what went wrong.

The short version of how it was built: Claude wrote the application code in
staged commits. I made the direction calls, integrated every file, wrote every
commit, connected Vercel, tested on a phone, and ran the project past three
external code reviews.

## Route Map

```text
/
/dashboard
/day/12
```

All three are designed at 390px first.

Desktop is a secondary consideration, handled as one. Nothing below 1024px
changes. Above it the column becomes a bordered sheet with a navigation rail
beside it, which is what a desktop application looks like anyway. Nothing is
stretched, and nothing in the interface is addressed to anyone except a student
using the product.

## Run it

```bash
npm install
npm run dev
```

Next.js App Router, Tailwind CSS, plain JavaScript. All data is mocked in
`data/mock.json`. No authentication, no database, no accounts, per the brief.

## The thinking

**The streak is a habit mechanic. The portfolio is the product.**

The existing framing rewards consistency. Consistency is a means. So the
redesign is built around evidence: 60 nights, 60 artifacts, one public record.
The dashboard has a Build Shelf showing what you made, not only how often you
showed up.

**The design context is the actual context of use.** Students open this on a
phone, late, after college. The palette is a screenprint: bright paper, flat
saturated inks, hard borders. Five colours, each with exactly one job.

| Colour | Job |
| --- | --- |
| Blue | Actions, links, nights shipped |
| Pink | Tonight, and only tonight |
| Yellow | The task in front of you |
| Green | A confirmed submission |
| Ink | A night that went dark |

**Trust through candour.** The landing page shows a student who quit at day 31,
states that half of every cohort stops, and leads with what the challenge is
not: no job guarantee, no certificate, 45 minutes a night. A sceptical 20 year
old discounts praise and rewards honesty.

## The signature component

`components/TallyStrip.jsx`. Sixty marks, one per night, read like a tally
scratched on a hostel wall.

It deliberately replaces the GitHub-style contribution grid. A heatmap shows
activity volume; this challenge is not about volume, it is about whether you
kept the night. Every mark encodes real state: shipped, dark, repaired,
tonight, ahead. The same component appears on all three routes, so a student
learns to read it once.

## The thoughtful idea

**The Post Composer.**

The GitHub commit is easy. The student already has the editor open. The
LinkedIn post is what actually breaks the streak: writing publicly, in English,
at 11:40 PM, about work you think is trivial.

So the post is drafted from the task and the student edits it, rather than
facing an empty box. Three frames, rotated by a Rewrite button. The draft is
**generated**, not stored, which is the honest architecture: a real composer
reads what you built, it does not read a table of 60 pre-written posts.

Two supporting ideas:

- **Streak Shields.** One earned every 7 nights kept. A dark night is held, not
  lost. Recovery instead of abandonment.
- **The Build Shelf.** What you made, not only how often.

## Edge cases

All four are real application states in `data/mock.json`, not mocked-up
screens. A reviewer can switch between them from the strip at the bottom of
`/dashboard`, or directly:

| State | URL |
| --- | --- |
| Day 12, on streak | `/dashboard` |
| First day, no streak | `/dashboard?state=fresh` |
| A missed day | `/dashboard?state=missed` |
| Already shipped today | `/dashboard?state=shipped` |

The rule across all four is that the interface never shames. A student who
missed a night is one bad screen away from quitting entirely, so the copy reads
"paused, not gone" rather than "streak lost".

`/day/[day]` has its own four states, because a day is not always today:
**today** shows the submission flow, **done** shows the filed proofs read-only,
**dark** offers a repair, and **locked** seals a night that has not happened.

## All 60 days are real

Every day from 1 to 60 has a written task: why it matters, what to build, a
done-when checklist, a stretch goal and a hint. Try `/day/5`, `/day/33`,
`/day/60`.

## Accessibility

- Every colour pairing meets WCAG AA. Three failed on first measurement and
  were fixed; bright pink and green are kept for the strip marks, where the 3:1
  graphical threshold applies, with deeper variants for anything carrying white
  text.
- Skip-to-content link, visible focus on every control, full keyboard operation.
- The Tally Strip carries a text label reading out the actual counts.
- Live regions announce proof verification as links are pasted.
- `prefers-reduced-motion` is honoured globally.

## Structure

```
app/
  page.js              /
  dashboard/page.js    /dashboard
  day/[day]/page.js    /day/1 ... /day/60
components/
  TallyStrip.jsx       the 60 night strip
  ProofForm.jsx        submission and the Post Composer
  AppBar.jsx           shared header
  StateSwitcher.jsx    reviewer control, demo only
lib/data.js            every screen reads through here
data/mock.json         cohort, tracks, 4 scenarios, 60 days
```

No screen touches `mock.json` directly. When a real API arrives, only
`lib/data.js` changes.
