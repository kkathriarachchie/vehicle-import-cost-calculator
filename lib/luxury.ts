// lib/luxury.ts

/**
 * Represents one row of your luxury‑tax table.
 */
export interface LuxuryRateRow {
  category: string; // e.g. "Petrol", "Diesel Hybrid"
  threshold: number; // Luxury‑Tax‑Free Threshold in LKR
  taxPercent: number; // Luxury Tax % on excess (e.g. 120 for 120%)
}

/** Your full luxury‑tax schedule. */
export const LUXURY_RATES: LuxuryRateRow[] = [
  { category: "Petrol", threshold: 5_000_000, taxPercent: 100 },
  { category: "Diesel", threshold: 5_000_000, taxPercent: 120 },
  { category: "Petrol Hybrid", threshold: 5_500_000, taxPercent: 80 },
  { category: "Diesel Hybrid", threshold: 5_500_000, taxPercent: 90 },
];

/**
 * Pre‑group by category for O(1) lookup.
 */
const RATES_BY_FUEL: Record<string, LuxuryRateRow> = LUXURY_RATES.reduce(
  (acc, row) => {
    acc[row.category] = row;
    return acc;
  },
  {} as Record<string, LuxuryRateRow>
);

/**
 * Calculate the luxury tax:
 * - If `cifLKR` exceeds the threshold for that fuel type,
 *   LuxuryTax = (cifLKR – threshold) * (taxPercent / 100)
 * - Otherwise 0.
 *
 * @param fuelType Must exactly match one of the `category` values.
 * @param cifLKR   CIF value in LKR.
 * @returns        Computed luxury tax in LKR (integer).
 */
export function calculateLuxuryTax(fuelType: string, cifLKR: number): number {
  const rateRow = RATES_BY_FUEL[fuelType];
  if (!rateRow) return 0;

  const { threshold, taxPercent } = rateRow;
  if (cifLKR <= threshold) return 0;

  const excess = cifLKR - threshold;
  // taxPercent is e.g. 120 for 120%, so divide by 100
  return Math.round(excess * (taxPercent / 100));
}
