// Static theme contract checks; these do NOT replace WebView2 visual tests.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const css = readFileSync(new URL('../src/settings/settings.css', import.meta.url), 'utf8');

test('native controls retain explicit dark popup colors', () => {
  assert.match(css, /color-scheme:\s*dark/);
  assert.match(css, /select option\s*\{[^}]*background-color:[^}]*color:/);
});

test('settings theme preserves the existing semantic class contracts', () => {
  for (const selector of ['.switch.on', '.notice.ok', '.notice.err', '.notice.warn', '.diff .add', '.diff .del', '.palette .swatch.on', '.keycap.recording', '.hint.full']) {
    assert.ok(css.includes(selector), `Missing ${selector}`);
  }
});

test('pill controls reserve a consistent grid column', () => {
  assert.match(css, /\.pill-row\s*\{[^}]*display:\s*grid/);
  assert.match(css, /grid-template-columns:\s*10px minmax\(0,1fr\) minmax\(0,auto\) 40px/);
});

test('keyboard focus and reduced motion have explicit support', () => {
  assert.ok(css.includes(':focus-visible'));
  assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);
  assert.match(css, /transition:\s*none\s*!important/);
  assert.match(css, /animation:\s*none\s*!important/);
});

test('narrow windows and high contrast have explicit fallbacks', () => {
  assert.match(css, /@media\s*\(max-width:\s*560px\)/);
  assert.match(css, /@media\s*\(forced-colors:\s*active\)/);
  assert.ok(css.includes('html[dir="rtl"]'));
});
