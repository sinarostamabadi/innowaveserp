import { createSlice } from "@reduxjs/toolkit";
const initialOperationTypesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  operationTypeForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const operationTypesSlice = createSlice({
  name: "operationTypes",
  initialState: initialOperationTypesState,
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
    // getOperationTypeById
    operationTypeFetched: (state, action) => {
      state.actionsLoading = false;
      state.operationTypeForEdit = action.payload.operationTypeForEdit;
      state.error = null;
    },
    // findOperationTypes
    operationTypesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createOperationType
    operationTypeCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateOperationType
    operationTypeUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.OperationTypeId ===
          action.payload.operationType.OperationTypeId
        ) {
          return action.payload.operationType;
        }
        return entity;
      });
    },
    // deleteOperationType
    operationTypeDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.OperationTypeId !== action.payload.OperationTypeId
      );
    },
    // deleteOperationTypes
    operationTypesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.OperationTypeId)
      );
    },
    // operationTypesUpdateState
    operationTypesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.OperationTypeId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
