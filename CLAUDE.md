# John Sang — Discovery Portfolio

## Visual Identity

**Core Theme:** High-contrast Manga Panel layout — Sleek, Brutalist, Dark Mode.

**Color Palette:**
- Background: Pure Black `#000000`
- Text/Borders: Stark White `#FFFFFF`
- Accent: Neon Green `#39FF14` (or swap for GT Gold `#B3A369`)

**Background Treatment:**
Halftone dot patterns layered with low-opacity manga action panels (Berserk/Vagabond energy). Panels bleed at the edges, stacked at slight angles.

**Typography:**
- Headers → **Bebas Neue** or Impact (bold, condensed, screaming)
- Body/Code → **JetBrains Mono** (terminal/coder feel, monospace)

---

## Interactive "Discovery" Elements

**Custom Cursor**
- Wizard101 gauntlet pointer (`.cur` or SVG overlay)
- Primary interaction affordance — the "hand of the mage"

**Navigation**
- Floating icon clusters
- Manga-style speech bubbles scattered across the grid
- No traditional nav bar — discovery-first layout

**Hover States**
- Text glows on hover
- Hidden manga SFX katakana reveal (e.g., *バン！* BAM, *ザワ* Zawa, *ドン！* DON)
- Panel borders flash or thicken

**The Status Screen Panel**
- Central RPG character window (think Isekai stats overlay)
- Updates dynamically as user "discovers" sections
- Fields: NAME / CLASS / LEVEL / CURRENT ARC / ACTIVE SKILLS

---

## Content Sections

### 1. Stats — *The Power Level*

| Stat | Value |
|------|-------|
| Typing Speed | 195 WPM (Monkeytype) |
| Gaming | League of Legends — Mid-lane main (Challenger grind) |
| Academic | Sophomore @ GSU → Transferring to Georgia Tech (CompE) |
| Experience | Former Search Quality Rater — Project Callisto |

---

### 2. Goals — *The Training Arc*

- [ ] Land a Software Engineering Internship
- [ ] Complete **PitchPulse** MVP
- [ ] Master C++ (Demon-rank status)
- [ ] Financial Literacy & Budgeting (ongoing arc)

---

### 3. Resources / Books — *The Library*

- *Linear Algebra Done Right* — Axler
- *Option Volatility & Pricing* — Natenberg
- LeetCode Grind (daily discipline)
- Guitar Practice — Ultimate Guitar PRO

---

### 4. Projects — *The Inventory*

| Project | Description |
|---------|-------------|
| **PitchPulse** | Soccer analytics & formation predictor |
| **DSA Quest** | Gamified Data Structures learning platform |
| **CounterStack** | Cybersecurity-themed poker/RPG hybrid |

---

## Technical Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js (React) |
| Styling | Tailwind CSS |
| Animation | Framer Motion — panel transitions, reveals |
| Cursor | Custom `.cur` file or SVG overlay |
| Decorative Assets | SVGs for manga bubbles, transparent character art |

---

## Implementation Notes

- **Panels** are the layout primitive — everything lives inside a manga panel frame
- **Discovery mechanic** means sections unlock or appear as user scrolls/hovers/clicks
- **Status Screen** is the hero component — treat it like a living HUD
- Katakana SFX should feel diegetic, not decorative — placed where impact would land
- Keep halftone at ≤15% opacity so it reads as texture, not noise
- Mobile: stack panels vertically in reading order (top→bottom, left→right manga convention)
