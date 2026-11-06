# Content Quality Audit — jaybeniza.vercel.app (Final Round)

**Scope:** all user-facing text in `D:\Designs\Web Development\jaybeniza` at commit `815fefd` (5 Nov 2026), the version now live on master. This is the fourth and final pass.

- **Rounds 1–2** covered positioning, claims and case-study narrative. Tracker: `docs/content-audit.md`.
- **Round 3** covered terminology, interface text, forms and accessibility. All of its 24 implementation tasks (Phases A–F) were applied in `815fefd`. The Round 3 version of this file, with its decisions and phase plan, is kept in git at that commit.

**Audit only:** no application copy was changed.

---

## 01 — Executive Summary

**Overall content quality: 8.8 / 10** (Round 1: 7.0 · Round 2: 7.8 · Round 3: 8.2)

The portfolio now reads as the work of one deliberate writer:

- one name for the role (UI/UX & Product Designer)
- one name for the build skill (AI-assisted front-end)
- claims that match the evidence
- form guidance a visitor can actually see

Nothing critical or high-priority remains. Every remaining finding is about repeated words or patterns, not about meaning or accuracy.

**Major strengths**

- **Accuracy.** Every metric now has a source or a qualifier: "measured in local Lighthouse runs", "reported in pilot testing", "Team sprint completion". Projects credit the team where the team did the work.
- **Consistency.**
  - The role, the build skill, "Work" and "Design System" are each named the same way everywhere, including the page titles, meta tags and structured data.
  - Button and link labels follow one rule each: "See all work", "Start a project", "Get in touch", "Download CV".
- **Design thinking is visible.** GuRover and AACCUP now show options considered and rejected ("a fixed table with reordered columns came first…"; "The old admin sidebar showed… tabs in no clear order").
- **The form is clear.** Hints are visible under each field, required fields have a real asterisk, the field labels are plain, and every request state has a human message.
- **Accessibility text is complete:**
  - descriptive alt text on every case-study screen
  - an h1 accessible name that carries the role
  - review buttons named "Previous review" / "Next review"
  - labels that keep "I" capitalised

**Remaining weaknesses** (all medium or low)

1. **The word "every" is a tic.** It appears 11 times on COMELEC, 10 on AACCUP and 9 on Design System. Each use is fine alone, but together they read as a template.
2. **The role statements start the same way.** Five case studies say "I was the only designer on …", and AACCUP's outcome repeats its role statement almost word for word.
3. **One leftover user name.** The PSGS overview still says "Surgeons compare programs", while everywhere else on the page says residents.
4. **Small style slips in meta descriptions and numbers:** missing Oxford commas, "I will" where the site's voice says "I'll", and "2 to 3 days" next to "one to two days".

**Highest-impact opportunities:** trim "every" on COMELEC, AACCUP and Design System; vary the role openings; fix the PSGS overview. Together these take the case studies from "consistent" to "written".

---

## 02 — Content Inventory

| Area | Source | Inspected |
|---|---|---|
| Site title, meta, OG/Twitter, JSON-LD, no-JS fallback, manifest | `public/index.html`, `public/manifest.json`, `src/utils/pageTitle.js` | Yes |
| Navigation, phone menu | `components/pages/Navbar.jsx` | Yes |
| Home: Hero, Featured Work, About the Designer, Areas of Expertise, What Others Say, contact block | `Hero.jsx`, `Project.jsx`, `ProjectCard.jsx`, `About.jsx`, `Services.jsx`, `Testimonials.jsx`, `Contact.jsx` | Yes |
| About: intro, How I Work, Professional Experience, Skills & Tools, Certificates & Awards, Work With Me | `AboutPage.jsx`, `Process.jsx`, `WorkExperience.jsx`, `Skills.jsx`, `CertificatesAwards.jsx` | Yes |
| Work and Archive | `ProjectsPage.jsx`, `WorkGrid.jsx`, `ArchivePage.jsx`, `projects/shown.js`, `projects/archive.js` | Yes |
| Get in touch: form labels, hints, options, states | `ContactPage.jsx`, `ProjectRequest.jsx` | Yes |
| Case-study templates and labels | `projects/ProjectPage.jsx` | Yes |
| All project copy (10 shown, 13 archived, 2 old portfolios) | `projects/projects.js`, extracted field by field (733 strings) | Yes |
| Global controls: buttons, Back to top, scroll cue, kerning test | `common/Button.jsx`, `ToTop.jsx`, `ScrollCue.jsx`, `KerningGame.jsx` | Yes |
| Label formatting | `utils/sentenceCase.js` | Yes |
| Footer | `Footer.jsx` | Yes |

**Inactive, not scored:**

- StockNear (it redirects)
- the in-progress case-study template ("Coming in this case study")
- the "Preview coming soon" and "Image in progress" placeholders (every shown project has images)

**Not inspected:**

