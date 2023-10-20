
import { createSlice } from "@reduxjs/toolkit";
const initialMassageTimePriceingState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  massageTimePriceingForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const massageTimePriceingSlice = createSlice({
  name: "massageTimePriceing",
  initialState: initialMassageTimePriceingState,
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
    // getMassageTimePriceingById  
    massageTimePriceingFetched: (state, action) => {
      state.actionsLoading = false;
      state.massageTimePriceingForEdit = action.payload.massageTimePriceingForEdit;
      state.error = null;
    },
    // findMassageTimePriceing  
    massageTimePriceingFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createMassageTimePriceing  
    massageTimePriceingCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateMassageTimePriceing  
    massageTimePriceingUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.MassageTimePriceingId === action.payload.massageTimePriceing.MassageTimePriceingId) {
          return action.payload.massageTimePriceing;
        }
        return entity;
      });
    },
    // deleteMassageTimePriceing  
    massageTimePriceingDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.MassageTimePriceingId !== action.payload.MassageTimePriceingId  
      );
    },
    // deleteMassageTimePriceing  
    massageTimePriceingDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.MassageTimePriceingId)  
      );
    },
    // massageTimePriceingUpdateState  
    massageTimePriceingStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.MassageTimePriceingId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
