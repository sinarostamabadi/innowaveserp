import { createSlice } from "@reduxjs/toolkit";
const initialCostsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  costForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const costsSlice = createSlice({
  name: "costs",
  initialState: initialCostsState,
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
    // getCostById
    costFetched: (state, action) => {
      state.actionsLoading = false;
      state.costForEdit = action.payload.costForEdit;
      state.error = null;
    },
    // findCosts
    costsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createCost
    costCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateCost
    costUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.CostId === action.payload.cost.CostId) {
          return action.payload.cost;
        }
        return entity;
      });
    },
    // deleteCost
    costDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.CostId !== action.payload.CostId
      );
    },
    // deleteCosts
    costsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.CostId)
      );
    },
    // costsUpdateState
    costsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.CostId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
