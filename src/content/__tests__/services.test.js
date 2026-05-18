import { describe, it, expect } from "vitest";
import { SERVICES, getService } from "@/content/services.js";

describe("SERVICES", () => {
  it("has exactly 5 with unique slugs", () => {
    expect(SERVICES).toHaveLength(5);
    expect(new Set(SERVICES.map((s) => s.slug)).size).toBe(5);
  });
  it("each has required content fields", () => {
    for (const s of SERVICES) {
      expect(s.slug && s.title && s.summary && s.overview).toBeTruthy();
      expect(s.included.length).toBeGreaterThanOrEqual(4);
      expect(s.process.length).toBeGreaterThanOrEqual(3);
      expect(s.faqs.length).toBeGreaterThanOrEqual(2);
      expect(s.pricingFactors.length).toBeGreaterThanOrEqual(3);
      expect(typeof s.image).toBe("string");
    }
  });
  it("getService resolves/falls back", () => {
    expect(getService("deer-fencing").slug).toBe("deer-fencing");
    expect(getService("nope")).toBeUndefined();
  });
});
