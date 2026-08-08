# AI Usage Log

**Tool:** Claude (Anthropic), via the chat interface.
**Session:** one continuous conversation, from brief to deploy.

Prompts below are transcribed from that chat, typos and all. They are not
cleaned up, because the messy ones are the honest record of how this actually
went: a blocked Node install, a failed build, a rejected design direction, and
a broken deploy caused by a file that never got copied.

Division of labour: Claude wrote the application code. I made the direction
calls, integrated every file, ran every commit, connected Vercel, and tested on
a real device.

---

## 1. Brief and strategy

**Commit:** none, planning

**PROMPT:**
> Lets gets started m, below is challenges Redesign ABTalks
> Reimagine the platform you're standing on. […full brief pasted, including the
> three required routes, the 390px screenshot note, the edge cases, and the
> four-stage evaluation process…]

**What came back:** A design thesis, that the streak is a habit mechanic and
the portfolio is the product. Also a warning I had not considered: Stage 2
explicitly flags projects whose first commit contains most of the code, so
generating the whole app and pushing it once would risk disqualification. The
staged commit sequence came out of that.

---

## 2. Requirements audit

**Commit:** none, planning

**PROMPT:**
> LETS GO THRU RERQUIREMENT AND EVALTION PARAMETER SO THAT WE CAN RELEMEBERR IT

**What came back:** A compliance checklist covering the six Stage 1 gates, the
five Stage 2 authenticity traps, the three required routes and the named
judging criteria. It also flagged that the 390px automated screenshot means the
top of each route carries most of the judged impression.

---

## 3. Scope of the collaboration

**Commit:** none

**PROMPTS:**
> SO U WILL TAKE CARE OF ALL REQUIREMENT THAT 1. Scaffold: Next.js App Router,
> Tailwind, three empty routes 2. Mock data […] AND ALL THE SEQUCE ???

> I WANT U TO DO EVBERYYHING ,. COMMIT , AND VERNEL CONNECT AND ALL ALONE I
> WILL OKAY?

**What came back:** A straight answer that it could write every line of code
but could not access my GitHub or Vercel accounts, and would not handle
credentials. It also declined to write this log for me, on the grounds that an
invented log reads exactly like an invented log and Stage 2 screens for that.

---

## 4. Scaffold

**Commit:** `chore: scaffold Next.js App Router, Tailwind, three routes resolving`

**PROMPT:**
> lets start and keep in mind all rulkes

**What came back:** Next.js App Router, Tailwind v3, plain JavaScript, and
`/day/[day]` as a dynamic route so one file serves all 60 days. JavaScript over
TypeScript was a deliberate call for the Live Steer round: a type error at
minute fourteen of twenty is a bad way to lose.

**Failure during this step:** The first version used `next/font`, which fetches
Google Fonts at **build** time. The build failed. Since the live demo URL is a
pass/fail gate, we switched to a runtime stylesheet link so the build has zero
external dependencies. The comment explaining this is still in `app/layout.js`.

---

## 5. Hosting decision

**Commit:** none

**PROMPT:**
> cant we uplaod files and github jekyll will make the compile and make
> dashboard and i can just jave link tyhat works ?

**What came back:** Pushback with a specific reason. GitHub Pages serves a
project repo at `username.github.io/abtalks-redesign/`, so `/dashboard` would
404 for the automated screenshot bot and fail Stage 1 gate A3. Vercel gives
root-level routes matching the required map exactly. Stayed on Vercel.

---

## 6. Local environment, blocked

**Commit:** none

**PROMPTS:**
> okay i downloaded zip now guide me

> OKAY I UNZIPED THEN ? IUNSTALLED GIT FOR WINDOWS?

> WJERE SI ADDRESS BAR?

> 'node' is not recognized as an internal or external command, operable program
> or batch file.

> muy org not letting do node js

> hwo toc ommit from guithub desktop

> commit sumamry sis reqqd to coimmit?

> pushed to githuib?

> This repository is empty.

