import { readFile } from "node:fs/promises";

import { describe, expect, it } from "vitest";

async function readBuiltFile(path: string) {
  return readFile(new URL(`../dist/${path}`, import.meta.url), "utf8");
}

describe("production build", () => {
  const currentYear = new Date().getFullYear();

  it.each([
    ["nl", "Techniek, handel en het werk ertussen."],
    ["en", "Technology, commerce and the work in between."],
  ])("generates the %s SEO page", async (language, heading) => {
    const html = await readBuiltFile(`${language}/index.html`);

    expect(html).toContain(`<html lang="${language}">`);
    expect(html).toContain(heading);
    expect(html).toContain(
      `rel="canonical" href="https://venturiane.com/${language}/"`,
    );
    expect(html).toContain('hreflang="nl"');
    expect(html).toContain('hreflang="en"');
    expect(html).toContain(`© ${currentYear} Venturian Ecom.`);
  });

  it("generates crawler and domain configuration", async () => {
    const [cname, robots, sitemap] = await Promise.all([
      readBuiltFile("CNAME"),
      readBuiltFile("robots.txt"),
      readBuiltFile("sitemap.xml"),
    ]);

    expect(cname.trim()).toBe("venturiane.com");
    expect(robots).toContain("https://venturiane.com/sitemap.xml");
    expect(sitemap).toContain("https://venturiane.com/en/");
    expect(sitemap).toContain("https://venturiane.com/nl/");
    expect(sitemap).toContain("https://venturiane.com/en/blog/welcome/");
    expect(sitemap).toContain("https://venturiane.com/nl/blog/welkom/");
    expect(sitemap).toContain('hreflang="en"');
    expect(sitemap).toContain('hreflang="nl"');
    expect(sitemap).toContain('hreflang="x-default"');
  });

  it.each([
    ["nl", "welkom", "Welkom bij Venturian Ecom", "Waar deze plek voor is"],
    ["en", "welcome", "Welcome to Venturian Ecom", "What this place is for"],
  ])(
    "generates the %s Markdown post",
    async (language, slug, title, markdownHeading) => {
      const [homepage, article] = await Promise.all([
        readBuiltFile(`${language}/index.html`),
        readBuiltFile(`${language}/blog/${slug}/index.html`),
      ]);

      expect(homepage).toContain(`href="/${language}/blog/${slug}/"`);
      expect(homepage).toContain(title);
      expect(article).toContain(`<h1>${title}</h1>`);
      expect(article).toContain(markdownHeading);
      expect(article).toContain(`hreflang="${language}"`);
      expect(article).toContain('property="og:type" content="article"');
      expect(article).toContain('property="article:published_time"');
      expect(article).toContain('"@type":"BlogPosting"');
    },
  );

  it("excludes draft templates and generates the custom 404 page", async () => {
    const notFound = await readBuiltFile("404.html");

    expect(notFound).toContain("Page not found.");
    expect(notFound).toContain('name="robots" content="noindex, follow"');
    await expect(readBuiltFile("blog/draft-post/index.html")).rejects.toThrow();
  });
});
