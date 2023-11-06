import { render, screen } from "@testing-library/react";
import { HttpResponse, http } from "msw";
import { SWRConfig } from "swr";
import { expect, test } from "vitest";
import { axe } from "vitest-axe";
import { varslerUrl } from "../../api/urls";
import { server } from "../../mocks/server";
import MainPage from "./MainPage";

test("Vis ingenvarsler-side ved ingen varsler", async () => {
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

  expect(await screen.findByRole("heading", { level: 1, name: "Du har ingen nye varsler" })).toBeInTheDocument();
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
