
import { createSlice } from "@reduxjs/toolkit";
const initialBodyBuildingCentersState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  bodyBuildingCenterForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const bodyBuildingCentersSlice = createSlice({
  name: "bodyBuildingCenters",
  initialState: initialBodyBuildingCentersState,
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
    // getBodyBuildingCenterById  
    bodyBuildingCenterFetched: (state, action) => {
      state.actionsLoading = false;
      state.bodyBuildingCenterForEdit = action.payload.bodyBuildingCenterForEdit;
      state.error = null;
    },
    // findBodyBuildingCenters  
    bodyBuildingCentersFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createBodyBuildingCenter  
    bodyBuildingCenterCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateBodyBuildingCenter  
    bodyBuildingCenterUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.BodyBuildingCenterId === action.payload.bodyBuildingCenter.BodyBuildingCenterId) {
          return action.payload.bodyBuildingCenter;
        }
        return entity;
      });
    },
    // deleteBodyBuildingCenter  
    bodyBuildingCenterDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.BodyBuildingCenterId !== action.payload.BodyBuildingCenterId  
      );
    },
    // deleteBodyBuildingCenters  
    bodyBuildingCentersDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.BodyBuildingCenterId)  
      );
    },
    // bodyBuildingCentersUpdateState  
    bodyBuildingCentersStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.BodyBuildingCenterId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
