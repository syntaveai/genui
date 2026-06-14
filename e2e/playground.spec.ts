import { test, expect } from "@playwright/test";

const METRIC_CARD_WITH_SOURCE = JSON.stringify(
  {
    type: "MetricCard",
    props: {
      title: "Total Revenue",
      dataSource: "get_revenue",
    },
  },
  null,
  2,
);

test.describe("Playground", () => {
  test("renders MetricCard from default JSON payload", async ({ page }) => {
    await page.goto("/");

    const textarea = page.locator("textarea");
    await expect(textarea).not.toBeEmpty();

    await page.getByRole("button", { name: "Resolve" }).click();

    await expect(page.getByText("Total Revenue").last()).toBeVisible();
    await expect(page.getByText("$42,000").last()).toBeVisible();
  });

  test("renders empty state when 'Empty Response' is simulated", async ({
    page,
  }) => {
    await page.goto("/");

    const textarea = page.locator("textarea");
    await textarea.fill(METRIC_CARD_WITH_SOURCE);

    await page.getByRole("combobox").selectOption("empty");
    await page.getByRole("button", { name: "Resolve" }).click();

    await expect(
      page.getByText("No data available for this specific query."),
    ).toBeVisible();
    await expect(page.locator(".border-dashed")).toBeVisible();
  });

  test("renders FallbackMessage when 'Simulate Error' is selected", async ({
    page,
  }) => {
    await page.goto("/");

    const textarea = page.locator("textarea");
    await textarea.fill(METRIC_CARD_WITH_SOURCE);

    await page.getByRole("combobox").selectOption("error");
    await page.getByRole("button", { name: "Resolve" }).click();

    await expect(
      page.getByText("We encountered an error retrieving that data."),
    ).toBeVisible();
  });

  test("renders error message for invalid JSON", async ({ page }) => {
    await page.goto("/");

    const textarea = page.locator("textarea");
    await textarea.fill("invalid json");
    await page.getByRole("button", { name: "Resolve" }).click();

    await expect(
      page.getByText("Invalid JSON. Please check your input."),
    ).toBeVisible();
  });
});
