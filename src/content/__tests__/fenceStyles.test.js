import { describe, it, expect } from "vitest";
import { FENCE_STYLES } from "@/content/fenceStyles.js";

describe("FENCE_STYLES", () => {
  it("6 unique styles with meta", () => {
    expect(FENCE_STYLES).toHaveLength(6);
    expect(new Set(FENCE_STYLES.map((s) => s.key)).size).toBe(6);
    for (const s of FENCE_STYLES) {
      expect(s.name && s.description && s.image).toBeTruthy();
      expect(s.pros.length).toBeGreaterThanOrEqual(3);
      expect(s.cons.length).toBeGreaterThanOrEqual(2);
      expect(s.bestFor && s.lifespan && s.priceTier).toBeTruthy();
    }
  });
});
