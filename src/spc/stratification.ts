import at from "../util/at";
import type { OutlierStatus } from "../data/flagDirection";

/**
 * Stratification rule: n consecutive points within the one-sigma limits, either side; flags the whole run.
 * Points on a limit count as within it; a missing limit breaks the run.
 */
export default function stratification(val: readonly number[], ll68: readonly (number | undefined)[], ul68: readonly (number | undefined)[], n: number): OutlierStatus[] {
  const length: number = val.length;
  const stratification_detected: OutlierStatus[] = new Array<OutlierStatus>(length);
  let count: number = 0;
  let unflagged: number = 0;

  for (let i: number = 0; i < length; i++) {
    stratification_detected[i] = "none";
    const lower = ll68[i];
    const upper = ul68[i];
    const value = at(val, i);
    if (lower === undefined || upper === undefined || value < lower || value > upper) {
      count = 0;
      unflagged = i + 1;
      continue;
    }
    count++;
    if (count >= n) {
      for (let j: number = unflagged; j <= i; j++) {
        stratification_detected[j] = "neutral";
      }
      unflagged = i + 1;
    }
  }

  return stratification_detected;
}
