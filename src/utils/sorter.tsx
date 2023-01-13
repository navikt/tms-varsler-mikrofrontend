import dayjs from "dayjs";
import { Varsel } from "../components/main-page/MainPage";

type Props = {
  a: Varsel;
  b: Varsel;
};

// @ts-ignore
export const sortByEventTidspunkt = ({ a, b }: Props) =>
  // @ts-ignore
  dayjs(a.forstBehandlet).isAfter(dayjs(b.forstBehandlet)) ? -1 : 1;
