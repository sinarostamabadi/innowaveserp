
import { createSlice } from "@reduxjs/toolkit";
const initialDocumentRequestsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  documentRequestForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const documentRequestsSlice = createSlice({
  name: "documentRequests",
  initialState: initialDocumentRequestsState,
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
    // getDocumentRequestById  
    documentRequestFetched: (state, action) => {
      state.actionsLoading = false;
      state.documentRequestForEdit = action.payload.documentRequestForEdit;
      state.error = null;
    },
    // findDocumentRequests  
    documentRequestsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createDocumentRequest  
    documentRequestCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateDocumentRequest  
    documentRequestUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.DocumentRequestId === action.payload.documentRequest.DocumentRequestId) {
          return action.payload.documentRequest;
        }
        return entity;
      });
    },
    // deleteDocumentRequest  
    documentRequestDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.DocumentRequestId !== action.payload.DocumentRequestId  
      );
    },
    // deleteDocumentRequests  
    documentRequestsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.DocumentRequestId)  
      );
    },
    // documentRequestsUpdateState  
    documentRequestsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.DocumentRequestId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
