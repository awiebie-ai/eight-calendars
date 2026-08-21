# Handoff: Eight Calendars — observance landing page

## Overview
A single-screen dashboard for glancing at eight calendars at once — three governments (United States, China, Russia) and five faiths (Judaism, Christianity, Islam, Hinduism, Buddhism). Each card shows the current Gregorian month grid with that tradition's observances highlighted. Highlighted days are clickable and open a full-screen detail page for that calendar. A navbar of eight evenly spread buttons is present and active on every page.

The design is fixed to a **1212 × 1102 px** viewport and must never scroll (desktop-only; no responsive breakpoints, no footer).

## About the Design Files
The files in this bundle are **design references created in HTML** — a prototype showing the intended look and behavior, not production code to copy directly. The task is to **recreate this design in the target codebase's existing environment** (React, Vue, SwiftUI, native, etc.) using its established patterns, component library, and tokens. If no environment exists yet, pick the most appropriate framework for the project and implement the design there.

`Observances.dc.html` is authored in a streaming component format: the markup lives inside `<x-dc>`, and the logic lives in the `class Component extends DCLogic` script at the bottom of the file. Read it as a template + a plain JS class. `support.js` is that format's runtime and is **not** part of the design — do not port it.

## Fidelity
**High-fidelity.** Final colors, typography, spacing, layout and interactions. Recreate pixel-accurately using the codebase's existing libraries where they map cleanly.

## Design System
Built on the **Broadsheet** design system (Source Serif 4 on a near-white ground, cyan and magenta process accents), with a **glass / frosted** surface treatment layered on top at the user's request. All tokens resolve from `_ds/broadsheet-c2062ae8-99be-4bf2-b23b-0e78994543cf/styles.css`, included in this bundle. If the target codebase has its own design system, map the tokens below to it rather than hard-coding.

## Screens / Views

### 1. Landing (`state.view === "landing"`)
**Purpose:** glance at all eight calendars; spot whether today is an observance in any of them.

**Layout** (top to bottom, all inside a 1212 × 1102 flex column, `overflow: hidden`):
- **Masthead** — padding `22px 28px 14px`; flex row, `align-items: baseline`, `justify-content: space-between`.
  - Left: "Eight Calendars" — 34px, heading font, weight 600, letter-spacing −0.025em, cursor pointer (returns to landing).
  - Right: "Friday, 21 August 2026 · Observance Desk" — 12px, uppercase, letter-spacing 0.14em, text at 58% opacity.
- **Navbar** — see *Navbar* below. Margin `0 28px`.
- **Content** — flex column, `gap: 22px`, padding `30px 28px 20px`.
  - **Row 1**: `grid-template-columns: repeat(3, 1fr)`, `gap: 20px`, `flex: 0 0 378px`. Card width ≈ 372px.
  - **Row 2**: `grid-template-columns: repeat(5, 1fr)`, `gap: 16px`, `flex: 0 0 442px`. Card width ≈ 215px.
  - Remaining vertical space (~90px) is intentional whitespace at the bottom.

**Government card (row 1)** — `border-radius: 16px`, padding `18px 20px 16px`, glass surface (see *Glass recipe*), flex column, `gap: 0`, `overflow: hidden`:
1. Header row (baseline, space-between): kicker 10px uppercase letter-spacing 0.1em in `--color-accent`; native-month label 11px italic at 55% text opacity.
2. Title — 26px heading, weight 600, letter-spacing −0.02em, `margin-top: 4px`.
3. Weekday header — `repeat(7, 1fr)`, labels Sun…Sat, 9px uppercase, letter-spacing 0.1em, 45% text opacity, `padding-bottom: 5px`, `margin-top: 12px`.
4. Day grid — `repeat(7, 1fr)`, `grid-auto-rows: 33px`, `gap: 2px`, 42 cells (6 weeks).
5. Observance list — pushed to the bottom with `margin-top: auto`, `padding-top: 10px`, 12px / 1.45. Each row: day number (tabular-nums, 45% opacity, min-width 20px) + label.

**Faith card (row 2)** — same structure, `border-radius: 14px`, padding `15px 15px 13px`; kicker 9px, title 20px, native label 10px italic on its own line, weekday header 8px, day grid `grid-auto-rows: 36px` / `gap: 2px`, list 11px / 1.4 with 16px number column.

