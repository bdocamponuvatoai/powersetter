import { expect, test } from "./fixtures";

test("hero ZIP form validates before leaving the page", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("ZIP code", { exact: true }).fill("123");
  await page.getByRole("button", { name: "Find my options" }).first().click();
  await expect(page.getByText("Enter a 5-digit ZIP code, for example 02108.")).toBeVisible();
  await expect(page.getByLabel("ZIP code", { exact: true })).toBeFocused();
  await expect(page).toHaveURL(/\/$/);
});

test("hero presets carry into the compare flow", async ({ page }) => {
  await page.goto("/");
  await page.getByText("For my business").click();
  await page.getByLabel("ZIP code", { exact: true }).fill("06103");
  await page.getByRole("main").getByRole("button", { name: "Find my options" }).click();
  await expect(page).toHaveURL(/\/compare\?interest=business&zip=06103/);
  await expect(page.getByRole("heading", { level: 2, name: "Where is the service?" })).toBeVisible();
  await expect(page.getByText("Comparing Business energy")).toBeVisible();
  await expect(page.getByLabel("Service ZIP code")).toHaveValue("06103");
});

test("compare flow validates the ZIP, moves focus and hands off honestly", async ({ page }) => {
  await page.goto("/compare");
  await page.getByRole("main").getByText("Community solar", { exact: true }).click();
  await page.getByRole("button", { name: "Continue" }).click();

  const step2 = page.getByRole("heading", { level: 2, name: "Where is the service?" });
  await expect(step2).toBeFocused();

  await page.getByRole("button", { name: "See my next step" }).click();
  const zip = page.getByLabel("Service ZIP code");
  await expect(page.getByText("Enter a 5-digit ZIP code, for example 02108.")).toBeVisible();
  await expect(zip).toHaveAttribute("aria-invalid", "true");
  await expect(zip).toBeFocused();

  await zip.fill("02108");
  await page.getByLabel("What matters most?").selectOption("Explore renewable energy");
  await page.getByRole("button", { name: "See my next step" }).click();

  await expect(page.getByRole("heading", { level: 2, name: "Your next step" })).toBeFocused();
  await expect(page.getByText("Massachusetts (listed by PowerSetter)")).toBeVisible();
  await expect(page.getByText("This page has not checked availability or sent your details anywhere.")).toBeVisible();
  const handoff = page.getByRole("link", { name: /Continue to PowerSetter/ });
  await expect(handoff).toHaveAttribute("href", "https://www.powersetter.com/");
  await expect(handoff).toHaveAttribute("target", "_blank");

  await page.getByRole("button", { name: "Change my answers" }).click();
  await expect(page.getByRole("heading", { level: 2, name: "What would you like to compare?" })).toBeFocused();
});

test("unknown query values are ignored", async ({ page }) => {
  await page.goto("/compare?interest=%3Cscript%3E&zip=abcde");
  await expect(page.getByRole("heading", { level: 2, name: "What would you like to compare?" })).toBeVisible();
  await expect(page.getByRole("radio", { name: /^Electricity/ })).toBeChecked();
});

test("business handoff goes to the contact form", async ({ page }) => {
  await page.goto("/compare?interest=business&zip=60601");
  await page.getByRole("button", { name: "See my next step" }).click();
  await expect(page.getByText("Illinois (listed by PowerSetter)")).toBeVisible();
  await expect(page.getByRole("link", { name: /Continue to PowerSetter/ })).toHaveAttribute(
    "href",
    "https://www.powersetter.com/contact-us/",
  );
});
