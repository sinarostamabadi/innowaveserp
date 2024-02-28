import { createSlice } from "@reduxjs/toolkit";
const initialDocumentsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: [],
  documentForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const documentsSlice = createSlice({
  name: "documents",
  initialState: initialDocumentsState,
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
    // getDocumentById
    documentFetched: (state, action) => {
      state.actionsLoading = false;
      state.documentForEdit = action.payload.documentForEdit;
      state.error = null;
    },
    // findDocuments
    documentsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createDocument
    documentCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateDocument
    documentUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.DocumentId === action.payload.document.DocumentId) {
          return action.payload.document;
        }
        return entity;
      });
    },
    // deleteDocument
    documentDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.DocumentId !== action.payload.DocumentId
      );
    },
    // deleteDocuments
    documentsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.DocumentId)
      );
    },
    // documentsUpdateState
    documentsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.DocumentId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
