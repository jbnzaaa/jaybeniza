| ☑ || ☑ || ☑ || ☑ |# Jay Beniza Portfolio — Content Audit

This file combines the two audit rounds (Round 1 and Round 2, both 5 Nov 2026) and serves as the fix tracker. It covers the local working tree of `D:\Designs\Web Development\jaybeniza`. The live site (jaybeniza.vercel.app) doesn't have these changes until they're committed and deployed.

**Not inspected:** the CV PDF, the Behance pages, the text inside screenshots, the hidden StockNear entry, and the `KerningGame` easter egg.

---

## 1. Executive Assessment

| | Round 1 | Round 2 |
|---|---|---|
| Overall content score | 7.0 / 10 | 7.8 / 10 |
| Positioning | A hybrid designer-developer looking for clients more than a role | A mid-level UI/UX and product designer who can also build, with freelance as a secondary path |
| Critical issues | 3 unsupported or contradictory claims | 1 formatter bug ("How i work") and 1 unverified sentence |

**Strongest areas**

- **The client case studies** (GuRover, COMELEC, PSGS, AACCUP, DOST ARISE, DOST Courseware, UI Kit, ReGain). Each has a specific problem, three decisions with challenge and rationale, and honest attribution (for example, COMELEC credits the 3D designer and game developers).
- **BiteWise's research section.** The sample is stated and the limits are named.
- **Testimonials** from named colleagues.
- **The tone** is calm and factual, without buzzwords.

**Remaining weaknesses**

- the `sentenceCase` "I" bug
- repetition: "1–2 days", the reused quote, COMELEC's schedule claim, the quiet-listener idea
- small terminology mismatches
- generic alt text
- the home page h1 has no role keyword
- no case study shows a tradeoff or a rejected alternative

---

## 2. Content Inventory

| Page / section | Source file |
|---|---|
| Site title, meta, OG/Twitter, JSON-LD, no-JS fallback | `public/index.html` |
| App name | `public/manifest.json` |
| Per-page title and description | `src/utils/pageTitle.js` (`usePageTitle`) |
| Label formatting (every `Tag`, Skills groups) | `src/utils/sentenceCase.js` |
| Navigation and menu | `components/pages/Navbar.jsx` |
| Home: Hero (role label, h1, description, CTAs) | `components/pages/Hero.jsx` |
| Home: Featured Work | `components/pages/Project.jsx`, `ProjectCard.jsx` |
| Home: About the Designer | `components/pages/About.jsx` |
| Home: Areas of Expertise + "Work with me" | `components/pages/Services.jsx` |
| Home and About: What Others Say | `components/pages/Testimonials.jsx` |
| Home contact / Get in touch "View My Projects" | `components/pages/Contact.jsx` |
| About: intro, Work With Me (CV) block | `components/pages/AboutPage.jsx` |
| About: How I Work | `components/pages/Process.jsx` |
| About: Professional Experience | `components/pages/WorkExperience.jsx` |
| About: Skills & Tools | `components/pages/Skills.jsx` |
| About: Certificates & Awards | `components/pages/CertificatesAwards.jsx` |
| Work page | `components/pages/ProjectsPage.jsx`, `WorkGrid.jsx`, `projects/shown.js` |
| Archive | `components/pages/ArchivePage.jsx`, `projects/archive.js` |
| Start a Project form | `components/pages/ProjectRequest.jsx` |
| Case-study template and section headings | `components/pages/projects/ProjectPage.jsx` |
| All project copy (10 shown, 13 archive, 2 old portfolios, 1 hidden) | `components/pages/projects/projects.js` |
| Footer | `components/pages/Footer.jsx` |

---

## 3. Page-by-Page Scores (Round 2)

Scores are out of 10, with the Round 1 overall in brackets. Abbreviations: Clar = clarity, Prof = professionalism, Conc = conciseness, Cred = credibility, Cons = consistency, Recr = recruiter relevance.

