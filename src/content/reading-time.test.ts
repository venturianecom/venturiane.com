import { describe, expect, it } from "vitest";

import { getReadingTimeMinutes } from "./reading-time";

describe("getReadingTimeMinutes", () => {
  it("returns at least one minute", () => {
    expect(getReadingTimeMinutes("")).toBe(1);
    expect(getReadingTimeMinutes("A short note.")).toBe(1);
  });

  it("rounds partial minutes up", () => {
    expect(
      getReadingTimeMinutes(
        Array.from({ length: 201 }, () => "word").join(" "),
      ),
    ).toBe(2);
  });

  it("counts words with Unicode letters", () => {
    expect(getReadingTimeMinutes("Eenvoud, ideeën en toegankelijkheid.")).toBe(
      1,
    );
  });
});
