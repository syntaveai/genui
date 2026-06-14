import { z } from "zod";

const ALLOWED_TAGS = [
  "div",
  "h1",
  "h2",
  "h3",
  "h4",
  "p",
  "span",
  "ul",
  "ol",
  "li",
  "table",
  "thead",
  "tbody",
  "tr",
  "th",
  "td",
  "img",
] as const;

export interface DynamicElement {
  tag: (typeof ALLOWED_TAGS)[number];
  className?: string;
  textContent?: string;
  dataField?: string;
  children?: DynamicElement[];
}

export const DynamicElementSchema: z.ZodType<DynamicElement> = z.object({
  tag: z.enum(ALLOWED_TAGS),
  className: z.string().optional(),
  textContent: z
    .string()
    .optional()
    .describe("Static text content for this element"),
  dataField: z
    .string()
    .optional()
    .describe(
      "Dot-path to a field in the data array/object (e.g., '0.amount' or 'total'). The runtime injects the value here.",
    ),
  children: z
    .array(z.lazy(() => DynamicElementSchema))
    .optional()
    .describe("Child elements nested inside this element"),
});

export const DynamicComponentLLMSchema = z.object({
  type: z.literal("DynamicComponent"),
  props: z.object({
    title: z
      .string()
      .min(1)
      .describe("A short title or heading for this dynamic component"),
    dataSource: z
      .string()
      .describe(
        "The exact name of the registered data source to fetch data from.",
      ),
    dataSourceParams: z
      .record(z.unknown())
      .optional()
      .describe(
        "Optional parameters to pass to the data source (e.g., { limit: 5, country: 'US' })",
      ),
    root: DynamicElementSchema.describe(
      "Root element of the visual tree. Build your entire component layout here using allowed HTML tags and Tailwind classes.",
    ),
  }),
});

export const DynamicComponentPropsSchema = z.object({
  title: z.string(),
  root: DynamicElementSchema.optional(),
  data: z.unknown().optional(),
  isEmpty: z.boolean().optional(),
  fallbackMessage: z.string().optional(),
  className: z.string().optional(),
});