**What happened:** Corporate policy blocked the Node.js installer on my
machine, so local preview was impossible. The workaround was to treat Vercel as
the build verification: it runs `npm install` and `next build` on its own
servers, so a green deploy proves the code compiles. Git moved to GitHub
Desktop rather than the command line.

This is why there is no local `npm run build` in my workflow. Every commit was
verified by the Vercel build instead.

---

## 7. Mock data

**Commit:** `feat: add mock dataset for cohort, student, tracks and 60 day plan`

**PROMPT:**
> okay visible now , next

**What came back:** `data/mock.json` with cohort, tracks, graduates, four
student scenarios and 60 days. Plus `lib/data.js` as an accessor layer, so no
screen reads the JSON directly and the four edge cases are real application
states rather than hardcoded screen variants.

---

## 8. Design tokens and the Tally Strip

**Commit:** `feat: add design tokens and shared TallyStrip component`

**PROMPTS:**
> wher eis vcercel url

> why nothijng essle coming?

**Context:** Two commits had landed with nothing visibly different, because
data and tokens do not render on their own. Claude added a component preview
page so the design system could be checked on a real phone before three screens
were built on top of it.

**What came back:** A dark ink-blue and lamp-amber palette, and the 60 mark
strip that deliberately replaces a GitHub-style contribution grid. A heatmap
shows activity volume; this challenge is about whether you kept the night.

---

## 9. Confidence check

**Commit:** none

**PROMPT:**
> are u sure u r building this ? […brief pasted again in full…]

**What came back:** A requirement-by-requirement status table showing which
items were done, which were scheduled, and which commit each belonged to.
Nothing had been skipped; the foundation commits were just invisible.

---

## 10. Direction change

**Commit:** `refactor: switch to bright screenprint direction with new type pairing`

**PROMPT:**
> so now we cant chnage the look and feel of the website we are buidling?

Followed by my answers to a direct question: **bright and optimistic**, and
change **colours and typefaces**.

**What came back:** A full rebuild of the token layer. Screenprint: bright
paper, five flat saturated inks with one job each, hard 1.5px borders and a
solid offset shadow. Typefaces changed from Bricolage Grotesque and IBM Plex to
Unbounded, Instrument Sans and DM Mono.

Claude noted it was deliberately avoiding cream paper with a serif and a
terracotta accent, on the grounds that a judge reviewing forty submissions
would recognise that combination as the default AI-generated look.

---

## 11. Landing page

**Commit:** `feat: build landing page at /`

**PROMPT:**
> done next

**Design decision made here:** trust through candour rather than testimonials.
The proof section includes a student who quit at day 31, and a yellow block
states plainly what the challenge is not: no job guarantee, no certificate, 45
minutes a night, no paid tier.

---

## 12. Dashboard

**Commit:** `feat: build student dashboard at /dashboard`

**PROMPT:**
> next

**Design decision made here:** the brief lists streak first and today's task
third. Tonight's task was moved to second position, directly under the streak,
because at 11 PM the only question a student is asking is what they are doing
right now. Standing and achievements sit below it.

The Build Shelf was added here: a list of what you actually made, which is the
argument of the whole redesign.

---

## 13. Scope question

**Commit:** none

**PROMPT:**
> hoiw many commit more needed, are these many needed ? or we can dretly goto
> all buidl final one??

**What came back:** An honest breakdown of which remaining commits were real
work and which could be merged, plus the point that Stage 2 flags timing rather
than count. Two could not be skipped: the edge cases, a named judging
criterion, and this log, a pass/fail gate.

---

## 14. Full design preview

**Commit:** none

**PROMPT:**
> can u show me psot all commit how the webiste will look if u can send me a
> standalone html which will show every tjing to get me ideA?

**What came back:** A single-file clickable prototype of all three routes and
all four states, so the design could be approved before the remaining screens
were coded.

---

## 15. Scope correction, all 60 days

**Commit:** `feat: build challenge day experience at /day/[day]`

**PROMPT:**
> arent we need all 60 days day 12 was just example?

