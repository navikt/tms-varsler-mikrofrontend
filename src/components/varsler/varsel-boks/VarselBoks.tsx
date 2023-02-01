import React, { useState } from "react";
import { useIntl } from "react-intl";
import { Next } from "@navikt/ds-icons";
import { postDone } from "../../../api/api.js";
import { logAmplitudeEvent } from "../../../utils/amplitude.js";
import { formatToReadableDate, setLocaleDate } from "../../../language/i18n.js";
import { Varsel } from "../../main-page/MainPage.js";
import ArkiverKnapp from "./arkiver-knapp/ArkiverKnapp";
import style from "./VarselBoks.module.css";

type Props = {
  varsel: Varsel;
  type: string;
};

const VarselBoks = ({ varsel, type }: Props) => {
  //TODO: Legge inn stepup-tekst i alle språk.
  const [isHover, setIsHover] = useState(false);

  const translate = useIntl();

  const dato = formatToReadableDate(varsel.forstBehandlet);

  const hasNoHref = (link: string) => link === undefined || link === null || link === "";
  const isOppgave = type === "OPPGAVE";
  const isArkiverbar = (link: string) => hasNoHref(link) && type !== "OPPGAVE";

  const handleOnClick = () => {
    if (type === "BESKJED") {
      postDone({ eventId: varsel.eventId });
    }
    logAmplitudeEvent(type);
  };

  setLocaleDate();

  return isArkiverbar(varsel.link) ? (
    <div
      className={
        isHover ? `${style.beskjed} ${style.arkiverbar} ${style.hover}` : `${style.beskjed} ${style.arkiverbar}`
      }
    >
      <div className={style.ikon} />
      <div className={`${style.contentWrapper} ${style.arkiverbarContentWrapper}`}>
        <div className={`${style.tittel} ${style.arkiverbarTittel}`}>
          {varsel.isMasked ? translate.formatMessage({ id: "beskjed.maskert.tekst" }) : varsel.tekst}
        </div>
        <div className={style.datoOgKnapp}>
          <div className={`${style.dato} ${style.arkiverbarDato}`}>{dato}</div>
          <ArkiverKnapp eventId={varsel.eventId} setIsHover={setIsHover} varsel={varsel} />
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
      href={varsel.link}
      onClick={handleOnClick}
    >
      <div className={isOppgave ? `${style.ikon} ${style.ikonOppgave}` : style.ikon} />
      <div className={style.contentWrapper}>
        <div>
          <div className={style.tittel}>
            {varsel.isMasked ? translate.formatMessage({ id: "beskjed.maskert.tekst" }) : varsel.tekst}
          </div>
          <div className={style.dato}>{dato}</div>
        </div>
        <Next className={style.chevron} onResize={undefined} onResizeCapture={undefined} />
      </div>
    </a>
  );
};

export default VarselBoks;
