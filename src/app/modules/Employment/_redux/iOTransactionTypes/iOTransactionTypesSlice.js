import { createSlice } from "@reduxjs/toolkit";
const initialIOTransactionTypesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  iOTransactionTypeForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const iOTransactionTypesSlice = createSlice({
  name: "iOTransactionTypes",
  initialState: initialIOTransactionTypesState,
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
    // getIOTransactionTypeById
    iOTransactionTypeFetched: (state, action) => {
      state.actionsLoading = false;
      state.iOTransactionTypeForEdit = action.payload.iOTransactionTypeForEdit;
      state.error = null;
    },
    // findIOTransactionTypes
    iOTransactionTypesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createIOTransactionType
    iOTransactionTypeCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateIOTransactionType
    iOTransactionTypeUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.IOTransactionTypeId ===
          action.payload.iOTransactionType.IOTransactionTypeId
        ) {
          return action.payload.iOTransactionType;
        }
        return entity;
      });
    },
    // deleteIOTransactionType
    iOTransactionTypeDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.IOTransactionTypeId !== action.payload.IOTransactionTypeId
      );
    },
    // deleteIOTransactionTypes
    iOTransactionTypesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.IOTransactionTypeId)
      );
    },
    // iOTransactionTypesUpdateState
    iOTransactionTypesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.IOTransactionTypeId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
