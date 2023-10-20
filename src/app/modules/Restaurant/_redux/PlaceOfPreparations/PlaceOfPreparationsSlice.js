
import { createSlice } from "@reduxjs/toolkit";
const initialPlaceOfPreparationsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  placeOfPreparationForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const placeOfPreparationsSlice = createSlice({
  name: "placeOfPreparations",
  initialState: initialPlaceOfPreparationsState,
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
    // getPlaceOfPreparationById  
    placeOfPreparationFetched: (state, action) => {
      state.actionsLoading = false;
      state.placeOfPreparationForEdit = action.payload.placeOfPreparationForEdit;
      state.error = null;
    },
    // findPlaceOfPreparations  
    placeOfPreparationsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createPlaceOfPreparation  
    placeOfPreparationCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updatePlaceOfPreparation  
    placeOfPreparationUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.PlaceOfPreparationId === action.payload.placeOfPreparation.PlaceOfPreparationId) {
          return action.payload.placeOfPreparation;
        }
        return entity;
      });
    },
    // deletePlaceOfPreparation  
    placeOfPreparationDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.PlaceOfPreparationId !== action.payload.PlaceOfPreparationId  
      );
    },
    // deletePlaceOfPreparations  
    placeOfPreparationsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.PlaceOfPreparationId)  
      );
    },
    // placeOfPreparationsUpdateState  
    placeOfPreparationsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.PlaceOfPreparationId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
