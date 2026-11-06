# Content Style Guide — jaybeniza.vercel.app

This guide is based on the site's existing copy. It describes how the site already writes at its best, so new text matches.

**Who reads the site:**

- hiring managers and recruiters for UI/UX and product design roles (primary)
- small businesses and agencies looking for a designer who can also build (secondary)

---

## 1. Voice

The site speaks as Jay, in the first person, to one reader. The voice is calm, specific, and modest about claims.

### Five voice principles

**1. Specific over impressive, but a story, not an inventory**
- **What it means:** each section makes one clear claim in plain language (what was wrong, what I decided, why it helps), backed by one or two real details.
- **When:** case studies, Work Experience, service descriptions.
- **Avoid:** adjectives that judge your own work ("carefully composed", "powerful", "seamless"). Also avoid lists of fields, roles, or features inside sentences: those belong in the screenshots, the metrics, or the "Delivered" list.
- **Example:** "Attendance feeds the SF2 and SF9 report card templates, so nothing is typed twice."
- **Weak (inventory):** "Instructors set up a course in one form: certificate, module type, eligible years, cost, facilitator, availability, and prerequisites…"
- **Strong:** "Instructors set up a full course in a single form, so the details residents rely on and the details administrators manage live in one place."

**2. Honest about who did what**
- **What it means:** separate your work from the team's, and say what isn't measured.
- **When:** roles, outcomes, metrics.
- **Avoid:** taking credit for team results, or stating intent as a result.
- **Example:** "The 3D designer and game developers built the finished screens shown here from it."

**3. Quiet confidence**
- **What it means:** state facts plainly and let the evidence carry the weight.
- **When:** headlines and outcomes.
- **Avoid:** exclamation marks, superlatives, "best-in-class".
- **Example:** "Delivered to COMELEC. Three days after the first project meeting, the wireframes and prototype were in the project managers' hands…"

**4. Plain words, short sentences**
- **What it means:** one idea per sentence, everyday words, and technical terms only when the reader needs them.
- **When:** everywhere, and especially in interface text and system messages.
- **Avoid:** stacked clauses, and jargon in user-facing labels.
- **Example:** "Drag the letters until the spacing looks even"

**5. Helpful at every step**
- **What it means:** every message tells the reader what happened and what to do next.
- **When:** forms, errors, empty states, calls to action.
- **Avoid:** dead ends, and vague labels like "Submit" or "Click here".
- **Example:** "Your request couldn't be sent. Please email me at jaysonbeniza@gmail.com instead."

### Tone by context

| Context | Tone |
|---|---|
| Hero and headlines | Short and assured. One idea. |
| Case studies | Explanatory and factual: problem, decision, reason |
| Buttons and links | Direct verbs, no personality |
| Form guidance | Friendly and brief |
| Errors | Direct and reassuring, always with a way to recover |
| Easter egg (kerning test) | Light and playful, still clear |

---

## 2. Approved Terminology

| Concept | Use | Don't use | Why |
|---|---|---|---|
| Your role | **UI/UX and product designer** (in text) · **UI/UX & Product Designer** (titles, labels) | "UI/UX designer" alone; "product designer" alone | One identity, matching the target role |
| The build capability | **AI-assisted front-end** · "built with Claude Code" when naming the tool | "AI-Assisted Development", "front-end development" (unqualified), "working versions" | Design stays the core; the build is honestly qualified |
| The service | **Design to Code** | "Built with Claude Code" (a tool, not a service) | Names the capability |
| Portfolio pieces | **Work** (the collection) · **project** (one item) · **case study** (a written-up project) | "Projects" as a section name | Matches the navigation |
| Contact action (form) | **Start a project** | "Work with me" (as a button), "Submit" | Says what happens |
| Contact action (general) | **Get in touch** | "Send Me a Message", "Contact" | One label site-wide |
| Email link | **Email** | "Email me" | Matches the contact block |
| CV | **CV** · "Download CV" | "Resume", "Résumé" | Philippine and international usage |
| Clients | **government, education, and research clients** | "business clients" | Accurate to the work |
| Site title | **Jay Beniza | UI/UX & Product Designer** | "… | AI-Assisted Development" | The build is a skill, not a second discipline |
| The design system project | **Design System** (title) · "the Central App design system" (in text) | "UI Kit", "the kit" | One name |
| The 3D project | **COMELEC Gamified 3D for ACM** (title) · **COMELEC** (short) · **3D training game** (type) | "Software Platform" | Says what it is |
| Speed claims | "1–2 days per design" (once per page, on the metric card) | Repeating it in the outcome and contributions | Stays credible |

---

## 3. Headings and Descriptions

- **Section labels** (`Tag`) are written in Title Case in the source, and render in sentence case with brackets: `[ How I work ]`. `sentenceCase` keeps acronyms, product names and the word "I" capitalised.
- **Page headlines** are one sentence, split into two or three lines at natural pauses: "Design work, / from brief to launch."
- **Descriptions** add something the heading doesn't say. Never restate the heading.
- **Case-study section titles:** "Results & Impact", "The Challenge", "My Role & Contributions", "Decision 01–03", "Screens".
- **Decision titles** state the decision as a short phrase ("Enter once, reuse everywhere"). The summary under it is one sentence on the effect.

---

