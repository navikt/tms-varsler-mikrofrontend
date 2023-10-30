import { ChevronRightIcon } from "@navikt/aksel-icons";
import { BodyLong, BodyShort, Button } from "@navikt/ds-react";
import { useContext } from "react";
import { postDone } from "../../../api/api.js";
import { stepUpUrl } from "../../../api/urls";
import BeskjedIkon from "../../../ikoner/BeskjedIkon.js";
import OppgaveIkon from "../../../ikoner/OppgaveIkon.js";
import { formatToReadableDate, setLocaleDate } from "../../../language/i18n.js";
import { text } from "../../../language/text";
import { LanguageContext } from "../../../providers/LanguageProvider";
import { selectRemoveBeskjed } from "../../../store/selectors.js";
import useStore from "../../../store/store.js";
import { logArkiverEvent, logEvent } from "../../../utils/amplitude.js";
import { Varsel } from "../../main-page/MainPage.js";
import styles from "./VarselBoks.module.css";

const getEksternvarslingStatus = (kanaler: string[]) => {
  const language = useContext(LanguageContext);
  if (kanaler.includes("SMS") && kanaler.includes("EPOST")) {
    return text.varselEksterntVarsletEpostOgSMS[language];
  } else if (kanaler.includes("SMS")) {
    return text.varselEksterntVarsletSMS[language];
  } else if (kanaler.includes("EPOST")) {
    return text.varselEksterntVarsletEpost[language];
  }
};

const ArkiverButton = ({ varsel }: { varsel: Varsel }) => {
  const language = useContext(LanguageContext);
  const removeBeskjed = useStore(selectRemoveBeskjed);

  const handleOnClick = () => {
    postDone({ eventId: varsel.eventId });
    logArkiverEvent();
    removeBeskjed(varsel);
  };

  return (
    <Button variant="tertiary" size="xsmall" onClick={handleOnClick}>
      {text.arkiverKnapp[language]}
    </Button>
  );
};

const VarselBoks = ({ varsel, type }: { varsel: Varsel; type: string }) => {
  const language = useContext(LanguageContext);

  const dato = formatToReadableDate(varsel.forstBehandlet);

  const hasNoHref = (link: string) => link === undefined || link === null || link === "";
  const isOppgave = type === "OPPGAVE";
  const isArkiverbar = (link: string) => !varsel.isMasked && hasNoHref(link) && type !== "OPPGAVE";

  const eksternVarslingStatus = getEksternvarslingStatus(varsel.eksternVarslingKanaler);

  const varselTypeText = isOppgave ? text.oppgave[language] : text.beskjed[language];

  const handleOnClick = () => {
    if (type === "BESKJED" && !varsel.isMasked) {
      postDone({ eventId: varsel.eventId });
    }
    logEvent(type === "BESKJED" ? "varsel-beskjed" : "varsel-oppgave", "varsler", undefined, varsel.link);
  };

  setLocaleDate();

  return isArkiverbar(varsel.link) ? (
    <div className={styles.varsel}>
      <div className={styles.contentWrapper}>
        <div className={styles.header}>
          <div className={styles.varselTypeContainer}>
            {isOppgave ? <OppgaveIkon /> : <BeskjedIkon />}
            <BodyLong>{varselTypeText}</BodyLong>
          </div>
          <BodyShort size="small" className={styles.dato}>
            {dato}
          </BodyShort>
        </div>

        <BodyLong className={styles.tittel}>
          {varsel.isMasked ? text.beskjedMaskertTekst[language] : varsel.tekst}
        </BodyLong>

        <div className={styles.metadataOgKnapp}>
          <div>
            {eksternVarslingStatus && <BodyShort className={styles.eksterntVarslet}>{eksternVarslingStatus}</BodyShort>}
          </div>
          <ArkiverButton varsel={varsel} />
        </div>
      </div>
    </div>
  ) : (
    <a
      className={`${styles.varsel} ${styles.klikkbartVarsel} ${isOppgave ? styles.oppgave : styles.beskjed}`}
      href={varsel.isMasked ? stepUpUrl : varsel.link}
      onClick={handleOnClick}
    >
      <div className={styles.contentWrapper}>
        <div className={styles.header}>
          <div className={styles.varselTypeContainer}>
            {isOppgave ? <OppgaveIkon /> : <BeskjedIkon />}
            <BodyLong>{varselTypeText}</BodyLong>
          </div>
          <div className={styles.chevronContainer}>
            <BodyShort size="small" className={styles.dato}>
              {dato}
            </BodyShort>
            <ChevronRightIcon aria-hidden={true} className={styles.chevron} />
          </div>
        </div>

        <BodyLong className={styles.klikkbarTittel}>
          {varsel.isMasked ? text.beskjedMaskertTekst[language] : varsel.tekst}
        </BodyLong>

        {eksternVarslingStatus && <BodyShort className={styles.eksterntVarslet}>{eksternVarslingStatus}</BodyShort>}
      </div>
    </a>
  );
};

export default VarselBoks;