| Page | Clar | Prof | Conc | Cred | Cons | Recr | SEO | Overall |
|---|---|---|---|---|---|---|---|---|
| Home | 8 | 8 | 7 | 8 | 7 | 8 | 6 | **7.4** (6.4) |
| About | 8 | 7 | 6 | 8 | 6 | 8 | 7 | **7.1** (7.0) |
| Work | 8 | 8 | 8 | 8 | 7 | 8 | 7 | **7.7** (7.6) |
| Archive | 8 | 8 | 7 | 9 | 8 | 5 | 7 | **7.4** (7.4) |
| Get in touch | 8 | 8 | 7 | 8 | 6 | 7 | 7 | **7.3** (6.9) |
| Case studies (client work) | 8 | 9 | 6 | 8 | 7 | 9 | 7 | **7.7** (7.6) |
| Case studies (BiteWise, Portfolio) | 8 | 7 | 6 | 8 | 7 | 6 | 7 | **7.0** (6.7) |
| Metadata and SEO layer | 7 | 8 | 7 | 8 | 7 | 7 | 6 | **7.1** (6.9) |

---

## 4. Resolved Since Round 1

| Round 1 finding | Fix applied |
|---|---|
| Lighthouse "55 → 93" vs PageSpeed 77 | The outcome now says "measured in local Lighthouse runs" |
| GuRover 88%, ambiguous with 6 pilot users | Metric card removed |
| "Fewer steps than the competition" | "Shorter flows to stand out" |
| Featured Work description implied you built every project | "Selected work, from problem to shipped interface." |
| The home h1 named no role | The h1 now names the role for search and screen readers (P5-1); the visible role label was added, then removed at your request, since the hero description already names the role |
| Freelance-only CTAs | Employer paths: "Hiring a UI/UX designer, or have a product to design?" (Home); "Hiring for a UI/UX or product design role? My CV…" (About) |
| "How We'll Work Together" | "How I Work" (it introduced the P1-1 bug) |
| Featured Work led with personal projects | GuRover, AACCUP, COMELEC, UI Kit |
| Get in touch project links led with personal projects | All work, GuRover, AACCUP, COMELEC, UI Kit |
| Front-end skills unqualified | "Front-End (AI-Assisted)" (casing issue, see P1-3) |
| GuRover engineering-heavy contributions | Merged into one line |
| ARISE "Nine learning platforms" | "ARISE's learning platforms…"; the 3 roles named in the overview |
| ARISE "seamless" | "connected" |
| ARISE sprint metric credited to you | Credited to the team |
| ARISE "keep them coming back" | "designed to bring them back" |
| UI Kit "Screens built" | "Screens designed" |
| Courseware: 4 lessons, field trip detail | 5 lessons from Grade 3 to Senior High; scene list made general |
| Courseware screen count ambiguity | "~100 / Screens designed for each lesson" |
| Project counts (14 vs 7 + 7, 75+ screens) | 25 web and mobile products; junior 16 projects and 500+ screens; mid 10 projects including COMELEC |
| Job title | Kept as "Mid UI/UX Designer" and "Junior UI/UX Designer", at your request |

---

## 5. Fix Phases (open issues)

**Task status:** Done · Open · Needs input (waiting on a fact or a decision from you)

### Phase Status

| Phase | Focus | Status | Done | Open | Needs input | Tasks |
|---|---|---|---|---|---|---|
| 1 | Critical and correctness | Complete | 5 | 0 | 0 | 5 |
| 2 | Repetition | Complete | 7 | 0 | 0 | 7 |
| 3 | Claims and terminology | Complete | 9 | 0 | 0 | 9 |
| 4 | Microcopy and CTAs | Complete | 7 | 0 | 0 | 7 |
| 5 | SEO and accessibility | Complete | 9 | 0 | 0 | 9 |
| 6 | Content that needs your input | Complete | 4 | 0 | 0 | 4 |

### Phase 1 — Critical and correctness

**Status: Complete** — 5 done · 0 open · 0 need input (5 tasks)

| ID | Location | Current | Fix | Status |
|---|---|---|---|---|
| P1-1 | `utils/sentenceCase.js` → `Process.jsx:50` | "How I Work" renders as "[ How i work ]" | Keep the word "I" (and "I'm", "I've") capitalised in `sentenceCase` | Done |
| P1-2 | Same → `projects.js` `tingi.caseStudy[10].title` | "What I Learned" renders as "What i learned" (live today) | Fixed by P1-1 | Done |
| P1-3 | `Skills.jsx` | `'Front-End (AI-Assisted)'` renders as "Front-end (AI-Assisted)" | `'Front-End (AI-assisted)'` | Done |
| P1-4 | `projects.js` `comelec.category` | "Software Platform / Client Project" (the home card says "3D Training Game") | `'3D Training Game / Client Project'` | Done |
| P1-5 | `projects.js` `courseware.platform.approach[0].text` | "…and the moments where a lesson's idea is shown before it is explained." | **Needs Verification.** If it isn't accurate: "Each lesson got its own Figma file, built scene by scene from its storyboard, with every scene staged around the characters the content department provided." | Done |

