import create from "zustand";
import { Varsel } from "../components/main-page/MainPage";
import { State } from "./selectors";
// @ts-ignore
const actions = (set: any) => ({
  add: (beskjed: Varsel) =>
    set((state: State) => ({
      beskjederList: [...state.beskjederList, beskjed],
    })),
  // @ts-ignore
  addBeskjedList: (beskjedListe: Varsel[]) =>
    set(() => ({
      beskjederList: [...beskjedListe],
    })),
  // @ts-ignore
  addInnboksList: (innboksListe: Varsel[]) =>
    set(() => ({
      innboksList: [...innboksListe],
    })),
  // @ts-ignore
  removeBeskjed: (beskjed: Varsel) =>
    set((state: State) => ({
      beskjederList: state.beskjederList.filter((b) => b.eventId !== beskjed.eventId),
    })),
  // @ts-ignore
  removeInnboks: (beskjed: Varsel) =>
    set((state: State) => ({
      innboksList: state.innboksList.filter((b) => b.eventId !== beskjed.eventId),
    })),
  // @ts-ignore
  clear: () =>
    set({
      beskjederList: [],
      innboksList: [],
    }),
});

const useStore = create((set) => ({
  beskjederList: [],
  innboksList: [],
  ...actions(set),
}));

export default useStore;
