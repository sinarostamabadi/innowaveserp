import { createSlice } from "@reduxjs/toolkit";
const initialMarridationTypesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  marridationTypeForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const marridationTypesSlice = createSlice({
  name: "marridationTypes",
  initialState: initialMarridationTypesState,
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
    // getMarridationTypeById
    marridationTypeFetched: (state, action) => {
      state.actionsLoading = false;
      state.marridationTypeForEdit = action.payload.marridationTypeForEdit;
      state.error = null;
    },
    // findMarridationTypes
    marridationTypesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createMarridationType
    marridationTypeCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateMarridationType
    marridationTypeUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.MarridationTypeId ===
          action.payload.marridationType.MarridationTypeId
        ) {
          return action.payload.marridationType;
        }
        return entity;
      });
    },
    // deleteMarridationType
    marridationTypeDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.MarridationTypeId !== action.payload.MarridationTypeId
      );
    },
    // deleteMarridationTypes
    marridationTypesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.MarridationTypeId)
      );
    },
    // marridationTypesUpdateState
    marridationTypesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.MarridationTypeId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
