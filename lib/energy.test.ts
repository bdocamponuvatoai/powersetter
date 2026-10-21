import test from "node:test";
import assert from "node:assert/strict";
import {
  billFor,
  exampleBill,
  formatUsd,
  listedStateForZip,
  stateNames,
  supplyComparison,
  validZip,
} from "./energy.ts";
import { site } from "./site.ts";

test("compares 900 kWh at 15 and 12 cents without mixing cents and dollars", () => {
  assert.deepEqual(supplyComparison(900, 15, 12), { monthlyCurrent: 135, monthlyProposed: 108, annualDifference: 324 });
});

test("keeps a higher cost negative instead of presenting it as savings", () => {
  assert.equal(supplyComparison(900, 12, 15)?.annualDifference, -324);
});

test("rejects out-of-range input and handles equal rates", () => {
  assert.equal(supplyComparison(900, Number.NaN, 15), null);
  assert.equal(supplyComparison(900, -1, 15), null);
  assert.equal(supplyComparison(900, 101, 15), null);
  assert.equal(supplyComparison(-5, 15, 12), null);
  assert.equal(supplyComparison(900, 15, 15)?.annualDifference, 0);
});

test("ZIP validation keeps leading zeros and rejects malformed values", () => {
  assert.equal(validZip("02108"), true);
  for (const value of ["00000", "1234", "ABCDE", "10001x", " 02108", ""]) assert.equal(validZip(value), false);
});

test("ZIP lookup recognises every listed state, including leading-zero New England ZIPs", () => {
  const samples: Record<string, string> = {
    "06103": "CT", // Hartford
    "19103": "PA", // Philadelphia
    "43215": "OH", // Columbus
    "02108": "MA", // Boston
    "04101": "ME", // Portland
    "60601": "IL", // Chicago
    "07102": "NJ", // Newark
    "77019": "TX", // Houston
    "79901": "TX", // El Paso, 799
    "88510": "TX", // El Paso, 885
    "30303": "GA", // Atlanta
    "39901": "GA", // 399
    "03301": "NH", // Concord
  };
  for (const [zip, state] of Object.entries(samples)) assert.equal(listedStateForZip(zip), state, zip);
});

test("ZIP lookup returns null outside the published list and for invalid ZIPs", () => {
  for (const zip of ["10001", "90210", "05401", "02903", "33101", "00000", "abc"]) {
    assert.equal(listedStateForZip(zip), null, zip);
  }
});

test("ZIP lookup covers exactly the states PowerSetter lists", () => {
  assert.deepEqual(Object.keys(stateNames).sort(), [...site.listedStates].sort());
});

test("example bill changes only the supply line between rates", () => {
  const current = billFor(exampleBill.rates.current);
  const compared = billFor(exampleBill.rates.compared);
  assert.equal(current.delivery, compared.delivery);
  assert.equal(current.delivery, 64.8);
  assert.equal(current.supply, 135);
  assert.equal(compared.supply, 108);
  assert.equal(current.total - compared.total, 27);
});

test("currency formatting", () => {
  assert.equal(formatUsd(199.8), "$199.80");
  assert.equal(formatUsd(324, 0), "$324");
});
