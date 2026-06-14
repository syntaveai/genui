import { z } from "zod";

export const DataTableLLMColumnSchema = z.object({
  header: z.string().describe("The visible column header (e.g., 'Country')"),
  accessorKey: z.string().describe("The key in the data object to display (e.g., 'country_name')"),
});

export const DataTableLLMSchema = z.object({
  type: z.literal("DataTable"),
  props: z.object({
    columns: z.array(DataTableLLMColumnSchema).describe("The columns to display in the table"),
    dataSource: z.string().describe("The exact name of the registered data source to fetch the table rows from."),
    dataSourceParams: z.record(z.any()).optional().describe("Optional parameters to filter the data source (e.g., { limit: 10, status: 'active' })"),
  }),
});

export const DataTableColumnSchema = z.object({
  header: z.string(),
  accessorKey: z.string(),
});

export const DataTablePropsSchema = z.object({
  columns: z.array(DataTableColumnSchema),
  data: z.array(z.record(z.any())).optional(),
  isEmpty: z.boolean().optional(),
  fallbackMessage: z.string().optional(),
  className: z.string().optional(),
});

export const DataTableSchema = z.object({
  type: z.literal("DataTable").describe("Renders a data table with column headers and rows"),
  props: DataTablePropsSchema,
});
