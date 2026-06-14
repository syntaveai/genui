import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PieChart } from "../pie-chart";

describe("PieChart", () => {
  it("renders title", () => {
    render(
      <PieChart
        title="Revenue by Region"
        data={[
          { label: "North", value: 40000 },
          { label: "South", value: 30000 },
        ]}
      />,
    );
    expect(screen.getByText("Revenue by Region")).toBeInTheDocument();
  });

  it("renders each segment label and value", () => {
    render(
      <PieChart
        title="Test"
        data={[
          { label: "North", value: 40000 },
          { label: "South", value: 30000 },
        ]}
      />,
    );
    expect(screen.getByText("North")).toBeInTheDocument();
    expect(screen.getByText("South")).toBeInTheDocument();
    expect(screen.getByText("40,000")).toBeInTheDocument();
    expect(screen.getByText("30,000")).toBeInTheDocument();
  });

  it("renders empty state when isEmpty is true", () => {
    render(
      <PieChart
        title="Test"
        data={[{ label: "A", value: 100 }]}
        isEmpty
        fallbackMessage="No chart data."
      />,
    );
    expect(screen.getByText("No chart data.")).toBeInTheDocument();
  });

  it("renders nothing when data is empty", () => {
    const { container } = render(<PieChart title="Test" data={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("applies custom className", () => {
    const { container } = render(
      <PieChart
        title="Test"
        data={[{ label: "A", value: 100 }]}
        className="custom-class"
      />,
    );
    const div = container.firstChild as HTMLElement;
    expect(div.className).toContain("custom-class");
  });
});
