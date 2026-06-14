import { z } from "zod";

export const FallbackMessageLLMSchema = z.object({
  type: z.literal("FallbackMessage"),
  props: z.object({
    message: z.string().describe("A polite, clear, and concise explanation of why the data cannot be shown or what the user should do next."),
    variant: z.enum(["empty", "error", "info"]).optional().default("info").describe("The visual style of the message. 'empty' for no data, 'error' for system failures, 'info' for missing permissions/context."),
  }),
});

export const FallbackMessagePropsSchema = z.object({
  message: z.string(),
  variant: z.enum(["empty", "error", "info"]).optional().default("info"),
  className: z.string().optional(),
});

export const FallbackMessageSchema = z.object({
  type: z.literal("FallbackMessage").describe("Renders a fallback/error message when data is unavailable"),
  props: FallbackMessagePropsSchema,
});
