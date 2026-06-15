"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Alert,
  AlertTitle,
  AlertDescription,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AspectRatio,
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  ButtonGroup,
  Calendar,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Carousel,
  Checkbox,
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  Combobox,
  Command,
  ContextMenu,
  DataTable,
  DatePicker,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  FallbackMessage,
  Field,
  HoverCard,
  Icon,
  Input,
  InputGroup,
  InputGroupAddon,
  InputOTP,
  Kbd,
  Label,
  Menubar,
  MenubarMenu,
  MenubarItem,
  MenubarSeparator,
  MetricCard,
  NativeSelect,
  NavigationMenu,
  Pagination,
  PieChart,
  Popover,
  PopoverTrigger,
  PopoverContent,
  ProgressBar,
  RadioGroup,
  RadioGroupItem,
  ResizablePanelGroup,
  ScrollArea,
  Select,
  Separator,
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  Sidebar,
  Skeleton,
  Slider,
  Spinner,
  Switch,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Text,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
} from "@syntave/ui";
import { cn } from "@syntave/ui";

const DEMOS: Record<string, () => React.ReactNode> = {
  "metric-card": () => (
    <MetricCard
      title="Total Revenue"
      value="$124,850"
      description="Last 30 days"
      trend={{ value: 12.5, direction: "up" }}
    />
  ),
  "data-table": () => (
    <DataTable
      columns={[
        { accessorKey: "name", header: "Name" },
        { accessorKey: "role", header: "Role" },
      ]}
      data={[
        { name: "Alice", role: "Engineer" },
        { name: "Bob", role: "Designer" },
      ]}
    />
  ),
  "fallback-message": () => (
    <div className="space-y-3">
      <FallbackMessage variant="empty" message="No data available." />
      <FallbackMessage variant="error" message="Connection failed." />
      <FallbackMessage variant="info" message="Sign in to continue." />
    </div>
  ),
  "pie-chart": () => (
    <PieChart
      title="Revenue by Region"
      data={[
        { label: "North", value: 40000 },
        { label: "South", value: 30000 },
        { label: "East", value: 20000 },
      ]}
    />
  ),
  "progress-bar": () => <ProgressBar label="Completion" value={75} />,
  card: () => (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description</CardDescription>
      </CardHeader>
      <CardContent>Card content</CardContent>
      <CardFooter>Card footer</CardFooter>
    </Card>
  ),
  button: () => (
    <div className="flex flex-wrap gap-2">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
  badge: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="destructive">Destructive</Badge>
    </div>
  ),
  text: () => (
    <div className="space-y-1">
      <Text variant="h1">Heading 1</Text>
      <Text variant="h2">Heading 2</Text>
      <Text variant="h3">Heading 3</Text>
      <Text variant="body">Body text</Text>
      <Text variant="muted">Muted text</Text>
      <Text variant="code">code text</Text>
    </div>
  ),
  input: () => <Input placeholder="Type something..." />,
  separator: () => <Separator />,
  skeleton: () => (
    <div className="space-y-3">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  ),
  table: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Alice</TableCell>
          <TableCell>Engineer</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
  icon: () => (
    <div className="flex gap-3 text-gray-500">
      <Icon name="Settings" />
      <Icon name="Bell" />
      <Icon name="User" />
    </div>
  ),
  accordion: () => (
    <Accordion defaultValue="a">
      <AccordionItem value="a">
        <AccordionTrigger value="a">Section A</AccordionTrigger>
        <AccordionContent value="a">Content A</AccordionContent>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger value="b">Section B</AccordionTrigger>
        <AccordionContent value="b">Content B</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  alert: () => (
    <div className="space-y-3">
      <Alert variant="info" title="Info">
        This is an informational alert.
      </Alert>
      <Alert variant="success" title="Success">
        Operation completed.
      </Alert>
      <Alert variant="warning" title="Warning">
        Check your inputs.
      </Alert>
      <Alert variant="error" title="Error">
        Something went wrong.
      </Alert>
    </div>
  ),
  "alert-dialog": () => (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant="outline">Open Alert</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm</AlertDialogTitle>
          <AlertDialogDescription>Are you sure?</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel />
          <AlertDialogAction />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
  avatar: () => (
    <div className="flex items-center gap-3">
      <Avatar fallback="AL" />
      <Avatar fallback="SY" size="lg" />
      <Avatar src="" alt="User" />
    </div>
  ),
  breadcrumb: () => (
    <Breadcrumb
      items={[
        { label: "Home", href: "#" },
        { label: "Docs" },
        { label: "Button" },
      ]}
    />
  ),
  "button-group": () => (
    <ButtonGroup>
      <Button variant="outline">Left</Button>
      <Button variant="outline">Center</Button>
      <Button variant="outline">Right</Button>
    </ButtonGroup>
  ),
  calendar: () => <Calendar />,
  carousel: () => (
    <Carousel
      slides={[
        <div
          key="1"
          className="flex h-32 items-center justify-center rounded-lg bg-gray-100 text-gray-500"
        >
          Slide 1
        </div>,
        <div
          key="2"
          className="flex h-32 items-center justify-center rounded-lg bg-gray-100 text-gray-500"
        >
          Slide 2
        </div>,
        <div
          key="3"
          className="flex h-32 items-center justify-center rounded-lg bg-gray-100 text-gray-500"
        >
          Slide 3
        </div>,
      ]}
    />
  ),
  checkbox: () => (
    <div className="flex items-center gap-2">
      <Checkbox /> <Label>Accept terms</Label>
    </div>
  ),
  collapsible: () => (
    <Collapsible>
      <CollapsibleTrigger>Show details</CollapsibleTrigger>
      <CollapsibleContent>Hidden content here.</CollapsibleContent>
    </Collapsible>
  ),
  combobox: () => (
    <Combobox
      options={[
        { value: "a", label: "Option A" },
        { value: "b", label: "Option B" },
      ]}
      placeholder="Choose..."
    />
  ),
  command: () => (
    <Command
      items={[
        { id: "1", label: "Settings" },
        { id: "2", label: "Profile" },
        { id: "3", label: "Logout" },
      ]}
    />
  ),
  "context-menu": () => (
    <ContextMenu
      items={[
        { label: "Edit", onClick: () => {} },
        { label: "Delete", onClick: () => {} },
      ]}
    >
      <div className="rounded-md border border-dashed border-gray-200 p-4 text-center text-sm text-gray-400">
        Right-click here
      </div>
    </ContextMenu>
  ),
  "date-picker": () => <DatePicker />,
  dialog: () => (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>Dialog description</DialogDescription>
        </DialogHeader>
        <p className="text-sm text-gray-600">Dialog content goes here.</p>
        <DialogFooter>
          <Button variant="outline" onClick={() => {}}>
            Cancel
          </Button>
          <Button>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  drawer: () => (
    <Drawer>
      <DrawerTrigger>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>Drawer content here.</DrawerContent>
    </Drawer>
  ),
  "dropdown-menu": () => (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline">Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  field: () => (
    <Field label="Email" description="We'll never share your email." error="">
      <Input placeholder="Enter email" />
    </Field>
  ),
  "hover-card": () => (
    <HoverCard
      content={
        <div className="space-y-1">
          <p className="text-sm font-medium">Details</p>
          <p className="text-xs text-gray-500">More info here</p>
        </div>
      }
    >
      <span className="cursor-pointer text-sm underline underline-offset-2">
        Hover me
      </span>
    </HoverCard>
  ),
  "input-group": () => (
    <InputGroup>
      <InputGroupAddon>@</InputGroupAddon>
      <Input placeholder="username" />
    </InputGroup>
  ),
  "input-otp": () => <InputOTP />,
  kbd: () => <Kbd keys={["Ctrl", "K"]} />,
  label: () => <Label>Form Label</Label>,
  menubar: () => (
    <Menubar>
      <MenubarMenu label="File">
        <MenubarItem>New</MenubarItem>
        <MenubarItem>Open</MenubarItem>
        <MenubarSeparator />
        <MenubarItem>Save</MenubarItem>
      </MenubarMenu>
      <MenubarMenu label="Edit">
        <MenubarItem>Undo</MenubarItem>
        <MenubarItem>Redo</MenubarItem>
      </MenubarMenu>
    </Menubar>
  ),
  "native-select": () => (
    <NativeSelect
      options={[
        { value: "a", label: "Option A" },
        { value: "b", label: "Option B" },
      ]}
    />
  ),
  "navigation-menu": () => (
    <NavigationMenu
      items={[
        { label: "Home", href: "#" },
        {
          label: "Products",
          children: [
            { label: "GenUI", href: "#" },
            { label: "CLI", href: "#" },
          ],
        },
        { label: "Docs", href: "#" },
      ]}
    />
  ),
  pagination: () => (
    <Pagination currentPage={3} totalPages={10} onPageChange={() => {}} />
  ),
  popover: () => (
    <Popover>
      <PopoverTrigger>
        <Button variant="outline">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>Popover content here.</PopoverContent>
    </Popover>
  ),
  "radio-group": () => (
    <RadioGroup defaultValue="a">
      <RadioGroupItem value="a">Option A</RadioGroupItem>
      <RadioGroupItem value="b">Option B</RadioGroupItem>
    </RadioGroup>
  ),
  resizable: () => (
    <div className="h-40 rounded-lg border border-gray-200">
      <ResizablePanelGroup direction="horizontal" defaultSizes={[50, 50]}>
        <div className="flex items-center justify-center p-4 text-sm text-gray-500">
          Panel 1
        </div>
        <div className="flex items-center justify-center p-4 text-sm text-gray-500">
          Panel 2
        </div>
      </ResizablePanelGroup>
    </div>
  ),
  "scroll-area": () => (
    <ScrollArea className="h-24 rounded-md border border-gray-200 p-3">
      {Array.from({ length: 10 }).map((_, i) => (
        <p key={i} className="text-sm text-gray-600">
          Line {i + 1}
        </p>
      ))}
    </ScrollArea>
  ),
  select: () => (
    <Select
      options={[
        { value: "a", label: "Option A" },
        { value: "b", label: "Option B" },
      ]}
    />
  ),
  sheet: () => (
    <Sheet>
      <SheetTrigger>
        <Button variant="outline">Open Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Sheet Title</SheetTitle>
          <SheetDescription>Sheet description</SheetDescription>
        </SheetHeader>
        <div className="p-4 text-sm text-gray-600">Sheet content here.</div>
      </SheetContent>
    </Sheet>
  ),
  sidebar: () => (
    <div className="h-64 rounded-lg border border-gray-200">
      <Sidebar
        items={[
          {
            label: "Dashboard",
            href: "#",
            icon: <Icon name="LayoutDashboard" />,
            active: true,
          },
          {
            label: "Users",
            icon: <Icon name="Users" />,
            items: [
              { label: "All Users", href: "#" },
              { label: "Roles", href: "#" },
            ],
          },
          { label: "Settings", href: "#", icon: <Icon name="Settings" /> },
        ]}
      />
    </div>
  ),
  slider: () => <Slider defaultValue={[50]} />,
  spinner: () => (
    <div className="flex items-center gap-3">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  ),
  switch: () => <Switch />,
  tabs: () => (
    <Tabs defaultValue="a">
      <TabsList>
        <TabsTrigger value="a">Tab A</TabsTrigger>
        <TabsTrigger value="b">Tab B</TabsTrigger>
      </TabsList>
      <TabsContent value="a">Content A</TabsContent>
      <TabsContent value="b">Content B</TabsContent>
    </Tabs>
  ),
  toast: () => (
    <Button onClick={() => {}} variant="outline">
      Trigger Toast (runs via toast())
    </Button>
  ),
  toggle: () => <Toggle>Bold</Toggle>,
  "toggle-group": () => (
    <ToggleGroup type="multiple" defaultValue={["bold"]}>
      <ToggleGroupItem value="bold">B</ToggleGroupItem>
      <ToggleGroupItem value="italic">I</ToggleGroupItem>
      <ToggleGroupItem value="underline">U</ToggleGroupItem>
    </ToggleGroup>
  ),
  tooltip: () => (
    <Tooltip content="Tooltip text">
      <span className="cursor-pointer text-sm underline underline-offset-2">
        Hover me
      </span>
    </Tooltip>
  ),
  "aspect-ratio": () => (
    <AspectRatio ratio={16 / 9}>
      <div className="flex h-full items-center justify-center rounded-lg bg-gray-100 text-sm text-gray-500">
        16:9
      </div>
    </AspectRatio>
  ),
};

export function ComponentDemo({ component }: { component: string }) {
  const render = DEMOS[component];
  if (!render) return null;

  return (
    <section className="space-y-4">
      <h2 className="text-syntave-900 text-lg font-semibold">Demo</h2>
      <div className="border-syntave-200 rounded-2xl border bg-white p-8">
        {render()}
      </div>
    </section>
  );
}
