import { expect, test } from "@playwright/test";

const publicOrigin = "https://venturiane.com";

test("all internal pages and assets are reachable", async ({ request }) => {
  const pending = [
    "/",
    "/en/",
    "/nl/",
    "/404.html",
    "/robots.txt",
    "/sitemap.xml",
  ];
  const visited = new Set<string>();

  while (pending.length > 0) {
    const path = pending.shift();
    if (!path || visited.has(path)) {
      continue;
    }

    visited.add(path);
    const response = await request.get(path);
    expect
      .soft(response.ok(), `${path} returned ${response.status()}`)
      .toBe(true);

    const contentType = response.headers()["content-type"] ?? "";
    if (!response.ok() || !contentType.includes("text/html")) {
      continue;
    }

    const html = await response.text();
    const references = html.matchAll(
      /(?:href|src|property="og:image" content)="([^"]+)"/g,
    );

    for (const [, reference] of references) {
      if (
        !reference ||
        reference.startsWith("#") ||
        reference.startsWith("mailto:")
      ) {
        continue;
      }

      const url = new URL(reference, publicOrigin);
      if (url.origin !== publicOrigin) {
        continue;
      }

      const localPath = `${url.pathname}${url.search}`;
      if (!visited.has(localPath)) {
        pending.push(localPath);
      }
    }
  }

  expect(visited).toContain("/favicon.svg");
  expect(visited).toContain("/social-preview.png");
  expect(visited).toContain("/en/blog/why-this-website-stays-simple/");
  expect(visited).toContain("/nl/blog/waarom-deze-website-simpel-blijft/");
});
