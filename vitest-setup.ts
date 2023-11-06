import "@testing-library/jest-dom";
import { expect, vi } from "vitest";
import "vitest-axe/extend-expect";
import * as matchers from "vitest-axe/matchers";
import { server } from "./src/mocks/server";
expect.extend(matchers);

// @ts-expect-error mock for å fikse jsdom-feil i testene
HTMLCanvasElement.prototype.getContext = vi.fn();

beforeAll(() => {
  server.listen({ onUnhandledRequest: "warn" });
});

afterEach(() => {
  server.resetHandlers();
  //cleanup();
});

afterAll(() => {
  server.close();
});
