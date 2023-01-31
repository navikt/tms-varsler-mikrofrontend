import React, { useState } from "react";
import { useIntl } from "react-intl";
import { Next } from "@navikt/ds-icons";
import { postDone } from "../../../api/api.js";
import { logAmplitudeEvent } from "../../../utils/amplitude.js";
import { Varsel } from "../../main-page/MainPage.js";
import ArkiverKnapp from "./arkiver-knapp/ArkiverKnapp";
import style from "./VarselBoks.module.css";
import {stepUpUrl} from "../../../api/urls";

type Props = {
  eventId: string;
  tekst: string;
  dato: string;
  href: string;
  isMasked: boolean;
  type: string;
  varsel: Varsel;
};

const VarselBoks = ({ eventId, tekst, dato, href, isMasked, type, varsel }: Props) => {
  //TODO: Legge inn stepup-tekst i alle språk.
  const [isHover, setIsHover] = useState(false);

  const translate = useIntl();

  const hasNoHref = (href: string) => href === undefined || href === null || href === "";
  const isOppgave = type === "OPPGAVE";
  const isArkiverbar = (href: string) => hasNoHref(href) && type !== "OPPGAVE";

  const handleOnClick = () => {
    if (type === "BESKJED" && !isMasked) {
      postDone({ eventId: eventId });
    }
    logAmplitudeEvent(type);
  };

  return isArkiverbar(href) ? (
    <div
      className={
        isHover ? `${style.beskjed} ${style.arkiverbar} ${style.hover}` : `${style.beskjed} ${style.arkiverbar}`
      }
    >
      <div className={style.ikon} />
      <div className={`${style.contentWrapper} ${style.arkiverbarContentWrapper}`}>
        <div className={`${style.tittel} ${style.arkiverbarTittel}`}>
          {isMasked ? translate.formatMessage({ id: "beskjed.maskert.tekst" }) : tekst}
        </div>
        <div className={style.datoOgKnapp}>
          <div className={`${style.dato} ${style.arkiverbarDato}`}>{dato}</div>
          <ArkiverKnapp eventId={eventId} setIsHover={setIsHover} varsel={varsel} />
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
      href={isMasked ? stepUpUrl : href}
      onClick={handleOnClick}
    >
      <div className={isOppgave ? `${style.ikon} ${style.ikonOppgave}` : style.ikon} />
      <div className={style.contentWrapper}>
        <div>
          <div className={style.tittel}>
            {isMasked ? translate.formatMessage({ id: "beskjed.maskert.tekst" }) : tekst}
          </div>
          <div className={style.dato}>{dato}</div>
        </div>
        <Next className={style.chevron} onResize={undefined} onResizeCapture={undefined} />
      </div>
    </a>
  );
};

export default VarselBoks;