- the browser's own required-field messages (native HTML5 validation)
- text inside images
- the CV PDF
- the Behance pages
- screen-reader output (judged from code, not tested with a screen reader)

---

## 03 — Quality Scores

Scores are out of 10, with the Round 3 overall in brackets. Abbreviations: Clar = clarity, Str = copy strength, Conc = conciseness, Prof = professionalism, Ctx = contextual relevance, Cons = consistency, Act = actionability, Trust = trust and accuracy.

| Page / feature | Clar | Str | Conc | Prof | Ctx | Cons | Act | Trust | Overall |
|---|---|---|---|---|---|---|---|---|---|
| Home | 9 | 8 | 9 | 9 | 9 | 9 | 9 | 9 | **8.9** (8.3) |
| About | 9 | 8 | 8 | 9 | 9 | 9 | 9 | 9 | **8.8** (8.1) |
| Work and Archive | 9 | 8 | 9 | 9 | 9 | 9 | 9 | 9 | **8.9** (8.6) |
| Case studies | 9 | 9 | 7 | 9 | 9 | 8 | 8 | 9 | **8.5** (8.3) |
| Get in touch (form) | 9 | 9 | 9 | 9 | 9 | 9 | 9 | 9 | **9.0** (8.1) |
| Navigation and global UI | 9 | 8 | 9 | 9 | 9 | 9 | 9 | 9 | **8.9** (8.4) |
| Metadata and SEO | 9 | 8 | 8 | 9 | 9 | 9 | n/a | 9 | **8.7** (8.0) |
| Kerning test | 9 | 8 | 9 | 9 | 9 | 9 | 9 | 9 | **8.9** (8.6) |

**Why each scored as it did**

