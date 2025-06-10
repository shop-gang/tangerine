# Test info

- Name: E2E: Home Page >> should load the home page and display the main heading
- Location: /aether/client/e2e/basic.spec.ts:4:7

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/
Call log:
  - navigating to "http://localhost:3000/", waiting until "load"

    at /aether/client/e2e/basic.spec.ts:7:16
```

# Test source

```ts
   1 | import { test, expect } from "@playwright/test";
   2 |
   3 | test.describe("E2E: Home Page", () => {
   4 |   test("should load the home page and display the main heading", async ({
   5 |     page,
   6 |   }) => {
>  7 |     await page.goto("/");
     |                ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/
   8 |     await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
   9 |   });
  10 | });
  11 |
```