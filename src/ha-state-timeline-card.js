// ha-state-timeline-card
// A developer-focused Lovelace card that queries the HA recorder and lets
// you step through state transitions across multiple entities at once.
//
// Single-file source. During development Lit is imported from unpkg; the
// production bundle (dist/) is produced by esbuild and inlines Lit.
//
// Sections:
//   1. Entity selection  — device picker + entity checklist + manual adds
//   2. Time range        — datetime-local inputs in HA timezone + presets
//   3. Search            — websocket call to history/history_during_period
//   4. Stepper           — one row per entity, walk forward/back through steps
//   5. Export / import   — JSON round-trip for offline comparison

import { LitElement, html, css } from 'https://unpkg.com/lit@3.1.4/index.js?module';

// -----------------------------------------------------------------------------
// Timezone helpers
//
// HA stores timestamps as UTC ISO strings. The user reads/writes times in the
// HA instance's configured timezone (hass.config.time_zone). The browser's
// local timezone is irrelevant — a dev viewing a dashboard from a different
// timezone than the HA server should still see times that match server logs.
//
// Strategy: format dates with Intl.DateTimeFormat, which honors any IANA zone.
// Parsing a "YYYY-MM-DDTHH:mm" string back into a UTC instant requires a small
// trick because Date() always assumes local time. We compute the zone's offset
// at that wall-clock moment by formatting a guess and measuring the drift.
// -----------------------------------------------------------------------------

// Format a Date as "YYYY-MM-DDTHH:mm" in the given IANA timezone.
// Output is suitable for an <input type="datetime-local"> value.
function formatLocalInput(date, timeZone) {
  if (!date) return '';
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone, year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hour12: false,
  }).formatToParts(date);
  const m = {};
  for (const p of parts) m[p.type] = p.value;
  // Intl can emit '24' for hour at midnight in some locales; normalize to '00'.
  const hour = m.hour === '24' ? '00' : m.hour;
  return `${m.year}-${m.month}-${m.day}T${hour}:${m.minute}`;
}

// Given a wall-clock string "YYYY-MM-DDTHH:mm" (optionally with ":SS" or
// ":SS.sss" appended — Chrome's datetime-local input sometimes adds seconds)
// interpreted in timeZone, return the corresponding UTC Date.
//
// Returns null on any failure (bad regex match, invalid Date construction,
// thrown timezone, NaN offset). The caller treats null as "couldn't parse"
// rather than propagating an Invalid Date that would later throw on
// .toISOString() with the generic "Invalid time value" message.
function parseLocalInput(value, timeZone) {
  if (!value) return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?/.exec(value);
  if (!m) return null;
  const [, y, mo, d, hh, mm, ss] = m;
  const asUtc = new Date(`${y}-${mo}-${d}T${hh}:${mm}:${ss || '00'}.000Z`);
  if (isNaN(asUtc.getTime())) return null;
  let offset;
  try { offset = getZoneOffsetMs(asUtc, timeZone); }
  catch { return null; }
  if (!Number.isFinite(offset)) return null;
  const result = new Date(asUtc.getTime() - offset);
  return isNaN(result.getTime()) ? null : result;
}

// Offset between UTC and timeZone at the given instant, in milliseconds.
function getZoneOffsetMs(date, timeZone) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone, year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
  }).formatToParts(date);
  const m = {};
  for (const p of parts) m[p.type] = p.value;
  const asUtcMs = Date.UTC(
    +m.year, +m.month - 1, +m.day,
    m.hour === '24' ? 0 : +m.hour, +m.minute, +(m.second || 0),
  );
  return asUtcMs - date.getTime();
}

// Human-readable time-of-day + date for the stepper header.
function formatDisplayTimestamp(iso, timeZone) {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '';
  const time = new Intl.DateTimeFormat('en-GB', {
    timeZone, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
  }).format(d);
  const date = new Intl.DateTimeFormat('en-US', {
    timeZone, weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
  }).format(d);
  return `${time}  ${date}`;
}

// Compact "YYYY-MM-DD_HH-mm" stamp for export filenames.
function formatFilenameStamp(date, timeZone) {
  return formatLocalInput(date, timeZone).replace('T', '_').replace(':', '-');
}

// Duration formatting: Xs / Xm Ys under an hour, Xh Ym above.
function formatDuration(seconds) {
  if (seconds === null || seconds === undefined || isNaN(seconds)) return '—';
  const s = Math.max(0, Math.round(seconds));
  if (s < 60) return `${s}s`;
  if (s < 3600) return `${Math.floor(s / 60)}m ${String(s % 60).padStart(2, '0')}s`;
  return `${Math.floor(s / 3600)}h ${String(Math.floor((s % 3600) / 60)).padStart(2, '0')}m`;
}

// Local ISO string with offset, for the timestamp_local export field.
// e.g. "2026-05-14T05:49:03-04:00".
//
// Seconds come from getUTCSeconds() rather than Intl.DateTimeFormat because
// `Intl.DateTimeFormat({second:'2-digit'})` does NOT consistently pad to two
// digits when `second` is the only field requested — produces "9" instead
// of "09". Seconds within a minute are timezone-independent (offsets are
// whole minutes, even for :30 zones), so UTC seconds == local seconds.
function formatLocalIsoWithOffset(iso, timeZone) {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  const local = formatLocalInput(d, timeZone);
  const sec = String(d.getUTCSeconds()).padStart(2, '0');
  const off = getZoneOffsetMs(d, timeZone);
  const sign = off >= 0 ? '+' : '-';
  const abs = Math.abs(off);
  const oh = String(Math.floor(abs / 3600000)).padStart(2, '0');
  const om = String(Math.floor((abs % 3600000) / 60000)).padStart(2, '0');
  return `${local}:${sec}${sign}${oh}:${om}`;
}

// -----------------------------------------------------------------------------
// Card class
// -----------------------------------------------------------------------------

// localStorage key for persisted entity selection and time range. Version
// suffix lets us bump the schema later without crashing on old payloads.
const STORAGE_KEY = 'ha-state-timeline-card:v1';
const PERSIST_KEYS = [
  '_selectedDeviceId', '_selectedEntities', '_addedEntities',
  '_driverEntityId', '_beginInput', '_endInput',
];

