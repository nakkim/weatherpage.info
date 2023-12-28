/* eslint-disable @typescript-eslint/require-await */
import { describe, expect, it } from "vitest";

import { ceilAndMakeEven, floorAndMakeEven } from "./mapUtils";

const data = [
  [
    "2023-12-27T18:20:00Z",
    1.6,
    3.7,
    271,
    3.7,
    4.1,
    null,
    null,
    -5.2,
    -14.7,
    -5.2,
    null,
    null,
    null,
    96,
    1005,
    -5.8,
    null,
  ],
  [
    "2023-12-28T10:50:00Z",
    1.1,
    2.2,
    172,
    2.5,
    5.6,
    null,
    null,
    -3.6,
    -6.8,
    -3.5,
    null,
    null,
    null,
    94,
    1006.9,
    -4.4,
    null,
  ],
];

describe("Test map utility functions", async () => {
  it("should return correct values from floorAndMakeEven", async () => {
    const result = floorAndMakeEven(data);
    expect(result).toBe(-6);
  });

  it("should return correct values from ceilAndMakeEven", async () => {
    const result = ceilAndMakeEven(data);
    expect(result).toBe(-2);
  });
});
