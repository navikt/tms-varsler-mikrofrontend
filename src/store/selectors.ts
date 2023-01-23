import { Varsel } from "../components/main-page/MainPage";
import { actions } from "./store";

export interface State extends ReturnType<typeof actions> {
  beskjederList: Varsel[];
}

export const selectBeskjederList = (state: State) => state.beskjederList;
export const selectAddBeskjederList = (state: State) => state.addBeskjedList;
export const selectAddBeskjed = (state: State, beskjed: Varsel) => state.add(beskjed);
export const selectRemoveBeskjed = (state: State) => state.removeBeskjed;
export const selectClear = (state: State) => state.clear;
