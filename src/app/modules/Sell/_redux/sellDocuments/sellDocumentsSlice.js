import { createSlice } from "@reduxjs/toolkit";
const initialSellDocumentsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  sellDocumentForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const sellDocumentsSlice = createSlice({
  name: "sellDocuments",
  initialState: initialSellDocumentsState,
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
    // getSellDocumentById
    sellDocumentFetched: (state, action) => {
      state.actionsLoading = false;
      state.sellDocumentForEdit = action.payload.sellDocumentForEdit;
      state.error = null;
    },
    // findSellDocuments
    sellDocumentsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createSellDocument
    sellDocumentCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      if (!!state.entities) state.entities.push(action.payload);
      else {
        state.entities = [];
        state.entities.push(action.payload);
      }
    },
    // updateSellDocument
    sellDocumentUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;

      if (!!state.entities)
        state.entities = state.entities.map((entity) => {
          if (
            entity.SellDocumentId === action.payload.sellDocument.SellDocumentId
          ) {
            return action.payload.sellDocument;
          }
          return entity;
        });
    },
    // deleteSellDocument
    sellDocumentDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.SellDocumentId !== action.payload.SellDocumentId
      );
    },
    // deleteSellDocuments
    sellDocumentsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.SellDocumentId)
      );
    },
    // sellDocumentsUpdateState
    sellDocumentsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.SellDocumentId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
