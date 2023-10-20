
import { createSlice } from "@reduxjs/toolkit";
const initialOperationsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  operationForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const operationsSlice = createSlice({
  name: "operations",
  initialState: initialOperationsState,
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
    // getOperationById  
    operationFetched: (state, action) => {
      state.actionsLoading = false;
      state.operationForEdit = action.payload.operationForEdit;
      state.error = null;
    },
    // findOperations  
    operationsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createOperation  
    operationCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateOperation  
    operationUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.OperationId === action.payload.operation.OperationId) {
          return action.payload.operation;
        }
        return entity;
      });
    },
    // deleteOperation  
    operationDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.OperationId !== action.payload.OperationId  
      );
    },
    // deleteOperations  
    operationsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.OperationId)  
      );
    },
    // operationsUpdateState  
    operationsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.OperationId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
