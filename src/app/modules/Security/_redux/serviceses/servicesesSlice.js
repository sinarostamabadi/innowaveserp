import { createSlice } from "@reduxjs/toolkit";
const initialServicesesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  servicesForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const servicesesSlice = createSlice({
  name: "serviceses",
  initialState: initialServicesesState,
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
    // getServicesById
    servicesFetched: (state, action) => {
      state.actionsLoading = false;
      state.servicesForEdit = action.payload.servicesForEdit;
      state.error = null;
    },
    // findServiceses
    servicesesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createServices
    servicesCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateServices
    servicesUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.ServicesId === action.payload.services.ServicesId) {
          return action.payload.services;
        }
        return entity;
      });
    },
    // deleteServices
    servicesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.ServicesId !== action.payload.ServicesId
      );
    },
    // deleteServiceses
    servicesesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.ServicesId)
      );
    },
    // servicesesUpdateState
    servicesesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.ServicesId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
