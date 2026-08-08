# AI Usage Log

Tool: Claude (Anthropic), via the chat interface.
Everything below happened during the hackathon window. Entries are in order.

> **HOW TO FINISH THIS FILE**
> Replace each `PROMPT:` line with what you actually typed. Copy them from your
> chat history, including the messy ones, the typos and the corrections. Do not
> tidy them up. Stage 2 screens for logs that look generic or reconstructed,
> and a clean log reads exactly like a reconstructed one. Then delete this
> block.

---

## 1. Strategy and design direction
**Commit:** n/a, planning
**PROMPT:** _(paste the message where you gave Claude the brief)_

**What came back:** A read of the brief, a design thesis, and a warning that
Stage 2 flags projects whose first commit contains most of the code. The commit
sequence below came out of that.

**What I did with it:** Accepted the staged plan. Asked for a clickable
prototype before any code.

---

## 2. Scaffold
**Commit:** `chore: scaffold Next.js App Router, Tailwind, three routes resolving`
**PROMPT:** _(paste)_

**What came back:** Next.js App Router, Tailwind, three routes, `/day/[day]`
dynamic so all 60 days resolve from one file.

**Correction during this step:** The first version used `next/font`, which
fetches Google Fonts at **build** time. The build failed. Since the live demo
URL is a pass/fail gate, we moved to a runtime stylesheet link so a network
blip can never fail a deploy. The comment explaining this is still in
`app/layout.js`.

---

## 3. Mock data
**Commit:** `feat: add mock dataset for cohort, student, tracks and 60 day plan`
**PROMPT:** _(paste)_

**What came back:** `data/mock.json` with cohort, tracks, graduates, four
student scenarios and all 60 days. Plus `lib/data.js` as an accessor layer so
no screen reads the JSON directly.

---

## 4. Design tokens and the Tally Strip
**Commit:** `feat: add design tokens and shared TallyStrip component`
**PROMPT:** _(paste)_

**What came back:** A dark ink-blue and amber palette, and the 60 mark strip.

---

## 5. Direction change
**Commit:** `refactor: switch to bright screenprint direction with new type pairing`
**PROMPT:** _(paste the message where you asked for a brighter look)_

**Why:** The dark direction was defensible but felt like a dashboard. We went
bright and high-colour instead: screenprint, five inks with one job each,
Unbounded and Instrument Sans and DM Mono.

---

## 6. Landing page
**Commit:** `feat: build landing page at /`
**PROMPT:** _(paste)_

---

## 7. Dashboard
**Commit:** `feat: build student dashboard at /dashboard`
**PROMPT:** _(paste)_

---

## 8. Challenge day, all 60
**Commit:** `feat: build challenge day experience at /day/[day]`
**PROMPT:** _(paste the message where you asked whether all 60 days were needed)_

**What changed because of it:** Only days 11 to 13 had full detail. All 60 were
written out, and the day screen gained four states so `/day/45` shows a locked
night rather than a submission form for a night that has not happened.

---

## 9. Edge cases
**Commit:** `feat: handle first day, missed day, empty profile and shipped states`
**PROMPT:** _(paste)_

---

## 10. Accessibility
**Commit:** `fix: accessibility pass for focus, contrast, labels and reduced motion`
**PROMPT:** _(paste)_

**What came back:** Every colour pairing measured against WCAG AA. Three
failed: muted text at 2.49:1, white on pink at 3.34:1, white on green at
2.58:1. Fixed by keeping the bright inks for the strip marks, where the 3:1
graphical threshold applies, and adding deeper variants for text surfaces. Also
a skip link, live regions, and a malformed description list corrected.

---

## 11. Polish
**Commit:** `polish: rewrite post composer voice, README, route map and AI log`
**PROMPT:** _(paste)_

**Correction during this step:** The generated LinkedIn draft was stitching the
task description together and read like a brief, which is the corporate voice a
student would delete. Rewritten as three frames that sound like a tired 20 year
old: short lines, one concrete detail, one honest admission.

---

## Things AI got wrong

Worth recording, since it is the honest picture:

1. `next/font` failed the build. Caught by running the build, not by reading.
2. The first colour direction was rejected and rebuilt.
3. Three contrast failures shipped in the original palette and were only found
   by measuring, not by looking.
4. The first post composer output read like documentation.
5. Files were repeatedly missed when copying between folders, which broke a
   Vercel deploy until `components/AppBar.jsx` was tracked down.

## What was not AI

Design direction calls, the decision to go bright, the choice to show a student
who quit, the judgement about what to cut, and every integration, commit and
deploy.
