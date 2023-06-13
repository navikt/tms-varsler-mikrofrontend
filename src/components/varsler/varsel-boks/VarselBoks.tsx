import React, { useContext } from "react";
import { LanguageContext } from "../../../providers/LanguageProvider";
import { text } from "../../../language/text";
import { Next } from "@navikt/ds-icons";
import { Tag, Button, BodyShort, BodyLong } from "@navikt/ds-react";
import { postDone } from "../../../api/api.js";
import { logArkiverEvent, logEvent } from "../../../utils/amplitude.js";
import { formatToReadableDate, setLocaleDate } from "../../../language/i18n.js";
import { Varsel } from "../../main-page/MainPage.js";
import style from "./VarselBoks.module.css";
import { stepUpUrl } from "../../../api/urls";
import useStore from "../../../store/store.js";
import { selectRemoveBeskjed } from "../../../store/selectors.js";
import BeskjedIkon from "../../../ikoner/BeskjedIkon.js";
import OppgaveIkon from "../../../ikoner/OppgaveIkon.js";

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

  const handleOnClick = () => {
    if (type === "BESKJED" && !varsel.isMasked) {
      postDone({ eventId: varsel.eventId });
    }
    logEvent(type === "BESKJED" ? "varsel-beskjed" : "varsel-oppgave", "varsel", undefined, varsel.link);
  };

  setLocaleDate();

  return isArkiverbar(varsel.link) ? (
    <div className={style.varsel}>
      <div className={style.contentWrapper}>
        <BodyShort>{varsel.isMasked ? text.beskjedMaskertTekst[language] : varsel.tekst}</BodyShort>

        <BodyLong size="small" className={style.dato}>
          {dato}
        </BodyLong>

        <div className={style.metadataOgKnapp}>
          <div className={style.ikonOgTag}>
            {isOppgave ? <OppgaveIkon /> : <BeskjedIkon />}
            {eksternVarslingStatus && (
              <Tag variant="neutral" size="xsmall" className={style.varselTag}>
                {eksternVarslingStatus}
              </Tag>
            )}
          </div>
          <ArkiverButton varsel={varsel} />
        </div>
      </div>
    </div>
  ) : (
    <a
      className={
        isOppgave
          ? `${style.varsel} ${style.klikkbartVarsel} ${style.oppgave}`
          : `${style.varsel} ${style.klikkbartVarsel} ${style.beskjed}`
      }
      href={varsel.isMasked ? stepUpUrl : varsel.link}
      onClick={handleOnClick}
    >
      <div className={style.contentWrapper}>
        <BodyShort className={style.klikkbarTittel}>
          {varsel.isMasked ? text.beskjedMaskertTekst[language] : varsel.tekst}
        </BodyShort>

        <BodyLong size="small" className={style.dato}>
          {dato}
        </BodyLong>

        <div className={style.metadataOgKnapp}>
          <div className={style.ikonOgTag}>
            {isOppgave ? <OppgaveIkon /> : <BeskjedIkon />}
            {eksternVarslingStatus && (
              <Tag variant="neutral" size="xsmall" className={style.varselTag}>
                {eksternVarslingStatus}
              </Tag>
            )}
          </div>
          <Next className={style.chevron} onResize={undefined} onResizeCapture={undefined} />
        </div>
      </div>
    </a>
  );
};

export default VarselBoks;
