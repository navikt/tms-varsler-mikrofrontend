import React from "react";
import { useIntl } from "react-intl";
import { Next } from "@navikt/ds-icons";
import { Tag, Button } from "@navikt/ds-react";
import { postDone } from "../../../api/api.js";
import { logAmplitudeEvent } from "../../../utils/amplitude.js";
import { formatToReadableDate, setLocaleDate } from "../../../language/i18n.js";
import { Varsel } from "../../main-page/MainPage.js";
import style from "./VarselBoks.module.css";
import { stepUpUrl } from "../../../api/urls";
import useStore from "../../../store/store.js";
import { selectRemoveBeskjed } from "../../../store/selectors.js";

const getEksternvarslingStatus = (kanaler: string[]) => {
  const translate = useIntl();
  if (kanaler.includes("SMS") && kanaler.includes("EPOST")) {
    return translate.formatMessage({ id: "varsel.eksternt-varslet-epost-sms" });
  } else if (kanaler.includes("SMS")) {
    return translate.formatMessage({ id: "varsel.eksternt-varslet-sms" });
  } else if (kanaler.includes("EPOST")) {
    return translate.formatMessage({ id: "varsel.eksternt-varslet-epost" });
  }
};

const ArkiverButton = ({ varsel }: { varsel: Varsel }) => {
  const translate = useIntl();

  const removeBeskjed = useStore(selectRemoveBeskjed);

  const handleOnClick = () => {
    postDone({ eventId: varsel.eventId });
    logAmplitudeEvent("Arkivert beskjed");
    removeBeskjed(varsel);
  };

  return (
    <Button variant="tertiary" size="xsmall" onClick={handleOnClick}>
      {translate.formatMessage({ id: "arkiver.knapp" })}
    </Button>
  );
};

const VarselBoks = ({ varsel, type }: { varsel: Varsel; type: string }) => {
  //TODO: Legge inn stepup-tekst i alle språk.
  const translate = useIntl();

  const dato = formatToReadableDate(varsel.forstBehandlet);

  const hasNoHref = (link: string) => link === undefined || link === null || link === "";
  const isOppgave = type === "OPPGAVE";
  const isArkiverbar = (link: string) => !varsel.isMasked && hasNoHref(link) && type !== "OPPGAVE";

  const eksternVarslingStatus = getEksternvarslingStatus(varsel.eksternVarslingKanaler);

  const handleOnClick = () => {
    if (type === "BESKJED" && !varsel.isMasked) {
      postDone({ eventId: varsel.eventId });
    }
    logAmplitudeEvent(type, varsel.link);
  };

  setLocaleDate();

  return isArkiverbar(varsel.link) ? (
    <div className={`${style.beskjed} ${style.arkiverbar}`}>
      <div className={style.ikon} />
      <div className={`${style.contentWrapper} ${style.arkiverbarContentWrapper}`}>
        <div className={`${style.tittel} ${style.arkiverbarTittel}`}>
          {varsel.isMasked ? translate.formatMessage({ id: "beskjed.maskert.tekst" }) : varsel.tekst}
        </div>
        <div className={style.metadataOgKnapp}>
          <div className={style.metadata}>
            <span className={style.dato}>{dato}</span>
            {eksternVarslingStatus && (
              <Tag variant="neutral" size="xsmall">
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
          ? `${style.beskjed} ${style.ikkeArkiverbar} ${style.oppgave}`
          : `${style.beskjed} ${style.ikkeArkiverbar}`
      }
      href={varsel.isMasked ? stepUpUrl : varsel.link}
      onClick={handleOnClick}
    >
      <div className={isOppgave ? `${style.ikon} ${style.ikonOppgave}` : style.ikon} />
      <div className={style.contentWrapper}>
        <div>
          <div className={style.tittel}>
            {varsel.isMasked ? translate.formatMessage({ id: "beskjed.maskert.tekst" }) : varsel.tekst}
          </div>
          <div className={style.metadataOgKnapp}>
            <div className={style.metadata}>
              <span className={style.dato}>{dato}</span>
              {eksternVarslingStatus && (
                <Tag variant="neutral" size="xsmall">
                  {eksternVarslingStatus}
                </Tag>
              )}
            </div>
            <Next className={style.chevron} onResize={undefined} onResizeCapture={undefined} />
          </div>
        </div>
      </div>
    </a>
  );
};

export default VarselBoks;
