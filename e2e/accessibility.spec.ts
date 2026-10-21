import AxeBuilder from "@axe-core/playwright";
import type { Page } from "@playwright/test";
import { expect, routes, test } from "./fixtures";

const tags = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

async function expectNoViolations(page: Page, label: string) {
  const results = await new AxeBuilder({ page }).withTags(tags).analyze();
  const summary = results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`);
  expect(summary, label).toEqual([]);
}

test.beforeEach(async ({ page }) => {
  // Measure final colours, not mid-fade ones.
  await page.emulateMedia({ reducedMotion: "reduce" });
});

for (const route of routes) {
  test(`no WCAG 2.2 AA violations on ${route}`, async ({ page }) => {
    await page.goto(route);
    await expectNoViolations(page, route);
  });
}

test("no violations in every compare step", async ({ page }) => {
  await page.goto("/compare");
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByRole("button", { name: "See my next step" }).click();
  await expect(page.getByLabel("Service ZIP code")).toHaveAttribute("aria-invalid", "true");
  await expectNoViolations(page, "step 2 with error");
  await page.getByLabel("Service ZIP code").fill("19103");
  await page.getByRole("button", { name: "See my next step" }).click();
  await expect(page.getByRole("heading", { name: "Your next step" })).toBeVisible();
  await expectNoViolations(page, "step 3");
});

test("no violations with interactive states open", async ({ page, isMobile }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /Supplier rate/ }).click();
  await page.getByLabel("Check a ZIP code").fill("44114");
  await page.getByRole("button", { name: "Check", exact: true }).click();
  await page.getByText("Which states does PowerSetter serve?").click();
  await expectNoViolations(page, "home interactive states");

  if (isMobile) {
    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(page.getByRole("dialog", { name: "Menu" })).toBeVisible();
    await expectNoViolations(page, "mobile menu");
  }

  await page.goto("/savings");
  await page.getByLabel("A rate to compare").fill("");
  await expectNoViolations(page, "calculator invalid");
});
