# Content Quality Audit — jaybeniza.vercel.app

**Scope:** all user-facing text in the local working tree of `D:\Designs\Web Development\jaybeniza`, as of 5 Nov 2026. That includes everything fixed in `docs/content-audit.md` (Phases 1–6), none of which is committed or deployed yet.

**Approach:** this is the third pass. The first two (`docs/content-audit.md`) covered positioning, claims and case-study narrative, and those are resolved. This pass looks at the product's text as a system: headings, interface labels and button text, forms, system messages, empty states, terminology, and voice.

**Audit only:** no application code or copy was changed.

---

## 01 — Executive Summary

**Overall content quality: 8.2 / 10**

The site's long-form copy (case studies, About, Work Experience) is now specific, factual and consistent. The weaker layer is the system around it: what one capability is called, labels that say the same thing three ways, and a few pieces of interface text that hide or blur information.

**Major strengths**

- **Case studies.** Each has a concrete problem, decisions with a challenge and a rationale, and honest attribution. COMELEC's "The 3D designer and game developers built the finished screens shown here" is a model to keep.
- **Form messages.** Every request state is covered, in a calm human voice:
  - sending: "Sending your request…"
  - sent: "Thank you, your request is in. I'll reply by email."
  - failed: "…Please email me at … instead."
  - email-app fallback: "Your email app should have opened…"

  The failed message gives a way to recover.
- **Form intro:** "Tell me what you're building. These details let me come back with a plan and the right questions, not just a hello." It's specific, in your voice, and explains why the form asks so much.
- **No hype.** There's no "seamless", "innovative" or "passionate" anywhere in the shown pages, and no exclamation marks.
- **Kerning test instructions:** "Drag the letters until the spacing looks even". It's clear and tells the player what to do.

**Major weaknesses**

1. **One capability has five names.** "AI-Assisted Development" (site title), "Design to Code" (service), "Front-End (AI-assisted)" (skills), "front-ends built with Claude Code" (meta description), and "I build working versions of my designs with Claude Code" (hero). A reader can't tell whether these are one skill or five.
2. **Your role is named three ways.** "UI/UX and product designer" (hero, meta), "UI/UX & Product Designer" (site title), and "a UI/UX designer" (About intro). The About page drops "product".
3. **"Work" and "projects" are used for the same thing.** Navigation says "Work", but the contact block on the Get in touch page is headed "View My Projects" with a link to "All work".
4. **Important form information is hidden.** "Most projects take 1–2 weeks" and the guidance on each field only show in a tooltip (`.form-tip`). Someone filling in the form can easily miss them.
5. **A self-contradicting service item.** "Low to high-fidelity UI wireframes": wireframes are low fidelity by definition.

**Highest-impact opportunities**

- Choose one name for the build capability, and one for your role (§06, and the Style Guide terminology table).
- Use "Work" consistently for your portfolio pieces.
- Show the timeline hint as visible helper text. This is a small layout change and needs your approval.

---

## 02 — Content Inventory

