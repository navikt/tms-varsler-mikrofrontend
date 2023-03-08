import create from "zustand";
import { Varsel, Varsler } from "../components/main-page/MainPage";
import { State } from "./selectors";

export const actions = (set: any) => ({
  add: (beskjed: Varsel) =>
    set((state: State) => ({
      beskjederList: [...state.varsler.beskjeder, beskjed],
    })),
  addVarsler: (varsler: Varsler) =>
    set(() => ({
      varsler: { beskjeder: varsler.beskjeder, oppgaver: varsler.oppgaver, innbokser: varsler.innbokser },
    })),
  removeBeskjed: (beskjed: Varsel) =>
    set((state: State) => ({
      varsler: {
        beskjeder: state.varsler.beskjeder.filter((b) => b.eventId !== beskjed.eventId),
        oppgaver: state.varsler.oppgaver,
        innbokser: state.varsler.innbokser,
      },
    })),
  clear: () =>
    set({
      varsler: { beskjeder: [], oppgaver: [], innbokser: [] },
    }),
});

const useStore = create<State>((set) => ({
  varsler: { beskjeder: [], oppgaver: [], innbokser: [] },
  ...actions(set),
}));

export default useStore;
