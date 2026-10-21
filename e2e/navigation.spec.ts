import { expect, test } from "./fixtures";

test("desktop navigation marks the current page", async ({ page, isMobile }) => {
  test.skip(isMobile, "desktop navigation is hidden on phones");
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/community-solar");
  const nav = page.getByRole("navigation", { name: "Main" });
  await expect(nav.getByRole("link", { name: "Community solar" })).toHaveAttribute("aria-current", "page");
  await nav.getByRole("link", { name: "Business" }).click();
  await expect(page).toHaveURL(/\/business$/);
  await expect(nav.getByRole("link", { name: "Business" })).toHaveAttribute("aria-current", "page");
});

test("mobile menu opens, closes with Escape and returns focus", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile menu only");
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Open menu" });
  await trigger.click();
  const menu = page.getByRole("dialog", { name: "Menu" });
  await expect(menu).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(menu).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("mobile menu link navigates and closes the menu", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile menu only");
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  const menu = page.getByRole("dialog", { name: "Menu" });
  await menu.getByRole("link", { name: "About" }).click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(menu).toBeHidden();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("No one should overpay for electricity");
});

test("mobile action bar appears once the hero is scrolled past", async ({ page, isMobile }) => {
  test.skip(!isMobile, "phones only");
  await page.goto("/");
  const bar = page.getByTestId("mobile-action-bar");
  await expect(bar).toBeHidden();
  await page.getByRole("heading", { name: "What you can compare" }).scrollIntoViewIfNeeded();
  await expect(bar).toBeVisible();
  await expect(bar.getByRole("link", { name: "Call" })).toHaveAttribute("href", "tel:+18008336952");
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(bar).toBeHidden();
});

test("skip link is the first tab stop and moves focus to main", async ({ page, browserName }) => {
  test.skip(browserName === "webkit", "Safari does not tab to links by default");
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to content" });
  await expect(skip).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
});

test("header turns solid on scroll", async ({ page }) => {
  await page.goto("/");
  const header = page.locator("header").first();
  await expect(header).not.toHaveAttribute("data-scrolled");
  await page.evaluate(() => window.scrollTo(0, 600));
  await expect(header).toHaveAttribute("data-scrolled", "true");
});

test("external links open safely in a new tab", async ({ page }) => {
  await page.goto("/contact");
  const links = page.locator('a[target="_blank"]');
  const count = await links.count();
  expect(count).toBeGreaterThan(0);
  for (let i = 0; i < count; i++) await expect(links.nth(i)).toHaveAttribute("rel", /noopener/);
});
