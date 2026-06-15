import { cn } from "./lib/utils";

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  keys: string[];
}

export function Kbd({ keys, className, ...props }: KbdProps) {
  return (
    <kbd
      className={cn(
        "inline-flex items-center gap-1 rounded-md border border-gray-200 bg-gray-50 px-1.5 py-0.5 font-mono text-xs text-gray-600",
        className,
      )}
      {...props}
    >
      {keys.map((key, i) => (
        <span key={i}>
          {i > 0 && <span className="mx-0.5 text-gray-300">+</span>}
          <span className="uppercase">{key}</span>
        </span>
      ))}
    </kbd>
  );
}
