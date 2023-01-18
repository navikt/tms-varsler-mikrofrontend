import React from "react";
import { useIntl } from "react-intl";
import { BodyLong, Heading } from "@navikt/ds-react";
import KattIngenVarsler from "../../../ikoner/KattIngenVarsler";
import style from "./IngenVarsler.module.css";
import TidligereVarslerInngang from "../inngang-tidligere-varsler/TidligereVarslerInngang";

const IngenVarsler = () => {
  const translate = useIntl();
  return (
    <>
      <div className={style.wrapper}>
        <KattIngenVarsler />
        <div className={style.tekstWrapper}>
          <div className={style.headerWrapper}>
            <Heading size="small">{translate.formatMessage({ id: "varsler.tom.liste" })}</Heading>
            <BodyLong size="small">{translate.formatMessage({ id: "varsler.tom.liste.ingress" })}</BodyLong>
          </div>
          <TidligereVarslerInngang />
        </div>
      </div>
    </>
  );
};

export default IngenVarsler;
