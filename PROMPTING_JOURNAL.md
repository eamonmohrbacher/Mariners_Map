# Mariners_Map — Prompting Journal
*How this project was built with Claude Code, and what it took to get there.*

This document is intended for student consultants who will continue working on this project. It walks through the original prompts, the iterations, and the bugs we caught along the way — so you understand both what the tool can do and how to work with it effectively.

---

## The initial request

The project started with a single prompt accompanied by a project brief (a markdown file describing the desired app). The prompt was short:

> *"ok, i have a new project. i need a new repo call Mariners_Map, here is the context for the project, can you build me something to start."*

That one prompt — plus the attached context document — produced:
- A full Vite + React project scaffold
- 20 zones pre-loaded in `zones.json` with real T-Mobile Park data
- An SVG stadium schematic drawn entirely in code
- Numbered, colored pins for every zone
- A slide-in detail panel with level/category badges, key metrics, and a placeholder for student research
- A level filter bar (All, Exterior, Main, Club, Suite, View)
- A color legend
- Mariners brand colors applied throughout
- A GitHub repo created and pushed automatically

**Lesson:** A detailed context document attached to a short prompt is far more effective than a long conversational prompt. The more structured your input (schema, color palette, feature list), the better the output.

---

## Iteration 1 — Popup bubble + category filter sidebar

After seeing the initial build, the feedback was:

> *"can you add a context md file for this repo? also when you click on a number, it shows another number to the top and left of it and it bounces back and forth with it."*

Wait — that was later. The first iteration request was:

> *"for the map, can you create sample sections where when you click on 1 of the items, you get taken to a section that explains what is there. or maybe a bubble pops up. also, can you create a filter on the side that allows you to see only the locations that are associated with the category, for example, only family or only social."*

Two features requested in one message. Claude added both simultaneously:

**What was built:**
- Replaced the slide-in panel with a **popup bubble** that appears right next to the clicked pin
- The popup shows: zone name, location, level badge, category tags, summary paragraph, key metric cards
- Smart edge detection repositions the popup if it would go off-screen
- **Category sidebar** added on the left with 7 buttons (All + 6 categories)
- Each active category button highlights in that category's color
- Both filters (level + category) combine — a pin must match both to stay visible

**Lesson:** You can ask for multiple features in one message. Claude handles them in parallel when they're independent. Be specific about the UX you want ("bubble pops up" vs. "takes you to a section") — even vague direction helps Claude choose the right pattern.

---

## Iteration 2 — Bug fix: ghost pin

After the popup was working, a visual bug was reported:

> *"when you click on a number, it shows another number to the top and left of it and it bounces back and forth with it."*

This was a legitimate SVG rendering bug. The root cause: SVG `<g>` elements had both an SVG `transform="translate(x,y)"` attribute (for positioning) and a CSS `transform: scale(1.25)` on hover. When both are present, the browser's `transform-origin: center` refers to the center of the entire SVG canvas — not the pin itself — causing the pin to appear to jump to a second position.

**First fix attempt:** Added `transform-box: fill-box` to the CSS (one line). This tells the browser to use the element's own bounding box as the transform origin. The logic was sound but it wasn't sufficient because the SVG attribute transform and CSS transform were still compositing unexpectedly.

**Final fix:** Restructured `ZonePin.jsx` to use **nested groups** — an outer `<g>` handles only the position translate (SVG attribute), and an inner `<g>` handles only the CSS hover animation. The `transform-box` fix then works correctly on the inner group because it has no conflicting SVG attribute.

**Lesson:** When a first fix doesn't fully work, describe exactly what you still see. Claude will diagnose further. You don't need to understand the root cause — just describe the symptom accurately ("bounces back and forth," "shows a second number to the top left").

---

## Iteration 3 — Hover tooltip

Reported alongside the ghost pin bug:

> *"there isn't information about the location when i hover over it."*

**What was built:**
- A lightweight `ZoneTooltip` component that appears on `mouseenter`
- Shows: zone name (bold, navy), location (small gray text), category label(s) in category color
- A colored left-border accent stripe matches the pin's primary category
- Tooltip disappears on `mouseleave`
- If a pin's popup is already open, hovering it won't show a duplicate tooltip

**Lesson:** Describe the interaction you expect ("when I hover over it") and what should appear. Claude will choose an appropriate implementation (in this case, a lightweight tooltip rather than a full popup, because the click popup already handles the details).

---

## Iteration 4 — GitHub Pages deployment

> *"is the repo page on public pages?"*

It wasn't. Claude set it up:

1. Updated `vite.config.js` to set `base: '/Mariners_Map/'` and `outDir: 'docs'`
2. Built the production bundle into `docs/`
3. Committed and pushed
4. Enabled GitHub Pages via the GitHub API (branch: main, path: /docs)

Live at: **https://gu-27.github.io/Mariners_Map/**

**Lesson:** Claude can handle GitHub setup tasks (create repos, enable Pages, set visibility) directly through the `gh` CLI. You don't need to touch the GitHub UI.

---

## What this project is ready for

The app is functional but the `"research"` field for every zone in `zones.json` still reads `"STUDENT RESEARCH GOES HERE"`. That's intentional — it's the student team's job to fill it in after visiting the park.

Each zone's detail popup has a "Student Research" section that renders markdown. Students can add:
- Bullet-point observations
- Tables of data collected
- Headers organizing different types of findings
- Bold text for key takeaways

---

## Prompting tips for continuing this project

**To add a new zone:**
> *"Add a new zone to zones.json for [name]. It's located at [location], level: [main/club/suite/view], categories: [list]. Coordinates roughly [x, y] — it's near [reference zone]."*

**To change how the popup looks:**
> *"The popup feels too large. Can you reduce the font sizes and tighten the padding?"*

**To add a new feature:**
> *"When a student clicks a zone, I'd like them to be able to see a photo of that area. Can you add an optional image field to the zone data and display it at the top of the popup?"*

**To fix something that looks wrong:**
> Describe exactly what you see: *"The category filter buttons don't highlight when I click them on mobile."* Avoid vague reports like "it's broken" — the more specific you are, the faster Claude can locate and fix it.

**To deploy after making changes:**
> *"I've updated zones.json with student research for three zones. Can you rebuild and push?"*

---

## Files students should know about

| File | What to edit |
|---|---|
| `src/data/zones.json` | Add research notes, update key metrics, add new zones |
| `src/styles/app.css` | Visual styling changes |
| `CLAUDE.md` | Update if project context changes |

Everything else (`ParkMap.jsx`, `ZonePin.jsx`, etc.) is infrastructure — only touch it if you're changing how the map itself works.
