import { atom } from "nanostores";
import { Varsel, Varsler } from "../components/main-page/MainPage";

export const isErrorAtom = atom<boolean>(false);

export function setIsError() {
  isErrorAtom.set(true);
}

export const beskjedListe = atom<Array<Varsel>>([]);

export function setBeskjeder(varsler: Varsler) {
  beskjedListe.set([...varsler.beskjeder, ...varsler.innbokser]);
}

export function removeBeskjed(beskjed: Varsel) {
  beskjedListe.set([...beskjedListe.get().filter((b) => b.eventId !== beskjed.eventId)]);
}
