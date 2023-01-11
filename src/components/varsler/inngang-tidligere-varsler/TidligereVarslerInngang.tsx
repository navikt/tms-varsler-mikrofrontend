import { useQuery } from "react-query";
import { fetcher } from "../../../api/api";
import { useIntl } from "react-intl";
import {
  inaktiveOppgaverApiUrl,
  inaktiveBeskjederApiUrl,
  inaktiveInnboksApiUrl,
  tidligereVarslerUrl,
} from "../../../api/urls";
import { komponent, logAmplitudeEvent } from "../../../utils/amplitude";
import style from "./TidligereVarslerInngang.module.css";

const InngangVarslinger = () => {
  const { data: inaktiveOppgaver } = useQuery(inaktiveOppgaverApiUrl, fetcher);
  const { data: inaktiveBeskjeder } = useQuery(inaktiveBeskjederApiUrl, fetcher);
  const { data: inaktiveInnboks } = useQuery(inaktiveInnboksApiUrl, fetcher);

  const translate = useIntl();

  const skjulInngang =
    inaktiveOppgaver?.length === 0 && inaktiveBeskjeder?.length === 0 && inaktiveInnboks?.length === 0;

  return (
    <>
      {skjulInngang ? null : (
        <a className={style.inngang} href={tidligereVarslerUrl} onClick={() => logAmplitudeEvent("Tidligere varsler")}>
          {translate.formatMessage({ id: "inngang.tidligere-varsler" })}
        </a>
      )}
    </>
  );
};

export default InngangVarslinger;
