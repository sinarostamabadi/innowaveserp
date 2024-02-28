import { createSlice } from "@reduxjs/toolkit";
const initialCashTransactionTypesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  cashTransactionTypeForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const cashTransactionTypesSlice = createSlice({
  name: "cashTransactionTypes",
  initialState: initialCashTransactionTypesState,
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
    // getCashTransactionTypeById
    cashTransactionTypeFetched: (state, action) => {
      state.actionsLoading = false;
      state.cashTransactionTypeForEdit =
        action.payload.cashTransactionTypeForEdit;
      state.error = null;
    },
    // findCashTransactionTypes
    cashTransactionTypesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createCashTransactionType
    cashTransactionTypeCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateCashTransactionType
    cashTransactionTypeUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.CashTransactionTypeId ===
          action.payload.cashTransactionType.CashTransactionTypeId
        ) {
          return action.payload.cashTransactionType;
        }
        return entity;
      });
    },
    // deleteCashTransactionType
    cashTransactionTypeDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) =>
          el.CashTransactionTypeId !== action.payload.CashTransactionTypeId
      );
    },
    // deleteCashTransactionTypes
    cashTransactionTypesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.CashTransactionTypeId)
      );
    },
    // cashTransactionTypesUpdateState
    cashTransactionTypesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.CashTransactionTypeId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
