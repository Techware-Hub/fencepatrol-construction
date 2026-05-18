import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import JsonLd from "@/components/JsonLd.jsx";

describe("JsonLd", () => {
  it("emits LocalBusiness schema", () => {
    const { container } = render(<JsonLd />);
    const s = container.querySelector('script[type="application/ld+json"]');
    expect(s).toBeTruthy();
    const data = JSON.parse(s.textContent);
    expect(data["@type"]).toBe("LocalBusiness");
    expect(data.name).toBe("Gefence LLC");
    expect(data.telephone).toBe("(845) 551-1446");
  });
});
