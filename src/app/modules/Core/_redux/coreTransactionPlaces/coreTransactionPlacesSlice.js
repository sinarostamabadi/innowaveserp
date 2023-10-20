import { createSlice } from "@reduxjs/toolkit";
const initialCoreTransactionPlacesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  coreTransactionPlaceForEdit: undefined,
  lastError: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const coreTransactionPlacesSlice = createSlice({
  name: "coreTransactionPlaces",
  initialState: initialCoreTransactionPlacesState,
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
    // getCoreTransactionPlaceById  
    coreTransactionPlaceFetched: (state, action) => {
      state.actionsLoading = false;
      state.coreTransactionPlaceForEdit = action.payload.coreTransactionPlaceForEdit;
      state.error = null;
    },
    // findCoreTransactionPlaces  
    coreTransactionPlacesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createCoreTransactionPlace  
    coreTransactionPlaceCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateCoreTransactionPlace  
    coreTransactionPlaceUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.CoreTransactionPlaceId === action.payload.coreTransactionPlace.CoreTransactionPlaceId) {
          return action.payload.coreTransactionPlace;
        }
        return entity;
      });
    },
    // deleteCoreTransactionPlace  
    coreTransactionPlaceDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.CoreTransactionPlaceId !== action.payload.CoreTransactionPlaceId  
      );
    },
    // deleteCoreTransactionPlaces  
    coreTransactionPlacesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.CoreTransactionPlaceId)  
      );
    },
    // coreTransactionPlacesUpdateState  
    coreTransactionPlacesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.CoreTransactionPlaceId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