**Day cell states** (all `border-radius: 2px`, 1px border, tabular-nums, centered):
| State | Background | Text | Border | Shadow | Cursor |
| --- | --- | --- | --- | --- | --- |
| blank (padding day) | transparent | transparent | transparent | none | default |
| plain | `rgba(255,255,255,0.34)` + `blur(6px)` | `--color-text` | `rgba(255,255,255,0.55)` | none | default |
| marked observance | `linear-gradient(150deg, rgba(0,136,176,0.30), rgba(0,136,176,0.14))` | `--color-accent-800` | `rgba(255,255,255,0.7)` | `0 4px 12px rgba(0,136,176,0.18)` | pointer, weight 600 |
| today + observance | `linear-gradient(150deg, rgba(214,0,108,0.94), rgba(214,0,108,0.74))` | `#fff` | `rgba(255,255,255,0.5)` | `0 6px 16px rgba(214,0,108,0.28)` | pointer, weight 600 |

Font size per cell size: 11px (faith cards), 13px (government cards), 17px (detail page).

### 2. Calendar detail (`state.view === <calendar id>`)
**Purpose:** read one calendar full-screen and see what today's observance is.

**Layout:** masthead + navbar unchanged, then `display: grid; grid-template-columns: 1fr 330px; gap: 22px; padding: 24px 28px 26px`. Both columns are glass panels, `border-radius: 18px`.

**Left panel** (padding `22px 24px 24px`):
- Title row (baseline, gap 14px): calendar name 40px heading letter-spacing −0.025em; native month 14px italic 55% opacity.
- "August 2026" — 13px uppercase, letter-spacing 0.12em, `--color-accent-700`.
- Weekday header — 10px uppercase, letter-spacing 0.12em, 45% opacity, `padding-bottom: 8px`, `margin-top: 16px`.
- Day grid — `flex: 1`, `repeat(7, 1fr)` × `repeat(6, 1fr)`, `gap: 4px`. Each cell: day number 17px on top (`padding: 8px 0 0`, `justify-content: flex-start`), then the observance label 10px / 1.25 centered, `padding: 2px 4px 0`.

**Right panel** (padding 22px):
- "TODAY" — 11px uppercase, letter-spacing 0.12em, `--color-accent-2`.
- Observance title — 30px heading, line-height 1.08, letter-spacing −0.02em, `margin-top: 6px`.
- Date line — 13px, 55% opacity.
- Body — 15px / 1.6, `margin-top: 18px`; optional italic second paragraph, `margin-top: 12px`.
- "ALSO THIS MONTH" — 11px uppercase, letter-spacing 0.12em, 50% opacity, `margin-top: 26px`. Rows: 14px / 1.35, day number in `--color-accent-700` (min-width 24px) + label, `gap: 8px` between rows.
- `.btn .btn-secondary` "All eight calendars" pinned to the bottom with `margin-top: auto` → returns to landing.

If the selected calendar has no authored copy for today, the panel falls back to: title = today's observance name or "No observance today", date = "21 August 2026 · <native month>", and a generic body pointing at the month list. Only Judaism currently has authored copy.

### Navbar (present on every view)
- Glass bar, `border-radius: 14px`, `overflow: hidden`, margin `0 28px`, `display: grid; grid-template-columns: repeat(8, 1fr)` — the eight buttons are therefore exactly evenly spread.
- Button: heading font, weight 600, 14px, letter-spacing 0.02em, `padding: 13px 4px`, centered, no border, no radius, transparent background.
- Order: United States, China, Russia, Judaism, Christianity, Islam, Hinduism, Buddhism.
- **Active** (button matches current view): background `linear-gradient(150deg, rgba(0,136,176,0.95), rgba(0,136,176,0.78))`, white text, `box-shadow: inset 0 1px 0 rgba(255,255,255,0.35)`. On the landing page no button is active.
- **Hover:** `background: rgba(0,136,176,0.12)`. **Focus-visible:** `2px solid var(--color-accent)`, offset 2px.

## Interactions & Behavior
- Clicking a navbar button sets the view to that calendar's detail page.
- Clicking a **highlighted** day cell (marked or today) opens that calendar's detail page. Plain and blank cells are inert and not focusable (`tabIndex = -1`); highlighted cells are `tabIndex = 0`.
- Clicking the masthead title, or the "All eight calendars" button, returns to the landing page.
- Card hover: shadow deepens from `0 10px 30px rgba(32,30,29,0.10)` to `0 16px 40px rgba(32,30,29,0.14)`, transition `box-shadow .18s ease, transform .18s ease`.
- No animations beyond those transitions. No loading, error or form states. No responsive behavior by design — fixed 1212 × 1102, `overflow: hidden` on `html, body`.

