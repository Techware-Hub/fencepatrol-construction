import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Navbar from "@/components/Navbar.jsx";

describe("Navbar", () => {
  it("shows Gefence brand and key links", () => {
    render(<Navbar />);
    expect(screen.getByText(/GEFENCE/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /fence styles/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /service areas/i })).toBeInTheDocument();
  });
});
