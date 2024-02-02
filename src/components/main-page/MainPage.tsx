import { Heading } from "@navikt/ds-react";
import { useContext } from "react";
import useSWRImmutable from "swr/immutable";
import { fetcher } from "../../api/api";
import { varslerUrl } from "../../api/urls";
import { text } from "../../language/text";
import { LanguageContext } from "../../providers/LanguageProvider";
import { setBeskjeder, beskjedListe } from "../../store/store.js";
import { sortByEventTidspunkt } from "../../utils/sorter";
import IngenVarsler from "../varsler/ingen-varsler/IngenVarsler";
import TidligereVarslerInngang from "../varsler/inngang-tidligere-varsler/TidligereVarslerInngang";
import VarselBoks from "../varsler/varsel-boks/VarselBoks";
import style from "./MainPage.module.css";
import { useStore } from "@nanostores/react";

export interface Varsel {
  forstBehandlet: string;
  eventId: string;
  tekst: string;
  link: string;
  isMasked: boolean;
  eksternVarslingSendt: boolean;
  eksternVarslingKanaler: string[];
}

export interface Varsler {
  beskjeder: Array<Varsel>;
  oppgaver: Array<Varsel>;
  innbokser: Array<Varsel>;
}

const MainPage = () => {
  const language = useContext(LanguageContext);
  const { data: varsler, isLoading: isLoadingVarsler } = useSWRImmutable<Varsler>(varslerUrl, fetcher, {
    onSuccess: (varsler) => setBeskjeder(varsler),
  });

  const beskjeder = useStore(beskjedListe);

  if (isLoadingVarsler) {
    return null;
  }

  const hasNoOppgaver = varsler?.oppgaver.length === 0;
  const hasNoBeskjeder = beskjeder.length === 0;
  const hasNoVarsler = hasNoOppgaver && hasNoBeskjeder;

  return (
    <div className={style.pageWrapper}>
      <div className={style.headerWrapper}>
        <Heading size={"large"}>{text.varslerTittel[language]}</Heading>
      </div>
      <div className={style.varslerContainer}>
        {hasNoVarsler ? (
          <IngenVarsler />
        ) : (
          <>
            <ul className={style.varselList}>
              {varsler?.oppgaver.sort(sortByEventTidspunkt).map((o: Varsel) => (
                <li key={o.eventId}>
                  <VarselBoks varsel={o} type="OPPGAVE" />
                </li>
              ))}
              {beskjeder?.sort(sortByEventTidspunkt).map((b: Varsel) => (
                <li key={b.eventId}>
                  <VarselBoks varsel={b} type="BESKJED" />
                </li>
              ))}
            </ul>
            <div className={style.tidligereVarslerLenke}>
              <TidligereVarslerInngang />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MainPage;
