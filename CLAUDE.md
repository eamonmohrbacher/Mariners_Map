# Mariners_Map — Claude Context

## What this project is
An interactive single-page React app (Vite) that maps every notable zone, experience, and attraction inside T-Mobile Park. Built for a student consulting team at Gonzaga SBA working with the Seattle Mariners sales organization.

**Live site:** https://gu-27.github.io/Mariners_Map/
**Repo:** https://github.com/gu-27/Mariners_Map (private)

---

## Purpose
Students use this map to:
1. Navigate the park's zones by level and category
2. Add their field research notes to each zone (markdown supported)
3. Present findings to the Mariners sales client

---

## Tech stack
- React + Vite (no TypeScript)
- Plain CSS (no Tailwind or component library)
- `react-markdown` for rendering student research
- SVG map drawn in code (viewBox 0 0 100 100, percentage-based coordinates)
- GitHub Pages served from `/docs` folder on `main` branch

---

## Project structure
```
src/
  data/
    zones.json              ← All zone data — students edit this
  components/
    ParkMap.jsx             ← SVG stadium schematic + pin rendering
    ZonePin.jsx             ← Individual colored pin (circle + number)
    ZoneTooltip.jsx         ← Hover card (name, location, categories)
    ZonePopup.jsx           ← Click card (full detail: summary, metrics)
    LevelFilter.jsx         ← Level pill buttons across the top
    CategoryFilter.jsx      ← Category sidebar on the left
    ZoneLegend.jsx          ← Color swatch legend at bottom
    MetricCard.jsx          ← Small stat card (value + label)
  styles/
    app.css                 ← All styles, Mariners color palette
  App.jsx                   ← State management, layout, event wiring
  main.jsx                  ← React entry point
docs/                       ← Built output for GitHub Pages (do not edit manually)
```

---

## Mariners color palette
```css
--navy:    #0C2C56   /* primary brand navy */
--green:   #005C5C   /* Mariners green */
--silver:  #C4CED4
```

## Category pin colors
| Category | Color |
|---|---|
| Social / Atmosphere | `#378ADD` |
| Food & Drink | `#D85A30` |
| Premium Experience | `#7F77DD` |
| Family | `#1D9E75` |
| History & Art | `#D4537E` |
| Innovation | `#BA7517` |

---

## Zone levels
| Key | Display label |
|---|---|
| `exterior` | Exterior |
| `main` | Main Level (100) |
| `club` | Club Level (200) |
| `suite` | Suite / Press |
| `view` | View Level (300) |

---

## How to add or edit a zone (`zones.json`)

Each zone object follows this schema:

```json
{
  "id": "unique-slug",
  "name": "Zone Display Name",
  "location": "Section or area description",
  "level": "main",
  "categories": ["social", "food"],
  "coordinates": { "x": 50, "y": 60 },
  "summary": "One or two sentence overview shown at the top of the popup.",
  "research": "STUDENT RESEARCH GOES HERE — supports **markdown**",
  "keyMetrics": [
    { "label": "Label", "value": "Value" }
  ]
}
```

**Coordinate system:** `x` and `y` are percentages (0–100) matching the SVG viewBox. `x=0` is left edge, `x=100` is right edge. `y=0` is the top (center field), `y=100` is the bottom (home plate entrance).

**Categories:** A zone can belong to multiple categories — list them in order of priority (the first one determines the pin color).

**Research field:** Accepts full markdown including headings, bullet lists, bold, tables. Leave as `"STUDENT RESEARCH GOES HERE"` if not yet filled in — the panel will show a placeholder instead of blank.

---

## How to deploy updates

After editing `zones.json` or any source file:

```bash
npm run build   # rebuilds docs/ folder
git add .
git commit -m "your message"
git push        # GitHub Pages auto-updates within ~60 seconds
```

To run locally:
```bash
npm run dev     # starts at http://localhost:5173
```

---

## Student research workflow
1. Visit the zone in person during a Mariners home game
2. Take notes, photos, talk to staff and fans
3. Open `src/data/zones.json`, find the zone by `id`
4. Replace `"STUDENT RESEARCH GOES HERE"` in the `"research"` field with markdown notes
5. Update `keyMetrics` with any specific data points collected
6. Run `npm run build && git push` to publish

---

## Known design decisions
- **Popup vs. slide-in panel:** We use a floating popup bubble (appears near the click point) rather than a side panel, so the map stays visible while reading details.
- **Dual filters:** Level filter (top bar) and Category filter (left sidebar) work together with AND logic — both must match for a pin to be visible.
- **Stable pin numbering:** Pins are numbered by level order (exterior → main → club → suite → view) then alphabetically by id, so numbers don't shift when filters are applied.
- **SVG coordinates:** The stadium schematic is drawn entirely in SVG with no external image, making it easy to adjust zone pin positions just by changing x/y values in zones.json.
