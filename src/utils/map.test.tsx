/* eslint-disable @typescript-eslint/require-await */
import { describe, expect, it } from "vitest";

import { resolveElement, resolveElementColor } from "./map";

describe("Test map utility functions", async () => {
  it("should should return correct hex code for temperature", async () => {
    let value = resolveElementColor("t2m", -33);
    expect(value).toBe("#8a79f7");
    value = resolveElementColor("t2m", -13);
    expect(value).toBe("#4ba1e4");
    value = resolveElementColor("t2m", 0);
    expect(value).toBe("#05b38a");
  });

  it("should apply default styles to span element", () => {
    const element = resolveElement("t2m", 12);
    expect(element.style.fontWeight).toBe("bold");
    //expect(element.style.border).toBe("1px solid black");
    //expect(element.style.color).toBe("black");
    expect(element.style.paddingLeft).toBe("5px");
    expect(element.style.paddingRight).toBe("5px");
    expect(element.style.fontSize).toBe("15px");
    expect(element.style.position).toBe("relative");
    expect(element.style.left).toBe("1px");
    expect(element.style.width).toBe("20px");
  });

  it("should apply background color to span element when value is a number", () => {
    const element = resolveElement("dewpoint", -30);
    expect(element.style.backgroundColor).toBe("rgba(138, 121, 247, 0.7)");
  });

  it.skip('should not apply background color to span element when value is NaN', () => {
    const element = resolveElement('param', NaN);
    expect(element.style.backgroundColor).toBe('');
  });
});
