
import { createSlice } from "@reduxjs/toolkit";
const initialTakeAwayRequestsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  takeAwayRequestForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const takeAwayRequestsSlice = createSlice({
  name: "takeAwayRequests",
  initialState: initialTakeAwayRequestsState,
  reducers: {
    catchError: (state, action) => {
      state.error = action.payload.error.message;
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
    // getTakeAwayRequestById  
    takeAwayRequestFetched: (state, action) => {
      state.actionsLoading = false;
      state.takeAwayRequestForEdit = action.payload.takeAwayRequestForEdit;
      state.error = null;
    },
    // findTakeAwayRequests  
    takeAwayRequestsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
      state.takeAwayRequestForEdit = undefined;
    },
    // createTakeAwayRequest  
    takeAwayRequestCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.takeAwayRequestForEdit = undefined;
      state.entities.push(action.payload);
    },
    // updateTakeAwayRequest  
    takeAwayRequestUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.takeAwayRequestForEdit = undefined;
      state.entities = state.entities.map((entity) => {
        if (entity.TakeAwayRequestId === action.payload.takeAwayRequest.TakeAwayRequestId) {
          return action.payload.takeAwayRequest;
        }
        return entity;
      });
    },
    // deleteTakeAwayRequest  
    takeAwayRequestDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.TakeAwayRequestId !== action.payload.TakeAwayRequestId  
      );
    },
    // deleteTakeAwayRequests  
    takeAwayRequestsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.TakeAwayRequestId)  
      );
    },
    // takeAwayRequestsUpdateState  
    takeAwayRequestsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.TakeAwayRequestId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
