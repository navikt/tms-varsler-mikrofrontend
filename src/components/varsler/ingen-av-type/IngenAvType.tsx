import React from "react";
import { BodyShort } from "@navikt/ds-react";
import { useIntl } from "react-intl";
import style from "./IngenAvType.module.css";

const IngenAvType = ({ type }: { type: string }) => {
  const translate = useIntl();
  const isOppgave = type === "OPPGAVE";

  return (
    <div className={style.wrapper}>
      <BodyShort size="medium">
        {isOppgave
          ? translate.formatMessage({ id: "oppgave.ingen" })
          : translate.formatMessage({ id: "beskjed.ingen" })}
      </BodyShort>
    </div>
  );
};

export default IngenAvType;
