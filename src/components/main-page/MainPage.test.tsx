import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HttpResponse, http } from "msw";
import { SWRConfig } from "swr";
import { expect, test } from "vitest";
import { axe } from "vitest-axe";
import { varslerUrl } from "../../api/urls";
import { server } from "../../mocks/server";
import MainPage from "./MainPage";

test("Vis ingen varsler-side ved ingen varsler", async () => {
  server.use(
    http.get(varslerUrl, () => {
      return HttpResponse.json({
        oppgaver: [],
        beskjeder: [],
        innbokser: [],
      });
    }),
  );

  const { container } = render(
    <SWRConfig value={{ provider: () => new Map() }}>
      <MainPage />
    </SWRConfig>,
  );

  expect(await screen.findByRole("heading", { level: 1, name: "Ingen nye varsler" })).toBeInTheDocument();
  expect(await screen.findByRole("link", { name: "Tidligere varsler" })).toBeInTheDocument();
  expect(await axe(container)).toHaveNoViolations();
});

test("Vis varsler", async () => {
  const { container } = render(
    <SWRConfig value={{ provider: () => new Map() }}>
      <MainPage />
    </SWRConfig>,
  );

  expect(await screen.findAllByRole("listitem")).toHaveLength(7);
  expect(await screen.findByRole("link", { name: "Tidligere varsler" })).toBeInTheDocument();
  expect(await axe(container)).toHaveNoViolations();
});

test("Arkiver-knapp fjerner beskjed fra listen", async () => {
  const user = userEvent.setup();
  render(
    <SWRConfig value={{ provider: () => new Map() }}>
      <MainPage />
    </SWRConfig>,
  );
  expect(await screen.findAllByRole("listitem")).toHaveLength(7);
  await user.click(screen.getByRole("button", { name: "Arkiver" }));
  expect(await screen.findAllByRole("listitem")).toHaveLength(6);
});
