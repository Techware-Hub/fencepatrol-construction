import { describe, it, expect } from "vitest";
import { BUSINESS } from "@/content/business.js";

describe("BUSINESS", () => {
  it("has core NAP fields", () => {
    expect(BUSINESS.name).toBe("Gefence LLC");
    expect(BUSINESS.phoneDisplay).toBe("(845) 551-1446");
    expect(BUSINESS.phoneHref).toBe("tel:+18455511446");
    expect(BUSINESS.email).toBe("Gefence1@gmail.com");
    expect(BUSINESS.city).toBe("Greeley");
    expect(BUSINESS.state).toBe("CO");
  });
  it("has hours and slogan", () => {
    expect(BUSINESS.hours.length).toBeGreaterThan(0);
    expect(typeof BUSINESS.slogan).toBe("string");
  });
});
