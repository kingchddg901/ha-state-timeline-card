# State Timeline Card

A developer-focused Lovelace card for stepping through HA recorder state
transitions across multiple entities at once. Built for debugging
automations and integration work.

## Quick start

After install, add a JavaScript Module dashboard resource:

```
/hacsfiles/ha-state-timeline-card/ha-state-timeline-card.js
```

Then in any dashboard:

```yaml
type: custom:ha-state-timeline-card
fast_flip_threshold_seconds: 5   # optional, default 5
```

## Features

- Multi-entity timeline stepping in one view
- Side-by-side twin stepper for comparing against a saved reference
- Per-step duration and fast-flip detection
- JSON export and re-import for cross-session comparison
- Persists entity selection and time range across reloads