| Area | Source | Inspected |
|---|---|---|
| Site title, meta, OG/Twitter, JSON-LD, no-JS fallback | `public/index.html`, `public/manifest.json`, `src/utils/pageTitle.js` | Yes |
| Navigation, phone menu, Download CV, Get in touch | `components/pages/Navbar.jsx` | Yes |
| Home: Hero | `components/pages/Hero.jsx` | Yes |
| Home: Featured Work | `components/pages/Project.jsx`, `ProjectCard.jsx` | Yes |
| Home: About the Designer | `components/pages/About.jsx` | Yes |
| Home: Areas of Expertise | `components/pages/Services.jsx` | Yes |
| What Others Say (Home, About) | `components/pages/Testimonials.jsx` | Yes |
| Contact block (Home, Get in touch, after each case study) | `components/pages/Contact.jsx` | Yes |
| About: intro, How I Work, Professional Experience, Skills & Tools, Certificates & Awards, Work With Me | `AboutPage.jsx`, `Process.jsx`, `WorkExperience.jsx`, `Skills.jsx`, `CertificatesAwards.jsx` | Yes |
| Work page and cards | `ProjectsPage.jsx`, `WorkGrid.jsx`, `projects/shown.js` | Yes |
| Archive | `ArchivePage.jsx`, `projects/archive.js` | Yes |
| Start a Project form: labels, hints, options, states | `ProjectRequest.jsx` | Yes |
| Case-study templates: section headings, labels, empty panels | `projects/ProjectPage.jsx` | Yes |
| All project copy (10 shown, 13 archived, 2 old portfolios) | `projects/projects.js` | Yes |
| Back to top, scroll cue, button component | `common/ToTop.jsx`, `common/ScrollCue.jsx`, `common/Button.jsx` | Yes |
| Kerning test (easter egg) | `common/KerningGame.jsx` | Yes |
| Label formatting | `utils/sentenceCase.js` | Yes |
| Footer | `components/pages/Footer.jsx` | Yes |

**Inactive content, not scored:**

- StockNear (`projects.js` `stocknear`, which redirects to `/work`)
- the in-progress template's "Coming in this case study" list (`ProjectPage.jsx` `COMING`, used only by in-progress studies, none of which are shown)
- the "Preview coming soon" and "Image in progress" placeholders (every shown project has its images)
- the old `DailyDiscount`, `Jaysonbeniza`, `Jbnza` and `Regain` route components, whose content comes from `projects.js`

**Limitations:**

- The browser's own required-field messages (native HTML5 validation) can't be read from the source.
- Text inside images, the CV PDF and the Behance pages weren't inspected.
- Tooltip behaviour and screen-reader output were judged from code, not tested in a browser.

---

## 03 — Quality Scores

Scores are out of 10. Abbreviations: Clar = clarity, Str = copy strength, Conc = conciseness, Prof = professionalism, Ctx = contextual relevance, Cons = consistency, Act = actionability, Trust = trust and accuracy.

| Page / feature | Clar | Str | Conc | Prof | Ctx | Cons | Act | Trust | Overall |
|---|---|---|---|---|---|---|---|---|---|
| Home | 9 | 7 | 8 | 9 | 9 | 7 | 8 | 9 | **8.3** |
| About | 8 | 8 | 7 | 9 | 9 | 7 | 8 | 9 | **8.1** |
| Work and Archive | 9 | 8 | 9 | 9 | 9 | 8 | 8 | 9 | **8.6** |
| Case studies | 8 | 9 | 7 | 9 | 9 | 8 | 7 | 9 | **8.3** |
| Get in touch (form) | 8 | 8 | 8 | 9 | 9 | 7 | 7 | 9 | **8.1** |
| Navigation and global UI | 9 | 7 | 9 | 9 | 9 | 7 | 8 | 9 | **8.4** |
| Metadata and SEO | 8 | 7 | 8 | 9 | 9 | 6 | n/a | 9 | **8.0** |
| Kerning test | 9 | 8 | 9 | 8 | 9 | 8 | 9 | 9 | **8.6** |

**Why each scored as it did**

- **Home:** strength is held back by the headline, which states a trait rather than what you do; the h1's accessible name fixes this for search. Consistency is lower because of the naming issues.
- **About:** the intro calls you "a UI/UX designer" while the hero says "UI/UX and product designer". Conciseness is lower because the intro paragraph runs four clauses.
- **Case studies:** actionability is lower because the case studies end without a "next" path that names a choice. The contact block's "Next project" is generic, but the heading shows the project name, so it's acceptable. Conciseness is lower on GuRover and AACCUP, whose decision texts run 3–4 sentences.
- **Get in touch:** actionability is lower because key guidance only shows in tooltips, and required fields are marked "*" with no legend.
- **Metadata:** consistency is lower because of the five names for the build capability (§06).

---

## 04 — Detailed Copy Review

Only text that genuinely needs a change is listed. Strong copy that should stay unchanged is in §08.

