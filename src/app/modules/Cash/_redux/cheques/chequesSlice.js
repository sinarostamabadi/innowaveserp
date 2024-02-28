import { createSlice } from "@reduxjs/toolkit";
const initialChequesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  chequeForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const chequesSlice = createSlice({
  name: "cheques",
  initialState: initialChequesState,
  reducers: {
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false;
      } else {
        state.actionsLoading = false;
      }
    },
    startCall: (state, action) => {
      state.error = null;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true;
      } else {
        state.actionsLoading = true;
      }
    },
    // getChequeById
    chequeFetched: (state, action) => {
      state.actionsLoading = false;
      state.chequeForEdit = action.payload.chequeForEdit;
      state.error = null;
    },
    // findCheques
    chequesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createCheque
    chequeCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateCheque
    chequeUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.ChequeId === action.payload.cheque.ChequeId) {
          return action.payload.cheque;
        }
        return entity;
      });
    },
    // deleteCheque
    chequeDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.ChequeId !== action.payload.ChequeId
      );
    },
    // deleteCheques
    chequesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.ChequeId)
      );
    },
    // chequesUpdateState
    chequesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.ChequeId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
