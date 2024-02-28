import { createSlice } from "@reduxjs/toolkit";
const initialChequeBooksState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  chequeBookForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const chequeBooksSlice = createSlice({
  name: "chequeBooks",
  initialState: initialChequeBooksState,
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
    // getChequeBookById
    chequeBookFetched: (state, action) => {
      state.actionsLoading = false;
      state.chequeBookForEdit = action.payload.chequeBookForEdit;
      state.error = null;
    },
    // findChequeBooks
    chequeBooksFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createChequeBook
    chequeBookCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.chequeBookForEdit = undefined;
      state.entities.push(action.payload);
      return;
    },
    // updateChequeBook
    chequeBookUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.ChequeBookId === action.payload.chequeBook.ChequeBookId) {
          return action.payload.chequeBook;
        }
        return entity;
      });
      return;
    },
    // deleteChequeBook
    chequeBookDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.chequeBookForEdit = undefined;
      state.entities = state.entities.filter(
        (el) => el.ChequeBookId !== action.payload.ChequeBookId
      );
    },
    // deleteChequeBooks
    chequeBooksDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.ChequeBookId)
      );
    },
    // chequeBooksUpdateState
    chequeBooksStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.ChequeBookId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
