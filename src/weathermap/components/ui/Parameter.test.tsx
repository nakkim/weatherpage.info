/* eslint-disable @typescript-eslint/require-await */
import { render } from "@testing-library/react";
import { useTranslation } from "react-i18next";
import { beforeEach,describe, expect, it, vi } from "vitest";

import Parameter from "./Parameter";

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
    expect(select.textContent).toBe("params.t2m​");
  });
});
