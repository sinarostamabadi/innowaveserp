import { createSlice } from "@reduxjs/toolkit";
const initialSettlementsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  settlementForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const settlementsSlice = createSlice({
  name: "settlements",
  initialState: initialSettlementsState,
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
    // getSettlementById
    settlementFetched: (state, action) => {
      state.actionsLoading = false;
      state.settlementForEdit = action.payload.settlementForEdit;
      state.error = null;
    },
    // findSettlements
    settlementsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createSettlement
    settlementCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateSettlement
    settlementUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.SettlementId === action.payload.settlement.SettlementId) {
          return action.payload.settlement;
        }
        return entity;
      });
    },
    // deleteSettlement
    settlementDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.SettlementId !== action.payload.SettlementId
      );
    },
    // deleteSettlements
    settlementsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.SettlementId)
      );
    },
    // settlementsUpdateState
    settlementsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.SettlementId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
