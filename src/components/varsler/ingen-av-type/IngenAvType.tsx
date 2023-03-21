import React, { useContext } from "react";
import { LanguageContext } from "../../../providers/LanguageProvider";
import { text } from "../../../language/text";
import { BodyShort } from "@navikt/ds-react";
import style from "./IngenAvType.module.css";

const IngenAvType = ({ type }: { type: string }) => {
  const language = useContext(LanguageContext);
  const isOppgave = type === "OPPGAVE";

  return (
    <div className={style.wrapper}>
      <BodyShort size="medium">{isOppgave ? text.oppgaveIngen[language] : text.beskjedIngen[language]}</BodyShort>
    </div>
  );
};

export default IngenAvType;
