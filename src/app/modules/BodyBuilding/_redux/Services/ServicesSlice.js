
import { createSlice } from "@reduxjs/toolkit";
const initialServicesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  serviceForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const servicesSlice = createSlice({
  name: "services",
  initialState: initialServicesState,
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
    // getServiceById  
    serviceFetched: (state, action) => {
      state.actionsLoading = false;
      state.serviceForEdit = action.payload.serviceForEdit;
      state.error = null;
    },
    // findServices  
    servicesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createService  
    serviceCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateService  
    serviceUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.BodyBuildingServiceId === action.payload.service.BodyBuildingServiceId) {
          return action.payload.service;
        }
        return entity;
      });
    },
    // deleteService  
    serviceDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.BodyBuildingServiceId !== action.payload.BodyBuildingServiceId  
      );
    },
    // deleteServices  
    servicesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.BodyBuildingServiceId)  
      );
    },
    // servicesUpdateState  
    servicesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.BodyBuildingServiceId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
