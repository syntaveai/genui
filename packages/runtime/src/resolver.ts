export interface DataSourceRegistration<P = unknown> {
  paramsSchema?: {
    parse: (params: unknown) => P;
  };
  handler: (params: P) => Promise<unknown>;
}

export interface LlmPayload {
  type: string;
  props: Record<string, unknown>;
}

export interface ResolvedPayload {
  type: string;
  props: Record<string, unknown>;
}

export async function resolvePayload(
  llmPayload: LlmPayload,
  allowedDataSources: Record<string, DataSourceRegistration>,
): Promise<ResolvedPayload> {
  const { dataSource: rawDataSource, dataSourceParams, ...otherProps } = llmPayload.props;
  const dataSource = typeof rawDataSource === "string" ? rawDataSource : undefined;

  if (dataSource && dataSource in allowedDataSources) {
    const registration = allowedDataSources[dataSource]!;

    try {
      let validatedParams: unknown = dataSourceParams;

      if (registration.paramsSchema && dataSourceParams !== undefined) {
        validatedParams = registration.paramsSchema.parse(dataSourceParams);
      }

      const realData = await registration.handler(validatedParams);

      if (
        realData === null ||
        realData === undefined ||
        (Array.isArray(realData) && realData.length === 0)
      ) {
        return {
          type: llmPayload.type,
          props: {
            ...otherProps,
            isEmpty: true,
            fallbackMessage: "No data available for this specific query.",
          },
        };
      }

      return {
        type: llmPayload.type,
        props: { ...otherProps, data: realData },
      };
    } catch {
      return {
        type: "FallbackMessage",
        props: {
          message: "We encountered an error retrieving that data.",
          variant: "error",
        },
      };
    }
  }

  if (dataSource && !(dataSource in allowedDataSources)) {
    return {
      type: "FallbackMessage",
      props: {
        message: `Access to data source "${dataSource}" is not permitted.`,
        variant: "error",
      },
    };
  }

  return llmPayload;
}
