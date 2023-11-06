import { useContext } from "react";
import { tidligereVarslerUrl } from "../../../api/urls";
import { text } from "../../../language/text";
import { LanguageContext } from "../../../providers/LanguageProvider";
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
