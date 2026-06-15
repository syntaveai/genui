import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Slider } from "../slider";

describe("Slider", () => {
  it("renders with default value", () => {
    const { container } = render(<Slider defaultValue={[50]} />);
    const slider = container.querySelector('[role="slider"]');
    expect(slider?.getAttribute("aria-valuenow")).toBe("50");
  });

  it("renders with min/max", () => {
    const { container } = render(
      <Slider min={0} max={200} defaultValue={[100]} />,
    );
    const slider = container.querySelector('[role="slider"]');
    expect(slider?.getAttribute("aria-valuemin")).toBe("0");
    expect(slider?.getAttribute("aria-valuemax")).toBe("200");
  });
});
