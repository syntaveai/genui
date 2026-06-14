import { describe, it, expect } from "vitest";
import {
  MetricCardLLMSchema,
  MetricCardSchema,
  MetricCardPropsSchema,
  DataTableLLMSchema,
  DataTableSchema,
  DataTablePropsSchema,
  FallbackMessageLLMSchema,
  FallbackMessageSchema,
  FallbackMessagePropsSchema,
} from "../index";

describe("MetricCardLLMSchema", () => {
  it("accepts a valid LLM payload", () => {
    const result = MetricCardLLMSchema.parse({
      type: "MetricCard",
      props: { title: "Revenue", dataSource: "get_revenue" },
    });
    expect(result.props.title).toBe("Revenue");
    expect(result.props.dataSource).toBe("get_revenue");
  });

  it("accepts optional dataSourceParams", () => {
    const result = MetricCardLLMSchema.parse({
      type: "MetricCard",
      props: {
        title: "Revenue",
        dataSource: "get_revenue",
        dataSourceParams: { region: "US" },
      },
    });
    expect(result.props.dataSourceParams).toEqual({ region: "US" });
  });

  it("rejects missing dataSource", () => {
    expect(() =>
      MetricCardLLMSchema.parse({
        type: "MetricCard",
        props: { title: "Revenue" },
      }),
    ).toThrow();
  });

  it("rejects missing title", () => {
    expect(() =>
      MetricCardLLMSchema.parse({
        type: "MetricCard",
        props: { dataSource: "get_revenue" },
      }),
    ).toThrow();
  });
});

describe("MetricCardPropsSchema (resolved props)", () => {
  it("accepts resolved props with value", () => {
    const result = MetricCardPropsSchema.parse({
      title: "Revenue",
      value: "$42,000",
    });
    expect(result.value).toBe("$42,000");
  });

  it("accepts isEmpty flag", () => {
    const result = MetricCardPropsSchema.parse({
      title: "Revenue",
      value: 0,
      isEmpty: true,
      fallbackMessage: "No revenue data.",
    });
    expect(result.isEmpty).toBe(true);
  });

  it("rejects missing title", () => {
    expect(() => MetricCardPropsSchema.parse({ value: 100 })).toThrow();
  });
});

describe("DataTableLLMSchema", () => {
  it("accepts a valid LLM payload", () => {
    const result = DataTableLLMSchema.parse({
      type: "DataTable",
      props: {
        columns: [{ header: "Country", accessorKey: "country_name" }],
        dataSource: "get_countries",
      },
    });
    expect(result.props.columns[0]?.header).toBe("Country");
    expect(result.props.columns[0]?.accessorKey).toBe("country_name");
  });

  it("rejects missing dataSource", () => {
    expect(() =>
      DataTableLLMSchema.parse({
        type: "DataTable",
        props: { columns: [{ header: "Country", accessorKey: "country_name" }] },
      }),
    ).toThrow();
  });

  it("rejects column with key instead of accessorKey", () => {
    const result = DataTableLLMSchema.safeParse({
      type: "DataTable",
      props: {
        columns: [{ header: "Country", key: "country_name" }],
        dataSource: "get_countries",
      },
    });
    expect(result.success).toBe(false);
  });
});

describe("DataTablePropsSchema (resolved props)", () => {
  it("accepts resolved props with data", () => {
    const result = DataTablePropsSchema.parse({
      columns: [{ header: "Country", accessorKey: "country_name" }],
      data: [{ country_name: "India" }],
    });
    expect(result.data).toHaveLength(1);
  });

  it("accepts isEmpty flag", () => {
    const result = DataTablePropsSchema.parse({
      columns: [{ header: "Country", accessorKey: "country_name" }],
      isEmpty: true,
    });
    expect(result.isEmpty).toBe(true);
  });
});

describe("FallbackMessageLLMSchema", () => {
  it("accepts a valid payload", () => {
    const result = FallbackMessageLLMSchema.parse({
      type: "FallbackMessage",
      props: { message: "Data unavailable." },
    });
    expect(result.props.message).toBe("Data unavailable.");
  });

  it("defaults variant to info", () => {
    const result = FallbackMessageLLMSchema.parse({
      type: "FallbackMessage",
      props: { message: "Nothing here." },
    });
    expect(result.props.variant).toBe("info");
  });

  it("accepts explicit variant", () => {
    const result = FallbackMessageLLMSchema.parse({
      type: "FallbackMessage",
      props: { message: "Error!", variant: "error" },
    });
    expect(result.props.variant).toBe("error");
  });

  it("rejects invalid variant", () => {
    expect(() =>
      FallbackMessageLLMSchema.parse({
        type: "FallbackMessage",
        props: { message: "Oops", variant: "warning" },
      }),
    ).toThrow();
  });

  it("rejects missing message", () => {
    expect(() =>
      FallbackMessageLLMSchema.parse({
        type: "FallbackMessage",
        props: {},
      }),
    ).toThrow();
  });
});

describe("FallbackMessagePropsSchema (resolved props)", () => {
  it("accepts resolved props", () => {
    const result = FallbackMessagePropsSchema.parse({
      message: "Error occurred.",
      variant: "error",
    });
    expect(result.variant).toBe("error");
  });

  it("defaults to info", () => {
    const result = FallbackMessagePropsSchema.parse({ message: "Hey" });
    expect(result.variant).toBe("info");
  });
});
