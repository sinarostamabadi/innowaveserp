
import { createSlice } from "@reduxjs/toolkit";
const initialFutsalTimingState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  futsalTimingForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const futsalTimingSlice = createSlice({
  name: "futsalTiming",
  initialState: initialFutsalTimingState,
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
    // getFutsalTimingById  
    futsalTimingFetched: (state, action) => {
      state.actionsLoading = false;
      state.futsalTimingForEdit = action.payload.futsalTimingForEdit;
      state.error = null;
    },
    // findFutsalTiming  
    futsalTimingsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createFutsalTiming  
    futsalTimingCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateFutsalTiming  
    futsalTimingUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.FutsalTimingId === action.payload.futsalTiming.FutsalTimingId) {
          return action.payload.futsalTiming;
        }
        return entity;
      });
    },
    // deleteFutsalTiming  
    futsalTimingDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.FutsalTimingId !== action.payload.FutsalTimingId  
      );
    },
    // deleteFutsalTiming  
    futsalTimingsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.FutsalTimingId)  
      );
    },
    // futsalTimingUpdateState  
    futsalTimingStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.FutsalTimingId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
