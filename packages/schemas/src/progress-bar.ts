import { z } from "zod";

export const ProgressBarLLMSchema = z.object({
  type: z.literal("ProgressBar"),
  props: z.object({
    label: z.string().min(1).describe("A short label describing the progress"),
    dataSource: z
      .string()
      .describe(
        "The exact name of the registered data source to fetch progress data from. Must return { value: number, maxValue: number } or { value: number } where maxValue defaults to 100.",
      ),
    dataSourceParams: z
      .record(z.unknown())
      .optional()
      .describe(
        "Optional parameters to pass to the data source (e.g., { projectId: 'abc' })",
      ),
  }),
});

export const ProgressBarPropsSchema = z.object({
  label: z.string(),
  value: z.number().min(0),
  maxValue: z.number().positive().optional().default(100),
  isEmpty: z.boolean().optional(),
  fallbackMessage: z.string().optional(),
  className: z.string().optional(),
});
