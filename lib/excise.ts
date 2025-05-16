// lib/excise.ts

export interface RateRow {
  /** Fuel category (e.g. "Petrol", "Diesel Hybrid", etc.) */
  category: string;
  /** Inclusive lower bound for engine CC */
  minCC: number;
  /** Exclusive upper bound for engine CC */
  maxCC: number;
  /** Rate per CC in LKR */
  rate: number;
}

/** Complete excise‑duty rate table */
export const EXCISE_RATES: RateRow[] = [
  // Petrol
  { category: "Petrol", minCC: 0, maxCC: 1000, rate: 2450 },
  { category: "Petrol", minCC: 1000, maxCC: 1300, rate: 3850 },
  { category: "Petrol", minCC: 1300, maxCC: 1500, rate: 4450 },
  { category: "Petrol", minCC: 1500, maxCC: 1600, rate: 5150 },
  { category: "Petrol", minCC: 1600, maxCC: 1800, rate: 6400 },
  { category: "Petrol", minCC: 1800, maxCC: 2000, rate: 7700 },
  { category: "Petrol", minCC: 2000, maxCC: 2500, rate: 8450 },
  { category: "Petrol", minCC: 2500, maxCC: 2750, rate: 9650 },
  { category: "Petrol", minCC: 2750, maxCC: 3000, rate: 10850 },
  { category: "Petrol", minCC: 3000, maxCC: 4000, rate: 12050 },
  { category: "Petrol", minCC: 4000, maxCC: 10000000, rate: 13300 },

  // Diesel
  { category: "Diesel", minCC: 0, maxCC: 1500, rate: 5550 },
  { category: "Diesel", minCC: 1500, maxCC: 1600, rate: 6950 },
  { category: "Diesel", minCC: 1600, maxCC: 1800, rate: 8300 },
  { category: "Diesel", minCC: 1800, maxCC: 2500, rate: 9650 },
  { category: "Diesel", minCC: 2500, maxCC: 2750, rate: 10850 },
  { category: "Diesel", minCC: 2750, maxCC: 3000, rate: 12050 },
  { category: "Diesel", minCC: 3000, maxCC: 4000, rate: 13300 },
  { category: "Diesel", minCC: 4000, maxCC: 10000000, rate: 14500 },

  // Petrol Hybrid
  { category: "Petrol Hybrid", minCC: 0, maxCC: 1300, rate: 2750 },
  { category: "Petrol Hybrid", minCC: 1300, maxCC: 1500, rate: 3450 },
  { category: "Petrol Hybrid", minCC: 1500, maxCC: 1600, rate: 4800 },
  { category: "Petrol Hybrid", minCC: 1600, maxCC: 2000, rate: 6300 },
  { category: "Petrol Hybrid", minCC: 2000, maxCC: 2500, rate: 7250 },
  { category: "Petrol Hybrid", minCC: 2500, maxCC: 2750, rate: 8450 },
  { category: "Petrol Hybrid", minCC: 2750, maxCC: 3000, rate: 9650 },
  { category: "Petrol Hybrid", minCC: 3000, maxCC: 4000, rate: 10850 },
  { category: "Petrol Hybrid", minCC: 4000, maxCC: 10000000, rate: 12050 },

  // Diesel Hybrid
  { category: "Diesel Hybrid", minCC: 0, maxCC: 1500, rate: 4150 },
  { category: "Diesel Hybrid", minCC: 1500, maxCC: 1600, rate: 5550 },
  { category: "Diesel Hybrid", minCC: 1600, maxCC: 1800, rate: 6900 },
  { category: "Diesel Hybrid", minCC: 1800, maxCC: 2000, rate: 8350 },
  { category: "Diesel Hybrid", minCC: 2000, maxCC: 2500, rate: 8450 },
  { category: "Diesel Hybrid", minCC: 2500, maxCC: 2750, rate: 9650 },
  { category: "Diesel Hybrid", minCC: 2750, maxCC: 3000, rate: 10850 },
  { category: "Diesel Hybrid", minCC: 3000, maxCC: 4000, rate: 12050 },
  { category: "Diesel Hybrid", minCC: 4000, maxCC: 10000000, rate: 13300 },
];

/**
 * Pre‑group the rates by category for fast lookup.
 */
const RATES_BY_FUEL: Record<string, RateRow[]> = EXCISE_RATES.reduce(
  (acc, row) => {
    if (!acc[row.category]) {
      acc[row.category] = [];
    }
    acc[row.category].push(row);
    return acc;
  },
  {} as Record<string, RateRow[]>
);

/**
 * Calculate the excise duty.
 *
 * @param fuelType  Must exactly match one of the `category` strings above.
 * @param engineCC  The engine displacement in CC.
 * @returns         rate * engineCC, or 0 if no matching category/range.
 */
export function calculateExciseDuty(
  fuelType: string,
  engineCC: number
): number {
  const buckets = RATES_BY_FUEL[fuelType];
  if (!buckets) return 0;
  const match = buckets.find((r) => engineCC >= r.minCC && engineCC < r.maxCC);
  return match ? match.rate * engineCC : 0;
}
