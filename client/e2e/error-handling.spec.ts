import { test, expect } from "@playwright/test";

test.describe("Error Handling Integration Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should show error toast for network failures", async ({ page }) => {
    // Simulate offline mode
    await page.route("**/api/draft", (route) => route.abort("failed"));

    // Try to submit a prompt
    await page.fill('input[placeholder*="Enter your prompt"]', "Test prompt");
    await page.click('button[type="submit"]');

    // Check for error toast
    const errorToast = await page.waitForSelector(
      "text/Unable to connect to the server"
    );
    expect(await errorToast.isVisible()).toBeTruthy();
  });

  test("should show retry button on generation failure", async ({ page }) => {
    // Simulate server error
    await page.route("**/api/draft", (route) =>
      route.fulfill({
        status: 500,
        body: JSON.stringify({ error: "Internal server error" }),
      })
    );

    await page.fill('input[placeholder*="Enter your prompt"]', "Test prompt");
    await page.click('button[type="submit"]');

    const retryButton = await page.waitForSelector(
      'button:has-text("Try again")'
    );
    expect(await retryButton.isVisible()).toBeTruthy();
  });

  test("should handle timeout gracefully", async ({ page }) => {
    // Simulate timeout
    await page.route("**/api/draft", async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      route.fulfill({
        status: 408,
        body: JSON.stringify({ error: "Request timeout" }),
      });
    });

    await page.fill('input[placeholder*="Enter your prompt"]', "Test prompt");
    await page.click('button[type="submit"]');

    const timeoutMessage = await page.waitForSelector(
      "text/The request took too long"
    );
    expect(await timeoutMessage.isVisible()).toBeTruthy();
  });

  test("should show error for invalid input", async ({ page }) => {
    await page.fill('input[placeholder*="Enter your prompt"]', "   ");
    await page.click('button[type="submit"]');

    const inputError = await page.waitForSelector(
      "text/Please provide a valid prompt"
    );
    expect(await inputError.isVisible()).toBeTruthy();
  });

  test("should handle PDF generation errors", async ({ page }) => {
    // Let the draft generation succeed but PDF export fail
    await page.route("**/api/draft", (route) =>
      route.fulfill({
        status: 200,
        body: JSON.stringify({
          draft: {
            title: "Test Book",
            content: "Test content",
          },
        }),
      })
    );

    await page.route("**/api/export/pdf", (route) =>
      route.fulfill({
        status: 500,
        body: JSON.stringify({ error: "PDF generation failed" }),
      })
    );

    await page.fill('input[placeholder*="Enter your prompt"]', "Test prompt");
    await page.click('button[type="submit"]');
    await page.click('button:has-text("Export PDF")');

    const pdfError = await page.waitForSelector("text/Failed to generate PDF");
    expect(await pdfError.isVisible()).toBeTruthy();
  });

  test("should recover from temporary errors", async ({ page }) => {
    let attempts = 0;
    await page.route("**/api/draft", (route) => {
      if (attempts++ === 0) {
        route.fulfill({
          status: 500,
          body: JSON.stringify({ error: "Temporary error" }),
        });
      } else {
        route.fulfill({
          status: 200,
          body: JSON.stringify({
            draft: {
              title: "Test Book",
              content: "Test content",
            },
          }),
        });
      }
    });

    await page.fill('input[placeholder*="Enter your prompt"]', "Test prompt");
    await page.click('button[type="submit"]');

    // Click retry button
    await page.click('button:has-text("Try again")');

    // Verify success
    const successMessage = await page.waitForSelector(
      "text/Draft generated successfully"
    );
    expect(await successMessage.isVisible()).toBeTruthy();
  });
});
