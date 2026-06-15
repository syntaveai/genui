import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Checkbox } from "../checkbox";

describe("Checkbox", () => {
  it("renders unchecked by default", () => {
    render(<Checkbox />);
    const cb = screen.getByRole("checkbox");
    expect(cb.getAttribute("aria-checked")).toBe("false");
  });

  it("renders checked when controlled", () => {
    render(<Checkbox checked />);
    const cb = screen.getByRole("checkbox");
    expect(cb.getAttribute("aria-checked")).toBe("true");
  });
});
