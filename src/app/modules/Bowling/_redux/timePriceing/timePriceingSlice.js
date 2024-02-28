import { createSlice } from "@reduxjs/toolkit";
const initialTimePriceingState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  timePriceingForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const timePriceingSlice = createSlice({
  name: "timePriceing",
  initialState: initialTimePriceingState,
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
    // getTimePriceingById
    timePriceingFetched: (state, action) => {
      state.actionsLoading = false;
      state.timePriceingForEdit = action.payload.timePriceingForEdit;
      state.error = null;
    },
    // findTimePriceing
    timePriceingsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createTimePriceing
    timePriceingCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateTimePriceing
    timePriceingUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.TimePriceingId === action.payload.timePriceing.TimePriceingId
        ) {
          return action.payload.timePriceing;
        }
        return entity;
      });
    },
    // deleteTimePriceing
    timePriceingDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.TimePriceingId !== action.payload.TimePriceingId
      );
    },
    // deleteTimePriceing
    timePriceingsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.TimePriceingId)
      );
    },
    // timePriceingUpdateState
    timePriceingStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.TimePriceingId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
