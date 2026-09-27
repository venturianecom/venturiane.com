import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const pages = [
  "/en/",
  "/nl/",
  "/en/blog/why-this-website-stays-simple/",
  "/nl/blog/waarom-deze-website-simpel-blijft/",
  "/en/company-details/",
  "/nl/company-details/",
  "/does-not-exist/",
] as const;

for (const path of pages) {
  test(`${path} has no automatically detectable WCAG A or AA violations`, async ({
    page,
  }) => {
    await page.goto(path);

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();

    expect(results.violations).toEqual([]);
  });
}

test("the open language menu has no automatically detectable WCAG A or AA violations", async ({
  page,
}) => {
  await page.goto("/en/");
  await page.getByLabel("Choose language: English").click();

  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();

  expect(results.violations).toEqual([]);
});
