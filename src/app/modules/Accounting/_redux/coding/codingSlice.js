
import { createSlice } from "@reduxjs/toolkit";
const initialCodingState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  codingForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const codingSlice = createSlice({
  name: "coding",
  initialState: initialCodingState,
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
    // getCodingById  
    codingFetched: (state, action) => {
      state.actionsLoading = false;
      state.codingForEdit = action.payload.codingForEdit;
      state.error = null;
    },
    // findCoding  
    codingFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createCoding  
    codingCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateCoding  
    codingUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.CodingId === action.payload.coding.CodingId) {
          return action.payload.coding;
        }
        return entity;
      });
    },
    // deleteCoding  
    codingDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.CodingId !== action.payload.CodingId  
      );
    },
    // deleteCoding  
    codingDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.CodingId)  
      );
    },
    // codingUpdateState  
    codingStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.CodingId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
