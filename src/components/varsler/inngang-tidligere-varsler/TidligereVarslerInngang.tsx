import React, { useContext } from "react";
import { LanguageContext } from "../../../providers/LanguageProvider";
import { text } from "../../../language/text";
import { tidligereVarslerUrl } from "../../../api/urls";
import { logAmplitudeEvent } from "../../../utils/amplitude";
import style from "./TidligereVarslerInngang.module.css";

const TidligereVarslerInngang = () => {
  const language = useContext(LanguageContext);

  return (
    <a className={style.inngang} href={tidligereVarslerUrl} onClick={() => logAmplitudeEvent("Tidligere varsler")}>
      {text.inngangTidligereVarsler[language]}
    </a>
  );
};

export default TidligereVarslerInngang;
