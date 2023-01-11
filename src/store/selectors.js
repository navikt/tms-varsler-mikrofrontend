export const selectBeskjederList = (state) => state.beskjederList;

export const selectAddBeskjederList = (state) => state.addBeskjedList;

export const selectInnboksList = (state) => state.innboksList;

export const selectAddInnboksList = (state) => state.addInnboksList;

export const selectAddBeskjed = (state, beskjed) => state.add(beskjed);

export const selectRemoveBeskjed = (state) => state.removeBeskjed;

export const selectRemoveInnboks = (state) => state.removeInnboks;

export const selectClear = (state) => state.clear;
