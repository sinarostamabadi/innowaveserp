import { createSlice } from "@reduxjs/toolkit";
const initialErrorHandlersState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  errorHandlerForEdit: undefined,
  lastError: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const errorHandlersSlice = createSlice({
  name: "errorHandlers",
  initialState: initialErrorHandlersState,
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
    // getErrorHandlerById  
    errorHandlerFetched: (state, action) => {
      state.actionsLoading = false;
      state.errorHandlerForEdit = action.payload.errorHandlerForEdit;
      state.error = null;
    },
    // findErrorHandlers  
    errorHandlersFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createErrorHandler  
    errorHandlerCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateErrorHandler  
    errorHandlerUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.ErrorHandlerId === action.payload.errorHandler.ErrorHandlerId) {
          return action.payload.errorHandler;
        }
        return entity;
      });
    },
    // deleteErrorHandler  
    errorHandlerDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.ErrorHandlerId !== action.payload.ErrorHandlerId  
      );
    },
    // deleteErrorHandlers  
    errorHandlersDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.ErrorHandlerId)  
      );
    },
    // errorHandlersUpdateState  
    errorHandlersStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.ErrorHandlerId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
