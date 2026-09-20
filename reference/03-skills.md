# Skills

**Maps to:** `WhatIUse.jsx`, `WebDev.jsx`, `FrameworkLibrary.jsx`, `ToolTechnology.jsx`
(all under `src/components/pages/about/`)

## Current structure (for reference)

- **What I Use?** — generic intro blurb ("I've been utilizing in producing ui design,
  wireframing, prototyping, visual design, and develop website...")
- **Web Development** — HTML, CSS3, SASS, JavaScript, React JS
- **Framework & Library** — BootStrap, Tailwind CSS, GSAP
- **Tools & Technologies** — VS Code, NPM, Figma, Adobe Photoshop, Adobe Illustrator

Problem: this is a front-end-only stack list. The resume leads with UI/UX design
(design systems, wireframing, prototyping, handoff, usability testing) as the primary
skill category — there's currently no component that represents it at all.

## Proposed structure (4 categories, matching the resume's 3 + splitting Web Dev/Frameworks as today)

### 1. UI/UX Design *(new category — needs a new component, e.g. `UiUxDesign.jsx`)*

> User interface & experience design, wireframing, prototyping, user flows, design
> systems, usability testing, responsive design, high-fidelity UI, design handoff.

Intro blurb (replaces "What I Use?"):

> I've been utilizing these skills in designing, prototyping, and shipping user-centered
> digital products — from wireframes to production-ready front-end.

### 2. Front-End Development *(`WebDev.jsx`)*

Replace stack list with (resume-accurate):

> HTML5, CSS3, SASS/SCSS, JavaScript, React JS

### 3. Framework & Library *(`FrameworkLibrary.jsx`)*

> Bootstrap, Tailwind CSS
>
> *(GSAP dropped from resume-derived list since it's not on the CV — recommend keeping it
> anyway since it's demonstrably used on this site itself; your call.)*

### 4. Design & Development Tools *(`ToolTechnology.jsx`, renamed from "Tools & Technologies")*

> Figma, Figma AI, Adobe Photoshop, Adobe Illustrator, Visual Studio Code, Git, Claude
> Code, Microsoft Office

*(Added: Figma AI, Git, Claude Code, Microsoft Office — all listed on the resume but
missing from the site. NPM dropped in favor of the resume's actual tool list — recommend
keeping NPM too since it's still true and specific; your call.)*
