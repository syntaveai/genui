import { z } from "zod";

export const TrendSchema = z.object({
  value: z.number().describe("The percentage change value"),
  direction: z
    .enum(["up", "down"])
    .describe("Whether the trend is positive or negative"),
});

export const MetricCardLLMSchema = z.object({
  type: z.literal("MetricCard"),
  props: z.object({
    title: z
      .string()
      .min(1)
      .describe("The label for the metric (e.g., 'Monthly Recurring Revenue')"),
    dataSource: z
      .string()
      .describe(
        "The exact name of the registered data source to fetch this metric from.",
      ),
    dataSourceParams: z
      .record(z.unknown())
      .optional()
      .describe(
        "Optional parameters to pass to the data source (e.g., { region: 'US' })",
      ),
  }),
});

export const MetricCardPropsSchema = z.object({
  title: z.string(),
  value: z.union([z.string(), z.number()]),
  description: z.string().optional(),
  trend: TrendSchema.optional(),
  isEmpty: z.boolean().optional(),
  fallbackMessage: z.string().optional(),
  className: z.string().optional(),
});

export const MetricCardSchema = z.object({
  type: z.literal("MetricCard").describe("Renders a single KPI metric card"),
  props: MetricCardPropsSchema,
});
