import { cn } from "./lib/utils";

export interface FieldProps {
  label?: string;
  description?: string;
  error?: string;
  children?: React.ReactNode;
  className?: string;
}

export function Field({
  label,
  description,
  error,
  children,
  className,
}: FieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label className="text-sm font-medium leading-none text-gray-700">
          {label}
        </label>
      )}
      {children}
      {description && !error && (
        <p className="text-sm text-gray-500">{description}</p>
      )}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
