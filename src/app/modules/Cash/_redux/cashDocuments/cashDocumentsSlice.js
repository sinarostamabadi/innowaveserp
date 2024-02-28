import { createSlice } from "@reduxjs/toolkit";
const initialCashDocumentsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  cashDocumentForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const cashDocumentsSlice = createSlice({
  name: "cashDocuments",
  initialState: initialCashDocumentsState,
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
    // getCashDocumentById
    cashDocumentFetched: (state, action) => {
      state.actionsLoading = false;
      state.cashDocumentForEdit = action.payload.cashDocumentForEdit;
      state.error = null;
    },
    // findCashDocuments
    cashDocumentsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createCashDocument
    cashDocumentCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateCashDocument
    cashDocumentUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.CashDocumentId === action.payload.cashDocument.CashDocumentId
        ) {
          return action.payload.cashDocument;
        }
        return entity;
      });
    },
    // deleteCashDocument
    cashDocumentDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.CashDocumentId !== action.payload.CashDocumentId
      );
    },
    // deleteCashDocuments
    cashDocumentsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.CashDocumentId)
      );
    },
    // cashDocumentsUpdateState
    cashDocumentsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.CashDocumentId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
