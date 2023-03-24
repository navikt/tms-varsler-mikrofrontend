import React, { useContext } from "react";
import { LanguageContext } from "../../../providers/LanguageProvider";
import { text } from "../../../language/text";
import { BodyLong, Heading } from "@navikt/ds-react";
import KattIngenVarsler from "../../../ikoner/KattIngenVarsler";
import style from "./IngenVarsler.module.css";
import TidligereVarslerInngang from "../inngang-tidligere-varsler/TidligereVarslerInngang";

const IngenVarsler = () => {
  const language = useContext(LanguageContext);
  return (
    <>
      <div className={style.wrapper}>
        <KattIngenVarsler />
        <div className={style.tekstWrapper}>
          <div className={style.headerWrapper}>
            <Heading size="small">{text.varslerTomListe[language]}</Heading>
            <BodyLong size="small">{text.varslerTomListeIngress[language]}</BodyLong>
          </div>
          <TidligereVarslerInngang />
        </div>
      </div>
    </>
  );
};

export default IngenVarsler;
