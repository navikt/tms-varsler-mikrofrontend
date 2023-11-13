import { Link } from "@navikt/ds-react";
import { useContext } from "react";
import { tidligereVarslerUrl } from "../../../api/urls";
import { text } from "../../../language/text";
import { LanguageContext } from "../../../providers/LanguageProvider";
import { logEvent } from "../../../utils/amplitude";
import style from "./TidligereVarslerInngang.module.css";

const TidligereVarslerInngang = () => {
  const language = useContext(LanguageContext);

  return (
    <Link
      href={tidligereVarslerUrl}
      onClick={() => logEvent("tidligere-varsler-lenke", "varsler", "Tidligere varsler", undefined)}
      className={style.inngang}
    >
      {text.inngangTidligereVarsler[language]}
    </Link>
  );
};

export default TidligereVarslerInngang;
