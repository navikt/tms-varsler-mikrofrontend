import { BodyLong, Heading } from "@navikt/ds-react";
import { useContext } from "react";
import KattIngenVarsler from "../../../ikoner/KattIngenVarsler";
import { text } from "../../../language/text";
import { LanguageContext } from "../../../providers/LanguageProvider";
import TidligereVarslerInngang from "../inngang-tidligere-varsler/TidligereVarslerInngang";
import styles from "./IngenVarsler.module.css";

const IngenVarsler = () => {
  const language = useContext(LanguageContext);
  return (
    <div className={styles.containerWrapper}>
      <div className={styles.container}>
        <div>
          <Heading size="small">{text.varslerTomListe[language]}</Heading>
          <BodyLong>{text.varslerTomListeIngress[language]}</BodyLong>
          <div className={styles.linkWrapper}>
            <TidligereVarslerInngang />
          </div>
        </div>
        <div className={styles.iconWrapper}>
          <KattIngenVarsler />
        </div>
      </div>
    </div>
  );
};

export default IngenVarsler;
