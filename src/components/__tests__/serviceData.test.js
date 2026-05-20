import { describe, it, expect } from "vitest";
import { getService, SERVICES } from "@/content/index.js";

describe("service detail data", () => {
  it("every slug resolves and bad slug is undefined", () => {
    SERVICES.forEach((s) => expect(getService(s.slug).title).toBe(s.title));
    expect(getService("missing")).toBeUndefined();
  });
});
