# PROMPTS.md

Raw prompt transcript. Every message I sent to Claude (Anthropic), in order,
unedited.

Typos, capitals and half-finished questions are left exactly as typed. Long
pastes are marked and their content summarised in square brackets; everything
outside square brackets is verbatim.

For the curated version, with what each prompt produced and which commit it
maps to, see [AI-USAGE-LOG.md](./AI-USAGE-LOG.md).

**Tool:** Claude (Anthropic), chat interface. One continuous session.
**Screenshots:** I pasted screenshots several times. Those are marked
`[screenshot]` with a note on what was in the image.

---

**1.**
> Lets gets started m, below is challenges Redesign ABTalks
> Reimagine the platform you're standing on.
>
> [full hackathon brief pasted: the situation, the three routes to ship, the
> submission format and route map, "what we're looking for" including
> mobile-first at 390px, the three edge cases and the thoughtful idea, and the
> out-of-scope list]
>
> Also keep in mind the evaluation parameter as depicted below :
>
> [full four-stage evaluation process pasted: Stage 1 eligibility verification,
> Stage 2 authenticity review, Stage 3 project judging, Stage 4 Live Steer
> Challenge]

---

**2.**
> LETS GO THRU RERQUIREMENT AND EVALTION PARAMETER SO THAT WE CAN RELEMEBERR IT

---

**3.**
> SO U WILL TAKE CARE OF ALL REQUIREMENT THAT 1. Scaffold: Next.js App Router,
> Tailwind, three empty routes 2. Mock data: `data/mock.json` with cohort,
> student, days, tracks 3. Design tokens and the shared Tally Strip component
> 4. Route `/` landing 5. Route `/dashboard` 6. Route `/day/12` 7. Edge-case
> states: day 1, missed day, empty profile, already shipped 8. Accessibility
> pass, reduced motion, keyboard focus 9. README, route map, AI usage log
> 10. Final deploy and polish AND ALL THE SEQUCE ???

---

**4.**
> I WANT U TO DO EVBERYYHING ,. COMMIT , AND VERNEL CONNECT AND ALL ALONE I
> WILL OKAY?

---

**5.**
> lets start and keep in mind all rulkes

---

**6.**
> cant we uplaod files and github jekyll will make the compile and make
> dashboard and i can just jave link tyhat works ?

---

**7.**
> okay i downloaded zip now guide me

---

**8.**
> [screenshot: GitHub Desktop showing "No local changes", repository ABTALKS,
> branch main, "Never fetched"]
>
> OKAY I UNZIPED THEN ? IUNSTALLED GIT FOR WINDOWS?

---

**9.**
> [screenshot: Windows Explorer showing the unzipped project files inside
> OneDrive > Documents > GitHub > ABTALKS]

---

**10.**
> WJERE SI ADDRESS BAR?

---

**11.**
> [screenshot: command prompt showing `dir` output for the ABTALKS folder,
> 9 files and 5 directories]

---

**12.**
> 'node' is not recognized as an internal or external command,
> operable program or batch file.

---

**13.**
> muy org not letting do node js

---

**14.**
> hwo toc ommit from guithub desktop

---

**15.**
> commit sumamry sis reqqd to coimmit?

---

**16.**
> pushed to githuib?

---

**17.**
> This repository is empty.

---

**18.**
> okay visible now , next

---

**19.**
> wher eis vcercel url

---

**20.**
> [screenshot: the deployed landing page placeholder rendering on the live
> Vercel URL, dark background, "Route /" and "Landing page"]

---

**21.**
> why nothijng essle coming?

---

**22.**
> are u sure u r building this ?
>
> [full hackathon brief pasted again]

---

**23.**
> so now we cant chnage the look and feel of the website we are buidling?

---

**24.**
> [answers to two multiple-choice questions Claude asked]
>
> Q: Which visual direction should the three screens use?
> A: Bright & optimistic: light, energetic, high-colour
>
> Q: How much do you want changed?
> A: Colours and typefaces

---

**25.**
> done next

---

**26.**
> next

---

**27.**
> hoiw many commit more needed, are these many needed ? or we can dretly goto
> all buidl final one??

---

**28.**
> can u show me psot all commit how the webiste will look if u can send me a
> standalone html which will show every tjing to get me ideA?

---

**29.**
> arent we need all 60 days day 12 was just example?

---

**30.**
> yes next commit

---

**31.**
> Route /dashboard
> Student dashboard
> Scaffold placeholder. Built in commit 5.

---

**32.**
> [screenshot: GitHub repo file listing for the `app` folder, showing a red X
> next to a merge commit]
>
> is thsi correct or i shud do something?

---

**33.**
> [pasted: the full contents of my `app/dashboard/page.js`]
>
> should not app/dashboard/page.js chnage to dashboard /day/day?

---

**34.**
> * `components/AppBar.jsx`
> *  not there

---

**35.**
> [screenshot: GitHub repo root showing 9 commits and a red X on the merge
> commit]
>
> how to solve this

---

**36.**
> okay done , next commit

---

**37.**
> next

---

**38.**
> [screenshot: GitHub Desktop showing 9 changed files staged]
>
> correct?

---

**39.**
> https://abtalks-git-main-mayank-6674.vercel.app/dashboard is this expected ?

---

**40.**
> https://abtalks-beta.vercel.app/

