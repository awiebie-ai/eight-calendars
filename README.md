# Eight Calendars

A single-screen dashboard for glancing at eight calendars at once — three governments (United States, China, Russia) and five faiths (Judaism, Christianity, Islam, Hinduism, Buddhism). Each card shows the current month with that tradition's observances highlighted; clicking a highlighted day opens a full-screen detail view for that calendar.

Built as a static HTML/CSS/JS page on the **Broadsheet** design system, with a glass/frosted surface treatment.

## Structure

- `design_handoff_eight_calendars/index.html` — entry point
- `design_handoff_eight_calendars/app.js` — rendering logic and calendar data
- `design_handoff_eight_calendars/styles.css` — page-specific styles
- `design_handoff_eight_calendars/_ds/broadsheet/` — design system tokens and base styles
- `design_handoff_eight_calendars/README.md` — full design handoff spec

## Running locally

Serve the `design_handoff_eight_calendars` folder with any static file server, e.g.:

```sh
cd design_handoff_eight_calendars
python3 -m http.server 8000
```

Then open `http://localhost:8000`.
