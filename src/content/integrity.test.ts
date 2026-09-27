import { describe, expect, it } from "vitest";

import type { Language } from "../i18n/config";
import { assertBlogIntegrity, type BlogIdentity } from "./integrity";

function post(
  id: string,
  language: Language,
  translationKey: string,
  slug: string,
): BlogIdentity {
  return { id, data: { language, translationKey, slug } };
}

describe("blog content integrity", () => {
  it("accepts complete translation pairs with unique routes", () => {
    expect(() =>
      assertBlogIntegrity([
        post("nl/welkom.md", "nl", "welcome", "welkom"),
        post("en/welcome.md", "en", "welcome", "welcome"),
      ]),
    ).not.toThrow();
  });

  it("rejects an incomplete translation pair", () => {
    expect(() =>
      assertBlogIntegrity([post("en/welcome.md", "en", "welcome", "welcome")]),
    ).toThrow("Translation welcome is missing: nl.");
  });

  it("rejects duplicate localized routes", () => {
    expect(() =>
      assertBlogIntegrity([
        post("nl/first.md", "nl", "first", "dubbel"),
        post("en/first.md", "en", "first", "first"),
        post("nl/second.md", "nl", "second", "dubbel"),
        post("en/second.md", "en", "second", "second"),
      ]),
    ).toThrow("Blog route /nl/dubbel/");
  });

  it("rejects duplicate languages within a translation pair", () => {
    expect(() =>
      assertBlogIntegrity([
        post("nl/first.md", "nl", "welcome", "eerste"),
        post("nl/second.md", "nl", "welcome", "tweede"),
        post("en/welcome.md", "en", "welcome", "welcome"),
      ]),
    ).toThrow("Translation welcome has multiple nl posts");
  });
});
