/* eslint-disable @typescript-eslint/require-await */
import { fireEvent, render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import Header from "./Header";

describe("Renders Header component succesfully", async () => {
  const obsTime = new Date("2023-01-01T00:00:00Z");
  const setTimeValue = vi.fn();
  const setObsTime = vi.fn();

  beforeEach(() => {
    vi.resetModules();
  });

  it("Should render Header correctly", async () => {
    const result = render(
      <Header obsTime={obsTime} setTimeValue={setTimeValue} setObsTime={setObsTime}/>
    );
    expect(result).toBeTruthy();
  });

  it("Current observations should be active", async () => {
    const result = render(
      <Header obsTime={obsTime} setTimeValue={setTimeValue} setObsTime={setObsTime}/>
    );
    expect(result).toBeTruthy();

    const button = result.getByTestId("get-current-observations-button");
    expect(button.textContent).toBe("Nyt");

    fireEvent(
      //getByText(button, 'Nyt'),
      button,
      new MouseEvent("click", {
        bubbles: true,
      })
    );
    expect(button.classList.contains("MuiButton-contained")).toBe(true);
  });

  it("Should get old observations if clicked", async () => {
    const result = render(
      <Header obsTime={obsTime} setTimeValue={setTimeValue} setObsTime={setObsTime}/>
    );
    expect(result).toBeTruthy();

    const button = result.getByTestId("get-historical-observations-button");
    expect(button.textContent).toBe("Hae");
    expect(button.classList.contains("MuiButton-outlined")).toBe(true);

    fireEvent(
      button,
      new MouseEvent("click", {
        bubbles: true,
      })
    );
    expect(button.classList.contains("MuiButton-contained")).toBe(true);
    expect(button.textContent).toBe("Hae");

    const input = result.getByTestId("observation-time-value");
    expect((input as HTMLInputElement).value).toBe("01.01.2023 02:00");
  });
});
