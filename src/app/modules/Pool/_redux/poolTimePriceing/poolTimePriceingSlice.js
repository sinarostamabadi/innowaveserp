
import { createSlice } from "@reduxjs/toolkit";
const initialPoolTimePriceingState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  poolTimePriceingForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const poolTimePriceingSlice = createSlice({
  name: "poolTimePriceing",
  initialState: initialPoolTimePriceingState,
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
    // getPoolTimePriceingById  
    poolTimePriceingFetched: (state, action) => {
      state.actionsLoading = false;
      state.poolTimePriceingForEdit = action.payload.poolTimePriceingForEdit;
      state.error = null;
    },
    // findPoolTimePriceing  
    poolTimePriceingFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createPoolTimePriceing  
    poolTimePriceingCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updatePoolTimePriceing  
    poolTimePriceingUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.PoolTimePriceingId === action.payload.poolTimePriceing.PoolTimePriceingId) {
          return action.payload.poolTimePriceing;
        }
        return entity;
      });
    },
    // deletePoolTimePriceing  
    poolTimePriceingDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.PoolTimePriceingId !== action.payload.PoolTimePriceingId  
      );
    },
    // deletePoolTimePriceing  
    poolTimePriceingDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.PoolTimePriceingId)  
      );
    },
    // poolTimePriceingUpdateState  
    poolTimePriceingStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.PoolTimePriceingId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
