import { stratification } from "../src/spc/index";
import { describe, it, expect } from "vitest";

const within = [5, 5.5, 4.5, 5, 5.2, 4.8, 5];
const lower = [4, 4, 4, 4, 4, 4, 4];
const upper = [6, 6, 6, 6, 6, 6, 6];
const none = ["none", "none", "none", "none", "none", "none", "none"];

describe("stratification", () => {
  it("returns none when fewer than n points are within one sigma", () => {
    expect(stratification(within, lower, upper, 8)).toEqual(none);
  });

  it("flags the whole run once n points are within one sigma, including points on a limit", () => {
    const val = [7, 4, 5, 6, 5, 7, 5];
    expect(stratification(val, lower, upper, 3)).toEqual(["none", "neutral", "neutral", "neutral", "neutral", "none", "none"]);
  });

  it("breaks the run on a point beyond a limit or a missing limit", () => {
    const val = [5, 5, 6.5, 5, 5, 5, 5];
    const gappedLower = [4, 4, 4, 4, 4, undefined, 4];
    expect(stratification(val, lower, upper, 3)).toEqual(["none", "none", "none", "neutral", "neutral", "neutral", "neutral"]);
    expect(stratification(val, gappedLower, upper, 3)).toEqual(none);
  });
});
