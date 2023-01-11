import React from "react";
import { useQuery } from "react-query";
import { fetcher } from "../../api/api";
import { oppgaverApiUrl, beskjederApiUrl, innboksApiUrl } from "../../api/urls";
import {
  selectAddBeskjederList,
  selectBeskjederList,
  selectInnboksList,
  selectAddInnboksList,
} from "../../store/selectors.js";
import { sortByEventTidspunkt } from "../../utils/sorter";
import isMasked from "../../utils/isMasked";
import useStore from "../../store/store";
import { formatToReadableDate, setLocaleDate } from "../../language/i18n";
import { Heading } from "@navikt/ds-react";
import { useIntl } from "react-intl";
import style from "./MainPage.module.css";
import VarselBoks from "../varsler/varsel-boks/VarselBoks";
import TidligereVarslerInngang from "../varsler/inngang-tidligere-varsler/TidligereVarslerInngang";

const MainPage = () => {
  const { data: oppgaver, isLoading: isLoadingOppgaver } = useQuery(oppgaverApiUrl, fetcher);

  const beskjeder = useStore(selectBeskjederList);
  const addBeskjederList = useStore(selectAddBeskjederList);
  const { isLoading: isLoadingBeskjeder } = useQuery(beskjederApiUrl, fetcher, {
    onSuccess: addBeskjederList,
  });

  const innboks = useStore(selectInnboksList);
  const addInnboksList = useStore(selectAddInnboksList);
  const { isLoading: isLoadingInnboks } = useQuery(innboksApiUrl, fetcher, {
    onSuccess: addInnboksList,
  });

  const { formatMessage } = useIntl();
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
    <section>
      <Heading size="large" level="1" spacing>
        {formatMessage({ id: "varsler.tittel" })}
      </Heading>
      <ul className={style.varsler}>
        <Heading className={style.overskrift} size="small" level="2" spacing>
          {formatMessage({ id: "oppgaver.tittel" })}
        </Heading>
        {oppgaver?.sort(sortByEventTidspunkt).map((o) => (
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
      <ul className={style.varsler}>
        <Heading className={style.overskrift} size="small" level="2" spacing>
          {formatMessage({ id: "beskjeder.tittel" })}
        </Heading>
        {beskjeder &&
          beskjeder.sort(sortByEventTidspunkt).map((b) => (
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
        {innboks &&
          innboks.sort(sortByEventTidspunkt).map((i) => (
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
      <TidligereVarslerInngang />
    </section>
  );
};

export default MainPage;
