import { createSlice } from "@reduxjs/toolkit";
const initialOperationTypeAccountsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  operationTypeAccountForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const operationTypeAccountsSlice = createSlice({
  name: "operationTypeAccounts",
  initialState: initialOperationTypeAccountsState,
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
    // getOperationTypeAccountById
    operationTypeAccountFetched: (state, action) => {
      state.actionsLoading = false;
      state.operationTypeAccountForEdit =
        action.payload.operationTypeAccountForEdit;
      state.error = null;
    },
    // findOperationTypeAccounts
    operationTypeAccountsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createOperationTypeAccount
    operationTypeAccountCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateOperationTypeAccount
    operationTypeAccountUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.OperationTypeAccountId ===
          action.payload.operationTypeAccount.OperationTypeAccountId
        ) {
          return action.payload.operationTypeAccount;
        }
        return entity;
      });
    },
    // deleteOperationTypeAccount
    operationTypeAccountDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) =>
          el.OperationTypeAccountId !== action.payload.OperationTypeAccountId
      );
    },
    // deleteOperationTypeAccounts
    operationTypeAccountsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.OperationTypeAccountId)
      );
    },
    // operationTypeAccountsUpdateState
    operationTypeAccountsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.OperationTypeAccountId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
