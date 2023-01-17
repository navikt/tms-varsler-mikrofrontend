import React from "react";
import { useQuery } from "react-query";
import { fetcher } from "../../api/api";
import { oppgaverApiUrl, beskjederApiUrl, innboksApiUrl } from "../../api/urls";
import { selectAddBeskjederList, selectBeskjederList } from "../../store/selectors.js";
import useStore from "../../store/store.js";
import { sortByEventTidspunkt } from "../../utils/sorter";
import isMasked from "../../utils/isMasked";
import { formatToReadableDate, setLocaleDate } from "../../language/i18n";
import { Heading } from "@navikt/ds-react";
import { useIntl } from "react-intl";
import style from "./MainPage.module.css";
import VarselBoks from "../varsler/varsel-boks/VarselBoks";
import TidligereVarslerInngang from "../varsler/inngang-tidligere-varsler/TidligereVarslerInngang";

export interface Varsel {
  forstBehandlet: string;
  eventId: string;
  tekst: string;
  link: string;
  sistOppdatert: string;
  sikkerhetsnivaa: number;
}

const MainPage = () => {
  const { data: oppgaver, isLoading: isLoadingOppgaver } = useQuery(oppgaverApiUrl, fetcher);
  const { data: innboks, isLoading: isLoadingInnboks } = useQuery(innboksApiUrl, fetcher);

  const beskjeder = useStore(selectBeskjederList);
  const addBeskjederList = useStore(selectAddBeskjederList);
  const { isLoading: isLoadingBeskjeder } = useQuery(beskjederApiUrl, fetcher, {
    onSuccess: addBeskjederList,
  });

  const translate = useIntl();
  const isLoadingVarsler = isLoadingBeskjeder || isLoadingOppgaver || isLoadingInnboks;
  const hasNoVarsler = oppgaver?.length === 0 && beskjeder?.length === 0 && innboks?.length === 0;
  setLocaleDate();

  if (isLoadingVarsler) {
    return null;
  }

  if (hasNoVarsler) {
    return null;
  }

  return (
    <section className={style.pageWrapper}>
      <div className={style.headerWrapper}>
        <Heading className={style.content} size={"large"}>
          {translate.formatMessage({ id: "varsler.tittel" })}
        </Heading>
      </div>
      <section className={style.varslerContainer}>
        <ul className={`${style.varsler} ${style.content}`}>
          <Heading className={style.overskrift} size="small" level="2" spacing>
            {translate.formatMessage({ id: "oppgaver.tittel" })}
          </Heading>
          {oppgaver?.sort(sortByEventTidspunkt).map((o: Varsel) => (
            <li key={o.eventId}>
              <VarselBoks
                eventId={o.eventId}
                tekst={o.tekst}
                dato={formatToReadableDate(o.forstBehandlet)}
                href={o.link}
                isMasked={isMasked(o?.tekst)}
                type="OPPGAVE"
                varsel={o}
              />
            </li>
          ))}
        </ul>
        <ul className={`${style.varsler} ${style.content}`}>
          <Heading className={style.overskrift} size="small" level="2" spacing>
            {translate.formatMessage({ id: "beskjeder.tittel" })}
          </Heading>
          {beskjeder?.sort(sortByEventTidspunkt).map((b: Varsel) => (
            <li key={b.eventId}>
              <VarselBoks
                eventId={b.eventId}
                tekst={b.tekst}
                dato={formatToReadableDate(b.forstBehandlet)}
                href={b.link}
                isMasked={isMasked(b?.tekst)}
                type="BESKJED"
                varsel={b}
              />
            </li>
          ))}
          {innboks?.sort(sortByEventTidspunkt).map((i: Varsel) => (
            <li key={i.eventId}>
              <VarselBoks
                eventId={i.eventId}
                tekst={i.tekst}
                dato={formatToReadableDate(i.forstBehandlet)}
                href={i.link}
                isMasked={isMasked(i?.tekst)}
                type="INNBOKS"
                varsel={i}
              />
            </li>
          ))}
        </ul>
        <div className={style.content}>
          <TidligereVarslerInngang />
        </div>
      </section>
    </section>
  );
};

export default MainPage;
