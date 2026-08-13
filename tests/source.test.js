import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const pages = [
  "index.html",
  "services.html",
  "portfolio.html",
  "about.html",
  "contact.html",
];
const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("every public page provides semantic landmarks and production metadata", async () => {
  await Promise.all(
    pages.map(async (page) => {
      const html = await read(page);
      for (const landmark of ["<header", "<nav", "<main", "<footer"]) {
        assert.match(
          html,
          new RegExp(landmark),
          `${page} is missing ${landmark}`,
        );
      }
      assert.match(
        html,
        /<link rel="canonical" href="https:\/\/eidolonauto\.github\.io\/woodland-grain-works\//,
      );
      assert.doesNotMatch(html, /example\.com|href=["']#["']/);
    }),
  );
});

test("public page local asset and page references resolve", async () => {
  await Promise.all(
    pages.map(async (page) => {
      const html = await read(page);
      const references = [...html.matchAll(/(?:src|href)="([^"#]+)"/g)]
        .map((match) => match[1])
        .filter((reference) => !/^(?:https?:|mailto:)/.test(reference));
      await Promise.all(
        references.map((reference) =>
          access(new URL(`../${reference}`, import.meta.url)),
        ),
      );
    }),
  );
});

test("homepage is an interactive navigation hub with four real destinations", async () => {
  const html = await read("index.html");
  assert.match(html, /id="workshop-doors"/);
  assert.equal((html.match(/data-portal/g) || []).length, 4);
  for (const destination of pages.slice(1))
    assert.match(html, new RegExp(`href="${destination}"`));
});

test("advanced motion has reduced-motion fallbacks", async () => {
  for (const path of [
    "css/animations.css",
    "css/pages/home.css",
    "css/pages/internal.css",
  ]) {
    assert.match(await read(path), /prefers-reduced-motion:\s*reduce/);
  }
});

test("brand and focus tokens remain centralized", async () => {
  const tokens = await read("css/tokens.css");
  assert.match(tokens, /--color-purple-700:\s*#4f0e70/);
  assert.match(tokens, /--color-gold-500/);
  assert.match(tokens, /--focus-ring/);
});

test("portfolio studies are honest, linked, and keyboard accessible", async () => {
  const html = await read("portfolio.html");
  const script = await read("js/portfolio.js");
  assert.match(html, /It is not presented as commissioned customer work/);
  assert.match(script, /<a class="project-card__link"/);
  assert.match(script, /href="portfolio\.html#\$\{project\.slug\}"/);
});

test("inquiry form cannot imply a fake successful submission", async () => {
  const html = await read("contact.html");
  assert.match(html, /data-inquiry-form/);
  assert.match(html, /<button[\s\S]*?type="submit"[\s\S]*?disabled[\s\S]*?>/);
  assert.match(html, /secure endpoint/);
});
