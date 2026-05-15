// build.js — produce dist/ha-state-timeline-card.js
//
// The source file imports Lit from unpkg so it runs unbundled during dev.
// For the production bundle we swap that to a bare `lit` import (resolved
// from node_modules), then esbuild --bundle --minify inlines everything.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import esbuild from 'esbuild';

const root = path.dirname(fileURLToPath(import.meta.url));
const srcPath = path.join(root, 'src', 'ha-state-timeline-card.js');
const tmpPath = path.join(root, 'src', '.__build_tmp.js');
const outPath = path.join(root, 'dist', 'ha-state-timeline-card.js');

const src = fs.readFileSync(srcPath, 'utf8');
const swapped = src.replace(
  /from\s+['"]https:\/\/unpkg\.com\/lit@[^'"]+['"]/,
  "from 'lit'",
);
fs.writeFileSync(tmpPath, swapped);

try {
  await esbuild.build({
    entryPoints: [tmpPath],
    bundle: true,
    minify: true,
    format: 'esm',
    target: ['es2020'],
    outfile: outPath,
  });
  console.log(`Built ${path.relative(root, outPath)}`);
} finally {
  fs.unlinkSync(tmpPath);
}
