
import { createSlice } from "@reduxjs/toolkit";
const initialBilliardTimePriceingState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  billiardTimePriceingForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const billiardTimePriceingSlice = createSlice({
  name: "billiardTimePriceing",
  initialState: initialBilliardTimePriceingState,
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
    // getBilliardTimePriceingById  
    billiardTimePriceingFetched: (state, action) => {
      state.actionsLoading = false;
      state.billiardTimePriceingForEdit = action.payload.billiardTimePriceingForEdit;
      state.error = null;
    },
    // findBilliardTimePriceing  
    billiardTimePriceingFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createBilliardTimePriceing  
    billiardTimePriceingCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateBilliardTimePriceing  
    billiardTimePriceingUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.BilliardTimePriceingId === action.payload.billiardTimePriceing.BilliardTimePriceingId) {
          return action.payload.billiardTimePriceing;
        }
        return entity;
      });
    },
    // deleteBilliardTimePriceing  
    billiardTimePriceingDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.BilliardTimePriceingId !== action.payload.BilliardTimePriceingId  
      );
    },
    // deleteBilliardTimePriceing  
    billiardTimePriceingDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.BilliardTimePriceingId)  
      );
    },
    // billiardTimePriceingUpdateState  
    billiardTimePriceingStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.BilliardTimePriceingId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
