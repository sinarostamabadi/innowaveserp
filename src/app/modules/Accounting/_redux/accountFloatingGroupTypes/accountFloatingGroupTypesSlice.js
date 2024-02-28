import { createSlice } from "@reduxjs/toolkit";
const initialAccountFloatingGroupTypesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  accountFloatingGroupTypeForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const accountFloatingGroupTypesSlice = createSlice({
  name: "accountFloatingGroupTypes",
  initialState: initialAccountFloatingGroupTypesState,
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
    // getAccountFloatingGroupTypeById
    accountFloatingGroupTypeFetched: (state, action) => {
      state.actionsLoading = false;
      state.accountFloatingGroupTypeForEdit =
        action.payload.accountFloatingGroupTypeForEdit;
      state.error = null;
    },
    // findAccountFloatingGroupTypes
    accountFloatingGroupTypesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createAccountFloatingGroupType
    accountFloatingGroupTypeCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);

      return;
    },
    // updateAccountFloatingGroupType
    accountFloatingGroupTypeUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.AccountFloatingGroupTypeId ===
          action.payload.accountFloatingGroupType.AccountFloatingGroupTypeId
        ) {
          return action.payload.accountFloatingGroupType;
        }
        return entity;
      });

      return;
    },
    // deleteAccountFloatingGroupType
    accountFloatingGroupTypeDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) =>
          el.AccountFloatingGroupTypeId !==
          action.payload.AccountFloatingGroupTypeId
      );
    },
    // deleteAccountFloatingGroupTypes
    accountFloatingGroupTypesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.AccountFloatingGroupTypeId)
      );
    },
    // accountFloatingGroupTypesUpdateState
    accountFloatingGroupTypesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (
          ids.findIndex((id) => id === entity.AccountFloatingGroupTypeId) > -1
        ) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
