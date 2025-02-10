export function validateSavings(savings: number): boolean {
  return !isNaN(savings) && savings > 0 && savings <= 10000;
}