import { describe, expect, it } from "vitest";

import {
  defaultLanguage,
  isLanguage,
  languageRoutes,
  supportedLanguages,
  translations,
} from "./config";

describe("i18n configuration", () => {
  it("has a route and complete copy for every supported language", () => {
    for (const language of supportedLanguages) {
      expect(languageRoutes[language]).toBe(`/${language}/`);
      expect(translations[language].meta.title).toBe("venturian ecom");
      expect(translations[language].meta.description.length).toBeGreaterThan(
        50,
      );
      expect(translations[language].hero.title).not.toHaveLength(0);
    }
  });

  it("uses English as the non-Dutch fallback", () => {
    expect(defaultLanguage).toBe("en");
    expect(isLanguage("nl")).toBe(true);
    expect(isLanguage("en")).toBe(true);
    expect(isLanguage("de")).toBe(false);
  });
});
