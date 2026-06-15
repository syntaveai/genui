import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Switch } from "../switch";

describe("Switch", () => {
  it("renders unchecked by default", () => {
    render(<Switch />);
    const btn = screen.getByRole("switch");
    expect(btn.getAttribute("aria-checked")).toBe("false");
  });

  it("renders checked with defaultChecked", () => {
    render(<Switch defaultChecked />);
    const btn = screen.getByRole("switch");
    expect(btn.getAttribute("aria-checked")).toBe("true");
  });

  it("renders checked when controlled", () => {
    render(<Switch checked />);
    const btn = screen.getByRole("switch");
    expect(btn.getAttribute("aria-checked")).toBe("true");
  });
});
