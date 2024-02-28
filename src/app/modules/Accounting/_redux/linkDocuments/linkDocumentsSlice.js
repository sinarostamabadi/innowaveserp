import { createSlice } from "@reduxjs/toolkit";
const initialLinkDocumentsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  linkDocumentForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const linkDocumentsSlice = createSlice({
  name: "linkDocuments",
  initialState: initialLinkDocumentsState,
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
    // getLinkDocumentById
    linkDocumentFetched: (state, action) => {
      state.actionsLoading = false;
      state.linkDocumentForEdit = action.payload.linkDocumentForEdit;
      state.error = null;
    },
    // findLinkDocuments
    linkDocumentsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createLinkDocument
    linkDocumentCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateLinkDocument
    linkDocumentUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.LinkDocumentId === action.payload.linkDocument.LinkDocumentId
        ) {
          return action.payload.linkDocument;
        }
        return entity;
      });
    },
    // deleteLinkDocument
    linkDocumentDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.LinkDocumentId !== action.payload.LinkDocumentId
      );
    },
    // deleteLinkDocuments
    linkDocumentsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.LinkDocumentId)
      );
    },
    // linkDocumentsUpdateState
    linkDocumentsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.LinkDocumentId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
