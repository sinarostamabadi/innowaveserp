
import { createSlice } from "@reduxjs/toolkit";
const initialFutsalTimePriceingState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  futsalTimePriceingForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const futsalTimePriceingSlice = createSlice({
  name: "futsalTimePriceing",
  initialState: initialFutsalTimePriceingState,
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
    // getFutsalTimePriceingById  
    futsalTimePriceingFetched: (state, action) => {
      state.actionsLoading = false;
      state.futsalTimePriceingForEdit = action.payload.futsalTimePriceingForEdit;
      state.error = null;
    },
    // findFutsalTimePriceing  
    futsalTimePriceingsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createFutsalTimePriceing  
    futsalTimePriceingCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateFutsalTimePriceing  
    futsalTimePriceingUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.FutsalTimePriceingId === action.payload.futsalTimePriceing.FutsalTimePriceingId) {
          return action.payload.futsalTimePriceing;
        }
        return entity;
      });
    },
    // deleteFutsalTimePriceing  
    futsalTimePriceingDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.FutsalTimePriceingId !== action.payload.FutsalTimePriceingId  
      );
    },
    // deleteFutsalTimePriceing  
    futsalTimePriceingsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.FutsalTimePriceingId)  
      );
    },
    // futsalTimePriceingUpdateState  
    futsalTimePriceingStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.FutsalTimePriceingId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
