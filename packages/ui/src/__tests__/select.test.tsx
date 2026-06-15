import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Select } from "../select";

describe("Select", () => {
  const options = [
    { value: "a", label: "Option A" },
    { value: "b", label: "Option B" },
  ];

  it("renders placeholder", () => {
    render(<Select options={options} placeholder="Choose..." />);
    expect(screen.getByText("Choose...")).toBeInTheDocument();
  });

  it("renders selected option", () => {
    render(<Select options={options} value="a" />);
    expect(screen.getByText("Option A")).toBeInTheDocument();
  });
});
