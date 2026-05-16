// deploy.js — copy the freshly built bundle to the live HA www directory.
// Run via `npm run deploy` after editing src/. The DEPLOY_DEST env var lets
// you override the destination without editing this file.

import fs from 'node:fs';

const dest = process.env.DEPLOY_DEST || '\\\\192.168.4.104\\config\\www\\ha-state-timeline-card.js';
fs.copyFileSync('dist/ha-state-timeline-card.js', dest);
console.log(`Deployed to ${dest}`);