---

**41.**
> review again : is our webiste fdoing :?
>
> [full hackathon brief pasted again]

---

**42.**
> cant we do all in single commit?

---

**43.**
> [pasted: a requirement-compliance review produced by a second AI tool. It
> scored the project 9.2/10 against the brief and recommended three fixes: make
> the empty-profile state logically consistent, replace the fake "Verified"
> language with honest URL validation wording, and standardise the contradictory
> midnight and 2:00 AM deadline copy]

---

**44.**
> [screenshot: the desktop layout showing the side rail with designer notes]
>
> the side writetn stuff is expected?

---

**45.**
> [answer to a multiple-choice question Claude asked]
>
> Q: What should the desktop side rail be?
> A: Make it in-world product nav

---

**46.**
> abtalks main has so many files

---

**47.**
> AI Usage Log seems so pending? Commit: n/a, planning PROMPT: (paste the
> message where you gave Claude the brief) ROMPT: (paste) can u see ur chat an
> dgill out fully?

---

**48.**
> [pasted: a code-level review from a second AI tool listing eight issues:
> future-day unlock logic, Day 60 producing "Day 61", submission not updating
> the dashboard, missed-day repair not updating state, weak LinkedIn
> validation, a dead profile button, two remaining pink contrast failures, and
> a latent Build Shelf bug comparing a day number against a count]

---

**49.**
> [pasted: a follow-up code review confirming the previous fixes and listing
> six remaining issues: the repair flow still sending the student to the
> shipped state, the shield never being spent, LinkedIn accepting a bare
> `/posts/` prefix, GitHub accepting issue URLs, a contrast regression in the
> new profile form, and the desktop rail ignoring the demo state]

---

**50.**
> [pasted: a further review confirming those fixes and listing four remaining
> issues: the repaired state not persisting after leaving the success screen,
> the Day 60 call to action still pointing at the Day 12 mock state, a
> precedence trap in `getDayState` when a day appears in both `missedDays` and
> `repairedDays`, and two contradictory repository file-list text files]

---

**51.**
> A PROMPTS.md in the repo, or exported chat transcripts. This is how we verify
> the build was genuinely vibe-coded.

---

## Notes on this transcript

**What Claude did:** wrote the application code, in staged commits, one screen
at a time.

**What I did:** made the direction calls, integrated every file by hand,
wrote every commit message into GitHub Desktop, connected Vercel, tested on a
real phone, ran the project past external review three times, and brought the
findings back.

**Why some prompts are one word:** the workflow was Claude ships a stage, I
integrate it, look at it at 390px, push it, and come back. "next" and "done
next" are the join between two sessions of that, not the whole of my input.

**Where I changed the outcome:**

- Rejected the first design direction, a dark ink-and-amber palette, and asked
  for something bright and optimistic instead. The entire token layer was
  rebuilt.
- Caught that only three of the 60 days had real content when the brief implies
  all of them are real. All 60 were then written out.
- Questioned the designer commentary showing in the desktop side rail, which
  led to it being rebuilt as in-world product navigation.
- Ran three external code reviews and brought back 18 issues, all of which were
  fixed.

**Environment constraint worth recording:** corporate policy blocked the
Node.js installer on my machine, so I could not run `npm run dev` or
`npm run build` locally at any point. Every commit was verified by the Vercel
production build instead, which runs the same install and build steps. This is
why the workflow is zip, copy, GitHub Desktop, watch the deploy.

---

## Review pass four: the missed-day state

**What triggered it:** I opened the missed-day preview on the deployed site
and could not tell it apart from the on-streak one. The pill still read
Tonight, the task was identical, the shield note was identical. The only
difference was a three-pixel dark mark in the tally strip, which is invisible
at a glance on a phone.

My first read was that the state was not propagating at all. That turned out
to be wrong, and the reason is worth writing down: in the missed scenario the
current day is 12 and the dark night is 11, so `/day/12?state=missed`
correctly renders a normal open night. Day 12 has not gone dark. I had been
looking at the wrong route. The dark treatment on `/day/11?state=missed`
already worked.

Three real problems came out of the pass anyway.

**Shield copy contradicted itself on the repair screen.** The note under the
draft box was one sentence for every state. On the repair screen it sat
directly under the black card announcing the night went dark, and directly
above a button reading "Repair Day 11 · 1 shield". Three elements, three
different tenses. The note now reads `isRepair` and says what the repair
actually costs.

**The preview switcher was lying about where it goes.** It kept the current
day and swapped only the query string, so clicking "Day 1, no streak" from
day 12 landed on `/day/12?state=fresh`, which is locked in that scenario. The
label promised day one and the link delivered a sealed screen. Added a
`dayScoped` prop so each scenario resolves to its own current day. The
dashboard has no day in its path, so its usage is unchanged.

**The dark night was only visible on the dashboard.** A student deep-linking
into tonight could work the whole task without ever learning day 11 was still
open. Added a link under the task intro, shown on any day except the dark one
itself, since that one already carries its own inverted card.

**Committed as one change** rather than three, because I found and fixed them
in a single sitting and splitting them afterwards would have been a fiction
about how the work happened.

**Still unverified locally:** the Node.js constraint recorded above still
applies, so this pass was checked by reading the render path and by the
Vercel production build, not by `npm run dev`.
