# Export JSON format

Every export is a self-contained JSON document. This is the schema.

## Top level

```jsonc
{
  "exported_at": "2026-05-16T23:00:45.956Z",          // when the export was written, UTC
  "timezone": "America/Los_Angeles",                   // HA instance's timezone at export time
  "driver_entity_id": "sensor.alfred_error_message",   // null if no driver was set
  "driver_friendly_name": "Alfred Error Message",      // null if no driver was set
  "range_start": "2026-05-16T20:45:54.623Z",          // timestamp of the first step in the slice
  "range_end": "2026-05-16T21:22:13.059Z",            // timestamp of the last step in the slice
  "step_count": 13,                                    // length of the steps array
  "steps": [ ... ]                                     // see below
}
```

## Each step

```jsonc
{
  "step_index": 1,                                     // 1-based, contiguous within the export
  "timestamp_utc": "2026-05-16T21:10:00.000Z",         // when this step's transition fired
  "timestamp_local": "2026-05-16T14:10:00-07:00",      // same moment, formatted in `timezone`
  "changed_entity_id": "vacuum.alfred",                // which entity's transition triggered this step
  "entities": [ ... ]                                  // snapshot of every selected entity
}
```

## Each entity within a step

```jsonc
{
  "entity_id": "vacuum.alfred",
  "friendly_name": "Alfred",
  "state": "docked",                                   // value at this step's moment
  "previous_state": "returning",                       // value before this entity's most recent transition
  "duration_seconds": 95.047,                          // how long this entity stayed in `state` before its next change
  "changed": true,                                     // true iff this entity is the changed_entity_id
  "is_driver": false,                                  // true iff this entity_id == top-level driver_entity_id
  "is_fast_flip": false,                               // true iff duration_seconds < fast_flip_threshold_seconds
  "attributes": { ... }                                // full attributes object at this moment
}
```

## Notes on specific fields

- **`previous_state`** is `null` for the first observed state of an
  entity in the window. After that, it's the state that entity held
  before its current state.
- **`duration_seconds`** is `null` for the last observed state of an
  entity in the window — there's no "next change" to measure against.
  In the live stepper UI this displays as "current."
- **`changed`** is `true` for exactly one entity per step: the entity
  whose transition that step represents.
- **`is_driver`** is `true` for at most one entity per step (or zero
  if no driver was set).
- **`is_fast_flip`** is computed from `duration_seconds <
  fast_flip_threshold_seconds`. Useful for spotting bouncing sensors.
- **`attributes`** is HA's raw attributes object — same keys and values
  you'd see in Developer Tools → States.

## Ordering within a step

The `entities` array is ordered driver-first (if any) and alphabetical
by entity_id otherwise. This matches the table order in the live
stepper, so visual side-by-side with the rendered card works.

## Sub-second timestamps

`timestamp_utc` is millisecond-precision. If multiple steps share the
same millisecond, they represent distinct events that fired in the same
recorder tick (HA's integration loop sometimes emits multiple state
changes for related entities at functionally the same instant).
Different entities with their own transitions at the same timestamp
are kept as separate steps so each `changed_entity_id` is captured.
Identical rows from the same entity at the same timestamp are deduped.

## Importing back

A previously exported file loaded via "Load Reference JSON" is rendered
in a side-by-side stepper that mirrors the live stepper's column
layout. The reference panel does not modify or compare against the
live data — it's purely for visual cross-checking.

## Scripting against exports

Exports are pure JSON. Anything that consumes JSON works:

```bash
# Count steps in the export
jq '.step_count' export.json

# List every changed_entity_id and the step it changed in
jq '.steps[] | "\(.step_index)\t\(.timestamp_utc)\t\(.changed_entity_id)"' export.json

# Pull a single entity's trajectory through the run
jq '.steps[] | { ts: .timestamp_utc, state: (.entities[] | select(.entity_id == "vacuum.alfred") | .state) }' export.json

# Find every transition involving a specific attribute change
jq '.steps[] | select(.entities[] | .attributes.errored_room_id != null) | .timestamp_utc' export.json
```
