import { test, expect } from "@playwright/test";

test.describe("Digital Heroes E2E Tests", () => {
  test("should render homepage with key sections and title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Digital Heroes/);
    await expect(page.locator("h1")).toContainText("Stableford Scores");
  });

  test("should navigate to how-it-works page", async ({ page }) => {
    await page.goto("/how-it-works");
    await expect(page.locator("h1")).toContainText("How Digital Heroes Works");
  });

  test("should navigate to charities directory page", async ({ page }) => {
    await page.goto("/charities");
    await expect(page.locator("h1")).toContainText("Partnered Charities");
  });

  test("should navigate to pricing page", async ({ page }) => {
    await page.goto("/pricing");
    await expect(page.locator("h1")).toContainText("Membership Plans");
  });

  test("should render subscriber dashboard with score shortcuts", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page.locator("h1")).toContainText("Welcome Back");
  });
});
