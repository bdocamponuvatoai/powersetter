import { expect, routes, test } from "./fixtures";

test("every route renders with one h1 and no horizontal overflow", async ({ page }) => {
  for (const route of routes) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    // Let link prefetches finish; WebKit logs prefetches cancelled by the next goto as errors.
    await page.waitForLoadState("networkidle");
    await expect(page.locator("h1"), route).toHaveCount(1);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow, route).toBeLessThanOrEqual(0);
  }
});

test("homepage shows every section", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("You choose who supplies it.");
  for (const name of [
    "Three lines on your bill decide what you can save",
    "What you can compare",
    "Where you can choose",
    "Solar power, without panels on your roof",
    "Energy for the business you are building",
    "How switching works",
    "Plain-English energy guides",
    "Questions people ask",
  ]) {
    await expect(page.getByRole("heading", { level: 2, name })).toBeVisible();
  }
});

test("production build sends security headers", async ({ page }) => {
  const response = await page.goto("/");
  const headers = response!.headers();
  expect(headers["content-security-policy"]).toContain("default-src 'self'");
  expect(headers["content-security-policy"]).toContain("frame-ancestors 'none'");
  expect(headers["content-security-policy"]).not.toContain("vercel.live");
  expect(headers["strict-transport-security"]).toContain("max-age=63072000");
  expect(headers["x-content-type-options"]).toBe("nosniff");
  expect(headers["x-frame-options"]).toBe("DENY");
  expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(headers["cross-origin-opener-policy"]).toBe("same-origin");
  expect(headers["permissions-policy"]).toContain("camera=()");
  expect(headers["x-powered-by"]).toBeUndefined();
});

test("reduced motion shows every revealed element", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const hidden = await page.$$eval(
    "[data-reveal]",
    (elements) => elements.filter((element) => getComputedStyle(element).opacity !== "1").length,
  );
  expect(hidden).toBe(0);
});

test("the example bill changes only the supply line", async ({ page }) => {
  await page.goto("/");
  const bill = page.getByRole("figure").filter({ hasText: "Example statement" });
  await expect(bill).toContainText("$199.80");
  await expect(bill).toContainText("$55.80");
  await bill.getByRole("button", { name: /Supplier rate/ }).click();
  await expect(bill.getByRole("button", { name: /Supplier rate/ })).toHaveAttribute("aria-pressed", "true");
  await expect(bill).toContainText("$108.00");
  await expect(bill).toContainText("$172.80");
  await expect(bill).toContainText("$55.80");
  await expect(bill).toContainText("Delivery unchanged. $27.00 less this month.");
});

test("coverage map checks a ZIP against the listed states", async ({ page }) => {
  await page.goto("/");
  const zip = page.getByLabel("Check a ZIP code");
  const result = page.locator("#coverage-result");

  await zip.fill("77019");
  await page.getByRole("button", { name: "Check", exact: true }).click();
  await expect(result).toContainText("Texas is one of the states PowerSetter lists");

  await zip.fill("10001");
  await page.getByRole("button", { name: "Check", exact: true }).click();
  await expect(result).toContainText("outside the ten listed states");

  await zip.fill("12");
  await page.getByRole("button", { name: "Check", exact: true }).click();
  await expect(result).toContainText("Enter a 5-digit ZIP code");
  await expect(zip).toHaveAttribute("aria-invalid", "true");
});

test("FAQ answers open", async ({ page }) => {
  await page.goto("/");
  const question = page.getByText("Will my utility change if I switch supplier?");
  await question.click();
  await expect(page.getByText("Your local utility still delivers your energy")).toBeVisible();
});

test("energy links jump to the gas section", async ({ page }) => {
  await page.goto("/energy#gas");
  await expect(page.getByRole("heading", { level: 2, name: "Natural gas" })).toBeInViewport();
});

test("calculator handles savings, higher cost and invalid rates", async ({ page }) => {
  await page.goto("/savings");
  await expect(page.getByText("Lower supply cost per year")).toBeVisible();
  await expect(page.getByText("$324", { exact: true })).toBeVisible();

  await page.getByLabel("A rate to compare").fill("18");
  await expect(page.getByText("Higher supply cost per year")).toBeVisible();

  await page.getByLabel("A rate to compare").fill("");
  await expect(page.getByText("Enter both rates between 0 and 100 cents per kWh.")).toBeVisible();
});

test("photos are labelled as illustrative", async ({ page }) => {
  await page.goto("/");
  const figures = page.locator("figure:has(img)");
  const count = await figures.count();
  expect(count).toBeGreaterThan(0);
  for (let i = 0; i < count; i++) await expect(figures.nth(i)).toContainText("Illustrative image");
});

test("branded 404 returns status 404", async ({ page, pageErrors }) => {
  const response = await page.goto("/no-such-page");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("This page is not on the bill.");
  // The browser logs the 404 response itself; that is expected here only.
  for (let i = pageErrors.length - 1; i >= 0; i--) if (/404/.test(pageErrors[i]!)) pageErrors.splice(i, 1);
});

test("robots, sitemap, manifest and social image are served", async ({ request, page }) => {
  const robots = await request.get("/robots.txt");
  expect(await robots.text()).toContain("Disallow: /");

  const sitemap = await (await request.get("/sitemap.xml")).text();
  for (const route of ["/energy", "/learn/compare-energy-plans"]) expect(sitemap).toContain(`${route}</loc>`);

  const manifest = await (await request.get("/manifest.webmanifest")).json();
  expect(manifest.name).toBe("PowerSetter");

  await page.goto("/");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, nofollow");
  const ogImage = await page.locator('meta[property="og:image"]').getAttribute("content");
  expect(ogImage).toContain("opengraph-image");
  const image = await request.get(new URL(ogImage!).pathname);
  expect(image.headers()["content-type"]).toBe("image/jpeg");
});

test("works without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Where you can choose" })).toBeVisible();
  await expect(page.locator('a[href="tel:+18008336952"]').first()).toBeAttached();

  // The hero ZIP form is a plain GET form, so it still reaches the compare page.
  await page.getByLabel("ZIP code", { exact: true }).fill("02108");
  await page.getByRole("button", { name: "Find my options" }).click();
  await expect(page).toHaveURL(/\/compare\?interest=electricity&zip=02108/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Find my energy options");
  await context.close();
});
