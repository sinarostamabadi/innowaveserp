
import { createSlice } from "@reduxjs/toolkit";
const initialNextOperationsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  nextOperationForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const nextOperationsSlice = createSlice({
  name: "nextOperations",
  initialState: initialNextOperationsState,
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
    // getNextOperationById  
    nextOperationFetched: (state, action) => {
      state.actionsLoading = false;
      state.nextOperationForEdit = action.payload.nextOperationForEdit;
      state.error = null;
    },
    // findNextOperations  
    nextOperationsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createNextOperation  
    nextOperationCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateNextOperation  
    nextOperationUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.NextOperationId === action.payload.nextOperation.NextOperationId) {
          return action.payload.nextOperation;
        }
        return entity;
      });
    },
    // deleteNextOperation  
    nextOperationDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.NextOperationId !== action.payload.NextOperationId  
      );
    },
    // deleteNextOperations  
    nextOperationsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.NextOperationId)  
      );
    },
    // nextOperationsUpdateState  
    nextOperationsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.NextOperationId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
