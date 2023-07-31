/* eslint-disable @typescript-eslint/require-await */
import { describe, it, vi, expect, beforeEach } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Parameter from "../components/Parameter";

describe("Renders Parameter component succesfully", async () => {
  const selectedParameter = "t2m";
  const setSelectedParameter = vi.fn();

  beforeEach(() => {
    vi.resetModules();
  });

  it("Should render Parameter correctly", async () => {
    const result = render(
      <Parameter
        selectedParameter={selectedParameter}
        setSelectedParameter={setSelectedParameter}
      />
    );
    expect(result).toBeTruthy();
  });

  it("Current observations should be active", async () => {
    const result = render(
      <Parameter
        selectedParameter={selectedParameter}
        setSelectedParameter={setSelectedParameter}
      />
    );
    expect(result).toBeTruthy();

    const select = result.getByTestId("selected-parameter-value");
    expect(select.textContent).toBe("Lämpötila​");
  });
});