**What changed because of it:** This was the most useful thing I caught. Only
days 11 to 13 had full detail; the other 57 would have rendered a thin page,
and a judge would certainly try `/day/5`. All 60 days were then written out
with why it matters, what to build, a done-when checklist, a stretch goal and a
hint.

The day screen also gained four states, because a day is not always today:
**today** shows the submission flow, **done** shows the filed proofs read-only,
**dark** offers a repair, **locked** seals a night that has not happened.

The LinkedIn draft changed from stored text to a generated function, which is
the honest architecture: a real composer reads what you built, it does not read
a table of 60 pre-written posts.

---

## 16. Broken deploy

**Commit:** `fix: add missing shared components breaking the build`

**PROMPTS:**
> Route /dashboard Student dashboard Scaffold placeholder. Built in commit 5.

> is thsi correct or i shud do something?

> should not app/dashboard/page.js chnage to dashboard /day/day?

> * `components/AppBar.jsx` * not there

> how to solve this

**What happened:** The dashboard was still showing the placeholder.
`components/AppBar.jsx` had never been copied across, so the dashboard imported
a file that did not exist, the Vercel build failed, and the live site stayed on
an older deploy. I had also mixed GitHub website uploads with GitHub Desktop
commits, which produced a merge commit and a diverged history.

Fixed by copying the missing files and moving to GitHub Desktop only.

---

## 17. Edge cases

**Commit:** `feat: handle first day, missed day, empty profile and shipped states`

**PROMPT:**
> okay done , next commit

**What came back:** All four states rendering from the mock data, with a
reviewer-facing switcher at the bottom of the dashboard so they can be seen
without waiting 60 days.

The tone rule applied across all four: never shame. A student who missed a
night is one bad screen away from quitting, so the copy reads "paused, not
gone" rather than "streak lost".

---

## 18. Accessibility

**Commit:** `fix: accessibility pass for focus, contrast, labels and reduced motion`

**PROMPT:**
> next

**What came back:** Every colour pairing measured against WCAG AA, not
eyeballed. Three failed: muted text at 2.49:1, white on pink at 3.34:1, white
on green at 2.58:1. Fixed by keeping the bright inks for the strip marks, where
the 3:1 graphical threshold applies, and adding deeper variants for anything
carrying white text.

**This fix was incomplete and I did not notice.** The deeper variants were
defined but never applied on the landing page, so two low-contrast usages
survived. See section 23. Worse, this log originally claimed all eleven
pairings passed, which was not true at the time it was written.

Also a skip-to-content link, live regions announcing proof validation, and a
malformed description list corrected.

---

## 19. Production URL

**Commit:** none

**PROMPTS:**
> correct?

> https://abtalks-git-main-mayank-6674.vercel.app/dashboard is this expected ?

> https://abtalks-beta.vercel.app/

**What came back:** The branch deployment URL is not the one to submit, because
it can break if the branch is renamed. The production alias
`abtalks-beta.vercel.app` is canonical. All three routes were then checked live.

---

## 20. Compliance review and desktop

**Commit:** `polish: desktop treatment, post composer voice, README, route map and AI log`

**PROMPTS:**
> review again : is our webiste fdoing :? […brief pasted…]

> cant we do all in single commit?

**What came back:** A self-audit that found desktop had been ignored rather
than treated as a secondary consideration. The brief names it explicitly, so
the layout gained a desktop treatment: mobile untouched below 1024px, and above
it the column presented as a bordered sheet with a rail beside it.

The generated LinkedIn draft was also rewritten. The first version stitched the
task description together and read like a brief, which is the corporate voice a
student would delete.

---

## 21. External review fixes

**Commit:** `fix: honest link validation, consistent deadline, coherent profile state`

**PROMPT:** I ran the project past a second review and pasted the findings back
into the chat for Claude to act on.

**Three problems found and fixed:**

1. The proof form said "We check the commit exists and was pushed today" and
   showed "Verified", while the code only pattern-matched a URL. Pasting
   `github.com/fake/fake` produced a green tick. Claiming verification that is
   not performed is a credibility risk with no upside, so the language now says
   "Valid link" and describes what it actually does.
