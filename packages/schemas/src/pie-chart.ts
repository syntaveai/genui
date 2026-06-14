import { z } from "zod";

export const PieChartDataPointSchema = z.object({
  label: z.string().min(1),
  value: z.number().nonnegative(),
});

export const PieChartLLMSchema = z.object({
  type: z.literal("PieChart"),
  props: z.object({
    title: z
      .string()
      .min(1)
      .describe("The title displayed above the pie chart"),
    dataSource: z
      .string()
      .describe(
        "The exact name of the registered data source to fetch data points from. Each row must include 'label' (string) and 'value' (number).",
      ),
    dataSourceParams: z
      .record(z.unknown())
      .optional()
      .describe(
        "Optional parameters to pass to the data source (e.g., { limit: 5, minValue: 1000 })",
      ),
  }),
});

export const PieChartPropsSchema = z.object({
  title: z.string(),
  data: z.array(PieChartDataPointSchema).optional(),
  isEmpty: z.boolean().optional(),
  fallbackMessage: z.string().optional(),
  className: z.string().optional(),
});
