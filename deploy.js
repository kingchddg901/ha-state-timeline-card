// deploy.js — copy the freshly built bundle into the HACS-managed install
// directory so changes show up after a dashboard reload, without the
// GitHub → HACS-update round trip.
//
// HACS will overwrite this file the next time you hit "Redownload" in HACS,
// which is fine — that's the production path. This script is for fast local
// iteration during development.
//
// We also regenerate the .gz beside the .js. HA's static handler can serve
// the pre-compressed file preferentially, and a stale .gz would silently
// override the fresh .js — the exact "why isn't my fix loading" trap.
//
// DEPLOY_DEST env var lets you override the destination without editing.

import fs from 'node:fs';
import zlib from 'node:zlib';

const dest = process.env.DEPLOY_DEST
  || '\\\\192.168.4.104\\config\\www\\community\\ha-state-timeline-card\\ha-state-timeline-card.js';
const src = 'dist/ha-state-timeline-card.js';

const buf = fs.readFileSync(src);
fs.writeFileSync(dest, buf);
fs.writeFileSync(dest + '.gz', zlib.gzipSync(buf));
console.log(`Deployed to ${dest} (+ .gz)`);
