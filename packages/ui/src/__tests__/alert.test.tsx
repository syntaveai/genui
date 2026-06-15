import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Alert, AlertTitle, AlertDescription } from "../alert";

describe("Alert", () => {
  it("renders children", () => {
    render(<Alert>Message</Alert>);
    expect(screen.getByText("Message")).toBeInTheDocument();
  });

  it("renders title", () => {
    render(<Alert title="Warning" variant="warning" />);
    expect(screen.getByText("Warning")).toBeInTheDocument();
  });

  it("renders AlertTitle and AlertDescription", () => {
    render(
      <Alert>
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Something went wrong</AlertDescription>
      </Alert>,
    );
    expect(screen.getByText("Error")).toBeInTheDocument();
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("applies variant class", () => {
    const { container } = render(<Alert variant="error">Fail</Alert>);
    const div = container.firstChild as HTMLElement;
    expect(div.className).toContain("bg-red-50");
  });
});