class HaStateTimelineCard extends LitElement {
  // Reactive state. Everything that affects the rendered output lives here so
  // Lit re-renders correctly. Internal-only fields use `state: true` to skip
  // attribute reflection and keep them out of the component's public API.
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
    _selectedDeviceId: { state: true },
    _selectedEntities: { state: true },   // Set<string>
    _addedEntities: { state: true },      // Set<string> manually added
    _driverEntityId: { state: true },
    _beginInput: { state: true },         // string from <input datetime-local>
    _endInput: { state: true },
    _loading: { state: true },
    _error: { state: true },
    _steps: { state: true },              // computed step array
    _currentStep: { state: true },
    _markStart: { state: true },
    _markEnd: { state: true },
    _expanded: { state: true },           // Set<string> of expanded entityIds
    _reference: { state: true },          // imported JSON object (normalized)
    _refCurrentStep: { state: true },     // cursor for the reference stepper
    _entityCollapsed: { state: true },    // collapse the entity-selection block
    _collapsedDomains: { state: true },   // Set<string> of collapsed domain groups
  };

  constructor() {
    super();
    this._config = {};
    this._selectedDeviceId = null;
    this._selectedEntities = new Set();
    this._addedEntities = new Set();
    this._driverEntityId = null;
    this._beginInput = '';
    this._endInput = '';
    this._loading = false;
    this._error = '';
    this._steps = [];
    this._currentStep = 0;
    this._markStart = null;
    this._markEnd = null;
    this._expanded = new Set();
    this._reference = null;
    this._refCurrentStep = 0;
    this._entityCollapsed = false;
    this._collapsedDomains = new Set();
  }

  // Restore persisted entity selection and time range. localStorage is per-
  // origin, which is exactly the scope we want — same HA instance, same
  // browser. Wrapped in try/catch so a corrupt payload never blocks the card.
  connectedCallback() {
    super.connectedCallback();
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const d = JSON.parse(raw);
      if (d.selectedDeviceId) this._selectedDeviceId = d.selectedDeviceId;
      if (Array.isArray(d.selectedEntities)) this._selectedEntities = new Set(d.selectedEntities);
      if (Array.isArray(d.addedEntities)) this._addedEntities = new Set(d.addedEntities);
      if (d.driverEntityId) this._driverEntityId = d.driverEntityId;
      if (typeof d.beginInput === 'string') this._beginInput = d.beginInput;
      if (typeof d.endInput === 'string') this._endInput = d.endInput;
    } catch { /* corrupt payload — ignore */ }
  }

  // Save the persisted subset whenever one of those properties changes.
  // Step cursors, marks, and the imported reference deliberately do NOT
  // persist — those are session-local to a debugging run.
  updated(changedProperties) {
    if (!PERSIST_KEYS.some((k) => changedProperties.has(k))) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        selectedDeviceId: this._selectedDeviceId,
        selectedEntities: Array.from(this._selectedEntities),
        addedEntities: Array.from(this._addedEntities),
        driverEntityId: this._driverEntityId,
        beginInput: this._beginInput,
        endInput: this._endInput,
      }));
    } catch { /* quota / disabled storage — ignore */ }
  }

  // HA card contract. Called at construction and again when YAML changes.
  // Validate defensively — the rest of the card assumes a sane config.
  setConfig(config) {
    const cfg = config || {};
    const t = Number(cfg.fast_flip_threshold_seconds);
    const r = Number(cfg.recorder_keep_days);
    this._config = {
      fast_flip_threshold_seconds: Number.isFinite(t) && t > 0 ? t : 5,
      // HA's recorder default is 10 days. We can't read the real value from
      // hass (HA doesn't expose recorder config to the frontend at all — not
      // via recorder/info, no REST endpoint, nowhere), so the user has to
      // tell us if they've changed it. Used only to warn before searches
      // that will silently return empty.
      recorder_keep_days: Number.isFinite(r) && r > 0 ? r : 10,
    };
  }

  // Visual editor entry point. HA's card framework calls this when the user
  // clicks the gear icon on a card; we hand back our editor element and HA
  // wires up the config-changed event automatically.
  static getConfigElement() {
    return document.createElement('ha-state-timeline-card-editor');
  }

  static getStubConfig() {
    return { fast_flip_threshold_seconds: 5, recorder_keep_days: 10 };
  }

  // Used by HA to size the card in masonry/grid layout. The stepper expands
  // dynamically; 6 is a reasonable starting estimate.
  getCardSize() { return 6; }

  // Resolve the HA timezone, falling back to UTC if hass isn't ready yet.
  get _timeZone() {
    return (this.hass && this.hass.config && this.hass.config.time_zone) || 'UTC';
  }

  // --------------------------------------------------------------------------
  // Entity selection
  // --------------------------------------------------------------------------

  // Pull every entity for the selected device. hass.entities is a flat map
  // keyed by entity_id, each entry carrying a device_id. Group by domain so
  // the checklist reads naturally.
  _entitiesForDevice(deviceId) {
    if (!deviceId || !this.hass || !this.hass.entities) return {};
    const grouped = {};
    for (const entityId of Object.keys(this.hass.entities)) {
      const e = this.hass.entities[entityId];
      if (e.device_id !== deviceId) continue;
      if (e.disabled_by || e.hidden_by) continue;
      const domain = entityId.split('.')[0];
      (grouped[domain] = grouped[domain] || []).push(entityId);
    }
    for (const d of Object.keys(grouped)) grouped[d].sort();
    return grouped;
  }

  // Friendly name with fallbacks: state attribute → entity registry → entity_id.
  // State attributes win because that's what the user sees elsewhere in HA.
  _friendlyName(entityId) {
    if (!this.hass) return entityId;
    const st = this.hass.states && this.hass.states[entityId];
    if (st && st.attributes && st.attributes.friendly_name) return st.attributes.friendly_name;
    const reg = this.hass.entities && this.hass.entities[entityId];
    if (reg && reg.name) return reg.name;
    return entityId;
  }

  _onDeviceChanged(ev) {
    this._selectedDeviceId = ev.target.value || null;
  }

  // Devices sorted for the picker. `name_by_user` is the user-renamed label,
  // `name` is the manufacturer default. Filter out disabled entries — they
  // can't have queryable entities anyway. Including the area suffix helps
  // disambiguate the "Hue motion sensor (Kitchen)" vs "...(Bedroom)" case.
  _sortedDevices() {
    if (!this.hass || !this.hass.devices) return [];
    const areas = this.hass.areas || {};
    return Object.values(this.hass.devices)
      .filter((d) => !d.disabled_by)
      .map((d) => ({
        id: d.id,
        label: d.name_by_user || d.name || d.id,
        area: d.area_id && areas[d.area_id] ? areas[d.area_id].name : '',
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }

  _toggleEntity(entityId) {
    const next = new Set(this._selectedEntities);
    if (next.has(entityId)) {
      next.delete(entityId);
      // Clearing the driver if its entity gets deselected avoids a stale
      // pointer that would silently break the "always first row" guarantee.
      if (this._driverEntityId === entityId) this._driverEntityId = null;
    } else {
      next.add(entityId);
    }
    this._selectedEntities = next;
  }

  _setDriver(entityId) {
    // Toggle: clicking ★ on the current driver clears it; clicking on a
    // different entity replaces it. Only one driver at a time.
    if (this._driverEntityId === entityId) {
      this._driverEntityId = null;
      return;
    }
    this._driverEntityId = entityId;
    // Selecting as driver implicitly includes it in the query.
    if (!this._selectedEntities.has(entityId)) {
      const next = new Set(this._selectedEntities);
      next.add(entityId);
      this._selectedEntities = next;
    }
  }

  _selectAllForDevice() {
    const groups = this._entitiesForDevice(this._selectedDeviceId);
    const next = new Set(this._selectedEntities);
    for (const d of Object.keys(groups)) for (const id of groups[d]) next.add(id);
    this._selectedEntities = next;
  }

  _toggleDomain(domain) {
    const next = new Set(this._collapsedDomains);
    next.has(domain) ? next.delete(domain) : next.add(domain);
    this._collapsedDomains = next;
  }

  // Smart select-all per domain: if every entity in the domain is already
  // selected, this deselects them; otherwise selects them. One affordance,
  // both directions — less UI noise than separate select/deselect links.
  _toggleAllInDomain(domain) {
    const ids = this._entitiesForDevice(this._selectedDeviceId)[domain] || [];
    const allChecked = ids.length > 0 && ids.every((id) => this._selectedEntities.has(id));
    const next = new Set(this._selectedEntities);
    if (allChecked) {
      for (const id of ids) {
        next.delete(id);
        if (this._driverEntityId === id) this._driverEntityId = null;
      }
    } else {
      for (const id of ids) next.add(id);
    }
    this._selectedEntities = next;
  }

  _deselectAllForDevice() {
    const groups = this._entitiesForDevice(this._selectedDeviceId);
    const next = new Set(this._selectedEntities);
    for (const d of Object.keys(groups)) {
      for (const id of groups[d]) {
        next.delete(id);
        if (this._driverEntityId === id) this._driverEntityId = null;
      }
    }
    this._selectedEntities = next;
  }

  // Fully remove a manually-added entity: drop from the manual-add list AND
  // from the selected set, and clear the driver pointer if it was driving.
  // Device-discovered entities don't expose this — they reappear next render
  // anyway because they come from hass.entities.
  _removeAddedEntity(entityId) {
    const added = new Set(this._addedEntities);
    added.delete(entityId);
    this._addedEntities = added;
    const sel = new Set(this._selectedEntities);
    sel.delete(entityId);
    this._selectedEntities = sel;
    if (this._driverEntityId === entityId) this._driverEntityId = null;
  }

  _onAddEntity(ev) {
    const value = ev.target.value;
    if (!value) return;
    // Validate against hass.states so a typo doesn't add a phantom entity.
    // We allow datalist autocomplete to drive most picks but accept manual
    // typing too — the validation is the gate.
    if (!this.hass || !this.hass.states || !this.hass.states[value]) {
      ev.target.value = '';
      return;
    }
    // Add to both the manual-add list (so it shows up under "other") and the
    // selected set (so the user doesn't need a second click).
    const added = new Set(this._addedEntities); added.add(value); this._addedEntities = added;
    const sel = new Set(this._selectedEntities); sel.add(value); this._selectedEntities = sel;
    ev.target.value = '';
  }

  // --------------------------------------------------------------------------
  // Time range
  // --------------------------------------------------------------------------

  _setPreset(minutes) {
    const now = new Date();
    this._beginInput = formatLocalInput(new Date(now.getTime() - minutes * 60000), this._timeZone);
    this._endInput = formatLocalInput(now, this._timeZone);
  }
  _setEndToNow() { this._endInput = formatLocalInput(new Date(), this._timeZone); }
  _onBeginInput(ev) { this._beginInput = ev.target.value; }
  _onEndInput(ev) { this._endInput = ev.target.value; }

  // --------------------------------------------------------------------------
  // Search — query the recorder
  // --------------------------------------------------------------------------

  async _search() {
    this._error = '';
    const entities = Array.from(this._selectedEntities);
    if (entities.length === 0) { this._error = 'Select at least one entity'; return; }
    if (!this._beginInput || !this._endInput) { this._error = 'Set a time range'; return; }

    const tz = this._timeZone;
    const startDate = parseLocalInput(this._beginInput, tz);
    const endDate = parseLocalInput(this._endInput, tz);
    // Parser returns null on any failure — surface a diagnostic message
    // (with the raw inputs and resolved timezone) instead of letting an
    // Invalid Date slip through and throw the opaque "Invalid time value"
    // error from .toISOString() downstream.
    if (!startDate || !endDate) {
      this._error = `Couldn't parse time inputs (begin="${this._beginInput}" end="${this._endInput}" tz="${tz}")`;
      return;
    }
    if (endDate <= startDate) {
      this._error = 'End must be after Begin'; return;
    }

    this._loading = true;
    try {
      // history/history_during_period is the recorder's bulk query. Pass a
      // UTC start_time/end_time plus the entity list; HA returns a map of
      // entity_id → list of state objects sorted ascending.
      const response = await this.hass.callWS({
        type: 'history/history_during_period',
        start_time: startDate.toISOString(),
        end_time: endDate.toISOString(),
        entity_ids: entities,
        minimal_response: false,
        no_attributes: false,
        significant_changes_only: false,
      });
      const steps = this._buildSteps(response, entities);
      if (steps.length === 0) {
        this._error = 'No state changes found in this time range for the selected entities';
        this._steps = [];
        return;
      }
      this._steps = steps;
      this._currentStep = 0;
      this._markStart = null;
      this._markEnd = null;
      this._expanded = new Set();
    } catch (err) {
      this._error = `Query failed: ${err && err.message ? err.message : err}`;
      this._steps = [];
    } finally {
      this._loading = false;
    }
  }

  // Convert the HA history response into a flat step array.
  //
  // Algorithm:
  //   1. Normalize each entity's response into [{ ts, state, attrs, dur }].
  //      Sort ascending. Pre-compute duration as delta to the next entry.
  //   2. Flatten every state change into a master event list, sorted by ts.
  //   3. For each event, build a snapshot of every entity's state. Use
  //      running per-entity pointers so snapshot lookup is O(n_entities)
  //      per step rather than O(n_entities * n_changes).
  _buildSteps(response, entities) {
    const tz = this._timeZone;
    const perEntity = {};
    for (const id of entities) {
      const raw = response[id] || [];
      const mapped = raw.map((row) => {
        // history/history_during_period returns a COMPACT format whose keys
        // differ from the regular state object:
        //   s  = state          (vs. .state)
        //   a  = attributes     (vs. .attributes)
        //   lu = last_updated   as float seconds (vs. .last_updated ISO string)
        //   lc = last_changed   as float seconds, may be omitted if == lu
        // We accept both shapes so the code doesn't silently break if HA
        // changes the encoding again or returns legacy rows in some path.
        const luMs = typeof row.lu === 'number' ? row.lu * 1000 : null;
        const lcMs = typeof row.lc === 'number' ? row.lc * 1000 : luMs;
        const tsMs = lcMs !== null ? lcMs : luMs;
        const ts = tsMs !== null
          ? new Date(tsMs)
          : new Date(row.last_changed || row.last_updated);
        return {
          ts: ts.toISOString(),
          state: row.s !== undefined ? row.s : row.state,
          attributes: row.a || row.attributes || {},
        };
      })
        // History endpoints may return slightly out-of-order rows when the
        // recorder is under load. Sort defensively.
        .sort((a, b) => (a.ts < b.ts ? -1 : a.ts > b.ts ? 1 : 0));

      // Dedupe consecutive rows where state AND attributes are byte-identical.
      // HA's recorder occasionally emits multiple rows for the same entity
      // within a single logging tick when the source pushed several updates;
      // those produce phantom steps with no real difference. Comparing
      // attributes via JSON.stringify is good enough — order is stable across
      // the same source.
      const list = [];
      for (const row of mapped) {
        const last = list[list.length - 1];
        if (last && last.state === row.state &&
            JSON.stringify(last.attributes) === JSON.stringify(row.attributes)) {
          continue;
        }
        list.push(row);
      }

      for (let i = 0; i < list.length; i++) {
        list[i].durationSeconds = i < list.length - 1
          ? (new Date(list[i + 1].ts).getTime() - new Date(list[i].ts).getTime()) / 1000
          : null;
      }
      perEntity[id] = { list, idx: 0 };
    }

    // Master event list. Skip each entity's FIRST row — it represents the
    // entity's initial state at window-start (whether synthesized by HA or
    // just the earliest row in the window), not a transition. Including it
    // produces phantom "change" steps where previousState is null and the
    // shown "change" is really the first observation. Real transitions
    // (rows 1+) are the actual events. Ties on timestamp broken by
    // entity_id for determinism.
    const events = [];
    for (const id of entities) {
      const pl = perEntity[id].list;
      for (let i = 1; i < pl.length; i++) events.push({ ts: pl[i].ts, entityId: id });
    }
    events.sort((a, b) => (a.ts < b.ts ? -1 : a.ts > b.ts ? 1 : a.entityId.localeCompare(b.entityId)));

    const threshold = this._config.fast_flip_threshold_seconds;
    const driver = this._driverEntityId;
    const steps = [];

    for (const ev of events) {
      const entityStates = {};
      for (const id of entities) {
        const pe = perEntity[id];
        // Advance idx while the next entry is also at or before ev.ts.
        // Both arrays are sorted, so pointers only move forward.
        while (pe.idx + 1 < pe.list.length && pe.list[pe.idx + 1].ts <= ev.ts) pe.idx++;
        const entry = pe.list[pe.idx];
        if (!entry) {
          // No data for this entity in the window — render an empty placeholder.
          entityStates[id] = {
            entityId: id, friendlyName: this._friendlyName(id),
            state: 'unknown', previousState: null, attributes: {},
            durationSeconds: null, changed: false,
            isDriver: id === driver, isFastFlip: false, timezone: tz,
          };
          continue;
        }
        const prev = pe.idx > 0 ? pe.list[pe.idx - 1] : null;
        entityStates[id] = {
          entityId: id,
          friendlyName: this._friendlyName(id),
          state: entry.state,
          previousState: prev ? prev.state : null,
          attributes: entry.attributes,
          durationSeconds: entry.durationSeconds,
          // "Changed at this step" = this entity is the one that just fired.
          changed: id === ev.entityId,
          isDriver: id === driver,
          isFastFlip: entry.durationSeconds !== null && entry.durationSeconds < threshold,
          timezone: tz,
        };
      }
      steps.push({ timestamp: ev.ts, changedEntityId: ev.entityId, entityStates });
    }
    return steps;
  }

  // --------------------------------------------------------------------------
  // Stepper navigation, marks, expand
  // --------------------------------------------------------------------------

  _stepPrev() { if (this._currentStep > 0) this._currentStep -= 1; }
  _stepNext() { if (this._currentStep < this._steps.length - 1) this._currentStep += 1; }
  _refStepPrev() { if (this._refCurrentStep > 0) this._refCurrentStep -= 1; }
  _refStepNext() {
    const last = (this._reference && this._reference.steps.length - 1) || 0;
    if (this._refCurrentStep < last) this._refCurrentStep += 1;
  }
  _doMarkStart() { this._markStart = this._currentStep; }
  _doMarkEnd() { this._markEnd = this._currentStep; }
  _toggleExpand(entityId) {
    const next = new Set(this._expanded);
    next.has(entityId) ? next.delete(entityId) : next.add(entityId);
    this._expanded = next;
  }

  // --------------------------------------------------------------------------
  // Export / import
  // --------------------------------------------------------------------------

  _exportAll() {
    if (this._steps.length === 0) return;
    this._writeExport(0, this._steps.length - 1);
  }

  _exportSelection() {
    if (this._markStart === null || this._markEnd === null) return;
    // Marks may be set in either order; normalize before slicing.
    const lo = Math.min(this._markStart, this._markEnd);
    const hi = Math.max(this._markStart, this._markEnd);
    this._writeExport(lo, hi);
  }

  _writeExport(loIdx, hiIdx) {
    const tz = this._timeZone;
    const slice = this._steps.slice(loIdx, hiIdx + 1);
    const driverId = this._driverEntityId;
    const driverFriendly = driverId ? this._friendlyName(driverId) : null;
    const payload = {
      exported_at: new Date().toISOString(),
      timezone: tz,
      driver_entity_id: driverId,
      driver_friendly_name: driverFriendly,
      range_start: slice[0].timestamp,
      range_end: slice[slice.length - 1].timestamp,
      step_count: slice.length,
      steps: slice.map((step, i) => ({
        step_index: i + 1,
        timestamp_utc: step.timestamp,
        timestamp_local: formatLocalIsoWithOffset(step.timestamp, tz),
        changed_entity_id: step.changedEntityId,
        entities: this._orderedEntityList(step).map((es) => ({
          entity_id: es.entityId,
          friendly_name: es.friendlyName,
          state: es.state,
          previous_state: es.previousState,
          duration_seconds: es.durationSeconds,
          changed: es.changed,
          is_driver: es.isDriver,
          is_fast_flip: es.isFastFlip,
          attributes: es.attributes,
        })),
      })),
    };
    const stamp = formatFilenameStamp(new Date(slice[0].timestamp), tz);
    const slug = driverFriendly ? driverFriendly.toLowerCase().replace(/\s+/g, '_') : null;
    const filename = slug ? `${slug}_${stamp}.json` : `state_timeline_${stamp}.json`;

    // Anchor-click is the only cross-browser way to trigger a download from
    // a Blob without a real server. Revoke the URL afterwards to free memory.
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  // Driver first, then alphabetical. Works for both live and reference steps
  // because each entity entry carries its own isDriver flag (set at build
  // time for live, deserialized from JSON for reference). Used by render and
  // export so they stay consistent.
  _orderedEntityList(step) {
    const ids = Object.keys(step.entityStates);
    ids.sort((a, b) => {
      const ad = step.entityStates[a].isDriver;
      const bd = step.entityStates[b].isDriver;
      if (ad && !bd) return -1;
      if (bd && !ad) return 1;
      return a.localeCompare(b);
    });
    return ids.map((id) => step.entityStates[id]);
  }

  // Convert an imported JSON payload (snake_case, entities-as-array) into the
  // internal shape used by the live stepper (camelCase, entityStates-as-map).
  // Keeping one shape lets render and ordering helpers serve both panels.
  _normalizeReference(data) {
    return {
      ...data,
      steps: data.steps.map((s) => ({
        timestamp: s.timestamp_utc,
        changedEntityId: s.changed_entity_id,
        entityStates: Object.fromEntries(
          (s.entities || []).map((e) => [e.entity_id, {
            entityId: e.entity_id,
            friendlyName: e.friendly_name,
            state: e.state,
            previousState: e.previous_state,
            attributes: e.attributes || {},
            durationSeconds: e.duration_seconds,
            changed: !!e.changed,
            isDriver: !!e.is_driver,
            isFastFlip: !!e.is_fast_flip,
          }]),
        ),
      })),
    };
  }

  async _onImportFile(ev) {
    const file = ev.target.files && ev.target.files[0];
    if (!file) return;
    try {
      const data = JSON.parse(await file.text());
      // Sanity-check the shape so we fail fast on the wrong file type.
      if (!data || !Array.isArray(data.steps)) throw new Error('missing steps array');
      this._reference = this._normalizeReference(data);
      this._refCurrentStep = 0;
      this._error = '';
    } catch (err) {
      this._error = 'Invalid timeline JSON file';
      this._reference = null;
    }
    // Clear the input so re-importing the same file re-fires `change`.
    ev.target.value = '';
  }

  // --------------------------------------------------------------------------
  // Render
  // --------------------------------------------------------------------------

  render() {
    // Defensive: HA may instantiate the card before hass is set.
    if (!this.hass) return html`<ha-card><div class="empty">Waiting for Home Assistant…</div></ha-card>`;
    const showLive = this._steps.length > 0;
    const showRef = !!this._reference;
    return html`
      <ha-card>
        <div class="card-content">
          ${this._renderEntitySelection()}
          ${this._renderTimeRange()}
          ${this._renderSearchSection()}
          ${showLive || showRef ? html`
            <div class="stepper-container ${showLive && showRef ? 'twin' : ''}">
              ${showLive ? this._renderStepper() : ''}
              ${showRef ? this._renderReferencePanel() : ''}
            </div>
          ` : ''}
          ${this._renderImportSection()}
        </div>
      </ha-card>
    `;
  }

  _renderEntitySelection() {
    const groups = this._entitiesForDevice(this._selectedDeviceId);
    const hasDevice = Object.keys(groups).length > 0;
    const otherEntities = Array.from(this._addedEntities);
    const devices = this._sortedDevices();
    const allEntities = this.hass && this.hass.states ? Object.keys(this.hass.states).sort() : [];
    const collapsed = this._entityCollapsed;
    // One-line summary shown when collapsed: count + driver friendly name
    // so the user knows what they're querying without expanding the section.
    const selCount = this._selectedEntities.size;
    const driverName = this._driverEntityId ? this._friendlyName(this._driverEntityId) : null;
    const summary = collapsed
      ? `${selCount} ${selCount === 1 ? 'entity' : 'entities'}${driverName ? ` · ★ ${driverName}` : ''}`
      : '';
    return html`
      <section class="block">
        <h3 class="collapsible" @click=${() => this._entityCollapsed = !collapsed}>
          <span class="chevron">${collapsed ? '▶' : '▼'}</span>
          Entities
          ${collapsed ? html`<span class="header-summary">${summary}</span>` : ''}
        </h3>
        ${collapsed ? '' : html`
        <label class="picker-label">Device
          <select class="native-picker" .value=${this._selectedDeviceId || ''} @change=${this._onDeviceChanged}>
            <option value="">— Select a device —</option>
            ${devices.map((d) => html`
              <option value=${d.id} ?selected=${d.id === this._selectedDeviceId}>
                ${d.area ? `${d.label} — ${d.area}` : d.label}
              </option>
            `)}
          </select>
        </label>
        ${hasDevice ? html`
          <div class="row links">
            <a @click=${this._selectAllForDevice}>Select all</a>
            <a @click=${this._deselectAllForDevice}>Deselect all</a>
          </div>
          ${Object.keys(groups).sort().map((domain) => {
            const ids = groups[domain];
            const isCollapsed = this._collapsedDomains.has(domain);
            const selCount = ids.filter((id) => this._selectedEntities.has(id)).length;
            const allChecked = selCount === ids.length;
            return html`
              <div class="group-header" @click=${() => this._toggleDomain(domain)}>
                <span class="chevron">${isCollapsed ? '▶' : '▼'}</span>
                <span class="group-label-text">${domain}</span>
                <span class="group-count">${selCount}/${ids.length}</span>
                <a class="group-action" @click=${(e) => { e.stopPropagation(); this._toggleAllInDomain(domain); }}>
                  ${allChecked ? 'Deselect all' : 'Select all'}
                </a>
              </div>
              ${isCollapsed ? '' : ids.map((id) => this._renderEntityRow(id))}
            `;
          })}
        ` : ''}
        ${otherEntities.length > 0 ? html`
          <div class="group-label">other</div>
          ${otherEntities.map((id) => this._renderEntityRow(id))}
        ` : ''}
        <label class="picker-label">Add entity
          <input class="native-picker" list="hstc-entity-list" placeholder="domain.entity_id"
            @change=${this._onAddEntity} />
          <datalist id="hstc-entity-list">
            ${allEntities.map((id) => html`<option value=${id}></option>`)}
          </datalist>
        </label>
        <div class="hint">★ marks the driver — shown first in the stepper and used as the export filename prefix. × removes a manually added entity.</div>
        `}
      </section>
    `;
  }

  _renderEntityRow(entityId) {
    const checked = this._selectedEntities.has(entityId);
    const isDriver = this._driverEntityId === entityId;
    const isAdded = this._addedEntities.has(entityId);
    return html`
      <div class="entity-row">
        <input type="checkbox" .checked=${checked} @change=${() => this._toggleEntity(entityId)} />
        <button class="star ${isDriver ? 'driver' : ''}" title="Set as driver"
          @click=${() => this._setDriver(entityId)}>★</button>
        <div class="entity-label">
          <div class="primary">${this._friendlyName(entityId)}</div>
          <div class="secondary">${entityId}</div>
        </div>
        ${isAdded ? html`<button class="remove-btn" title="Remove entity"
          @click=${() => this._removeAddedEntity(entityId)}>×</button>` : ''}
      </div>
    `;
  }

  _renderTimeRange() {
    return html`
      <section class="block">
        <h3>Time range</h3>
        <div class="time-row">
          <label>Begin
            <input type="datetime-local" .value=${this._beginInput} @input=${this._onBeginInput} />
          </label>
          <label>End
            <input type="datetime-local" .value=${this._endInput} @input=${this._onEndInput} />
          </label>
          <div class="chips">
            <button class="chip" @click=${() => this._setPreset(10)}>10m</button>
            <button class="chip" @click=${() => this._setPreset(15)}>15m</button>
            <button class="chip" @click=${() => this._setPreset(20)}>20m</button>
            <button class="chip" @click=${() => this._setPreset(60 * 24)}>24h</button>
            <button class="chip" @click=${this._setEndToNow}>Now</button>
          </div>
        </div>
        ${this._renderRetentionWarning()}
      </section>
    `;
  }

  // Surface the recorder retention boundary up-front. Without this an empty
  // result from a too-old query is indistinguishable from "nothing changed,"
  // which is the silent-failure trap we explicitly want to avoid.
  _renderRetentionWarning() {
    if (!this._beginInput) return '';
    const begin = parseLocalInput(this._beginInput, this._timeZone);
    if (!begin) return '';
    const keepDays = this._config.recorder_keep_days;
    const cutoff = new Date(Date.now() - keepDays * 86400000);
    if (begin >= cutoff) return '';
    return html`<div class="retention-warning">
      Begin is older than your recorder retention (${keepDays} days). Entries past the
      cutoff have likely been purged — this query may return empty or partial results.
    </div>`;
  }

  _renderSearchSection() {
    return html`
      <section class="block">
        <button class="primary-btn" @click=${this._search} ?disabled=${this._loading}>
          ${this._loading ? 'Searching…' : 'Search'}
        </button>
        ${this._error ? html`<div class="error">${this._error}</div>` : ''}
      </section>
    `;
  }

  _renderStepper() {
    const step = this._steps[this._currentStep];
    const ordered = this._orderedEntityList(step);
    const total = this._steps.length;
    return html`
      <section class="block stepper">
        <div class="stepper-header">
          <span>Step ${this._currentStep + 1} of ${total}</span>
          <span class="ts">${formatDisplayTimestamp(step.timestamp, this._timeZone)}</span>
        </div>
        <div class="entity-table">
          <div class="table-header">
            <div>Entity</div><div>Previous</div><div>Current</div><div>Duration</div><div></div>
          </div>
          ${ordered.map((es) => this._renderStepRow(es))}
        </div>
        <div class="nav-row">
          <button class="nav-btn" ?disabled=${this._currentStep === 0} @click=${this._stepPrev}>◀ Prev</button>
          <div class="mark-buttons">
            <button class="mark-btn ${this._markStart !== null ? 'marked' : ''}" @click=${this._doMarkStart}>
              ${this._markStart !== null ? `Start: Step ${this._markStart + 1}` : 'Mark Start'}
            </button>
            <button class="mark-btn ${this._markEnd !== null ? 'marked' : ''}" @click=${this._doMarkEnd}>
              ${this._markEnd !== null ? `End: Step ${this._markEnd + 1}` : 'Mark End'}
            </button>
          </div>
          <button class="nav-btn" ?disabled=${this._currentStep === total - 1} @click=${this._stepNext}>Next ▶</button>
        </div>
        <div class="export-row">
          <button class="export-btn" ?disabled=${this._markStart === null || this._markEnd === null}
            @click=${this._exportSelection}>Export Selection</button>
          <button class="export-btn" @click=${this._exportAll}>Export All</button>
        </div>
        <div class="hint">⚡ = state change shorter than ${this._config.fast_flip_threshold_seconds}s. ▶ on a row expands the raw attributes JSON. Mark Start + Mark End enables Export Selection.</div>
      </section>
    `;
  }

  // Single row renderer shared by live and reference panels so the two
  // tables line up visually for pattern matching. Reference passes
  // noExpand=true: attribute inspection lives only on the live side, both
  // to keep the reference column lean and because reading attributes off a
  // dead snapshot is rarely what the user wants.
  _renderStepRow(es, noExpand = false) {
    const expanded = !noExpand && this._expanded.has(es.entityId);
    const classes = ['step-row', es.changed && 'changed', es.isFastFlip && 'fast-flip', es.isDriver && 'driver-row']
      .filter(Boolean).join(' ');
    const durLabel = es.durationSeconds === null ? 'current' : formatDuration(es.durationSeconds);
    return html`
      <div class=${classes}>
        <div class="cell entity-cell">
          ${es.isDriver ? html`<span class="star-inline">★</span>` : ''}
          <span>${es.friendlyName}</span>
        </div>
        <div class="cell mono">${es.previousState ?? '—'}</div>
        <div class="cell mono current ${es.changed ? 'highlight' : 'muted'}">${es.state}</div>
        <div class="cell">
          ${es.changed ? durLabel : '—'}
          ${es.changed && es.isFastFlip ? html`<span class="flip-icon" title="Fast flip">⚡</span>` : ''}
        </div>
        <div class="cell">
          ${noExpand ? '' : html`<button class="expand-btn" @click=${() => this._toggleExpand(es.entityId)}>${expanded ? '▼' : '▶'}</button>`}
        </div>
      </div>
      ${expanded ? html`<div class="attr-block"><pre>${JSON.stringify(es.attributes, null, 2)}</pre></div>` : ''}
    `;
  }

  _renderImportSection() {
    return html`
      <section class="block">
        <label class="import-label">
          <input type="file" accept=".json,application/json" @change=${this._onImportFile} />
          <span class="export-btn">Load Reference JSON</span>
        </label>
      </section>
    `;
  }

  // Twin stepper for the imported reference. Mirrors the live stepper's
  // column layout so the user can visually pattern-match across the two
  // panels. Independent ◀/▶ — no automatic alignment; durations and
  // timestamps will drift between runs and any computed match would mislead.
  _renderReferencePanel() {
    const ref = this._reference;
    if (!ref.steps || ref.steps.length === 0) return '';
    const idx = Math.min(this._refCurrentStep, ref.steps.length - 1);
    const step = ref.steps[idx];
    const ordered = this._orderedEntityList(step);
    const tz = ref.timezone || this._timeZone;
    const total = ref.steps.length;
    return html`
      <section class="block stepper reference">
        <div class="stepper-header">
          <span>Ref ${idx + 1} of ${total}</span>
          <span class="ts">${formatDisplayTimestamp(step.timestamp, tz)}</span>
        </div>
        <div class="entity-table">
          <div class="table-header">
            <div>Entity</div><div>Previous</div><div>Current</div><div>Duration</div><div></div>
          </div>
          ${ordered.map((es) => this._renderStepRow(es, true))}
        </div>
        <div class="nav-row">
          <button class="nav-btn" ?disabled=${idx === 0} @click=${this._refStepPrev}>◀ Prev</button>
          <span class="ref-label">${ref.driver_friendly_name || 'No driver'}</span>
          <button class="nav-btn" ?disabled=${idx === total - 1} @click=${this._refStepNext}>Next ▶</button>
        </div>
      </section>
    `;
  }

  // --------------------------------------------------------------------------
  // Styles. All colors and fonts route through HA CSS custom properties so the
  // card picks up light/dark themes automatically. The stepper deliberately
  // uses a dense grid layout — a developer scanning many entities at once
  // wants tight rows, not whitespace.
  // --------------------------------------------------------------------------

  static styles = css`
    :host { display: block; }
    ha-card { padding: 0; }
    .card-content { padding: 16px; display: flex; flex-direction: column; gap: 16px; }
    .block { display: flex; flex-direction: column; gap: 8px; }
    h3 { margin: 0; font-size: 0.95em; font-weight: 500; color: var(--secondary-text-color);
         text-transform: uppercase; letter-spacing: 0.04em; }
    h3.collapsible { cursor: pointer; user-select: none; display: flex;
                     align-items: center; gap: 6px; }
    h3.collapsible:hover { color: var(--primary-text-color); }
    h3 .chevron { font-size: 0.7em; color: var(--secondary-text-color); }
    h3 .header-summary { font-weight: 400; text-transform: none; letter-spacing: 0;
                         color: var(--primary-text-color); margin-left: 8px;
                         font-size: 0.95em; }
    .empty { padding: 24px; color: var(--secondary-text-color); text-align: center; }
    .row { display: flex; gap: 8px; align-items: center; }
    .links { gap: 16px; font-size: 0.9em; }
    .links a { color: var(--primary-color); cursor: pointer; text-decoration: underline; }
    .group-label { margin-top: 8px; font-size: 0.75em; text-transform: uppercase;
                   color: var(--secondary-text-color); letter-spacing: 0.06em;
                   border-bottom: 1px solid var(--divider-color); padding-bottom: 2px; }
    .group-header { display: flex; align-items: center; gap: 8px; margin-top: 8px;
                    padding-bottom: 2px; border-bottom: 1px solid var(--divider-color);
                    cursor: pointer; user-select: none; }
    .group-header:hover .group-label-text { color: var(--primary-text-color); }
    .group-label-text { font-size: 0.75em; text-transform: uppercase;
                        letter-spacing: 0.06em; color: var(--secondary-text-color); }
    .group-count { font-size: 0.75em; color: var(--secondary-text-color);
                   font-family: var(--code-font-family, monospace); }
    .group-action { margin-left: auto; font-size: 0.8em; color: var(--primary-color);
                    cursor: pointer; text-decoration: underline; }
    .picker-label { display: flex; flex-direction: column; gap: 2px;
                    font-size: 0.8em; color: var(--secondary-text-color); }
    .native-picker { background: var(--card-background-color);
      color: var(--primary-text-color); border: 1px solid var(--divider-color);
      border-radius: 4px; padding: 6px 8px; font-family: inherit; font-size: 0.95em;
      width: 100%; box-sizing: border-box; }
    .native-picker:focus { outline: none; border-color: var(--primary-color); }
    .entity-row { display: flex; align-items: center; gap: 8px; padding: 4px 0; }
    .entity-row input[type='checkbox'] { accent-color: var(--primary-color); }
    .star { background: none; border: none; cursor: pointer; font-size: 1.2em;
            color: var(--disabled-color); padding: 0 2px; }
    .star.driver { color: var(--primary-color); }
    .entity-label .primary { font-size: 0.95em; color: var(--primary-text-color); }
    .entity-label .secondary { font-size: 0.8em; color: var(--secondary-text-color);
                               font-family: var(--code-font-family, monospace); }
    .remove-btn { background: none; border: none; cursor: pointer;
                  color: var(--secondary-text-color); font-size: 1.2em;
                  line-height: 1; padding: 0 6px; margin-left: auto; }
    .remove-btn:hover { color: var(--error-color); }
    .hint { font-size: 0.8em; color: var(--secondary-text-color);
            font-style: italic; padding: 4px 0; line-height: 1.4; }

    .time-row { display: flex; flex-wrap: wrap; gap: 12px; align-items: end; }
    .time-row label { display: flex; flex-direction: column; font-size: 0.8em;
                      color: var(--secondary-text-color); gap: 2px; }
    .time-row input[type='datetime-local'] { background: var(--card-background-color);
      color: var(--primary-text-color); border: 1px solid var(--divider-color);
      border-radius: 4px; padding: 4px 6px; font-family: inherit; }
    .chips { display: flex; gap: 4px; align-items: center; flex-wrap: wrap; }
    .chip { background: transparent; color: var(--primary-color);
            border: 1px solid var(--primary-color); border-radius: 999px;
            padding: 2px 10px; font-size: 0.85em; cursor: pointer; }
    .chip:hover { background: var(--primary-color); color: var(--text-primary-color, white); }

    .primary-btn { background: var(--primary-color); color: var(--text-primary-color, white);
      border: none; border-radius: 4px; padding: 8px 16px; cursor: pointer;
      font-size: 0.95em; align-self: flex-start; }
    .primary-btn[disabled] { opacity: 0.6; cursor: wait; }
    .error { color: var(--error-color); font-size: 0.9em; }
    .retention-warning { color: var(--warning-color); font-size: 0.85em;
                         padding: 4px 0; line-height: 1.3; }

    .stepper-header { display: flex; justify-content: space-between; align-items: baseline;
                      padding-bottom: 4px; border-bottom: 1px solid var(--divider-color); }
    .stepper-header .ts { font-family: var(--code-font-family, monospace); color: var(--secondary-text-color); }
    .entity-table { display: flex; flex-direction: column; }
    .table-header, .step-row { display: grid; grid-template-columns: 2fr 1.4fr 1.4fr 1fr 32px;
                               gap: 8px; align-items: center; padding: 6px 8px;
                               border-left: 3px solid transparent; }
    .table-header { font-size: 0.75em; color: var(--secondary-text-color);
                    text-transform: uppercase; border-bottom: 1px solid var(--divider-color); }
    /* Subtle 3px left border on changed rows. Background change would be too heavy. */
    .step-row.changed { border-left-color: var(--primary-color); }
    .step-row.fast-flip { background: color-mix(in srgb, var(--warning-color) 10%, transparent); }
    .cell { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .mono { font-family: var(--code-font-family, monospace); font-size: 0.9em; }
    .current.highlight { font-weight: 600; color: var(--primary-text-color); }
    .current.muted { color: var(--secondary-text-color); }
    .entity-cell { display: flex; align-items: center; gap: 4px; }
    .star-inline { color: var(--primary-color); }
    .flip-icon { color: var(--warning-color); margin-left: 4px; }
    .expand-btn { background: none; border: none; color: var(--secondary-text-color);
                  cursor: pointer; font-size: 0.85em; }
    .attr-block { background: var(--secondary-background-color); padding: 8px;
                  border-radius: 4px; margin: 4px 0; }
    .attr-block pre { margin: 0; font-family: var(--code-font-family, monospace);
                      font-size: 0.85em; white-space: pre; overflow-x: auto;
                      color: var(--primary-text-color); }

    .nav-row { display: flex; justify-content: space-between; align-items: center;
               gap: 8px; margin-top: 8px; }
    .nav-btn, .mark-btn, .export-btn { background: transparent; color: var(--primary-text-color);
      border: 1px solid var(--divider-color); border-radius: 4px;
      padding: 6px 12px; cursor: pointer; font-size: 0.9em; }
    .nav-btn[disabled] { opacity: 0.4; cursor: not-allowed; }
    .mark-buttons { display: flex; gap: 8px; }
    .mark-btn.marked { border-color: var(--success-color); color: var(--success-color); }
    .export-row { display: flex; gap: 8px; margin-top: 8px; }
    .export-btn[disabled] { opacity: 0.4; cursor: not-allowed; }

    .import-label { display: inline-block; cursor: pointer; }
    .import-label input[type='file'] { display: none; }

    /* Twin layout: side-by-side when both live and reference are visible.
       Stacks back to a column on narrow viewports via flex-wrap. */
    .stepper-container { display: flex; flex-direction: column; gap: 16px; }
    .stepper-container.twin { flex-direction: row; align-items: flex-start; flex-wrap: wrap; }
    .stepper-container.twin > section { flex: 1 1 360px; min-width: 0; }
    .reference .stepper-header { border-bottom-color: var(--primary-color); opacity: 0.85; }
    .ref-label { color: var(--secondary-text-color); font-size: 0.85em;
                 font-family: var(--code-font-family, monospace); }
  `;
}

customElements.define('ha-state-timeline-card', HaStateTimelineCard);

// -----------------------------------------------------------------------------
// Visual config editor
//
// HA provides `ha-form`, a schema-driven form element that handles inputs,
// labels, validation, and theming for us. We declare a schema and let it
// render — no hand-built UI. The editor receives the current config via
// setConfig() and dispatches `config-changed` events that the card framework
// uses to update the YAML representation.
// -----------------------------------------------------------------------------

const EDITOR_SCHEMA = [
  { name: 'fast_flip_threshold_seconds', required: false,
    selector: { number: { min: 1, max: 600, mode: 'box', unit_of_measurement: 's' } } },
  { name: 'recorder_keep_days', required: false,
    selector: { number: { min: 1, max: 3650, mode: 'box', unit_of_measurement: 'days' } } },
];

const EDITOR_LABELS = {
  fast_flip_threshold_seconds: 'Fast flip threshold (seconds)',
  recorder_keep_days: 'Recorder retention (days)',
};

const EDITOR_HELPERS = {
  fast_flip_threshold_seconds: 'State changes shorter than this get a ⚡ flag and row highlight.',
  recorder_keep_days: 'Match your recorder purge_keep_days. Used only to warn when Begin exceeds retention.',
};

class HaStateTimelineCardEditor extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
  };

  setConfig(config) { this._config = { ...config }; }

  _onValueChanged(ev) {
    // ha-form emits the full merged config in detail.value. Forward it
    // upward so the card framework can persist it back to YAML.
    this.dispatchEvent(new CustomEvent('config-changed', {
      detail: { config: ev.detail.value },
      bubbles: true, composed: true,
    }));
  }

  render() {
    if (!this.hass || !this._config) return html``;
    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${EDITOR_SCHEMA}
        .computeLabel=${(s) => EDITOR_LABELS[s.name] || s.name}
        .computeHelper=${(s) => EDITOR_HELPERS[s.name] || ''}
        @value-changed=${this._onValueChanged}
      ></ha-form>
    `;
  }

  static styles = css`
    ha-form { display: block; padding: 8px 0; }
  `;
}

customElements.define('ha-state-timeline-card-editor', HaStateTimelineCardEditor);

// Register with HA's custom card directory so it shows up in the visual card
// picker and so the dev-tools "view card" link works.
window.customCards = window.customCards || [];
window.customCards.push({
  type: 'ha-state-timeline-card',
  name: 'State Timeline Card',
  description: 'Step through historical state transitions across multiple entities. Built for debugging automations and integrations.',
});
