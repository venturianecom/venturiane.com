import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: "http://127.0.0.1:4322",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "desktop-chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "desktop-firefox",
      testIgnore: [/accessibility\.spec\.ts/, /links\.spec\.ts/],
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "desktop-webkit",
      testIgnore: [/accessibility\.spec\.ts/, /links\.spec\.ts/],
      use: { ...devices["Desktop Safari"] },
    },
    {
      name: "mobile-chromium",
      testIgnore: [/accessibility\.spec\.ts/, /links\.spec\.ts/],
      use: { ...devices["Pixel 7"] },
    },
    {
      name: "mobile-webkit",
      testIgnore: [/accessibility\.spec\.ts/, /links\.spec\.ts/],
      use: { ...devices["iPhone 15"] },
    },
  ],
  webServer: {
    command: "npm run preview -- --host 127.0.0.1 --port 4322 --ignore-lock",
    url: "http://127.0.0.1:4322/en/",
    reuseExistingServer: !process.env.CI,
  },
});
