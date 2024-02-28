import { createSlice } from "@reduxjs/toolkit";
const initialAccountFloatingGroupsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  accountFloatingGroupForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const accountFloatingGroupsSlice = createSlice({
  name: "accountFloatingGroups",
  initialState: initialAccountFloatingGroupsState,
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
    // getAccountFloatingGroupById
    accountFloatingGroupFetched: (state, action) => {
      state.actionsLoading = false;
      state.accountFloatingGroupForEdit =
        action.payload.accountFloatingGroupForEdit;
      state.error = null;
    },
    // findAccountFloatingGroups
    accountFloatingGroupsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createAccountFloatingGroup
    accountFloatingGroupCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);

      return;
    },
    // updateAccountFloatingGroup
    accountFloatingGroupUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.AccountFloatingGroupId ===
          action.payload.accountFloatingGroup.AccountFloatingGroupId
        ) {
          return action.payload.accountFloatingGroup;
        }
        return entity;
      });

      return;
    },
    // deleteAccountFloatingGroup
    accountFloatingGroupDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) =>
          el.AccountFloatingGroupId !== action.payload.AccountFloatingGroupId
      );
    },
    // deleteAccountFloatingGroups
    accountFloatingGroupsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.AccountFloatingGroupId)
      );
    },
    // accountFloatingGroupsUpdateState
    accountFloatingGroupsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.AccountFloatingGroupId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
