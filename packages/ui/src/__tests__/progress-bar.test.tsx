import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProgressBar } from "../progress-bar";

describe("ProgressBar", () => {
  it("renders label", () => {
    render(<ProgressBar label="Completion" value={75} />);
    expect(screen.getByText("Completion")).toBeInTheDocument();
  });

  it("renders value and maxValue together", () => {
    render(<ProgressBar label="Tasks" value={42} maxValue={50} />);
    expect(screen.getByText("42 / 50")).toBeInTheDocument();
  });

  it("renders percentage", () => {
    render(<ProgressBar label="Test" value={50} maxValue={200} />);
    expect(screen.getByText("25%")).toBeInTheDocument();
  });

  it("renders empty state when isEmpty is true", () => {
    render(
      <ProgressBar
        label="Test"
        value={0}
        isEmpty
        fallbackMessage="No progress data."
      />,
    );
    expect(screen.getByText("No progress data.")).toBeInTheDocument();
  });

  it("clamps value to maxValue", () => {
    render(<ProgressBar label="Test" value={150} maxValue={100} />);
    expect(screen.getByText("100%")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <ProgressBar label="Test" value={50} className="custom-class" />,
    );
    const div = container.firstChild as HTMLElement;
    expect(div.className).toContain("custom-class");
  });
});
