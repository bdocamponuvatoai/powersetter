// Pure energy logic. No runtime imports, so `node --test` can run the tests directly.

export function validZip(zip: string) {
  return /^\d{5}$/.test(zip) && zip !== "00000";
}

/** Supply cost at a usage (kWh/month) and two rates (cents/kWh). Null when any input is out of range. */
export function supplyComparison(usage: number, current: number, proposed: number) {
  const valid =
    [usage, current, proposed].every(Number.isFinite) &&
    usage >= 0 &&
    usage <= 100_000 &&
    current >= 0 &&
    current <= 100 &&
    proposed >= 0 &&
    proposed <= 100;
  if (!valid) return null;
  const monthlyCurrent = (usage * current) / 100;
  const monthlyProposed = (usage * proposed) / 100;
  return { monthlyCurrent, monthlyProposed, annualDifference: (monthlyCurrent - monthlyProposed) * 12 };
}

export const stateNames = {
  CT: "Connecticut",
  PA: "Pennsylvania",
  OH: "Ohio",
  MA: "Massachusetts",
  ME: "Maine",
  IL: "Illinois",
  NJ: "New Jersey",
  TX: "Texas",
  GA: "Georgia",
  NH: "New Hampshire",
} as const;

export type ListedStateCode = keyof typeof stateNames;

// USPS three-digit ZIP prefixes for the states PowerSetter lists on its homepage.
const zipPrefixes: Record<ListedStateCode, [number, number][]> = {
  CT: [[60, 69]],
  PA: [[150, 196]],
  OH: [[430, 459]],
  MA: [
    [10, 27],
    [55, 55],
  ],
  ME: [[39, 49]],
  IL: [[600, 629]],
  NJ: [[70, 89]],
  TX: [
    [733, 733],
    [750, 799],
    [885, 885],
  ],
  GA: [
    [300, 319],
    [398, 399],
  ],
  NH: [[30, 38]],
};

/** The listed state a ZIP belongs to, or null when it is invalid or outside the published list. */
export function listedStateForZip(zip: string): ListedStateCode | null {
  if (!validZip(zip)) return null;
  const prefix = Number(zip.slice(0, 3));
  for (const [state, ranges] of Object.entries(zipPrefixes) as [ListedStateCode, [number, number][]][]) {
    if (ranges.some(([low, high]) => prefix >= low && prefix <= high)) return state;
  }
  return null;
}

// Example bill for the homepage illustration. Figures are illustrative, not a quote.
export const exampleBill = {
  usageKwh: 900,
  customerCharge: 9,
  deliveryCents: 6.2,
  rates: { current: 15, compared: 12 },
} as const;

export function billFor(supplyCents: number) {
  const { usageKwh, customerCharge, deliveryCents } = exampleBill;
  const delivery = round2(customerCharge + (usageKwh * deliveryCents) / 100);
  const supply = round2((usageKwh * supplyCents) / 100);
  return { usageKwh, delivery, supply, total: round2(delivery + supply) };
}

function round2(value: number) {
  return Math.round(value * 100) / 100;
}

export function formatUsd(value: number, fractionDigits = 2) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);
}
