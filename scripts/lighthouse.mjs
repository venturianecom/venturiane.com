import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, resolve, sep } from "node:path";

import { launch } from "chrome-launcher";
import lighthouse from "lighthouse";
import desktopConfig from "lighthouse/core/config/desktop-config.js";
import { chromium } from "playwright";

const distDirectory = resolve("dist");
const host = "127.0.0.1";
const port = 4324;
const thresholds = {
  accessibility: 1,
  "best-practices": 1,
  performance: 0.9,
  seo: 1,
};
const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
};

function resolveFile(pathname) {
  const relativePath = pathname.endsWith("/")
    ? `${pathname}index.html`
    : pathname;
  const file = resolve(distDirectory, `.${relativePath}`);

  if (file !== distDirectory && !file.startsWith(`${distDirectory}${sep}`)) {
    return null;
  }

  return file;
}

const server = createServer(async (request, response) => {
  try {
    const pathname = new URL(request.url ?? "/", `http://${host}`).pathname;
    const file = resolveFile(pathname);
    if (!file) {
      response.writeHead(400).end();
      return;
    }

    const body = await readFile(file);
    response.writeHead(200, {
      "content-type": contentTypes[extname(file)] ?? "application/octet-stream",
    });
    response.end(body);
  } catch {
    response.writeHead(404).end();
  }
});

await new Promise((resolveListen, rejectListen) => {
  server.once("error", rejectListen);
  server.listen(port, host, resolveListen);
});

const chrome = await launch({
  chromePath: chromium.executablePath(),
  chromeFlags: ["--headless=new", "--no-sandbox", "--disable-gpu"],
});

let failed = false;

try {
  for (const profile of [
    { name: "mobile", config: undefined },
    { name: "desktop", config: desktopConfig },
  ]) {
    for (const pathname of [
      "/en/",
      "/en/blog/why-this-website-stays-simple/",
      "/en/company-details/",
    ]) {
      const result = await lighthouse(
        `http://${host}:${port}${pathname}`,
        { logLevel: "error", output: "json", port: chrome.port },
        profile.config,
      );

      if (!result) {
        throw new Error(
          `Lighthouse produced no result for ${profile.name} ${pathname}`,
        );
      }

      const scores = Object.fromEntries(
        Object.keys(thresholds).map((category) => [
          category,
          result.lhr.categories[category]?.score ?? 0,
        ]),
      );

      console.log(`${profile.name} ${pathname}`, scores);

      for (const [category, minimum] of Object.entries(thresholds)) {
        if (scores[category] < minimum) {
          console.error(
            `${profile.name} ${pathname}: ${category} scored ${scores[category]}, expected at least ${minimum}`,
          );
          failed = true;
        }
      }
    }
  }
} finally {
  chrome.kill();
  await new Promise((resolveClose) => server.close(resolveClose));
}

if (failed) {
  process.exitCode = 1;
}
