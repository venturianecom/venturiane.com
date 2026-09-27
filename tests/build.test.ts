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
    expect(html).toContain("<title>venturian ecom</title>");
    expect(html).toContain(heading);
    expect(html).toContain(
      `rel="canonical" href="https://venturiane.com/${language}/"`,
    );
    expect(html).toContain('hreflang="nl"');
    expect(html).toContain('hreflang="en"');
    expect(html).toContain('href="mailto:hello@venturiane.com"');
    expect(html).toContain('href="/favicon.svg"');
    expect(html).toContain(
      'property="og:image" content="https://venturiane.com/social-preview.png"',
    );
    expect(html).toContain('href="#main-content"');
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
    expect(sitemap).toContain(
      "https://venturiane.com/en/blog/why-this-website-stays-simple/",
    );
    expect(sitemap).toContain(
      "https://venturiane.com/nl/blog/waarom-deze-website-simpel-blijft/",
    );
    expect(sitemap).toContain("https://venturiane.com/en/company-details/");
    expect(sitemap).toContain("https://venturiane.com/nl/company-details/");
    expect(sitemap).toContain('hreflang="en"');
    expect(sitemap).toContain('hreflang="nl"');
    expect(sitemap).toContain('hreflang="x-default"');
  });

  it.each([
    [
      "nl",
      "waarom-deze-website-simpel-blijft",
      "Waarom deze website simpel blijft",
      "Simpel betekent niet onzorgvuldig",
      "Wat de pipeline automatisch controleert",
      "Een praktische toets",
      "Geschreven door",
    ],
    [
      "en",
      "why-this-website-stays-simple",
      "Why this website stays simple",
      "Simple does not mean careless",
      "What the pipeline checks automatically",
      "A practical test",
      "Written by",
    ],
  ])(
    "generates the %s Markdown post",
    async (
      language,
      slug,
      title,
      markdownHeading,
      automaticChecksHeading,
      practicalHeading,
      authorLabel,
    ) => {
      const [homepage, article] = await Promise.all([
        readBuiltFile(`${language}/index.html`),
        readBuiltFile(`${language}/blog/${slug}/index.html`),
      ]);

      expect(homepage).toContain(`href="/${language}/blog/${slug}/"`);
      expect(homepage).toContain(title);
      expect(homepage).toContain(
        language === "nl" ? "min leestijd" : "min read",
      );
      expect(article).toContain(`<h1>${title}</h1>`);
      expect(article).toContain(markdownHeading);
      expect(article).toContain(automaticChecksHeading);
      expect(article).toContain(practicalHeading);
      expect(article.indexOf(practicalHeading)).toBeLessThan(
        article.indexOf(automaticChecksHeading),
      );
      expect(article).toContain(`language: ${language}`);
      expect(article).toContain("translationKey: clear-title");
      expect(article).toContain(authorLabel);
      expect(article).toContain(
        language === "nl" ? "min leestijd" : "min read",
      );
      expect(article).toContain('href="https://timtwiest.nl" rel="author"');
      expect(article).toContain(
        'href="https://www.w3.org/WAI/standards-guidelines/"',
      );
      expect(article).toContain(`hreflang="${language}"`);
      expect(article).toContain('property="og:type" content="article"');
      expect(article).toContain('property="article:published_time"');
      expect(article).toContain('"@type":"BlogPosting"');
      expect(article).toMatch(/"timeRequired":"PT\d+M"/);
      expect(article).toContain(
        '"author":{"@type":"Person","name":"Tim Twiest","url":"https://timtwiest.nl"}',
      );
    },
  );

  it.each([
    ["nl", "Bedrijfsgegevens", "KVK-nummer"],
    ["en", "Company details", "Dutch Chamber of Commerce"],
  ])(
    "generates the %s company details page",
    async (language, title, registrationLabel) => {
      const [homepage, companyDetails] = await Promise.all([
        readBuiltFile(`${language}/index.html`),
        readBuiltFile(`${language}/company-details/index.html`),
      ]);

      expect(homepage).toContain(`href="/${language}/company-details/"`);
      expect(companyDetails).toContain(`<h1>${title}</h1>`);
      expect(companyDetails).toContain(registrationLabel);
      expect(companyDetails).toContain("98192531");
      expect(companyDetails).toContain("NL005314869B56");
      expect(companyDetails).toContain('href="mailto:hello@venturiane.com"');
    },
  );

  it("excludes draft templates and generates the custom 404 page", async () => {
    const notFound = await readBuiltFile("404.html");

    expect(notFound).toContain("Page not found.");
    expect(notFound).toContain('name="robots" content="noindex, follow"');
    await expect(readBuiltFile("blog/draft-post/index.html")).rejects.toThrow();
  });
});
