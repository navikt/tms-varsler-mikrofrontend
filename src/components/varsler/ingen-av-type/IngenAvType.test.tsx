import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "../../../utils/test-utils";
import { axe } from "vitest-axe";
import IngenAvType from "./IngenAvType";

describe("IngenAvType", () => {
  it("Rendrer ingen av type varsel-tekst", async () => {
    const { container } = render(<IngenAvType type="BESKJED" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Tilpasser tekst til oppgaver", async () => {
    render(<IngenAvType type="OPPGAVE" />);
    expect(screen.getByText("Du har ingen oppgaver"));
  });

  it("Tilpasser tekst til beskjeder", async () => {
    render(<IngenAvType type="BESKJED" />);
    expect(screen.getByText("Du har ingen beskjeder"));
  });
});
