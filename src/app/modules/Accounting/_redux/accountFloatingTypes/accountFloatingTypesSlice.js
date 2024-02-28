import { createSlice } from "@reduxjs/toolkit";
const initialAccountFloatingTypesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  accountFloatingTypeForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const accountFloatingTypesSlice = createSlice({
  name: "accountFloatingTypes",
  initialState: initialAccountFloatingTypesState,
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
    // getAccountFloatingTypeById
    accountFloatingTypeFetched: (state, action) => {
      state.actionsLoading = false;
      state.accountFloatingTypeForEdit =
        action.payload.accountFloatingTypeForEdit;
      state.error = null;
    },
    // findAccountFloatingTypes
    accountFloatingTypesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createAccountFloatingType
    accountFloatingTypeCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);

      return;
    },
    // updateAccountFloatingType
    accountFloatingTypeUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.AccountFloatingTypeId ===
          action.payload.accountFloatingType.AccountFloatingTypeId
        ) {
          return action.payload.accountFloatingType;
        }
        return entity;
      });

      return;
    },
    // deleteAccountFloatingType
    accountFloatingTypeDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) =>
          el.AccountFloatingTypeId !== action.payload.AccountFloatingTypeId
      );
    },
    // deleteAccountFloatingTypes
    accountFloatingTypesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.AccountFloatingTypeId)
      );
    },
    // accountFloatingTypesUpdateState
    accountFloatingTypesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.AccountFloatingTypeId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
