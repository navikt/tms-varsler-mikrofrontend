import React, { useContext } from "react";
import { LanguageContext } from "../../providers/LanguageProvider";
import { text } from "../../language/text";
import { useQuery } from "react-query";
import { fetcher } from "../../api/api";
import { varslerUrl } from "../../api/urls";
import { selectAddVarsler, selectBeskjederList } from "../../store/selectors.js";
import useStore from "../../store/store.js";
import { sortByEventTidspunkt } from "../../utils/sorter";
import { Heading } from "@navikt/ds-react";
import VarselBoks from "../varsler/varsel-boks/VarselBoks";
import TidligereVarslerInngang from "../varsler/inngang-tidligere-varsler/TidligereVarslerInngang";
import IngenVarsler from "../varsler/ingen-varsler/IngenVarsler";
import IngenAvType from "../varsler/ingen-av-type/IngenAvType";
import style from "./MainPage.module.css";

export interface Varsel {
  forstBehandlet: string;
  eventId: string;
  tekst: string;
  link: string;
  isMasked: boolean;
}

export interface Varsler {
  beskjeder: Array<Varsel>;
  oppgaver: Array<Varsel>;
  innbokser: Array<Varsel>;
}

const MainPage = () => {
  const beskjeder = useStore(selectBeskjederList);
  const addVarsler = useStore(selectAddVarsler);
  const { data: varsler, isLoading: isLoadingVarsler } = useQuery(varslerUrl, fetcher, {
    onSuccess: addVarsler,
  });

  const language = useContext(LanguageContext);

  const hasNoOppgaver = varsler?.oppgaver.length === 0;
  const hasNoBeskjeder = varsler?.beskjeder.length === 0 && varsler?.innbokser.length === 0;
  const hasNoVarsler = hasNoOppgaver && hasNoBeskjeder;

  if (isLoadingVarsler) {
    return null;
  }

  return (
    <div className={style.pageWrapper}>
      <div className={style.headerBackground}>
        <div className={style.headerWrapper}>
          <Heading size={"large"}>{text.varslerTittel[language]}</Heading>
        </div>
      </div>
      <div className={style.varslerBackground}>
        <div className={style.varslerContainer}>
          {hasNoVarsler ? (
            <IngenVarsler />
          ) : (
            <>
              <div>
                <ul className={style.varsler}>
                  <Heading className={style.overskrift} size="medium" level="2" spacing>
                    {text.oppgaverTittel[language]}
                  </Heading>
                  {hasNoOppgaver ? (
                    <IngenAvType type="OPPGAVE" />
                  ) : (
                    varsler?.oppgaver.sort(sortByEventTidspunkt).map((o: Varsel) => (
                      <li key={o.eventId}>
                        <VarselBoks varsel={o} type="OPPGAVE" />
                      </li>
                    ))
                  )}
                </ul>
              </div>
              <div>
                <ul className={`${style.varsler} ${style.oppgaver}`}>
                  <Heading className={style.overskrift} size="medium" level="2" spacing>
                    {text.beskjederTittel[language]}
                  </Heading>
                  {hasNoBeskjeder ? (
                    <IngenAvType type="BESKJED" />
                  ) : (
                    <>
                      {beskjeder?.sort(sortByEventTidspunkt).map((b: Varsel) => (
                        <li key={b.eventId}>
                          <VarselBoks varsel={b} type="BESKJED" />
                        </li>
                      ))}
                      {varsler?.innbokser.sort(sortByEventTidspunkt).map((i: Varsel) => (
                        <li key={i.eventId}>
                          <VarselBoks varsel={i} type="INNBOKS" />
                        </li>
                      ))}
                    </>
                  )}
                </ul>
              </div>
              <div className={style.varslerLenke}>
                <TidligereVarslerInngang />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
