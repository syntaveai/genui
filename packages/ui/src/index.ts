export { cn } from "./lib/utils";

// Primitives
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./card";
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "./table";
export { Separator } from "./separator";
export type { SeparatorProps } from "./separator";
export { Text } from "./text";
export type { TextProps } from "./text";
export { Badge } from "./badge";
export type { BadgeProps } from "./badge";
export { Skeleton } from "./skeleton";
export type { SkeletonProps } from "./skeleton";
export { Button } from "./button";
export type { ButtonProps } from "./button";
export { Input, Textarea } from "./input";
export type { InputProps, TextareaProps } from "./input";
export { Icon } from "./icon";
export type { IconProps } from "./icon";

// GenUI Components
export { MetricCard } from "./metric-card";
export type { MetricCardProps } from "./metric-card";
export { DataTable } from "./data-table";
export type { DataTableColumn, DataTableProps } from "./data-table";
export { FallbackMessage } from "./fallback-message";
export type { FallbackMessageProps } from "./fallback-message";
export { PieChart } from "./pie-chart";
export type { PieChartProps } from "./pie-chart";
export { ProgressBar } from "./progress-bar";
export type { ProgressBarProps } from "./progress-bar";

// New batch 1: Interaction & Display
export { Alert, AlertTitle, AlertDescription } from "./alert";
export type { AlertProps } from "./alert";
export { Checkbox } from "./checkbox";
export type { CheckboxProps } from "./checkbox";
export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./dialog";
export { Select } from "./select";
export type { SelectProps, SelectOption } from "./select";
export { Switch } from "./switch";
export type { SwitchProps } from "./switch";
export { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs";
export type { TabsProps } from "./tabs";

// Batch 2: Navigation & Overlay
export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./accordion";
export {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "./collapsible";
export type { CollapsibleProps } from "./collapsible";
export { Popover, PopoverTrigger, PopoverContent } from "./popover";
export { Tooltip } from "./tooltip";
export type { TooltipProps } from "./tooltip";
