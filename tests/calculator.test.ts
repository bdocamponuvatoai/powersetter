import test from "node:test";
import assert from "node:assert/strict";
import { supplyComparison, validZip } from "../src/lib/calculator.ts";
test("compares 900 kWh at 15 and 12 cents without mixing cents and dollars", () => {
  assert.deepEqual(supplyComparison(900, 15, 12), {
    monthlyCurrent: 135,
    monthlyProposed: 108,
    annualDifference: 324,
  });
});
test("preserves a higher cost instead of presenting it as savings", () => {
  assert.equal(supplyComparison(900, 12, 15)?.annualDifference, -324);
});
test("rejects missing or invalid numeric ranges and handles equal rates", () => {
  assert.equal(supplyComparison(900, NaN, 15), null);
  assert.equal(supplyComparison(900, -1, 15), null);
  assert.equal(supplyComparison(900, 101, 15), null);
  assert.equal(supplyComparison(900, 15, 15)?.annualDifference, 0);
});
test("ZIP validation keeps leading zeros, rejects malformed values", () => {
  assert.equal(validZip("02108"), true);
  for (const value of ["00000", "1234", "ABCDE", "10001x"])
    assert.equal(validZip(value), false);
});
