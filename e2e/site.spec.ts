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
  await page.getByLabel("Choose language").selectOption("nl");

  await expect(page).toHaveURL(/\/nl\/$/);
  await expect
    .poll(() => page.evaluate(() => localStorage.getItem("venturian-language")))
    .toBe("nl");
});

test("switches to the translated article", async ({ page }) => {
  await page.goto("/en/blog/welcome/");
  await page.getByLabel("Choose language").selectOption("nl");

  await expect(page).toHaveURL(/\/nl\/blog\/welkom\/$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Welkom bij Venturian Ecom",
  );
});

test("serves the custom not-found page", async ({ page }) => {
  const response = await page.goto("/does-not-exist/");

  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Page not found.",
  );
});
