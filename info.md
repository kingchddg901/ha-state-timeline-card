# State Timeline Card

A **state viewer** for Home Assistant — walks you through state
transitions across multiple entities at once. Not a history viewer
(that's HA's built-in chart); this answers "what was every entity
doing at the moment this event fired."

Built for two main use cases:

- **Derived-state inference sensors.** Find the multi-entity signature
  of an event no single entity reports — "dishwasher actually
  finished," "vacuum stuck mid-run," "garage open with no car" — and
  turn it into a template or trigger-based binary_sensor.
- **Integration porting.** Capture canonical events on a known device,
  side-by-side them against a new device via the twin stepper, map
  the new device's entities to a canonical event grammar.

## Quick start

After install, add a JavaScript Module dashboard resource:

```
/hacsfiles/ha-state-timeline-card/ha-state-timeline-card.js
```

Then in any dashboard:

```yaml
type: custom:ha-state-timeline-card
```

Visual config editor (gear icon) covers options. Detailed workflow in
[USAGE.md](docs/USAGE.md), export format in [EXPORT_FORMAT.md](docs/EXPORT_FORMAT.md).

## Heads up

Desktop only. Recorder retention is a hard floor — you can't query
past your `purge_keep_days`. Reference comparison is visual (side-by-
side twin steppers), not automated diff.
