import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('homepage provides semantic landmarks and real section targets', async () => {
  const html = await read('index.html');
  for (const landmark of ['<header', '<nav', '<main', '<footer']) assert.match(html, new RegExp(landmark));
  for (const id of ['services', 'work', 'process', 'contact']) assert.match(html, new RegExp(`id="${id}"`));
  assert.doesNotMatch(html, /href=["']#["']/);
});

test('homepage local asset references resolve', async () => {
  const html = await read('index.html');
  const references = [...html.matchAll(/(?:src|href)="([^"#]+)"/g)]
    .map((match) => match[1])
    .filter((reference) => !/^(?:https?:|mailto:)/.test(reference));

  await Promise.all(
    references.map((reference) => access(new URL(`../${reference}`, import.meta.url))),
  );
});

test('advanced motion has a reduced-motion fallback', async () => {
  const animationStyles = await read('css/animations.css');
  const pageStyles = await read('css/pages/home.css');
  assert.match(animationStyles, /prefers-reduced-motion:\s*reduce/);
  assert.match(pageStyles, /prefers-reduced-motion:\s*reduce/);
});

test('brand and focus tokens remain centralized', async () => {
  const tokens = await read('css/tokens.css');
  assert.match(tokens, /--color-purple-700:\s*#4f0e70/);
  assert.match(tokens, /--color-gold-500/);
  assert.match(tokens, /--focus-ring/);
});

test('inquiry form cannot imply a fake successful submission', async () => {
  const html = await read('index.html');
  assert.match(html, /data-inquiry-form/);
  assert.match(html, /<button[\s\S]*?type="submit"[\s\S]*?disabled[\s\S]*?>/);
  assert.match(html, /secure endpoint/);
});