### Phase 2 — Repetition

**Status: Complete** — 7 done · 0 open · 0 need input (7 tasks)

| ID | Location | Current | Fix | Status |
|---|---|---|---|---|
| P2-1 | `projects.js` (psgs, aaccup, arise, pci, courseware), `WorkExperience.jsx` | "1–2 days" in 8+ places | Keep the metric card on each page; remove the same claim from the outcome and contribution text on that page | Done |
| P2-2 | `projects.js` `psgs`, `aaccup`, `pci` `.platform.quote` | The Prince Bernard Diana quote ×3 | No quotes on project pages: every project quote removed, at your request | Done |
| P2-3 | `projects.js` `comelec` outcome, `approach[1].rationale`, `contributions[6]` | "ahead of schedule" ×2, "begin early" ×1 | Keep it in the outcome only; trim the rationale; remove contribution 6 | Done |
| P2-4 | `About.jsx` `PARAGRAPHS[0]` | "I listen more than I talk, and that shapes how I work." (third use of the quiet-listener idea) | Drop the first sentence | Done |
| P2-5 | `AboutPage.jsx` `INTRO[1]` | "I prefer careful decisions to loud ones, and products that serve both the people who use them and the teams who build them." | Delete the sentence | Done |
| P2-6 | `projects.js` `tingi.caseStudy[12].text[1]` | "BiteWise demonstrates how a connected, preference-driven shopping experience…" | Delete (it restates the paragraph above) | Done |
| P2-7 | `projects.js` `courseware.platform.contributions[1]` | "Staged every story scene around the characters the content department provided" (now repeats decision 01) | Reword or merge into contribution 0 | Done |

### Phase 3 — Claims and terminology

**Status: Complete** — 9 done · 0 open · 0 need input (9 tasks)

| ID | Location | Current | Fix | Status |
|---|---|---|---|---|
| P3-1 | `Hero.jsx`, `AboutPage.jsx` `INTRO[0]`, `index.html`, `pageTitle.js` | "…25 web and mobile products for government, education, and research clients." | "…25 web and mobile products, most for government, education, and research clients." (GuRover, Rover and the Central App are company products) | Done |
| P3-2 | `projects.js` `psgs.platform.challenge.lead` | "Surgeons were judging a training program…" | "Residents were judging a training program…" | Done |
| P3-3 | `projects.js` `gurover.short` | "AI-powered, offline-first teacher operating system" | "AI-assisted, offline-first workspace for teachers" | Done |
| P3-4 | `projects.js` `gurover.platform.challenge.text` | "…much of that data is transcribed by hand…" | **Needs Verification:** name the source (pilot, client brief) | Done |
| P3-5 | `projects.js` `pci` | "UI Kit" / "Central App design system" / "the kit" | Retitled "Design System" (one-line title, as every project), "the kit" now "the design system" | Done |
| P3-6 | `projects.js` `pci.platform.approach[1].challenge` | "…dark mode had become a standard expectation in modern platforms." | "The Central App needed to suit users who prefer light or dark interfaces." | Done |
| P3-7 | `projects.js` `portfoliov3.description` | "…with carefully composed pages, scroll-driven motion, and a fast, optimized build." | "…with scroll-driven motion and an optimized build." | Done |
| P3-8 | `projects.js` `courseware.platform.approach[1].text` | "…across the five lessons: pouring and pumping activities…" (science only) | "…across the five lessons, such as pouring and pumping activities…" | Done |
| P3-9 | `projects.js` `portfoliov3.platform.approach[2].rationale` | "A client can judge the design and the build in the same visit, before we ever talk." | "Anyone reviewing my work can judge the design and the build in the same visit." | Done |

### Phase 4 — Microcopy and CTAs

**Status: Complete** — 7 done · 0 open · 0 need input (7 tasks)

