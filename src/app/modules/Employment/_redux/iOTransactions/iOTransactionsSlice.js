
import { createSlice } from "@reduxjs/toolkit";
const initialIOTransactionsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  iOTransactionForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const iOTransactionsSlice = createSlice({
  name: "iOTransactions",
  initialState: initialIOTransactionsState,
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
    // getIOTransactionById  
    iOTransactionFetched: (state, action) => {
      state.actionsLoading = false;
      state.iOTransactionForEdit = action.payload.iOTransactionForEdit;
      state.error = null;
    },
    // findIOTransactions  
    iOTransactionsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createIOTransaction  
    iOTransactionCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateIOTransaction  
    iOTransactionUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.IOTransactionId === action.payload.iOTransaction.IOTransactionId) {
          return action.payload.iOTransaction;
        }
        return entity;
      });
    },
    // deleteIOTransaction  
    iOTransactionDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.IOTransactionId !== action.payload.IOTransactionId  
      );
    },
    // deleteIOTransactions  
    iOTransactionsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.IOTransactionId)  
      );
    },
    // iOTransactionsUpdateState  
    iOTransactionsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.IOTransactionId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