- **Case studies:** conciseness stays at 7 because of the "every" pattern and the role sentences that repeat between the role statement and the outcome. Consistency is 8 because of the PSGS overview.
- **Home:** the headline ("I pay attention to what others might overlook.") is a deliberate brand line, not a defect. Its accessible name carries the role, and the description below it is specific. Copy strength is 8, not 9, only because the line states a trait rather than an offer.
- **Metadata:** conciseness is lower because of the Get in touch and Archive descriptions (#10, #11).

---

## 04 — Detailed Copy Review

Only text that would clearly improve is listed. Everything not listed is fine as it is (§08).

| # | Location | Current copy | Issue | Recommended copy | Reasoning | Priority |
|---|---|---|---|---|---|---|
| 1 | `projects.js` `psgs.platform.overview` | "…Surgeons compare programs, check course requirements, and follow announcements…" | Everywhere else on the page says residents | "…Residents compare programs, check course requirements, and follow announcements…" | One user name throughout | Medium |
| 2 | `projects.js` `aaccup.platform.outcome` | "Delivered to AACCUP. As the only designer, I covered every screen, from the public website to all nine role workspaces." | Repeats the role statement almost word for word | "Delivered to AACCUP, from the public website to all nine role workspaces." | The outcome states the result; the role statement already says who did it | Medium |
| 3 | `projects.js` `aaccup.platform.contributions[3]` | "Designed every page for all nine roles, from dashboard to profile" | Third time the page says this (role, decision 03, contribution) | "Designed the pages for all nine roles, from dashboard to profile" | Less repetition, same fact | Low |
| 4 | `projects.js` `aaccup.platform.approach[1].rationale` | "Every record has room for its full details, and every page sits under the task it serves." | "Every" twice in one sentence | "Records have room for their full details, and each page sits under the task it serves." | Same meaning, less repetition | Low |
| 5 | `projects.js` `comelec.platform.approach[2]` summary / rationale | "Every frame, and the rules behind its look, in one document." / "The client and the development team work from one reference for every screen and the software's look." | Four "every" in one decision (summary, challenge, text, rationale) | Summary: "All the frames, and the rules behind their look, in one document." Rationale: "The client and the development team work from one reference for the screens and the software's look." | Keeps the "every frame" in the text, where it carries the point | Low |
| 6 | `projects.js` `pci.platform.metrics[3].label` | "Color modes, with light and dark values defined for every token" | One of nine "every" on the page | "Color modes, with light and dark values for each token" | Lighter | Low |
| 7 | `projects.js` `arise.platform.role` | "I was the only designer on ARISE and owned every screen, from the public landing page to the administrator module." | The challenge on the same page already says "I took it over as the only designer" | "I owned the design from the public landing page to the administrator module." | Says it once per page | Medium |
| 8 | `projects.js` `courseware.platform.role` | "I was the only designer on DOST Courseware and owned five lessons…" | The fifth role statement to open with the same words | "Working alone on design, I owned five lessons, from Grade 3 science to Senior High math…" | Varies the opening; the fact is unchanged | Low |
| 9 | `projects.js` `courseware.platform.approach[2].text` | "…in 2 to 3 days, cleared review in one or two rounds…" | Numerals and words mixed in one sentence; elsewhere prose spells them out ("one to two days ahead") | "…in two to three days, cleared review in one or two rounds…" | Matches the style guide (words in prose, numerals on metric cards) | Low |
| 10 | `ContactPage.jsx` `usePageTitle` description | "Start a project with Jay Beniza. Tell me about your website, web app or mobile app, and I will get back to you about design and build." | "I will" against the site's "I'll"; a missing Oxford comma; "design and build" is vague | "Start a project with Jay Beniza. Tell me about your website, web app, or mobile app, and I'll reply with next steps." | Matches the visible contact copy ("…I'll reply with next steps.") | Low |
| 11 | `ArchivePage.jsx` `usePageTitle` description | "…personal projects, redesigns and design explorations for web and mobile." | Missing Oxford comma (used everywhere else) | "…personal projects, redesigns, and design explorations for web and mobile." | Consistency | Low |

---

## 05 — High-Impact Revisions

**Stronger descriptions**

- PSGS overview: "Residents compare programs…" (#1)
- AACCUP outcome: "Delivered to AACCUP, from the public website to all nine role workspaces." (#2)

**Less repetition**

- Trim "every" in AACCUP (#3, #4), COMELEC (#5) and Design System (#6).
- Vary the role openings on ARISE (#7) and Courseware (#8).

**Clearer system and meta text**

- Get in touch meta: "…and I'll reply with next steps." (#10)

**Headings, calls to action, empty states, system messages:** nothing to change. Round 3 settled them, and they're consistent.

---

## 06 — Consistency Findings

**Terminology:** no conflicts remain. The role, the build skill, "Work", "Design System", "Start a project", "Get in touch" and "Email" are used the same way in every location checked, including metadata.

**Repeated content**

| Pattern | Where | Count |
|---|---|---|
| "every" | COMELEC 11 · AACCUP 10 · Design System 9 · ARISE 7 · Courseware 7 · Portfolio 6 · GuRover 5 | 58 across the case studies |
| "I was the only designer on …" | PSGS, AACCUP, ARISE, Courseware, Design System role statements | 5 |
| A role restated in the outcome | AACCUP | 1 |

**Tone and formatting**

- The voice is consistent: first person, calm, specific, with no exclamation marks and none of the "seamless / powerful / innovative" family (the only "easily" is BiteWise's research plan, where it's the right word).
- Capitalisation follows the `sentenceCase` rule, and "I" is now kept.
- Ranges use en dashes throughout. The one mix of numerals and words in prose is #9.
- Oxford commas are used everywhere except the Archive meta (#11).

---

## 07 — Prioritized Improvement Plan

| Priority | Items |
|---|---|
| Critical | None |
| High | None |
| Medium | #1 (PSGS residents), #2 (AACCUP outcome), #7 (ARISE role) |
| Low | #3, #4, #5, #6, #8, #9, #10, #11 |

All 11 fit in one short pass: a few lines in `projects.js` and two `usePageTitle` descriptions. None affect layout.

**Status: all 11 applied** (5 Nov 2026). After the fixes, "every" still appears 9 times on COMELEC, 8 on Design System and 6 on AACCUP, and three role statements (PSGS, AACCUP, Design System) still open with "I was the only designer on". The style guide's watch-list sets a stricter target (at most two "every" per case study); meeting it is an optional further pass.

---

## 08 — Final Assessment

**Readiness:** ready for job applications and client enquiries, as published. The remaining items are polish. A reader won't misunderstand anything, but fixing them makes the case studies read less templated.

**Remaining content risks**

- **Templated feel in the case studies.** Someone reading three in a row will notice "every" and "I was the only designer". This is the one remaining signal that could read as generated rather than written (#2–#8).
- **The headline doesn't state an offer.** This is a deliberate choice. If recruiters respond better to an explicit role headline, revisit it.

**Product-owner clarifications:** none needed. Every recommendation uses facts already on the site.

**Strong copy to keep unchanged**

- The Start a Project intro and all four request status messages
- The form's visible hints ("What it is, the problem it solves, and what success looks like.")
- COMELEC's attribution and its new decision 01 opening ("The client provided only image assets, so I started from them…")
- GuRover's rejected-alternative line in decision 03's rationale, and "Using AI stays the teacher's choice…"
- BiteWise's limitations section
- The Work page description, and the Archive hero ("Design explorations, outside client work.")
- The Process steps, and the kerning test's instructions and buttons

**Next step:** approve §07 (all or by priority), and I'll apply it in one pass.

**Follow-up pass** (6 Nov 2026): "every" trimmed to at most two per case study, counting idioms such as "from every angle" and screen titles. Role openings now vary across all case studies. The ARISE decision 01 title was changed, so it no longer mirrors PSGS ("Every level, explained up front").
