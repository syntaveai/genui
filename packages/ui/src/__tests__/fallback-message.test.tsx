import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FallbackMessage } from "../fallback-message";

describe("FallbackMessage", () => {
  it("renders message text", () => {
    render(<FallbackMessage message="An error occurred." />);
    expect(screen.getByText("An error occurred.")).toBeInTheDocument();
  });

  it("defaults to info variant", () => {
    const { container } = render(<FallbackMessage message="Info message" />);
    const div = container.firstChild as HTMLElement;
    expect(div.className).toContain("bg-gray-50");
  });

  it("renders error variant with red styling", () => {
    const { container } = render(
      <FallbackMessage message="Error!" variant="error" />,
    );
    const div = container.firstChild as HTMLElement;
    expect(div.className).toContain("bg-red-50");
    expect(screen.getByText("Error!")).toBeInTheDocument();
  });

  it("renders empty variant with dashed border", () => {
    const { container } = render(
      <FallbackMessage message="No data." variant="empty" />,
    );
    const div = container.firstChild as HTMLElement;
    expect(div.className).toContain("border-dashed");
  });

  it("applies custom className", () => {
    const { container } = render(
      <FallbackMessage message="Test" className="custom-fallback" />,
    );
    const div = container.firstChild as HTMLElement;
    expect(div.className).toContain("custom-fallback");
  });
});
