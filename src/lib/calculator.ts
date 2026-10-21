export function supplyComparison(
  usage: number,
  current: number,
  proposed: number,
) {
  if (
    ![usage, current, proposed].every(Number.isFinite) ||
    usage < 0 ||
    usage > 100000 ||
    current < 0 ||
    current > 100 ||
    proposed < 0 ||
    proposed > 100
  )
    return null;
  const monthlyCurrent = (usage * current) / 100;
  const monthlyProposed = (usage * proposed) / 100;
  return {
    monthlyCurrent,
    monthlyProposed,
    annualDifference: (monthlyCurrent - monthlyProposed) * 12,
  };
}
export function validZip(zip: string) {
  return /^\d{5}$/.test(zip) && zip !== "00000";
}