## 4. Buttons and Calls to Action

- Start with a verb, in sentence case: "See all work", "Start a project", "Download CV", "Next word".
- The label says where it goes or what happens. Never use "Submit", "Click here" or "Learn more".
- One label per destination: "See all work" (the Work page), "Start a project" (the form), "Get in touch" (navigation).
- Icon-only buttons need an `aria-label` that names the action: "Back to top".
- Paired controls need labels that say what changes: "Previous review" / "Next review" as accessible names.

---

## 5. Form Microcopy

- **Labels** are short nouns or a short question: "Your name", "Email", "When do you want to start?"
- **Required fields** are marked "*", explained once: "Fields marked * are required."
- **Helper text** is visible under its field (not only in a tooltip) and explains what makes a good answer, in one sentence: "What it is, the problem it solves, and what success looks like." Information that changes the user's decision (timing, cost) should be visible, not in a tooltip.
- **Multi-select groups** say so: "(choose any)".
- **Options** are parallel and specific: "Within 1–3 months", "Within 3–6 months", "Flexible".
- **No placeholders as labels.** Use placeholders only for format examples.

---

## 6. Message Templates

**Success:** confirm what happened, then what happens next.
> "Thank you, your request is in. I'll reply by email."

**In progress:** say what's happening, with a present participle and an ellipsis.
> "Sending your request…"

**Error:** what happened, plus the recovery action. Don't blame the user or show technical detail.
> "Your request couldn't be sent. Please email me at [email] instead."

**Fallback:** what the site did, and what the user should do now.
> "Your email app should have opened with the request written out. Send it from there, and I'll reply by email."

---

## 7. Empty States

| Situation | Template |
|---|---|
| Project without images yet | "[Project name]" / "Preview coming soon" |
| Case study not yet written | "Ongoing project" / "Case study in progress", then a list of what's coming |
| Image placeholder inside a case study | "Image in progress" / "[What will be shown]" |

The rule: name what's missing and say that it's coming. Never show "No data" alone.

---

## 8. Formatting

- **Ranges:** an en dash with no spaces: "1–2 days", "Within 1–3 months". For date ranges, an en dash with spaces: "May 2024 – October 2026".
- **Numbers:** use numerals on metric cards and for counts ("24 web and mobile products", "500+ screens", "9 roles"). Spell out small numbers and durations in running prose ("two to three days", "one or two rounds of revision"), and never mix the two styles in one sentence.
- **Arrows** only in metrics showing change: "5 → 2".
- **Years and kinds:** "2025 / Award", "2023 / Web Platform".
- **Currency:** peso sign with no space ("₱25,000").
- **Curly apostrophes and quotes** in copy (’ “ ”).
- **No exclamation marks.**

---

## 9. Accessibility Writing

- Every image has alt text that says what the screen shows: "BiteWise search results with dietary tags, stock, and prices", not "screen 1".
- Decorative images use `alt=''` only when nearby text already says the same thing.
- Split-letter text (`SplitText`) always comes with an `sr-only` full copy, so screen readers read words, not letters.
- Accessible names include the visible text (WCAG 2.5.3). The hero h1's name adds the role in front of the visible headline.
- Instructions never rely on position or colour alone. Write "the faint letters show where they belong", not "the grey ones".
- Link text makes sense on its own: "See all work", "Full case study on Behance".

---

## 10. Repetition Watch-List

These are words and patterns this site leans on. Each is fine once; across a page they read as a template.

| Pattern | Rule |
|---|---|
| "every" | At most twice per case study. Prefer "each", "the", or the actual number ("all nine roles"). |
| "I was the only designer on …" | Say it once per case study, in the role statement or the challenge, not both. Vary the opening across projects ("Working alone on design…", "As its sole designer…"). |
| The role restated in the outcome | The outcome states the result. The role statement says who did it. |
| "1–2 days" | Once per page, on the metric card. |
| Quotes | Not on project pages. Testimonials live only in What Others Say. |

## 11. Weak vs Strong (from this site)

| Weak (earlier or current) | Strong |
|---|---|
| "Fewer steps than the competition" | "Shorter flows to stand out" |
| "…with carefully composed pages, scroll-driven motion, and a fast, optimized build." | "…with scroll-driven motion and an optimized build." |
| "Nine learning platforms had to feel like one." | "ARISE's learning platforms had to feel like one." |
| "…rebuilt it into one seamless flow…" | "…rebuilt it into one connected flow…" |
| "…keep them coming back" | "…designed to bring them back" |
| "Send Me a Message" | "Get in Touch" |
| "Low to high-fidelity UI wireframes" | "Wireframes and high-fidelity UI" |
| "BiteWise decision 01, screen 1" | "BiteWise eating style and dietary restrictions" |
| "Timeline" (next to a hint about duration) | "When do you want to start?" |
| "I prefer careful decisions to loud ones…" | (removed: it gave the reader nothing to evaluate) |
| "Delivered to AACCUP. As the only designer, I covered every screen, from the public website to all nine role workspaces." | "Delivered to AACCUP, from the public website to all nine role workspaces." |
| "Every record has room for its full details, and every page sits under the task it serves." | "Records have room for their full details, and each page sits under the task it serves." |
| "Fields marked * are required." (extra line) | A true asterisk after each required label, and nothing more |
