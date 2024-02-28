import { createSlice } from "@reduxjs/toolkit";
const initialUserInRolesesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  userInRolesForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const userInRolesesSlice = createSlice({
  name: "userInRoleses",
  initialState: initialUserInRolesesState,
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
    // getUserInRolesById
    userInRolesFetched: (state, action) => {
      state.actionsLoading = false;
      state.userInRolesForEdit = action.payload.userInRolesForEdit;
      state.error = null;
    },
    // findUserInRoleses
    userInRolesesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createUserInRoles
    userInRolesCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateUserInRoles
    userInRolesUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.UserInRolesId === action.payload.userInRoles.UserInRolesId) {
          return action.payload.userInRoles;
        }
        return entity;
      });
    },
    // deleteUserInRoles
    userInRolesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.UserInRolesId !== action.payload.UserInRolesId
      );
    },
    // deleteUserInRoleses
    userInRolesesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.UserInRolesId)
      );
    },
    // userInRolesesUpdateState
    userInRolesesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.UserInRolesId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
