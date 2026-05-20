import { describe, it, expect } from "vitest";
import { SERVICE_AREAS } from "@/content/serviceAreas.js";
import { TESTIMONIALS } from "@/content/testimonials.js";
import { FAQ_GROUPS } from "@/content/faqs.js";
import { GALLERY } from "@/content/gallery.js";
import { PROCESS_STEPS } from "@/content/processSteps.js";
import { VALUE_PROPS } from "@/content/valueProps.js";

describe("supporting content", () => {
  it("service areas", () => {
    expect(SERVICE_AREAS.length).toBeGreaterThanOrEqual(8);
    expect(SERVICE_AREAS[0].name).toBe("Greeley");
    SERVICE_AREAS.forEach((a) => expect(a.blurb.length).toBeGreaterThan(10));
  });
  it("testimonials all 5-star", () => {
    expect(TESTIMONIALS.length).toBeGreaterThanOrEqual(4);
    TESTIMONIALS.forEach((t) => expect(t.rating).toBe(5));
  });
  it("faq >=15 items across groups", () => {
    expect(FAQ_GROUPS.length).toBeGreaterThanOrEqual(4);
    expect(FAQ_GROUPS.reduce((n, g) => n + g.items.length, 0)).toBeGreaterThanOrEqual(15);
  });
  it("gallery tagged", () => {
    expect(GALLERY.length).toBeGreaterThanOrEqual(10);
    GALLERY.forEach((g) => expect(g.image && g.caption && g.style).toBeTruthy());
  });
  it("process + value props", () => {
    expect(PROCESS_STEPS).toHaveLength(4);
    expect(VALUE_PROPS.length).toBeGreaterThanOrEqual(5);
  });
});
