
import { createSlice } from "@reduxjs/toolkit";
const initialDocumentDtlsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  documentDtlForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const documentDtlsSlice = createSlice({
  name: "documentDtls",
  initialState: initialDocumentDtlsState,
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
    // getDocumentDtlById  
    documentDtlFetched: (state, action) => {
      state.actionsLoading = false;
      state.documentDtlForEdit = action.payload.documentDtlForEdit;
      state.error = null;
    },
    // findDocumentDtls  
    documentDtlsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createDocumentDtl  
    documentDtlCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateDocumentDtl  
    documentDtlUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.DocumentDtlId === action.payload.documentDtl.DocumentDtlId) {
          return action.payload.documentDtl;
        }
        return entity;
      });
    },
    // deleteDocumentDtl  
    documentDtlDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.DocumentDtlId !== action.payload.DocumentDtlId  
      );
    },
    // deleteDocumentDtls  
    documentDtlsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.DocumentDtlId)  
      );
    },
    // documentDtlsUpdateState  
    documentDtlsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.DocumentDtlId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
