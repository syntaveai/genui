import { cn } from "./lib/utils";

export interface InputGroupProps {
  children?: React.ReactNode;
  className?: string;
}

export function InputGroup({ children, className }: InputGroupProps) {
  return (
    <div
      className={cn(
        "flex items-center [&>:first-child]:rounded-r-none [&>:last-child]:rounded-l-none [&>:not(:first-child):not(:last-child)]:rounded-none [&>:not(:first-child)]:-ml-px",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function InputGroupAddon({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-500",
        className,
      )}
    >
      {children}
    </div>
  );
}
