import { createSlice } from "@reduxjs/toolkit";
const initialIODeviceTransactionTypesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  iODeviceTransactionTypeForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const iODeviceTransactionTypesSlice = createSlice({
  name: "iODeviceTransactionTypes",
  initialState: initialIODeviceTransactionTypesState,
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
    // getIODeviceTransactionTypeById
    iODeviceTransactionTypeFetched: (state, action) => {
      state.actionsLoading = false;
      state.iODeviceTransactionTypeForEdit =
        action.payload.iODeviceTransactionTypeForEdit;
      state.error = null;
    },
    // findIODeviceTransactionTypes
    iODeviceTransactionTypesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createIODeviceTransactionType
    iODeviceTransactionTypeCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateIODeviceTransactionType
    iODeviceTransactionTypeUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.IODeviceTransactionTypeId ===
          action.payload.iODeviceTransactionType.IODeviceTransactionTypeId
        ) {
          return action.payload.iODeviceTransactionType;
        }
        return entity;
      });
    },
    // deleteIODeviceTransactionType
    iODeviceTransactionTypeDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) =>
          el.IODeviceTransactionTypeId !==
          action.payload.IODeviceTransactionTypeId
      );
    },
    // deleteIODeviceTransactionTypes
    iODeviceTransactionTypesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.IODeviceTransactionTypeId)
      );
    },
    // iODeviceTransactionTypesUpdateState
    iODeviceTransactionTypesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (
          ids.findIndex((id) => id === entity.IODeviceTransactionTypeId) > -1
        ) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
