import { createSlice } from "@reduxjs/toolkit";
const initialRequestsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  requestForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const requestsSlice = createSlice({
  name: "requests",
  initialState: initialRequestsState,
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
    // getRequestById
    requestFetched: (state, action) => {
      state.actionsLoading = false;
      state.requestForEdit = action.payload.requestForEdit;
      state.error = null;
    },
    // findRequests
    requestsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createRequest
    requestCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateRequest
    requestUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.RequestId === action.payload.request.RequestId) {
          return action.payload.request;
        }
        return entity;
      });
    },
    // deleteRequest
    requestDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.RequestId !== action.payload.RequestId
      );
    },
    // deleteRequests
    requestsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.RequestId)
      );
    },
    // requestsUpdateState
    requestsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.RequestId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
