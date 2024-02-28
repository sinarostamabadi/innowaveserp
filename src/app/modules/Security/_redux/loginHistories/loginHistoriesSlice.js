import { createSlice } from "@reduxjs/toolkit";
const initialLoginHistoriesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  loginHistoryForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const loginHistoriesSlice = createSlice({
  name: "loginHistories",
  initialState: initialLoginHistoriesState,
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
    // getLoginHistoryById
    loginHistoryFetched: (state, action) => {
      state.actionsLoading = false;
      state.loginHistoryForEdit = action.payload.loginHistoryForEdit;
      state.error = null;
    },
    // findLoginHistories
    loginHistoriesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createLoginHistory
    loginHistoryCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateLoginHistory
    loginHistoryUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.LoginHistoryId === action.payload.loginHistory.LoginHistoryId
        ) {
          return action.payload.loginHistory;
        }
        return entity;
      });
    },
    // deleteLoginHistory
    loginHistoryDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.LoginHistoryId !== action.payload.LoginHistoryId
      );
    },
    // deleteLoginHistories
    loginHistoriesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.LoginHistoryId)
      );
    },
    // loginHistoriesUpdateState
    loginHistoriesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.LoginHistoryId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
