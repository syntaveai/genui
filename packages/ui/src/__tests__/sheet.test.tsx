import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../sheet";

describe("Sheet", () => {
  it("renders trigger and content when open", () => {
    render(
      <Sheet open>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Title</SheetTitle>
            <SheetDescription>Desc</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>,
    );
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Desc")).toBeInTheDocument();
  });

  it("does not render content when closed", () => {
    render(
      <Sheet>
        <SheetContent>
          <SheetTitle>Hidden</SheetTitle>
        </SheetContent>
      </Sheet>,
    );
    expect(screen.queryByText("Hidden")).not.toBeInTheDocument();
  });
});
