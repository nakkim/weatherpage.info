/* eslint-disable @typescript-eslint/require-await */
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Version from "./Version";

describe("Renders Version component succesfully", async () => {

  it("Should render Parameter correctly", async () => {
    const result = render(
      <Version />
    );
    expect(result).toBeTruthy();
    expect(result.getByTestId('app-version-number')).toBeDefined();
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    expect(result.getByTestId('app-version-number').textContent).toBe(`v. ${import.meta.env.VITE_REACT_APP_VERSION}`)
  });
});
