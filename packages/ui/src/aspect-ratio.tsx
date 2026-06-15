export interface AspectRatioProps {
  ratio?: number;
  children?: React.ReactNode;
  className?: string;
}

export function AspectRatio({
  ratio = 16 / 9,
  children,
  className,
}: AspectRatioProps) {
  return (
    <div className={`relative ${className ?? ""}`}>
      <div style={{ paddingBottom: `${(1 / ratio) * 100}%` }} />
      <div className="absolute inset-0">{children}</div>
    </div>
  );
}
