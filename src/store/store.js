import create from "zustand";

const actions = (set) => ({
  add: (beskjed) =>
    set((state) => ({
      beskjederList: [...state.beskjederList, beskjed],
    })),
  addBeskjedList: (beskjedListe) =>
    set((state) => ({
      beskjederList: [...beskjedListe],
    })),
  addInnboksList: (innboksListe) =>
    set((state) => ({
      innboksList: [...innboksListe],
    })),
  removeBeskjed: (beskjed) =>
    set((state) => ({
      beskjederList: state.beskjederList.filter((b) => b.eventId !== beskjed.eventId),
    })),
  removeInnboks: (beskjed) =>
    set((state) => ({
      innboksList: state.innboksList.filter((b) => b.eventId !== beskjed.eventId),
    })),
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