2. The deadline contradicted itself: 2:00 AM on the submission bar, "before
   midnight" in the repair banner, "tomorrow midnight" in the shield note. All
   three are now the 2:00 AM IST deadline.
3. The profile prompt said "add a track" to a student whose rank already read
   "#38 in Frontend". Rewritten to ask only for what is genuinely missing.

---

## 22. Desktop rail rewritten

**Commit:** `refactor: desktop rail becomes product navigation, not designer notes`

**PROMPT:**
> the side writetn stuff is expected?

**Why it changed:** The desktop rail was showing designer commentary, lines
like "Designed at 390px, for a student on a phone" and "The idea: the streak is
a habit mechanic". That is the designer talking to a judge, not the product
talking to a student, and it broke the fiction of a real product.

Replaced with in-world navigation: brand, cohort line, three links with an
active state driven by the real route, a small Tally Strip, and one line of
product voice.

---

## 23. Second code review

**Commit:** `fix: contrast stragglers, day 60, locked-day copy, post validation, shelf logic`

**PROMPT:** I ran a second code-level review and pasted the findings into the
chat. Eight issues came back. Seven were accepted, one was already handled.

**Fixed:**

1. **Contrast, unfinished.** Two bright-pink usages remained on the landing
   page at 3.03:1 and 3.34:1, because section 18 defined the deep variants but
   never applied them there. This also meant the claim in section 18 was false.
   Both corrected, and every text-carrying surface was re-grepped to confirm.
2. **Day 61.** `dayNumber + 1` meant finishing night sixty announced that day
   61 unlocks at 5:00 AM. Night sixty now ends the challenge.
3. **Locked-day copy was wrong.** `/day/45` said it unlocks after closing day
   12. It now says night 45 opens on night 45, with the count remaining.
4. **Shipping was a dead end.** The success state lived only inside the form,
   so returning to the dashboard showed the day still open. It now links to the
   shipped dashboard state.
5. **LinkedIn validation was too loose.** Any linkedin.com URL passed,
   including a profile. The challenge asks for proof of work, so the pattern
   now requires a post, a feed update or a pulse article, with an error message
   that says what to do instead.
6. **A latent shelf bug.** `getShelf` filtered on `item.day <= student.shipped`,
   comparing a day number against a count. Those diverge the moment a night
   goes dark: a student on day 12 who missed day 3 has shipped 10, and days 11
   and 12 would have been wrongly hidden. Membership is now decided by day
   state. Verified against that exact case.
7. **The dead profile button.** It had no handler and a caption admitting so,
   which is developer commentary inside a student's screen, the same mistake as
   section 22. Replaced with a small working mock: two fields, a save, a
   confirmed state.

**Noted and deliberately not actioned before judging:** the project is pinned
to Next.js 14.2.5. An upgrade needs regression testing across all three routes
and four states, which is not work to do hours before a deadline.

---

## 24. Third code review

**Commit:** `fix: repair flow, shield spend, stricter proof validation, rail scenario`

**PROMPT:** A third review of the updated code. Six issues, all accepted.

1. **The repair flow was incoherent.** Repairing day 11 showed the generic
   success message and sent the student to the shipped dashboard, which meant
   fixing an old night silently marked tonight as done too. Repair is now its
   own outcome: it says day 11 repaired, states that day 12 is still open, and
   returns to day 12 rather than the dashboard.
2. **The shield was never spent.** The interface said one shield gets spent and
   nothing changed. The repair confirmation now shows the remaining count.
3. **LinkedIn validation accepted a bare prefix.** `linkedin.com/posts/` passed
   because the pattern checked the prefix without requiring an identifier after
   it. Fixed and tested against five cases.
4. **GitHub validation was broader than the brief.** An issue or a pull request
   URL passed. The brief asks for a repository or a commit, so the pattern now
   accepts a repo root or a `/commit/` link and nothing else. Tested against
   five cases.
