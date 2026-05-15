# ha-state-timeline-card

A developer-focused Home Assistant Lovelace card that queries the HA
recorder and lets you step through state transitions across multiple
entities at once. Built for debugging automations and integrations, not
for casual dashboard use.

## What it does

- Pick a device (or individual entities) and select which ones to include
- Set a time window in the HA instance's configured timezone
- Query the recorder via the `history/history_during_period` websocket call
- Step forward and backward through every state change in the window
- For each step, see every selected entity's current state, previous state,
  and how long it stayed there
- Flag "fast flips" (state changes shorter than a configurable threshold)
- Mark a start and end step, then export the slice (or all of it) as JSON
- Re-import a previously exported JSON for side-by-side reference

## Installation

### Manual

1. Copy `dist/ha-state-timeline-card.js` into `<config>/www/`
2. Add it as a dashboard resource:
   - **Settings → Dashboards → ⋮ → Resources → Add resource**
   - URL: `/local/ha-state-timeline-card.js`
   - Type: **JavaScript Module**
3. Add the card to a dashboard:

   ```yaml
   type: custom:ha-state-timeline-card
   fast_flip_threshold_seconds: 5   # optional, default 5
   ```

### HACS (custom repository)

1. **HACS → ⋮ → Custom repositories**
2. Add this repository as **Lovelace**
3. Install **State Timeline Card**

## Configuration

| Key | Default | Description |
|---|---|---|
| `fast_flip_threshold_seconds` | `5` | A state with a duration below this gets the ⚡ flag and a subtle row highlight. |

Everything else — entity selection, time range, marks — is set
interactively in the card itself.

## Building from source

```bash
npm install
npm run build
```

This produces `dist/ha-state-timeline-card.js` with Lit inlined and
minified.

The source file (`src/ha-state-timeline-card.js`) imports Lit from
`unpkg.com` so it can be loaded directly in a browser during development
without a build step. The build script rewrites that import to a bare
`lit` specifier before invoking esbuild.

## Notes

- Times are read from and displayed in the HA instance's configured
  timezone (`hass.config.time_zone`), not the browser's local timezone.
- Entity selection, driver pick, and the Begin/End time inputs persist
  in `localStorage` (per origin) across page reloads. Step cursors,
  marks, and any loaded reference timeline are session-local — they
  reset every time you reopen the dashboard.
- Loading a reference JSON turns the bottom panel into a twin stepper
  that mirrors the live table's column layout, with its own ◀/▶ nav.
  There is no automatic alignment between live and reference: timestamps
  and durations drift between runs, so pattern-matching is left to the
  human eye, which is faster and more accurate than any heuristic for
  this kind of comparison.
- No mobile optimization. Desktop assumed.
