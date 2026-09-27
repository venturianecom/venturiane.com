import { expect, test } from "@playwright/test";

test("uses the device language on the root page", async ({ browser }) => {
  const context = await browser.newContext({ locale: "nl-NL" });
  const page = await context.newPage();

  await page.goto("/");
  await expect(page).toHaveURL(/\/nl\/$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Techniek, handel",
  );

  await context.close();
});

test("prefers the saved language over the device language", async ({
  page,
}) => {
  await page.addInitScript(() => {
    localStorage.setItem("venturian-language", "nl");
  });

  await page.goto("/");
  await expect(page).toHaveURL(/\/nl\/$/);
});

test("switches language on the homepage and saves the choice", async ({
  page,
}) => {
  await page.goto("/en/");
  await page.getByLabel("Choose language: English").click();
  await page.getByRole("link", { name: "Nederlands" }).click();

  await expect(page).toHaveURL(/\/nl\/$/);
  await expect
    .poll(() => page.evaluate(() => localStorage.getItem("venturian-language")))
    .toBe("nl");
});

test("offers a direct contact email", async ({ page }) => {
  await page.goto("/en/");

  const contactLink = page.getByRole("link", {
    name: "hello@venturiane.com",
  });
  await expect(contactLink).toHaveAttribute(
    "href",
    "mailto:hello@venturiane.com",
  );
});

test("keeps company details available through the footer copyright", async ({
  page,
}) => {
  await page.goto("/en/");
  await page
    .getByRole("link", {
      name: /© \d{4} Venturian Ecom\. company details/,
    })
    .click();

  await expect(page).toHaveURL(/\/en\/company-details\/$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Company details",
  );
  await expect(page.getByText("98192531")).toBeVisible();
  await expect(page.getByText("NL005314869B56")).toBeVisible();
});

test("fits the configured desktop or mobile viewport", async ({ page }) => {
  await page.goto("/en/");

  const dimensions = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));

  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("supports keyboard navigation and a skip link", async ({
  browserName,
  page,
}) => {
  await page.goto("/en/");

  const skipLink = page.getByRole("link", { name: "Skip to content" });
  if (browserName === "webkit") {
    // WebKit inherits the host's Full Keyboard Access preference.
    await skipLink.focus();
  } else {
    await page.keyboard.press("Tab");
  }
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toBeVisible();

  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();

  const languageSelector = page.getByLabel("Choose language: English");
  await languageSelector.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("link", { name: "Nederlands" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("link", { name: "Nederlands" })).toBeHidden();
  await expect(languageSelector).toBeFocused();
});

test("switches to the translated article", async ({ page }) => {
  await page.goto("/en/blog/why-this-website-stays-simple/");
  await page.getByLabel("Choose language: English").click();
  await page.getByRole("link", { name: "Nederlands" }).click();

  await expect(page).toHaveURL(
    /\/nl\/blog\/waarom-deze-website-simpel-blijft\/$/,
  );
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Waarom deze website simpel blijft",
  );
});

test("serves the custom not-found page", async ({ page }) => {
  const response = await page.goto("/does-not-exist/");

  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Page not found.",
  );
});
