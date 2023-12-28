/* eslint-disable @typescript-eslint/require-await */
import { describe, expect, it } from "vitest";

import {
  ceilAndMakeEven,
  degreesToCardinalDirection,
  floorAndMakeEven,
  formatTemperatureTooltip,
  formatWindTooltip,
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
      [
        {
          componentType: "series",
          componentSubType: "candlestick",
          componentIndex: 0,
          seriesType: "candlestick",
          seriesIndex: 0,
          seriesId: "\u0000WindSpeed\u00000",
          seriesName: "WindSpeed",
          name: "1703797800000",
          dataIndex: 108,
          data: ["2023-12-28T21:10:00Z", 1.3, 2.4, 1.3, 2.4],
          value: ["2023-12-28T21:10:00Z", 1.3, 2.4, 1.3, 2.4],
          color: "#88B3E7",
          borderColor: "#88B3E7",
          dimensionNames: [],
          encode: {
            x: [0],
            y: [1, 2, 3, 4],
          },
          $vars: ["seriesName", "name", "value"],
          axisDim: "x",
          axisIndex: 0,
          axisType: "xAxis.time",
          axisId: "\u0000series\u00000\u00000",
          axisValue: 1703797800000,
          axisValueLabel: "2023-12-28 23:10:00",
          marker:
            '<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:#88B3E7;"></span>',
        },
        {
          componentType: "series",
          componentSubType: "custom",
          componentIndex: 1,
          seriesType: "custom",
          seriesIndex: 1,
          seriesId: "\u0000wind_arrows\u00000",
          seriesName: "wind_arrows",
          name: "",
          dataIndex: 108,
          data: ["2023-12-28T21:10:00Z", 1.3, 2.4, 107],
          value: ["2023-12-28T21:10:00Z", 1.3, 2.4, 107],
          color: "#ffffff",
          borderColor: "#ffffff",
          dimensionNames: ["x", "y", "value", "value0"],
          encode: {
            x: [0],
            y: [1],
          },
          $vars: ["seriesName", "name", "value"],
          axisDim: "x",
          axisIndex: 0,
          axisType: "xAxis.time",
          axisId: "\u0000series\u00000\u00000",
          axisValue: 1703797800000,
          axisValueLabel: "2023-12-28 23:10:00",
          marker:
            '<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:#ffffff;"></span>',
        },
      ],
      [
        [
          {
            componentType: "series",
            componentSubType: "line",
            componentIndex: 0,
            seriesType: "line",
            seriesIndex: 0,
            seriesId: "\u0000zeroline\u00000",
            seriesName: "zeroline",
            name: "",
            dataIndex: 36,
            data: ["2023-12-28T09:10:00Z", 0],
            value: ["2023-12-28T09:10:00Z", 0],
            color: "#989898",
            borderColor: "#989898",
            dimensionNames: ["x", "y"],
            encode: {
              x: [0],
              y: [1],
            },
            $vars: ["seriesName", "name", "value"],
            axisDim: "x",
            axisIndex: 0,
            axisType: "xAxis.time",
            axisId: "\u0000series\u00000\u00000",
            axisValue: 1703754600000,
            axisValueLabel: "2023-12-28 11:10:00",
            marker:
              '<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:#989898;"></span>',
          },
          {
            componentType: "series",
            componentSubType: "line",
            componentIndex: 1,
            seriesType: "line",
            seriesIndex: 1,
            seriesId: "\u0000Temperature\u00000",
            seriesName: "Temperature",
            name: "",
            dataIndex: 36,
            data: ["2023-12-28T09:10:00Z", -7.4],
            value: ["2023-12-28T09:10:00Z", -7.4],
            color: "#0088FF",
            borderColor: "#FF0000",
            dimensionNames: ["x", "y"],
            encode: {
              x: [0],
              y: [1],
            },
            $vars: ["seriesName", "name", "value"],
            axisDim: "x",
            axisIndex: 0,
            axisType: "xAxis.time",
            axisId: "\u0000series\u00000\u00000",
            axisValue: 1703754600000,
            axisValueLabel: "2023-12-28 11:10:00",
            marker:
              '<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:#0088FF;"></span>',
          },
        ],
      ],
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
      time: 0,
      ws_10min: 1,
      wg_10min: 2,
      wd_10min: 3,
      ws_1d: 4,
      wg_1d: 5,
      wawa: 6,
      vis: 7,
      t2m: 8,
      tmin: 9,
      tmax: 10,
      ri_10min: 11,
      r_1h: 12,
      r_1d: 13,
      rh: 14,
      pressure: 15,
      dewpoint: 16,
      n_man: 17,
    };

    const expectedTooltip = [
      `
        <div style="text-align:left">
        28.12.2023 23.10 <br/>
        Keskituuli - maksimipuuska: <b>1.3-2.4[m/s]</b> <br/>
        Tuulen suunta: <b>107 °</b> <br/>
        </div>`.replace(/\s/g, ""),
      `<div style="text-align:left">
        28.12.2023 23.10 <br/> 
        Lämpötila: <b>1.3 °C</b> <br/>
        </div>`.replace(/\s/g, ""),
    ];

    const tooltip1 = formatWindTooltip(params[0], timeFormatOptions, dims, {
      parameters: ["Keskituuli - maksimipuuska", "Tuulen suunta"],
      units: ["[m/s]", "°"],
    }).replace(/\s/g, "");
    expect(tooltip1).toBe(expectedTooltip[0]);

    const tooltip2 = formatTemperatureTooltip(params[0], timeFormatOptions, {
      parameters: ["Lämpötila"],
      units: ["°C"],
    }).replace(/\s/g, "");
    expect(tooltip2).toBe(expectedTooltip[1]);
  });
});
