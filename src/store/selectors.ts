import { Varsler } from "../components/main-page/MainPage";
import { actions } from "./store";

export interface State extends ReturnType<typeof actions> {
  varsler: Varsler;
}

export const selectBeskjederList = (state: State) => state.varsler.beskjeder.concat(state.varsler.innbokser);
export const selectAddVarsler = (state: State) => state.addVarsler;
export const selectRemoveBeskjed = (state: State) => state.removeBeskjed;
export const selectClear = (state: State) => state.clear;
