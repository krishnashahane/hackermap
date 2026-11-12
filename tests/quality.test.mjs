import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = (path) => readFileSync(resolve(root, path), 'utf8');

const html = read('index.html');
const app = read('app.js');
const css = read('style.css');
const readme = read('README.md');

test('all application DOM references exist in the HTML document', () => {
    const referencedIds = [...app.matchAll(/getElementById\(['"]([^'"]+)['"]\)/g)]
        .map((match) => match[1]);
    const declaredIds = new Set([...html.matchAll(/\bid=["']([^"']+)["']/g)]
        .map((match) => match[1]));

    assert.ok(referencedIds.length > 0, 'expected app.js to reference DOM elements');
    for (const id of referencedIds) {
        assert.ok(declaredIds.has(id), `Missing #${id} in index.html`);
    }
});

test('static runtime assets referenced by HTML exist', () => {
    for (const [, assetPath] of html.matchAll(/(?:src|href)=["'](?!https?:|\/\/|#)([^"']+)["']/g)) {
        assert.ok(existsSync(resolve(root, assetPath)), `Missing local asset: ${assetPath}`);
    }
    assert.ok(existsSync(resolve(root, 'LICENSE')));
});

test('Content Security Policy avoids permissive script execution directives', () => {
    const policy = html.match(/http-equiv="Content-Security-Policy" content="([^"]+)"/)?.[1];
    assert.ok(policy, 'CSP meta policy should be present');
    assert.match(policy, /default-src 'self'/);
    assert.match(policy, /object-src 'none'/);
    assert.match(policy, /base-uri 'none'/);
    assert.match(policy, /script-src 'self' https:\/\/cdn\.jsdelivr\.net\/npm\/globe\.gl@2\.46\.2\/dist\//);
    assert.doesNotMatch(policy, /unsafe-eval|unsafe-inline/);
});

test('simulated IPs use RFC 5737 documentation-only address ranges', () => {
    assert.match(app, /192\.0\.2/);
    assert.match(app, /198\.51\.100/);
    assert.match(app, /203\.0\.113/);
    assert.match(readme, /RFC 5737/);
});

test('tooltip strings are escaped and dynamic UI avoids HTML injection sinks', () => {
    assert.match(app, /function escapeHtml\(value\)/);
    assert.match(app, /escapeHtml\(d\.srcIP\)/);
    assert.match(app, /escapeHtml\(d\.tgtIP\)/);
    assert.doesNotMatch(app, /\.innerHTML\s*=|\beval\s*\(|new Function\s*\(/);
});

test('simulation resources are bounded and timers have a shutdown path', () => {
    for (const constant of ['MAX_ARCS', 'MAX_FEED_ITEMS', 'MAX_HISTORY']) {
        assert.match(app, new RegExp(`\\b${constant}:\\s*[1-9]\\d*`));
    }
    assert.match(app, /function stopSimulation\(\)/);
    assert.match(app, /pendingBurstTimers\.forEach\(window\.clearTimeout\)/);
    assert.match(app, /addEventListener\('pagehide'/);
});

test('reduced-motion support is present in both application and styles', () => {
    assert.match(app, /prefers-reduced-motion/);
    assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
});

test('README clearly identifies the project as a local simulation', () => {
    assert.match(readme, /Simulation only/);
    assert.match(readme, /does not receive real threat telemetry/);
});
