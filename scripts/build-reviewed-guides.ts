/** Deterministically render editor-authored data; no AI or database calls. */
import { writeFileSync, mkdirSync } from 'node:fs';
import { foundationGuides } from './editorial/foundation-review';
import { businessGuides } from './editorial/business-review';
import { marketingGuides } from './editorial/marketing-review';
import { toolsGuides } from './editorial/tools-review';
import { transformGuides } from './editorial/transform-review';
import { renderGuide } from './editorial/reviewed-guides';
import assert from 'node:assert/strict';
const groups = { foundation: foundationGuides, business: businessGuides, marketing: marketingGuides, tools: toolsGuides, transform: transformGuides };
const category = process.argv[2] as keyof typeof groups;
assert.ok(groups[category], 'Select a reviewed category');
const directory = `scripts/editorial/reviewed-${category}`;
mkdirSync(directory, { recursive: true });
const manifest = groups[category].map(g => {
  const content = renderGuide(g);
  assert.ok(content.length > 1800, `${g.slug} too short`);
  const file = `${directory}/${g.slug}.html`;
  writeFileSync(file, content + '\n');
  return { slug: g.slug, title: g.title, meta: g.meta, keywords: `${category},AI업무검수,${g.title.split(' — ')[0]}`, file };
});
writeFileSync(`${directory}/manifest.json`, JSON.stringify(manifest, null, 2) + '\n');
console.log(JSON.stringify({ rendered: manifest.length, manifest: `${directory}/manifest.json` }));
