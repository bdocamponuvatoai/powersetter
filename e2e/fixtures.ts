import { test as base, expect } from "@playwright/test";

// Fails any test that logs a console error or throws, which also catches CSP violations.
export const test = base.extend<{ pageErrors: string[] }>({
  pageErrors: [
    async ({ page }, use) => {
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(String(error)));
      page.on("console", (message) => {
        if (message.type() === "error") errors.push(message.text());
      });
      await use(errors);
      expect(errors, "console errors").toEqual([]);
    },
    { auto: true },
  ],
});

export { expect };

export const routes = [
  "/",
  "/energy",
  "/community-solar",
  "/business",
  "/how-it-works",
  "/compare",
  "/savings",
  "/about",
  "/contact",
  "/learn",
  "/learn/read-your-energy-bill",
  "/learn/community-solar-explained",
  "/learn/compare-energy-plans",
];
