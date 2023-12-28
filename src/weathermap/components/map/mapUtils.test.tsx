/* eslint-disable @typescript-eslint/require-await */
import { describe, expect, it } from "vitest";

import {
  ceilAndMakeEven,
  degreesToCardinalDirection,
  floorAndMakeEven,
  formatTooltip,
} from "./mapUtils";

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

  it("should return correct cardinal direction for given degrees", () => {
    expect(degreesToCardinalDirection(0)).toBe("N");
    expect(degreesToCardinalDirection(45)).toBe("NE");
    expect(degreesToCardinalDirection(90)).toBe("E");
    expect(degreesToCardinalDirection(135)).toBe("SE");
    expect(degreesToCardinalDirection(180)).toBe("S");
    expect(degreesToCardinalDirection(225)).toBe("SW");
    expect(degreesToCardinalDirection(270)).toBe("W");
    expect(degreesToCardinalDirection(315)).toBe("NW");
    expect(degreesToCardinalDirection(360)).toBe("N");
  });

  it("should handle negative degrees correctly", () => {
    expect(degreesToCardinalDirection(-45)).toBe("NW");
    expect(degreesToCardinalDirection(-90)).toBe("W");
    expect(degreesToCardinalDirection(-135)).toBe("SW");
    expect(degreesToCardinalDirection(-180)).toBe("S");
    expect(degreesToCardinalDirection(-225)).toBe("SE");
    expect(degreesToCardinalDirection(-270)).toBe("E");
    expect(degreesToCardinalDirection(-315)).toBe("NE");
    expect(degreesToCardinalDirection(-360)).toBe("N");
  });

  it("should handle degrees greater than 360 correctly", () => {
    expect(degreesToCardinalDirection(405)).toBe("NE");
    expect(degreesToCardinalDirection(450)).toBe("E");
    expect(degreesToCardinalDirection(495)).toBe("SE");
    expect(degreesToCardinalDirection(540)).toBe("S");
    expect(degreesToCardinalDirection(585)).toBe("SW");
    expect(degreesToCardinalDirection(630)).toBe("W");
    expect(degreesToCardinalDirection(675)).toBe("NW");
    expect(degreesToCardinalDirection(720)).toBe("N");
  });

  it("should format tooltip correctly", () => {
    const params = [
      {
        value: {
          time: "2022-01-01T12:00:00Z",
          ws_10min: "10",
          wg_10min: "15",
        },
      },
      {
        value: {
          wd_10min: 180,
        },
      },
    ];
    const timeFormatOptions: Intl.DateTimeFormatOptions = {
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      month: "numeric",
      year: "numeric",
      timeZoneName: "short",
    };
    const dims = {
      time: "time",
      ws_10min: "ws_10min",
      wg_10min: "wg_10min",
      wd_10min: "wd_10min",
    };

    const expectedTooltip = `
        <div style="text-align:left">
        <b>1.1.2022 14.00</b> <br/> 
        Keskituuli - maksimipuuska: 10 - 15 [m/s] <br/>
        Tuulen suunta: 360 ° <br/>
        </div>`.replace(/\s/g, "");

    const tooltip = formatTooltip(params, timeFormatOptions, dims).replace(
      /\s/g,
      ""
    );
    expect(tooltip).toBe(expectedTooltip);
  });
});
