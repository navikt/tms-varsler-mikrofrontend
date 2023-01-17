import dayjs from "dayjs";
import { Varsel } from "../components/main-page/MainPage";

export const sortByEventTidspunkt = (a: Varsel, b: Varsel) =>
  dayjs(a.forstBehandlet).isAfter(dayjs(b.forstBehandlet)) ? -1 : 1;
