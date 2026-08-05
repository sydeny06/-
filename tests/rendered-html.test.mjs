import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the portfolio page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html[^>]+lang="zh-CN"/i);
  assert.match(html, /<title>[^<]*3D[^<]*<\/title>/i);
  assert.match(html, /PBR/);
});

test("keeps heavy media off the critical loading path", async () => {
  const [heroVideo, videoShowcase, page, gallery, learning] = await Promise.all([
    readFile(new URL("../app/HeroVideo.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/VideoShowcase.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/UeScenesGallery.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/LearningShowcase.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(heroVideo, /preload="none"/);
  assert.match(heroVideo, /requestIdleCallback/);
  assert.match(videoShowcase, /IntersectionObserver/);
  assert.match(videoShowcase, /preload=\{isSectionVisible && index === activeVideo \? "auto" : "none"\}/);

  for (const source of [page, gallery, learning]) {
    assert.match(source, /\.webp/);
    assert.match(source, /loading="lazy"/);
    assert.match(source, /decoding="async"/);
  }
});

test("defers and throttles continuous animation work", async () => {
  const [background, liquid, button, motion] = await Promise.all([
    readFile(new URL("../app/LiquidBackground.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/LiquidEther.jsx", import.meta.url), "utf8"),
    readFile(new URL("../app/SpecularButton.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/PortfolioMotion.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(background, /lazy\(\(\) => import\("\.\/LiquidEther"\)\)/);
  assert.match(background, /prefers-reduced-motion/);
  assert.match(liquid, /frameInterval = 1000 \/ 30/);
  assert.match(button, /now - lastRender < 1000 \/ 30/);
  assert.match(motion, /once:\s*true/);
});
