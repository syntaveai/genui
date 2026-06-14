import { cn } from "./lib/utils";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "./table";
import { Text } from "./text";

export interface DataTableColumn {
  accessorKey: string;
  header: string;
}

export interface DataTableProps {
  columns: DataTableColumn[];
  data?: Record<string, unknown>[];
  isEmpty?: boolean;
  fallbackMessage?: string;
  className?: string;
}

export function DataTable({
  columns,
  data,
  isEmpty,
  fallbackMessage,
  className,
}: DataTableProps) {
  if (isEmpty) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-200 bg-gray-50 p-12",
          className,
        )}
      >
        <Text variant="muted" className="text-center">
          {fallbackMessage || "No data available."}
        </Text>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-200 bg-gray-50 p-12",
          className,
        )}
      >
        <Text variant="muted" className="text-center">
          No data to display.
        </Text>
      </div>
    );
  }

  return (
    <div className={cn("overflow-hidden rounded-lg border border-gray-200", className)}>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead key={col.accessorKey}>{col.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIdx) => (
            <TableRow key={rowIdx}>
              {columns.map((col) => (
                <TableCell key={col.accessorKey}>
                  {String(row[col.accessorKey] ?? "")}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
