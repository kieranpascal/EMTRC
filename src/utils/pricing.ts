export type BillingCycle = 'monthly' | 'annual';

export interface PlanPricingCalculation {
  displayMonthly: number;
  annualTotal: number;
  annualSavings: number;
  dailyEquivalent: string;
  vatSuffix: string;
}

/**
 * Annual prepay gives 2 months free (10 months billed for 12 months of service).
 */
export function calculatePlanPricing(
  monthlyPriceGbp: number,
  cycle: BillingCycle,
  showExVat: boolean
): PlanPricingCalculation {
  const annualTotal = monthlyPriceGbp * 10;
  const annualSavings = monthlyPriceGbp * 2;
  const displayMonthly =
    cycle === 'annual' ? Math.round((annualTotal / 12) * 10) / 10 : monthlyPriceGbp;
  const daily = ((cycle === 'annual' ? annualTotal : monthlyPriceGbp * 12) / 365).toFixed(2);

  return {
    displayMonthly,
    annualTotal,
    annualSavings,
    dailyEquivalent: `£${daily}`,
    vatSuffix: showExVat ? ' ex VAT' : '',
  };
}

export function formatGbp(amount: number): string {
  return Number.isInteger(amount) ? `£${amount}` : `£${amount.toFixed(2)}`;
}
