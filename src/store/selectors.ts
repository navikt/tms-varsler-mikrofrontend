import { Varsel } from "../components/main-page/MainPage";

export interface State {
  beskjederList: Varsel[];
  addBeskjedList: Varsel[];
  innboksList: Varsel[];
  addInnboksList: Varsel[];
  add: (beskjed: Varsel) => void;
  removeBeskjed: (beskjed: Varsel) => void;
  removeInnboks: (beskjed: Varsel) => void;
  clear: () => void;
}
// @ts-ignore
export const selectBeskjederList = (state: State) => state.beskjederList;
// @ts-ignore
export const selectAddBeskjederList = (state: State) => state.addBeskjedList;
// @ts-ignore
export const selectInnboksList = (state: State) => state.innboksList;
// @ts-ignore
export const selectAddInnboksList = (state: State) => state.addInnboksList;
// @ts-ignore
export const selectAddBeskjed = (state: State, beskjed: Varsel) => state.add(beskjed);
// @ts-ignore
export const selectRemoveBeskjed = (state: unknown) => state.removeBeskjed;
// @ts-ignore
export const selectRemoveInnboks = (state: State) => state.removeInnboks;
// @ts-ignore
export const selectClear = (state: State) => state.clear;