| # | Location | Current copy | Issue | Recommended copy | Reasoning | Priority |
|---|---|---|---|---|---|---|
| 1 | `Services.jsx` → UI/UX Design includes | "Low to high-fidelity UI wireframes" | Wireframes are low fidelity by definition, so the item contradicts itself | "Wireframes and high-fidelity UI" | Accurate, and the same length | High |
| 2 | `AboutPage.jsx` `INTRO[0]` | "I'm Jay Beniza, a UI/UX designer based in the Philippines…" | Leaves out "product", so the About page names a different role from the hero, meta and title | "I'm Jay Beniza, a UI/UX and product designer based in the Philippines…" | One role, everywhere | High |
| 3 | `index.html` / `pageTitle.js` `SITE_TITLE` | "Jay Beniza \| UI/UX & Product Designer \| AI-Assisted Development" | "AI-Assisted Development" is a third name for the build capability, and reads like a separate discipline | "Jay Beniza \| UI/UX & Product Designer" | A shorter title; the meta description already covers the build | Medium |
| 4 | `Skills.jsx` group title | "Front-End (AI-assisted)" | Works on its own, but differs from "Design to Code" in Services | Keep, and use "AI-assisted front-end" as the standard term in the meta (#5) | Matches the Style Guide term | Low |
| 5 | `index.html` meta, `pageTitle.js` `SITE_DESCRIPTION` | "…Figma design systems, and front-ends built with Claude Code." | Fine, but uses a fourth phrasing | "…Figma design systems, and AI-assisted front-ends built with Claude Code." | Ties to the Skills term | Low |
| 6 | `Contact.jsx` `PROJECTS_HEADING` (Get in touch page) | "View My Projects" | Navigation and the links say "Work"; this heading says "Projects" | "See the Work" | One term for portfolio pieces | Medium |
| 7 | `Contact.jsx` `PROJECTS_LINKS[0]`, `Contact.jsx` case-study `All work`, `Project.jsx` "See all work", `Hero.jsx` "See work" | "All work" / "See all work" / "See work" | Three labels for one destination | "See all work" everywhere except the hero, which can stay "See work" because it's the first call to action | Predictable link labels | Low |
| 8 | `ProjectRequest.jsx` hint on Project type | `hint='Most projects take 1–2 weeks'` (tooltip only) | Timing affects the decision to enquire, but it's hidden behind a hover icon | Show it as visible helper text under the field. **This changes the layout and needs your approval.** | Information people need shouldn't hide in a tooltip | Medium |
| 9 | `ProjectRequest.jsx` field labels | "Your name *", "Email *", "Project type *", "About the project *" | "*" isn't explained anywhere | Add a line under the intro: "Fields marked * are required." | Accessibility (WCAG 3.3.2) | Medium |
| 10 | `ProjectRequest.jsx` fieldset legend | "What you need from me" | Fine, but it's the only label that doesn't say you can pick more than one | "What you need from me (choose any)" | Matches the BiteWise "Choose any" pattern | Low |
| 11 | `ProjectRequest.jsx` `SERVICES` | "UX research", "UI design", "Interactive prototype", "Design system", "Front-end development" | "Front-end development" is the fifth name for the build capability | "Front-end build (AI-assisted)" | Consistent with Skills and Services | Low |
| 12 | `Services.jsx` → Design to Code includes | "Claude Code workflows" | Vague: it doesn't say what the client gets | "AI-assisted builds with Claude Code" | Names the output | Low |
| 13 | `Hero.jsx` `HIGHLIGHT_TEXT` | "…I build working versions of my designs with Claude Code." | Implies a general practice, but the Services card says 2 apps. "Working versions" is vague. | "…I also build my designs as working front-ends with Claude Code." | More accurate, and names what gets built | Medium |
| 14 | `ProjectsPage.jsx` hero lines | "Design work, / from brief to build." | "Build" again suggests you built every project; most were built by development teams | "Design work, / from brief to launch." | Keeps the rhythm and avoids the overclaim | Medium |
| 15 | `Testimonials.jsx` buttons | "Previous" / "Next" | Clear in context. For a screen reader moving between buttons, the label alone doesn't say what changes. | Keep the visible labels. Add an `aria-label` of "Previous review" / "Next review". | Accessible names in context | Low |
| 16 | `KerningGame.jsx` result line | "`${last}` out of 100 - the faint letters show where they belong" | A hyphen used where a dash belongs | "`${last}` out of 100. The faint letters show where they belong." | Punctuation | Low |
| 17 | `projects.js` `tingi.description` (also its search snippet) | "Smarter grocery shopping, shaped by how you eat. BiteWise is a mobile grocery shopping concept designed for busy individuals…" | Opens on a marketing tagline, and "grocery shopping" appears twice. Carried over from round 1. | "A mobile grocery shopping concept for busy people with dietary needs, food preferences, and nutrition goals." | It leads with what it is | Medium |
| 18 | `projects.js` `gurover.platform.approach[2].text` | "Guided by tester feedback, I shortened three core flows. New classes come with default subjects… For the gradebook, I first kept the fixed table… Attendance gained a button…" | Five sentences in one decision. The P6 addition made it the longest decision text on the site. | Split it: keep the flows in `text`, and move the gradebook sentence to the rationale: "A fixed table with reordered columns came first; development showed a configurable one fitted better." | Easier to scan, and the rejected alternative becomes the rationale | Low |
| 19 | `ProjectPage.jsx` decision note labels | "The challenge" / "Solution" / "Design rationale" | "Solution" is a different kind of word from the other two | "The challenge" / "What I did" / "Why it works" | Parallel labels, in your first-person voice | Low |
| 20 | `ProjectPage.jsx` section title | "Platform Screens" (client projects) vs "Project Screens" (builds) | Two names for the same section | "Screens" on both | Simpler and consistent | Low |
| 21 | `AboutPage.jsx` heading vs `Services.jsx` button | "Work With Me" (heading) vs "Start a project" (button) | Fine: one is a section, the other an action. Noted so it isn't "fixed" into a duplicate. | Keep | | — |
| 22 | `Footer.jsx` | "© 2026 Jay Beniza" | Fine | Keep | | — |

---

## 05 — High-Impact Revisions

**Stronger headings**

- Get in touch contact block: "View My Projects" becomes **"See the Work"** (#6)
- Work page: "Design work, from brief to build." becomes **"Design work, from brief to launch."** (#14)
- Case-study screens: "Platform Screens" / "Project Screens" become **"Screens"** (#20)

**Better descriptions**

- Hero: "…I also build my designs as working front-ends with Claude Code." (#13)
- About intro: "a UI/UX and product designer" (#2)
- BiteWise: "A mobile grocery shopping concept for busy people with dietary needs, food preferences, and nutrition goals." (#17)

**Improved labels and calls to action**

- Service item: "Wireframes and high-fidelity UI" (#1)
- Form: "What you need from me (choose any)" (#10); "Front-end build (AI-assisted)" (#11)
- Links: "See all work" everywhere except the hero (#7)

**Clearer system messages and form guidance**

- Add "Fields marked * are required." under the form intro (#9)
- Show "Most projects take 1–2 weeks" as visible helper text, which needs your approval (#8)

**Empty states:** none are active. All shown projects have images and covers. If one is ever shown, "Preview coming soon" and "Case study in progress" are acceptable as they are.

---

## 06 — Consistency Findings

**Conflicting terminology**

| Concept | Variants found | Where |
|---|---|---|
| Your role | "UI/UX and product designer" · "UI/UX & Product Designer" · "a UI/UX designer" | Hero/meta · title · About intro |
| The build capability | "AI-Assisted Development" · "Design to Code" · "Front-End (AI-assisted)" · "front-ends built with Claude Code" · "Front-end development" · "working versions of my designs" | Title · Services · Skills · meta · form · hero |
| Portfolio pieces | "Work" · "Projects" · "case study" | Nav/Work page · contact heading · cards ("View case study") |
| The screens section | "Platform Screens" · "Project Screens" | `ProjectPage.jsx` |
| Link to the Work page | "See work" · "See all work" · "All work" | Hero · Featured Work · contact block |

**Repeated content:** none significant after Phase 2. "1–2 days" now appears once per page.

**Tone and formatting**

- The voice is consistent: first person, calm and factual.
- Capitalisation follows a clear rule (Title Case in source, sentence case as rendered for labels and buttons). The one oddity is "Work With Me" as a heading next to "Work with me"-style button text, which is acceptable under that rule.
- Ranges now use en dashes, except in the kerning test result line (#16).

---

## 07 — Prioritized Improvement Plan

| Priority | Items |
|---|---|
| **Critical** | None. Nothing misleading or broken remains in the copy. |
| **High** | #1 (wireframes contradiction), #2 (role name on About) |
| **Medium** | #3 (site title), #6 (Projects vs Work), #8 (visible timeline hint, needs layout approval), #9 (required-field legend), #13 (hero build line), #14 (Work hero "build"), #17 (BiteWise description) |
| **Low** | #4, #5, #7, #10, #11, #12, #15, #16, #18, #19, #20 |

**Suggested order:**

1. Settle the two naming decisions in the Style Guide: role and build capability.
2. Apply #1–#3, #5, #11 and #13 together, since they all touch naming.
3. Apply the Work/Projects fixes (#6, #7, #14, #20).
4. Apply the form fixes (#9, #10). Decide on #8.
5. Finish the low-priority polish.

---

## 08 — Final Assessment

**Readiness:** the site's copy is ready for job applications and client enquiries. Nothing remaining is misleading. What's left is consistency and polish, which affects how deliberate the site feels more than what it says.

**Remaining content risks**

- **Naming drift:** a hiring manager might count "AI-Assisted Development" in the title as a claimed discipline.
- **The tooltip-only hint** may lead to enquiries that expect a different timeline.

**Needs your decision (product-owner clarification)**

- #8: whether the form may show helper text visibly. This is a small layout change.
- Style Guide: the preferred name for the build capability. I recommend "AI-assisted front-end".
- #3: whether to drop "AI-Assisted Development" from the site title.

**Strong copy to keep unchanged**

- The Start a Project intro, and every form status message
- COMELEC's role and attribution lines
- BiteWise's limitations section ("The sample is small and no respondent reported an allergy, so the survey results are directional…")
- The Archive hero: "Design explorations, outside client work."
- The Work page description: "Shipped products and UX case studies: the problem, the decisions, and what came of them."
- The Process steps (Understand, Explore, Design, Refine)
- The kerning test's instructions and buttons ("Compare", "Next word", "Play again")

**Next step:** approve the naming choices in `CONTENT_STYLE_GUIDE.md`, then the priority levels to apply.

---

## 09 — Decisions (5 Nov 2026)

| Decision | Choice |
|---|---|
| Name for the build capability | **AI-assisted front-end** |
| Site title | **Jay Beniza \| UI/UX & Product Designer** (drop "AI-Assisted Development" everywhere) |
| Form helper text | **Show it visibly** under each field, instead of only in a tooltip |

---

## 10 — Implementation Plan

**Task status:** Done · Open

### Phase Status

| Phase | Focus | Status | Tasks |
|---|---|---|---|
| A | Naming: role and build capability | Complete | 8 |
| B | "Work" terminology | Complete | 4 |
| C | Form guidance | Complete | 3 |
| D | Copy fixes | Complete | 3 |
| E | Accessibility and polish | Complete | 3 |
| F | Verify and ship | Complete | 3 |

### Phase A — Naming: role and build capability

| ID | Finding | Location | Change | Status |
|---|---|---|---|---|
| A-1 | #3 | `index.html` `<title>`, `og:title`, `twitter:title`; `pageTitle.js` `SITE_TITLE` | "Jay Beniza \| UI/UX & Product Designer" | Done |
| A-2 | #3 | `index.html` fallback `<h2>` | "UI/UX & Product Designer" | Done |
| A-3 | #2 | `index.html` JSON-LD `jobTitle` | "UI/UX & Product Designer" | Done |
| A-4 | #2 | `AboutPage.jsx` `INTRO[0]` | "…a UI/UX and product designer based in the Philippines…" | Done |
| A-5 | #5 | `index.html` meta, OG, Twitter descriptions; `pageTitle.js` `SITE_DESCRIPTION`; JSON-LD `description` | "…and AI-assisted front-ends built with Claude Code" (replaces "AI-assisted development" and "front-ends built with Claude Code")  Also applied to the Portfolio case study (description, challenge) | Done |
| A-6 | #13 | `Hero.jsx` `HIGHLIGHT_TEXT`, `index.html` fallback `<p>` | "…I also build my designs as AI-assisted front-ends with Claude Code." | Done |
| A-7 | #4 | `Skills.jsx` group title | "AI-Assisted Front-End", which renders as "AI-assisted front-end" | Done |
| A-8 | #11, #12 | `ProjectRequest.jsx` `SERVICES`; `Services.jsx` Design to Code includes | "Front-end development" becomes "AI-assisted front-end"; "Claude Code workflows" becomes "AI-assisted builds with Claude Code" | Done |

### Phase B — "Work" terminology

| ID | Finding | Location | Change | Status |
|---|---|---|---|---|
| B-1 | #6 | `Contact.jsx` `PROJECTS_HEADING` | "View My Projects" becomes "See the Work" | Done |
| B-2 | #7 | `Contact.jsx` "All work" links (both lists) | "See all work" | Done |
| B-3 | #14 | `ProjectsPage.jsx` hero lines | "Design work, / from brief to launch." | Done |
| B-4 | #20 | `ProjectPage.jsx` "Platform Screens" / "Project Screens" | "Screens" | Done |

### Phase C — Form guidance

| ID | Finding | Location | Change | Status |
|---|---|---|---|---|
| C-1 | #8 | `ProjectRequest.jsx` `Field` | Show each `hint` as visible helper text under its field (keep the tooltip icon off). A small layout change, approved. Hints set a step smaller than the labels. | Done |
| C-2 | #9 | `ProjectRequest.jsx` intro | Legend removed at your request; required fields keep a true asterisk (set in Arial, since the text font drew it as a dot) | Done |
| C-3 | #10 | `ProjectRequest.jsx` legend | "What you need from me (choose any)" | Done |

### Phase D — Copy fixes

| ID | Finding | Location | Change | Status |
|---|---|---|---|---|
| D-1 | #1 | `Services.jsx` UI/UX Design includes | "Wireframes and high-fidelity UI" | Done |
| D-2 | #17 | `projects.js` `tingi.description` | "A mobile grocery shopping concept for busy people with dietary needs, food preferences, and nutrition goals." | Done |
| D-3 | #18 | `projects.js` `gurover.platform.approach[2]` | Move the gradebook sentence from the text to the rationale | Done |

### Phase E — Accessibility and polish

| ID | Finding | Location | Change | Status |
|---|---|---|---|---|
| E-1 | #15 | `Testimonials.jsx` Previous / Next | Accessible names "Previous review" / "Next review" (visible labels unchanged) | Done |
| E-2 | #16 | `KerningGame.jsx` result line | "… out of 100. The faint letters show where they belong." | Done |
| E-3 | #19 | `ProjectPage.jsx` decision note labels | "The challenge" / "What I did" / "Why it works" | Done |

### Phase F — Verify and ship

| ID | Step | Status |
|---|---|---|
| F-1 | Lint and production build | Done |
| F-2 | Check every changed page on localhost (text, layout of the form helper text, desktop and phone) | Done |
| F-3 | Commit and push to master, after your approval | Done |
