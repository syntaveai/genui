import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MetricCard } from "../metric-card";

describe("MetricCard", () => {
  it("renders title and value", () => {
    render(<MetricCard title="Revenue" value="$42,000" />);
    expect(screen.getByText("Revenue")).toBeInTheDocument();
    expect(screen.getByText("$42,000")).toBeInTheDocument();
  });

  it("renders trend with up direction in green", () => {
    render(
      <MetricCard
        title="Users"
        value="1,337"
        trend={{ value: 12.5, direction: "up" }}
      />,
    );
    expect(screen.getByText("12.5%")).toBeInTheDocument();
    const trend = screen.getByText("12.5%");
    expect(trend.className).toContain("text-green-600");
  });

  it("renders trend with down direction in red", () => {
    render(
      <MetricCard
        title="Churn"
        value="5%"
        trend={{ value: 2.1, direction: "down" }}
      />,
    );
    const trend = screen.getByText("2.1%");
    expect(trend.className).toContain("text-red-600");
  });

  it("renders empty state when isEmpty is true", () => {
    render(
      <MetricCard
        title="Revenue"
        value={0}
        isEmpty
        fallbackMessage="No data available."
      />,
    );
    expect(screen.getByText("No data available.")).toBeInTheDocument();
    expect(screen.queryByText("Revenue")).not.toBeInTheDocument();
  });

  it("renders description when provided", () => {
    render(
      <MetricCard
        title="Revenue"
        value="$42,000"
        description="Monthly recurring revenue"
      />,
    );
    expect(screen.getByText("Monthly recurring revenue")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <MetricCard title="Test" value="100" className="custom-class" />,
    );
    const div = container.firstChild as HTMLElement;
    expect(div.className).toContain("custom-class");
  });
});
