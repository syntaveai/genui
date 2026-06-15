import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Toggle } from "../toggle";

describe("Toggle", () => {
  it("renders children", () => {
    render(<Toggle>Bold</Toggle>);
    expect(screen.getByText("Bold")).toBeInTheDocument();
  });

  it("renders pressed when controlled", () => {
    render(<Toggle pressed>Bold</Toggle>);
    const btn = screen.getByRole("button");
    expect(btn.getAttribute("aria-pressed")).toBe("true");
  });
});
