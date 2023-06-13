import React, { useContext } from "react";
import { LanguageContext } from "../../../providers/LanguageProvider";
import { text } from "../../../language/text";
import { tidligereVarslerUrl } from "../../../api/urls";
import { logEvent } from "../../../utils/amplitude";
import style from "./TidligereVarslerInngang.module.css";

const TidligereVarslerInngang = () => {
  const language = useContext(LanguageContext);

  return (
    <a
      className={style.inngang}
      href={tidligereVarslerUrl}
      onClick={() => logEvent("tidligere-varsler-lenke", "varsler", "Tidligere varsler", undefined)}
    >
      {text.inngangTidligereVarsler[language]}
    </a>
  );
};

export default TidligereVarslerInngang;
