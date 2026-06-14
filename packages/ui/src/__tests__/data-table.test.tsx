import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { DataTable } from "../data-table";

const columns = [
  { header: "Country", accessorKey: "country" },
  { header: "Users", accessorKey: "users" },
];

const data = [
  { country: "United States", users: 45000 },
  { country: "India", users: 32000 },
];

describe("DataTable", () => {
  it("renders column headers", () => {
    render(<DataTable columns={columns} data={data} />);
    expect(screen.getByText("Country")).toBeInTheDocument();
    expect(screen.getByText("Users")).toBeInTheDocument();
  });

  it("renders data rows", () => {
    render(<DataTable columns={columns} data={data} />);
    expect(screen.getByText("United States")).toBeInTheDocument();
    expect(screen.getByText("45000")).toBeInTheDocument();
    expect(screen.getByText("India")).toBeInTheDocument();
  });

  it("renders empty state when isEmpty is true", () => {
    render(
      <DataTable
        columns={columns}
        isEmpty
        fallbackMessage="No countries found."
      />,
    );
    expect(screen.getByText("No countries found.")).toBeInTheDocument();
    expect(screen.queryByText("Country")).not.toBeInTheDocument();
  });

  it("renders fallback when data is empty array", () => {
    render(<DataTable columns={columns} data={[]} />);
    expect(screen.getByText("No data to display.")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <DataTable columns={columns} data={data} className="custom-table" />,
    );
    const div = container.firstChild as HTMLElement;
    expect(div.className).toContain("custom-table");
  });
});
