export type ComponentMap = Record<
  string,
  React.ComponentType<Record<string, unknown>>
>;

export interface GenerativeUIProps {
  payload: {
    type: string;
    props: Record<string, unknown>;
  } | null;
  componentMap: ComponentMap;
}

export function GenerativeUI({ payload, componentMap }: GenerativeUIProps) {
  if (!payload?.type) {
    return null;
  }

  const Component = componentMap[payload.type];

  if (!Component) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-200 bg-gray-50 p-12">
        <p className="font-inter text-center text-sm font-medium text-gray-500">
          Component &quot;{payload.type}&quot; not registered. Add it to your{" "}
          <code className="font-mono text-gray-800">componentMap</code>.
        </p>
      </div>
    );
  }

  return <Component {...payload.props} />;
}
