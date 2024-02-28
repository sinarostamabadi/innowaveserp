import { createSlice } from "@reduxjs/toolkit";
const initialCoreTransactionsesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  coreTransactionsForEdit: undefined,
  lastError: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const coreTransactionsesSlice = createSlice({
  name: "coreTransactionses",
  initialState: initialCoreTransactionsesState,
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
    // getCoreTransactionsById
    coreTransactionsFetched: (state, action) => {
      state.actionsLoading = false;
      state.coreTransactionsForEdit = action.payload.coreTransactionsForEdit;
      state.error = null;
    },
    // findCoreTransactionses
    coreTransactionsesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createCoreTransactions
    coreTransactionsCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateCoreTransactions
    coreTransactionsUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.CoreTransactionsId ===
          action.payload.coreTransactions.CoreTransactionsId
        ) {
          return action.payload.coreTransactions;
        }
        return entity;
      });
    },
    // deleteCoreTransactions
    coreTransactionsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.CoreTransactionsId !== action.payload.CoreTransactionsId
      );
    },
    // deleteCoreTransactionses
    coreTransactionsesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.CoreTransactionsId)
      );
    },
    // coreTransactionsesUpdateState
    coreTransactionsesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.CoreTransactionsId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
