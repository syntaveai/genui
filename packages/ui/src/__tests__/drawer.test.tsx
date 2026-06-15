import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Drawer, DrawerTrigger, DrawerContent } from "../drawer";

describe("Drawer", () => {
  it("renders content when open", () => {
    render(
      <Drawer open>
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent>Drawer content</DrawerContent>
      </Drawer>,
    );
    expect(screen.getByText("Drawer content")).toBeInTheDocument();
  });

  it("does not render when closed", () => {
    render(
      <Drawer>
        <DrawerContent>Hidden</DrawerContent>
      </Drawer>,
    );
    expect(screen.queryByText("Hidden")).not.toBeInTheDocument();
  });
});
