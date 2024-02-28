import { createSlice } from "@reduxjs/toolkit";
const initialFutsalCentersState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  futsalCenterForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const futsalCentersSlice = createSlice({
  name: "futsalCenters",
  initialState: initialFutsalCentersState,
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
    // getFutsalCenterById
    futsalCenterFetched: (state, action) => {
      state.actionsLoading = false;
      state.futsalCenterForEdit = action.payload.futsalCenterForEdit;
      state.error = null;
    },
    // findFutsalCenters
    futsalCentersFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createFutsalCenter
    futsalCenterCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateFutsalCenter
    futsalCenterUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.FutsalCenterId === action.payload.futsalCenter.FutsalCenterId
        ) {
          return action.payload.futsalCenter;
        }
        return entity;
      });
    },
    // deleteFutsalCenter
    futsalCenterDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.FutsalCenterId !== action.payload.FutsalCenterId
      );
    },
    // deleteFutsalCenters
    futsalCentersDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.FutsalCenterId)
      );
    },
    // futsalCentersUpdateState
    futsalCentersStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.FutsalCenterId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
