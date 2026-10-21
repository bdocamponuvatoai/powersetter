import test from "node:test";
import assert from "node:assert/strict";
import { articles, faqs, isInterest, stateTiles } from "./content.ts";
import { site } from "./site.ts";

test("tile map has every state plus DC exactly once, with no overlapping tiles", () => {
  assert.equal(stateTiles.length, 51);
  assert.equal(new Set(stateTiles.map(([state]) => state)).size, 51);
  assert.equal(new Set(stateTiles.map(([, col, row]) => `${col},${row}`)).size, 51);
});

test("tile map includes every listed state", () => {
  const states = new Set(stateTiles.map(([state]) => state));
  for (const state of site.listedStates) assert.ok(states.has(state), state);
});

test("interest allowlist rejects unknown query values", () => {
  assert.equal(isInterest("solar"), true);
  assert.equal(isInterest("<script>"), false);
  assert.equal(isInterest(null), false);
});

test("article slugs are unique and URL-safe", () => {
  const slugs = articles.map((article) => article.slug);
  assert.equal(new Set(slugs).size, slugs.length);
  for (const slug of slugs) assert.match(slug, /^[a-z0-9-]+$/);
});

test("copy never promises savings, rankings or guarantees that are not verified", () => {
  const copy = JSON.stringify({ faqs, articles });
  for (const phrase of [/up to \d+%/i, /cheapest/i, /largest/i, /guarantee/i, /no hidden fees/i, /24\/7/i]) {
    assert.doesNotMatch(copy, phrase);
  }
});
