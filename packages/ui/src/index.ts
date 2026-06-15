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

// Batch 3
export {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "./sheet";
export { Drawer, DrawerTrigger, DrawerContent } from "./drawer";
export type { DrawerProps } from "./drawer";
export { Slider } from "./slider";
export type { SliderProps } from "./slider";
export { RadioGroup, RadioGroupItem } from "./radio-group";
export type { RadioGroupProps } from "./radio-group";
export { NativeSelect } from "./native-select";
export type { NativeSelectProps } from "./native-select";

// Batch 4
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "./dropdown-menu";
export { Breadcrumb } from "./breadcrumb";
export type { BreadcrumbProps } from "./breadcrumb";
export { Pagination } from "./pagination";
export type { PaginationProps } from "./pagination";
export { Toggle } from "./toggle";
export type { ToggleProps } from "./toggle";
export { ToastProvider, toast, useToast } from "./toast";
export { ScrollArea } from "./scroll-area";
export type { ScrollAreaProps } from "./scroll-area";

// Batch 5: Utilities
export { Avatar } from "./avatar";
export type { AvatarProps } from "./avatar";
export { Spinner } from "./spinner";
export type { SpinnerProps } from "./spinner";
export { Label } from "./label";
export type { LabelProps } from "./label";
export { Kbd } from "./kbd";
export type { KbdProps } from "./kbd";
export { AspectRatio } from "./aspect-ratio";
export type { AspectRatioProps } from "./aspect-ratio";
export { ButtonGroup } from "./button-group";
export type { ButtonGroupProps } from "./button-group";
export { ToggleGroup, ToggleGroupItem } from "./toggle-group";
export type { ToggleGroupProps } from "./toggle-group";
export { InputGroup, InputGroupAddon } from "./input-group";
export type { InputGroupProps } from "./input-group";
export { Field } from "./field";
export type { FieldProps } from "./field";

// Batch 6: Interactive
export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "./alert-dialog";
export { Combobox } from "./combobox";
export type { ComboboxProps, ComboboxOption } from "./combobox";
export { ContextMenu } from "./context-menu";
export type { ContextMenuProps } from "./context-menu";
export { HoverCard } from "./hover-card";
export type { HoverCardProps } from "./hover-card";
export { Menubar, MenubarMenu, MenubarItem, MenubarSeparator } from "./menubar";
export { NavigationMenu } from "./navigation-menu";
export type { NavigationMenuProps, NavItem } from "./navigation-menu";
export { InputOTP } from "./input-otp";
export type { InputOTPProps } from "./input-otp";
export { SonnerProvider, sonner } from "./sonner";
export { DirectionProvider, useDirection } from "./direction";

// Batch 7: Complex
export { Command } from "./command";
export type { CommandProps, CommandItem } from "./command";
export { Carousel } from "./carousel";
export type { CarouselProps } from "./carousel";
export { ResizablePanelGroup } from "./resizable";
export type { ResizablePanelGroupProps } from "./resizable";
export { Sidebar } from "./sidebar";
export type { SidebarProps, SidebarItem } from "./sidebar";
export { Calendar } from "./calendar";
export type { CalendarProps } from "./calendar";
export { DatePicker } from "./date-picker";
export type { DatePickerProps } from "./date-picker";