5. **A contrast regression I introduced in section 23.** The new profile form
   used `text-white/70` labels on blue at 3.66:1 and `placeholder:text-white/50`
   at 2.56:1. Measured the full opacity range: white/80 still fails at 4.34:1,
   white/90 passes at 5.08:1. Labels are now plain white, placeholders white/90.
6. **The desktop rail ignored the scenario.** It always read the default
   student, so `/dashboard?state=fresh` showed night one in the sheet and day
   twelve in the rail. The rail now reads the scenario from the URL and carries
   it through its own links.

Also deleted `ship.sh`, a helper script from the scaffold that was never used.

---

## 25. Fourth code review

**Commit:** `fix: persist repaired and completed states, repaired beats dark`

**PROMPT:** A fourth review. Four issues, all accepted. Two of them were the
same underlying mistake.

1. **The repair did not persist.** The success screen said day 11 repaired with
   one shield left, then returned to `?state=missed`, where day 11 is dark
   again and the shields are back to two. A `repaired` scenario now exists with
   day 11 in `repairedDays`, one shield spent and the count at 11, and the
   repair lands there.
2. **Night sixty landed on day twelve.** "See all sixty" pointed at
   `?state=shipped`, which is the day 12 scenario. A `complete` scenario now
   exists at day 60 with all 60 shipped.
3. **`getDayState` had a precedence trap.** A day appearing in both
   `missedDays` and `repairedDays` resolved to dark. Repaired now wins, which
   is the difference between a recovery reading as a recovery and reading as a
   failure. Verified against that exact case.
4. **Two cleanup text files contradicted each other**, one claiming 22 files
   and one claiming 23, and neither listed `ProfileNudge.jsx`, which the
   dashboard imports. Following either would have broken the build. Both
   deleted; they were scaffolding for my own file copying, never part of the
   project.

The reviewer's switcher still offers only the four states the brief names.
`repaired` and `complete` are outcomes you arrive at by finishing a flow, so
they are reachable by URL rather than listed as states to browse.

---

## What AI got wrong

Recorded because it is the honest picture, and because every one of these cost
real time:

1. **`next/font` failed the build.** Caught by running the build, not by
   reading the code.
2. **The first colour direction was rejected** and the whole token layer
   rebuilt.
3. **Three WCAG contrast failures shipped** in the original palette and were
   only found by measuring, not by looking.
4. **The first post composer output read like documentation**, not like a
   student.
5. **The submission UI claimed to verify GitHub commits** when it only checked
   URL shape. Caught in external review, not while writing.
6. **The desktop rail was written for judges instead of users** and had to be
   rewritten.
7. **Files were repeatedly missed when copying between folders**, which broke a
   Vercel deploy until `components/AppBar.jsx` was tracked down.
8. **The contrast fix was applied incompletely**, and then this log claimed the
   work was finished. Two low-contrast usages survived on the landing page
   until a second review found them. Claiming a fix is complete without
   re-checking is the worst failure on this list, because it removes the reason
   to look again.
9. **Off-by-one on night sixty**, a comparison of a day number against a count
   in the build shelf, and a locked-day message that described the wrong
   unlock condition. All three are the kind of thing that only surfaces when
   someone actually clicks `/day/45` or reaches the end.
10. **A contrast regression introduced while fixing something else.** The
    profile form written in section 23 shipped with 3.66:1 labels, one section
    after a fix for exactly that class of problem. New code needs the same
    check as old code.
11. **Success screens that stopped being true the moment you left them.** The
    repair confirmation and the night-sixty confirmation both described a state
    the application then did not put the student into. Confirming an outcome is
    not the same as producing it, and the gap only shows up if someone clicks
    the button after reading the message.
12. **Both validators were written to the shape of a URL rather than to the
    requirement.** Any linkedin.com link, then any prefix; any GitHub repo
    path, including issues. Validation that matches a pattern instead of a
    rule accepts things the product should reject.

## What was not AI

The direction calls. The decision to go bright rather than dark. The decision
to show a student who quit at day 31. Catching that all 60 days needed real
content. Questioning the designer notes on the desktop rail. Every integration,
every commit, every deploy, and every check on a real device.
