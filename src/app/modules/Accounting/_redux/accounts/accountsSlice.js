
import { createSlice } from "@reduxjs/toolkit";
const initialAccountsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  accountForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const accountsSlice = createSlice({
  name: "accounts",
  initialState: initialAccountsState,
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
    // getAccountById  
    accountFetched: (state, action) => {
      state.actionsLoading = false;
      state.accountForEdit = action.payload.accountForEdit;
      state.error = null;
    },
    // findAccounts  
    accountsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createAccount  
    accountCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateAccount  
    accountUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.AccountId === action.payload.account.AccountId) {
          return action.payload.account;
        }
        return entity;
      });
    },
    // deleteAccount  
    accountDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.AccountId !== action.payload.AccountId  
      );
    },
    // deleteAccounts  
    accountsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.AccountId)  
      );
    },
    // accountsUpdateState  
    accountsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.AccountId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
