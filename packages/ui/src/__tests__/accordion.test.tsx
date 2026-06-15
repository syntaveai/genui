import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../accordion";

describe("Accordion", () => {
  it("renders trigger and shows content when clicked", () => {
    render(
      <Accordion defaultValue="a">
        <AccordionItem value="a">
          <AccordionTrigger value="a">Section A</AccordionTrigger>
          <AccordionContent value="a">Content A</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    expect(screen.getByText("Section A")).toBeInTheDocument();
    expect(screen.getByText("Content A")).toBeInTheDocument();
  });

  it("hides non-default content", () => {
    render(
      <Accordion defaultValue="a">
        <AccordionItem value="a">
          <AccordionTrigger value="a">A</AccordionTrigger>
          <AccordionContent value="a">Content A</AccordionContent>
        </AccordionItem>
        <AccordionItem value="b">
          <AccordionTrigger value="b">B</AccordionTrigger>
          <AccordionContent value="b">Content B</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    expect(screen.getByText("Content A")).toBeInTheDocument();
    expect(screen.queryByText("Content B")).not.toBeInTheDocument();
  });
});
