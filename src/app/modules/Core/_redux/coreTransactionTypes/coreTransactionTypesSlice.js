import { createSlice } from "@reduxjs/toolkit";
const initialCoreTransactionTypesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  coreTransactionTypeForEdit: undefined,
  lastError: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const coreTransactionTypesSlice = createSlice({
  name: "coreTransactionTypes",
  initialState: initialCoreTransactionTypesState,
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
    // getCoreTransactionTypeById
    coreTransactionTypeFetched: (state, action) => {
      state.actionsLoading = false;
      state.coreTransactionTypeForEdit =
        action.payload.coreTransactionTypeForEdit;
      state.error = null;
    },
    // findCoreTransactionTypes
    coreTransactionTypesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createCoreTransactionType
    coreTransactionTypeCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateCoreTransactionType
    coreTransactionTypeUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.CoreTransactionTypeId ===
          action.payload.coreTransactionType.CoreTransactionTypeId
        ) {
          return action.payload.coreTransactionType;
        }
        return entity;
      });
    },
    // deleteCoreTransactionType
    coreTransactionTypeDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) =>
          el.CoreTransactionTypeId !== action.payload.CoreTransactionTypeId
      );
    },
    // deleteCoreTransactionTypes
    coreTransactionTypesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.CoreTransactionTypeId)
      );
    },
    // coreTransactionTypesUpdateState
    coreTransactionTypesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.CoreTransactionTypeId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
