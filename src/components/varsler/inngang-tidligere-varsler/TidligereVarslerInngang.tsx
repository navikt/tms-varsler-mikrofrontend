import React from "react";
import { useIntl } from "react-intl";
import { tidligereVarslerUrl } from "../../../api/urls";
import { logAmplitudeEvent } from "../../../utils/amplitude";
import style from "./TidligereVarslerInngang.module.css";

const TidligereVarslerInngang = () => {
  const translate = useIntl();

  return (
    <a className={style.inngang} href={tidligereVarslerUrl} onClick={() => logAmplitudeEvent("Tidligere varsler")}>
      {translate.formatMessage({ id: "inngang.tidligere-varsler" })}
    </a>
  );
};

export default TidligereVarslerInngang;
