# ha-state-timeline-card

A Home Assistant Lovelace card that queries the recorder and lets you
step through state transitions across multiple entities at once.

It's a **state viewer**, not a history viewer. The HA history viewer
charts values over time and wins for "where did temperature go this
week." This card walks you through transitions between states across a
correlated multi-entity view and wins for "what was every entity doing
at the moment this event fired."

## When this is the right tool

- You're building a derived-state binary sensor and need to find the
  multi-entity signature of an event that no single entity reports.
  Examples: "dishwasher actually finished," "vacuum stuck mid-run,"
  "garage open with no car."
- You're porting an integration and need to map a new device's entities
  to a canonical event grammar — load a reference export, side-by-side
  it against the new device, find the analog transitions.
- You're debugging an automation that fires (or doesn't) on a specific
  combination of state changes and need to see every entity at the
  exact moment things went wrong.

## When this is the wrong tool

- You want a chart of one sensor's value over time → HA history viewer.
- You want statistics or aggregations → HA statistics.
- You want a generic event log → HA logbook.
- You want a phone-friendly dashboard card → not this; desktop only.

## Installation

### HACS (recommended)

1. **HACS → ⋮ → Custom repositories**
2. Add `kingchddg901/ha-state-timeline-card` as **Lovelace**
3. Install **State Timeline Card**
4. Add a JavaScript Module dashboard resource:
   `/hacsfiles/ha-state-timeline-card/ha-state-timeline-card.js`
5. Add the card to a dashboard:

   ```yaml
   type: custom:ha-state-timeline-card
   ```

### Manual

1. Copy `dist/ha-state-timeline-card.js` into `<config>/www/`
2. Add a JavaScript Module dashboard resource: `/local/ha-state-timeline-card.js`
3. Add the card YAML as above.

## Configuration

| Key | Default | Description |
|---|---|---|
| `fast_flip_threshold_seconds` | `5` | A state with a duration below this gets the ⚡ flag and a row highlight. |
| `recorder_keep_days` | `10` | Match your recorder `purge_keep_days` so the retention warning fires at the right cutoff. |

Both are editable via the card's visual config editor (gear icon).

## Documentation

- **[USAGE.md](docs/USAGE.md)** — concepts, basic workflow, two worked
  examples (derived-state inference sensors and integration porting),
  known limitations.
- **[EXPORT_FORMAT.md](docs/EXPORT_FORMAT.md)** — JSON schema reference
  for the export format. Useful if you're scripting against exports
  with `jq` or similar.

## Known limitations

- Recorder retention is a hard floor. You can't query past your
  `purge_keep_days`. The card warns when Begin exceeds the configured
  cutoff, but it can't recover purged data.
- No automatic alignment between live and reference timelines — that's
  intentional, see USAGE.md.
- No mobile optimization. Desktop assumed.
- No CSV export. JSON only.
- Entity selection + time inputs persist via localStorage; step
  cursors, marks, and reference timelines do not (session-local).

## Building from source

```bash
npm install
npm run build       # produces dist/ha-state-timeline-card.js
npm run deploy      # builds and copies to your HA www/community dir
                    # (set DEPLOY_DEST env var to override path)
```

The source imports Lit from `unpkg.com` so it loads directly in a
browser during development. The build script rewrites that to a bare
`lit` specifier before invoking esbuild, producing a self-contained
bundle.

## License

MIT — see [LICENSE](LICENSE).
