import { createSlice } from "@reduxjs/toolkit";
const initialAccountFloatingsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  accountFloatingForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const accountFloatingsSlice = createSlice({
  name: "accountFloatings",
  initialState: initialAccountFloatingsState,
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
    // getAccountFloatingById
    accountFloatingFetched: (state, action) => {
      state.actionsLoading = false;
      state.accountFloatingForEdit = action.payload.accountFloatingForEdit;
      state.error = null;
    },
    // findAccountFloating
    accountFloatingsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createAccountFloating
    accountFloatingCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);

      return;
    },
    // updateAccountFloating
    accountFloatingUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.AccountFloatingId ===
          action.payload.accountFloating.AccountFloatingId
        ) {
          return action.payload.accountFloating;
        }
        return entity;
      });

      return;
    },
    // deleteAccountFloating
    accountFloatingDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.AccountFloatingId !== action.payload.AccountFloatingId
      );
    },
    // deleteAccountFloating
    accountFloatingsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.AccountFloatingId)
      );
    },
    // accountFloatingUpdateState
    accountFloatingStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.AccountFloatingId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
