/* eslint-disable @typescript-eslint/require-await */
import { describe, it } from "vitest";
import { render } from "@testing-library/react";

// To Test
import App from "./App";

// Tests
describe("Renders main page correctly", async () => {
  it("Should render the page correctly", async () => {
    // Setup
    render(<App />);
  });
});
