import { test, expect } from "@playwright/test";

test.describe("E2E: Home Page", () => {
  test("should load the home page and display the main heading", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});
