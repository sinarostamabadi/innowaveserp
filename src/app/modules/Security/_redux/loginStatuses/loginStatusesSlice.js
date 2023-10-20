
import { createSlice } from "@reduxjs/toolkit";
const initialLoginStatusesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  loginStatusForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const loginStatusesSlice = createSlice({
  name: "loginStatuses",
  initialState: initialLoginStatusesState,
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
    // getLoginStatusById  
    loginStatusFetched: (state, action) => {
      state.actionsLoading = false;
      state.loginStatusForEdit = action.payload.loginStatusForEdit;
      state.error = null;
    },
    // findLoginStatuses  
    loginStatusesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createLoginStatus  
    loginStatusCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateLoginStatus  
    loginStatusUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.LoginStatusId === action.payload.loginStatus.LoginStatusId) {
          return action.payload.loginStatus;
        }
        return entity;
      });
    },
    // deleteLoginStatus  
    loginStatusDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.LoginStatusId !== action.payload.LoginStatusId  
      );
    },
    // deleteLoginStatuses  
    loginStatusesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.LoginStatusId)  
      );
    },
    // loginStatusesUpdateState  
    loginStatusesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.LoginStatusId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});