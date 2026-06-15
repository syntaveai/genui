import { cn } from "./lib/utils";

export interface ButtonGroupProps {
  children?: React.ReactNode;
  className?: string;
}

export function ButtonGroup({ children, className }: ButtonGroupProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center [&>:first-child]:rounded-r-none [&>:last-child]:rounded-l-none [&>:not(:first-child):not(:last-child)]:rounded-none [&>:not(:first-child)]:-ml-px",
        className,
      )}
    >
      {children}
    </div>
  );
}
