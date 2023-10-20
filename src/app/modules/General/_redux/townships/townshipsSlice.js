
import { createSlice } from "@reduxjs/toolkit";
const initialTownshipsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  townshipForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const townshipsSlice = createSlice({
  name: "townships",
  initialState: initialTownshipsState,
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
    // getTownshipById  
    townshipFetched: (state, action) => {
      state.actionsLoading = false;
      state.townshipForEdit = action.payload.townshipForEdit;
      state.error = null;
    },
    // findTownships  
    townshipsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createTownship  
    townshipCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateTownship  
    townshipUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.TownshipId === action.payload.township.TownshipId) {
          return action.payload.township;
        }
        return entity;
      });
    },
    // deleteTownship  
    townshipDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.TownshipId !== action.payload.TownshipId  
      );
    },
    // deleteTownships  
    townshipsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.TownshipId)  
      );
    },
    // townshipsUpdateState  
    townshipsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.TownshipId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
