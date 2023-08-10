/* eslint-disable @typescript-eslint/require-await */
import { describe, expect,it } from "vitest";

import { resolveElementColor } from "./map";

describe("Test map utility functions", async () => {
  it("Should should return correct hex code for temperature", async () => {
    let value = resolveElementColor("t2m", -33);
    expect(value).toBe("#8a79f7");
    value = resolveElementColor("t2m", -13);
    expect(value).toBe("#4ba1e4");
    value = resolveElementColor("t2m", 0);
    expect(value).toBe("#05b38a");
  });
});
