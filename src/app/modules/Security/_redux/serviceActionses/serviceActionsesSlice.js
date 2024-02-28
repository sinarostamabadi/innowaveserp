import { createSlice } from "@reduxjs/toolkit";
const initialServiceActionsesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  serviceActionsForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const serviceActionsesSlice = createSlice({
  name: "serviceActionses",
  initialState: initialServiceActionsesState,
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
    // getServiceActionsById
    serviceActionsFetched: (state, action) => {
      state.actionsLoading = false;
      state.serviceActionsForEdit = action.payload.serviceActionsForEdit;
      state.error = null;
    },
    // findServiceActionses
    serviceActionsesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createServiceActions
    serviceActionsCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateServiceActions
    serviceActionsUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.ServiceActionsId ===
          action.payload.serviceActions.ServiceActionsId
        ) {
          return action.payload.serviceActions;
        }
        return entity;
      });
    },
    // deleteServiceActions
    serviceActionsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.ServiceActionsId !== action.payload.ServiceActionsId
      );
    },
    // deleteServiceActionses
    serviceActionsesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.ServiceActionsId)
      );
    },
    // serviceActionsesUpdateState
    serviceActionsesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.ServiceActionsId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
