import { createSlice } from "@reduxjs/toolkit";
const initialPosTransactionsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  posTransactionForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const posTransactionsSlice = createSlice({
  name: "posTransactions",
  initialState: initialPosTransactionsState,
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
    // getPosTransactionById
    posTransactionFetched: (state, action) => {
      state.actionsLoading = false;
      state.posTransactionForEdit = action.payload.posTransactionForEdit;
      state.error = null;
    },
    // findPosTransactions
    posTransactionsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createPosTransaction
    posTransactionCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updatePosTransaction
    posTransactionUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.PosTransactionId ===
          action.payload.posTransaction.PosTransactionId
        ) {
          return action.payload.posTransaction;
        }
        return entity;
      });
    },
    // deletePosTransaction
    posTransactionDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.PosTransactionId !== action.payload.PosTransactionId
      );
    },
    // deletePosTransactions
    posTransactionsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.PosTransactionId)
      );
    },
    // posTransactionsUpdateState
    posTransactionsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.PosTransactionId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
