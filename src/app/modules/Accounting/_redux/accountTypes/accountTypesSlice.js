
import { createSlice } from "@reduxjs/toolkit";
const initialAccountTypesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  accountTypeForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const accountTypesSlice = createSlice({
  name: "accountTypes",
  initialState: initialAccountTypesState,
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
    // getAccountTypeById  
    accountTypeFetched: (state, action) => {
      state.actionsLoading = false;
      state.accountTypeForEdit = action.payload.accountTypeForEdit;
      state.error = null;
    },
    // findAccountTypes  
    accountTypesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createAccountType  
    accountTypeCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);

      return;
    },
    // updateAccountType  
    accountTypeUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.AccountTypeId === action.payload.accountType.AccountTypeId) {
          return action.payload.accountType;
        }
        return entity;
      });
      
      return;
    },
    // deleteAccountType  
    accountTypeDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.AccountTypeId !== action.payload.AccountTypeId  
      );
    },
    // deleteAccountTypes  
    accountTypesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.AccountTypeId)  
      );
    },
    // accountTypesUpdateState  
    accountTypesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.AccountTypeId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
