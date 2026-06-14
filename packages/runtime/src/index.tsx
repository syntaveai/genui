import {
  MetricCard,
  DataTable,
  FallbackMessage,
} from "@syntave/ui";

export type ComponentMap = Record<
  string,
  React.ComponentType<Record<string, unknown>>
>;

const defaultComponentMap: ComponentMap = {
  MetricCard: MetricCard as unknown as React.ComponentType<Record<string, unknown>>,
  DataTable: DataTable as unknown as React.ComponentType<Record<string, unknown>>,
  FallbackMessage: FallbackMessage as unknown as React.ComponentType<Record<string, unknown>>,
};

export interface GenerativeUIProps {
  payload: {
    type: string;
    props: Record<string, unknown>;
  } | null;
  componentMap?: ComponentMap;
}

export function GenerativeUI({
  payload,
  componentMap,
}: GenerativeUIProps) {
  if (!payload?.type) {
    return null;
  }

  const map = componentMap ?? defaultComponentMap;
  const Component = map[payload.type];

  if (!Component) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-200 bg-gray-50 p-12">
        <p className="text-center font-inter text-sm font-medium text-gray-500">
          Component &quot;{payload.type}&quot; not installed.{" "}
          Run{" "}
          <code className="font-mono text-gray-800">
            npx genui add {payload.type.toLowerCase()}
          </code>
        </p>
      </div>
    );
  }

  return <Component {...payload.props} />;
}
