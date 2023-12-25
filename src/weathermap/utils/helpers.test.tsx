/* eslint-disable @typescript-eslint/require-await */
import { describe, expect, it } from "vitest";

import {
  degreesToCardinalDirection,
  formatTooltip,
  resolveElement,
  resolveElementColor,
  resolveWawaElement,
  windowWidth,
} from "./helpers";

describe("Test map utility functions", async () => {
  describe("Test resolveElementColor function", async () => {
    it("should should return correct hex code for temperature", async () => {
      let value = resolveElementColor("t2m", -33);
      expect(value).toBe("#8a79f7");
      value = resolveElementColor("t2m", -13);
      expect(value).toBe("#4ba1e4");
      value = resolveElementColor("t2m", 0);
      expect(value).toBe("#02d495");
    });
  });

  describe("Test resolveElement function", async () => {
    it("should apply default styles to span element", () => {
      const element = resolveElement("t2m", 12);
      expect(element.style.fontWeight).toBe("bold");
      //expect(element.style.border).toBe("1px solid black");
      //expect(element.style.color).toBe("black");
      expect(element.style.paddingLeft).toBe("5px");
      expect(element.style.paddingRight).toBe("5px");
      expect(element.style.fontSize).toBe("15px");
      expect(element.style.position).toBe("relative");
      expect(element.style.left).toBe("0px");
      expect(element.style.width).toBe("20px");
    });

    it("should apply background color to span element when value is a number", () => {
      const element = resolveElement("dewpoint", -30);
      expect(element.style.backgroundColor).toBe("rgba(138, 121, 247, 0.7)");
    });
  });

  describe("Test resolveWawaElement function", async () => {
    it("should return the correct object for a value wawa code = 89", () => {
      const result = resolveWawaElement(89);
      expect(result).toEqual({
        short: "Hail",
        backgroundColor: "#ffffb3",
        color: "#ffffb3",
      });
    });

    it("should return default object for negative value", () => {
      const result = resolveWawaElement(-1);
      expect(result).toEqual({
        short: "FairWeather",
        backgroundColor: "#ffffff",
        color: "#7e7e7e",
      });
    });

    // Tests that the function returns the correct object for a value of 0
    it("should return the correct object for a value wawa code = 10", () => {
      const result = resolveWawaElement(10);
      expect(result).toEqual({
        short: "Haze",
        backgroundColor: "#000000",
        color: "#ffffff",
      });
    });
  });
});

describe("Test PopupChart utility functions", () => {
  describe("Test degreesToCardinalDirection function", () => {
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
  });

  describe("Test resolveElement function", async () => {
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

  describe("Test windowWidth function", () => {
    it("should return the correct window width and height", () => {
      // Mock the window object
      const mockWindow = {
        innerWidth: 1024,
        innerHeight: 768,
      };
      Object.defineProperty(global, "window", {
        value: mockWindow,
      });
  
      const result: {width: number, height: number} = windowWidth();
      expect(result).toEqual({ width: 1024, height: 768 });
    });
  });
});
