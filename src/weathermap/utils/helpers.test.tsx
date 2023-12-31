/* eslint-disable @typescript-eslint/require-await */
import { describe, expect, it } from "vitest";

import {
  hexToRgb,
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

  describe('Test hexToRgb utility function', () => {
    // Should convert a valid hex string to an RGB string
    it('should convert a valid hex string to an RGB string', () => {
      const hex = "#ff0000";
      const result = hexToRgb(hex);
      console.log(result)
      expect(result).toBe("255,0,0");
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

      const result: { width: number; height: number } = windowWidth();
      expect(result).toEqual({ width: 1024, height: 768 });
    });
  });
});