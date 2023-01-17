import create from "zustand";
import { Varsel } from "../components/main-page/MainPage";
import { State } from "./selectors";

export const actions = (set: any) => ({
  add: (beskjed: Varsel) =>
    set((state: State) => ({
      beskjederList: [...state.beskjederList, beskjed],
    })),
  addBeskjedList: (beskjedListe: Varsel[]) =>
    set(() => ({
      beskjederList: [...beskjedListe],
    })),
  removeBeskjed: (beskjed: Varsel) =>
    set((state: State) => ({
      beskjederList: state.beskjederList.filter((b) => b.eventId !== beskjed.eventId),
    })),
  clear: () =>
    set({
      beskjederList: [],
      innboksList: [],
    }),
});

const useStore = create<State>((set) => ({
  beskjederList: [],
  ...actions(set),
}));

export default useStore;