| ID | Location | Current | Fix | Status |
|---|---|---|---|---|
| P4-1 | `Services.jsx:79` | "Built with Claude Code" | "Design to Code" | Done |
| P4-2 | `Services.jsx:57` | "…to final interface. Mapping the user flows…" (fragment) | "…to final interface: mapping the user flows…" | Done |
| P4-3 | `Services.jsx:68` | "…design systems that teams can actually use…" | "…design systems teams can use…" | Done |
| P4-4 | `ProjectRequest.jsx:299` | `label='Timeline'` (contradicts the "1 to 2 weeks" hint) | "When do you want to start?" | Done |
| P4-5 | `ProjectRequest.jsx` `TYPES[0]` | "Website, designed and built" | "Website design and build" | Done |
| P4-6 | `AboutPage.jsx:269`, `Services.jsx`, `Contact.jsx`, `AboutPage.jsx` `ACTIONS` | "Work With Me" / "Work with me" / "Email me" / "Email" / "Send Me a Message" | "Start a project" for the request form (Services button too), "Get in touch" for the nav, "Email" for email; contact heading "Get in Touch" | Done |
| P4-7 | `ArchivePage.jsx` `DESCRIPTION` | "…Personal explorations, not client work." | Delete the second sentence | Done |

### Phase 5 — SEO and accessibility

**Status: Complete** — 9 done · 0 open · 0 need input (9 tasks)

| ID | Location | Current | Fix | Status |
|---|---|---|---|---|
| P5-1 | `Hero.jsx:58` h1 | `aria-label={PROFESSION}`, no role keyword | `aria-label` = "UI/UX & product designer: I pay attention to what others might overlook." | Done |
| P5-2 | `index.html`, `pageTitle.js` `SITE_DESCRIPTION` | "Explore the portfolio of Jay Beniza, a UI/UX and product designer…" | "Jay Beniza, UI/UX and product designer in the Philippines with 3.5+ years designing 25 web and mobile products, Figma design systems, and front-ends built with Claude Code." | Done |
| P5-3 | `projects.js` `comelec.screenshots[2–11]` | "screen 1" to "screen 10" | Describe each screen | Done |
| P5-4 | `projects.js` `tingi.caseStudy[7–9].shots` | "BiteWise decision 01, screen 1", etc. | Describe each screen | Done |
| P5-5 | `manifest.json` | "Jaybeniza" | "Jay Beniza" | Done |
| P5-6 | `pageTitle.js` | "About - Jay Beniza" | "About \| Jay Beniza" | Done |
| P5-7 | `WorkExperience.jsx`, `projects.js`, `ProjectRequest.jsx` | "May 2024 - October 2026", "1-2 days", "1 to 2 weeks" | An en dash for every range | Done |
| P5-8 | `ProjectsPage.jsx` `usePageTitle` | "…for education, government and business clients." | "…for government, education, and research clients." | Done |
| P5-9 | `CertificatesAwards.jsx` | The ReGain awards are missing | Add Most Outstanding Project Manager and Eye in the Calm of the Storm, with year | Done |

### Phase 6 — Content that needs your input

**Status: Complete** — 4 done · 0 open · 0 need input (4 tasks)

| ID | What's missing | Why it matters | Status |
|---|---|---|---|
| P6-1 | One alternative you considered and rejected, for GuRover, AACCUP and COMELEC | The strongest sign of design thinking. No case study has one today. | Done |
| P6-2 | A source for AACCUP's "thousands of programs" | Needs Verification | Done |
| P6-3 | Confirmation of COMELEC's "ahead of schedule" | Needs Verification | Done |
| P6-4 | PMMA: be ready to explain it in interviews (the third Claude Code app, not in the mid project list) | Interview readiness | Done |

---

## 6. Final Hiring Manager Assessment (Round 2)

- **Mid-level capability:** yes. The numbers now agree with each other and with the case studies.
- **Design thinking:** good, not yet strong. Every decision has a rationale, but none shows a tradeoff (P6-1).
- **Hybrid positioning:** convincing. Development is framed as AI-assisted and supports the design identity.
- **What would make a hiring manager hesitate:** "[ How i work ]" (P1-1), repetition (Phase 2), small mismatches (P1-4, P3-1).
- **Ready for job applications:** yes, after Phase 1.
