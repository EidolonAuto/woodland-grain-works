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
        /<link[^>]*rel="canonical"[^>]*href="https:\/\/eidolonauto\.github\.io\/woodland-grain-works\//,
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
          access(new URL(`../${reference.split("?")[0]}`, import.meta.url)),
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

  const motion = await read("js/motion.js");
  const animations = await read("css/animations.css");
  const home = await read("css/pages/home.css");
  const internal = await read("css/pages/internal.css");
  assert.match(motion, /initPageIntro/);
  assert.match(motion, /const approach/);
  assert.match(motion, /--parallax-near/);
  assert.match(animations, /\.js:not\(\.is-ready\)/);
  assert.match(home, /\.depth-scene/);
  assert.match(home, /\.portal__index/);
  const homepage = await read("index.html");
  assert.match(homepage, /assets\/generated\/hd\/mountain\.png/);
  assert.match(homepage, /assets\/generated\/hd\/forest\.png/);
  assert.doesNotMatch(homepage, /assets\/generated\/3d\//);
  assert.match(home, /perspective:\s*72rem/);
  assert.match(internal, /clip-path:\s*inset\(0 0 100% 0\)/);
  const transitions = await read("js/page-transitions.js");
  assert.match(motion, /initDepthScenes/);
  assert.match(transitions, /sessionStorage/);
  assert.match(transitions, /environment\.reducedMotion/);
  assert.match(animations, /page-dolly-out/);
});

test("supplied brand art is integrated without the unrelated image", async () => {
  const homepage = await read("index.html");
  const services = await read("services.html");
  const portfolio = await read("js/portfolio.js");
  const designNotes = await read("assets/generated/README.md");
  assert.match(homepage, /woodland-night-road-source\.jpg/);
  assert.match(homepage, /doors-heading__divider/);
  assert.doesNotMatch(homepage, /assets\/generated\/hd\/divider\.png/);
  assert.match(services, /capability__readout/);
  assert.doesNotMatch(services, /service-(?:laser|automotive|smart-home)\.png/);
  assert.doesNotMatch(`${homepage}${services}`, /\b(?:fire|angel|wing)\b/i);
  assert.doesNotMatch(portfolio, /assets\/branding\/source\//);
  assert.doesNotMatch(`${homepage}${portfolio}`, /woodland-night-road-v2\.jpg/);
  assert.match(
    designNotes,
    /unrelated fire-wing image[\s\S]*not stored or referenced/i,
  );
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

test("project note builder is useful without implying network submission", async () => {
  const html = await read("contact.html");
  const script = await read("js/project-note.js");
  assert.match(html, /data-project-note/);
  assert.match(html, /Nothing is sent or stored by this page/);
  assert.doesNotMatch(html, /action=/);
  assert.match(script, /navigator\.clipboard/);
  assert.doesNotMatch(script, /fetch\(|XMLHttpRequest/);
});
