import { createSlice } from "@reduxjs/toolkit";
const initialCashsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  cashForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const cashsSlice = createSlice({
  name: "cashs",
  initialState: initialCashsState,
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
    // getCashById
    cashFetched: (state, action) => {
      state.actionsLoading = false;
      state.cashForEdit = action.payload.cashForEdit;
      state.error = null;
    },
    // findCashs
    cashsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createCash
    cashCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateCash
    cashUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.CashId === action.payload.cash.CashId) {
          return action.payload.cash;
        }
        return entity;
      });
    },
    // deleteCash
    cashDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.CashId !== action.payload.CashId
      );
    },
    // deleteCashs
    cashsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.CashId)
      );
    },
    // cashsUpdateState
    cashsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.CashId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
