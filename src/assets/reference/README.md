# Content Reference — Updated From `Jayson_Beniza.pdf` (CV)

Draft copy pulled from the current resume, meant to replace the site's outdated content
(which still reads like a student/self-taught junior dev, last touched around 2022).
Nothing in this folder is wired into the React app yet — these are content drafts for
review before I touch the animated JSX components.

## Why a content pass is needed

The live site currently describes Jayson as an "aspiring web designer/developer,"
"self-taught," with a hobby-heavy bio, generic skill lists, and no work history,
certificates, or awards. The resume shows a different profile: a **Mid UI/UX Designer**
with 3+ years at PCI Innovations Tech Center, a BS in IT (Cum Laude), design-system
ownership, front-end delivery with Claude Code, and several 2025–2026 certificates.

## Files in this folder

| File | Maps to | What it covers |
|---|---|---|
| [01-hero.md](01-hero.md) | `src/components/pages/Hero.jsx` | Title tagline + role headline |
| [02-about-bio.md](02-about-bio.md) | `src/components/pages/about/AboutParagraph.jsx`, `About.jsx` | Greeting + bio paragraph |
| [03-skills.md](03-skills.md) | `WhatIUse.jsx`, `WebDev.jsx`, `FrameworkLibrary.jsx`, `ToolTechnology.jsx` | Skill categories, rewritten to match resume (adds a UI/UX Design category that doesn't currently exist) |
| [04-work-experience.md](04-work-experience.md) | *new section — no current component* | Mid & Junior UI/UX Designer roles at PCI Innovations |
| [05-certificates-awards.md](05-certificates-awards.md) | *new section — no current component* | Certificates + awards list |
| [06-footer-contact.md](06-footer-contact.md) | `Footer.jsx`, `Contact.jsx` | Fixes the stale "© 2022 / Last Update November 2022," contact copy pass |

## Known gaps vs. the resume

- The site has **no Work Experience or Certificates/Awards sections at all** — these need
  new components, not just copy swaps (see `04` and `05`).
- Current skills are framed as generic web-dev stack only; the resume leads with UI/UX
  design (design systems, wireframing, prototyping, handoff), which the site doesn't
  represent (see `03`).
- Project case studies (`DailyDiscount.jsx`, `Jbnza.jsx`, `Jaysonbeniza.jsx`, `Regain.jsx`)
  are untouched — the resume doesn't list new projects, so no content change proposed
  there. Flag me if you want those refreshed too (e.g. dates, roles).

## Next step

Once you've reviewed/edited these, say the word and I'll wire the approved copy into the
actual JSX — note the current components split every sentence into one `<p>` per word for
GSAP scroll animations, so text changes there mean adding/removing those per-word blocks,
plus building two new sections (Work Experience, Certificates & Awards) from scratch.