## State Management
Single state variable: `view: "landing" | "us" | "cn" | "ru" | "jud" | "chr" | "isl" | "hin" | "bud"`. No data fetching — the calendar data is a static array in the component. In a real implementation the month grid and observances should come from a data source (per-tradition calendar service or a seeded dataset) rather than a hard-coded array, and "today" should be derived from the system clock rather than the constant `TODAY = 21`.

## Data model (as prototyped)
```js
{ id, name, kicker, native, marks: { <dayOfMonth>: "<label>" }, today?: { title, date, body, italic } }
```
The month is hard-coded as August 2026 via `WEEKS` (6 rows × 7 columns, 0 = padding cell) and `TODAY = 21`.

**Accuracy note:** the observance dates and native month labels in the prototype are approximations written for layout purposes. They must be replaced with authoritative data (Hebrew, Hijri, Panchang, lunisolar Chinese and Buddhist Uposatha calendars each need real conversion logic) before shipping.

## Design Tokens

### Colors (from Broadsheet `styles.css`)
- Ground `--color-bg` `#f3f2f2`
- Text `--color-text` `#201e1d`
- Accent (cyan) `--color-accent` `#0088b0`; deep step for small text `--color-accent-700`; text-on-tint `--color-accent-800`
- Accent 2 (magenta) `--color-accent-2` `#d6006c`
- Process yellow `--color-process-yellow` `#edbb00` (background wash only)
- 100–900 ramps exist for neutral, accent and accent-2 — prefer ramp steps over ad-hoc mixes.

### Page background wash
```css
background:
  radial-gradient(1100px 620px at 12% -8%, rgba(0,136,176,0.20), transparent 62%),
  radial-gradient(900px 560px at 96% 10%, rgba(214,0,108,0.14), transparent 60%),
  radial-gradient(800px 700px at 60% 108%, rgba(237,187,0,0.13), transparent 62%),
  var(--color-bg);
```

### Glass recipe (`.glass`)
```css
background: linear-gradient(155deg, rgba(255,255,255,0.72), rgba(255,255,255,0.42));
backdrop-filter: blur(18px) saturate(1.25);   /* + -webkit- prefix */
border: 1px solid rgba(255,255,255,0.75);
box-shadow: 0 10px 30px rgba(32,30,29,0.10), inset 0 1px 0 rgba(255,255,255,0.85);
```
Applied with `background-clip: padding-box` on cards.

### Typography
Source Serif 4 for both headings and body (`--font-heading` / `--font-body`), heading weight 600, body 400, base 15px / 1.55. True italic at body weight — never synthesize an oblique. No sans-serif anywhere, including UI chrome.

Sizes used: 40, 34, 30, 26, 20, 17, 15, 14, 13, 12, 11, 10, 9, 8 px.

### Spacing
Broadsheet scale (1.25× density): 5 / 10 / 15 / 20 / 30 / 40 px. Page gutter 28px.

### Radius
Tokens: `--radius-sm` 1px, `--radius-md` 2px, `--radius-lg` 4px (day cells use `--radius-md`). The glass panels intentionally exceed the scale: cards 16px / 14px, navbar 14px, detail panels 18px.

### Shadows
Tokens `--shadow-sm/md/lg` exist but the glass treatment uses its own: rest `0 10px 30px rgba(32,30,29,0.10)` + inset highlight; hover `0 16px 40px rgba(32,30,29,0.14)`; day-cell accents as tabulated above.

## Assets
None. No images or icons are used. If icons are added later, Broadsheet specifies Phosphor icons in the duotone weight.

## Files
- `Observances.dc.html` — the current design (landing + detail view, glass treatment).
- `Observances v1 (restore point).dc.html` — the pre-glass newsprint version, kept as a reference.
- `_ds/broadsheet-.../styles.css` — the Broadsheet token sheet and component layer.
- `_ds/broadsheet-.../readme.md` — the Broadsheet design-system guide.
- `support.js` is deliberately **not** included; it is prototype runtime, not design.
