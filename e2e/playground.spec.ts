import { test, expect } from "@playwright/test";

test.describe("Playground", () => {
  test("renders MetricCard from default JSON payload", async ({ page }) => {
    await page.goto("/");

    // Default textarea should contain MetricCard JSON
    const textarea = page.locator("textarea");
    await expect(textarea).not.toBeEmpty();

    // Click "Resolve"
    await page.getByRole("button", { name: "Resolve" }).click();

    // Assert MetricCard renders with the expected value
    await expect(page.getByText("Total Revenue")).toBeVisible();
    await expect(page.getByText("$42,000")).toBeVisible();
  });
});
