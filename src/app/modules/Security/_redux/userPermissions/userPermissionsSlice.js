import { createSlice } from "@reduxjs/toolkit";
const initialUserPermissionsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  userPermissionForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const userPermissionsSlice = createSlice({
  name: "userPermissions",
  initialState: initialUserPermissionsState,
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
    // getUserPermissionById
    userPermissionFetched: (state, action) => {
      state.actionsLoading = false;
      state.userPermissionForEdit = action.payload.userPermissionForEdit;
      state.error = null;
    },
    // findUserPermissions
    userPermissionsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createUserPermission
    userPermissionCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateUserPermission
    userPermissionUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.UserPermissionId ===
          action.payload.userPermission.UserPermissionId
        ) {
          return action.payload.userPermission;
        }
        return entity;
      });
    },
    // deleteUserPermission
    userPermissionDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.UserPermissionId !== action.payload.UserPermissionId
      );
    },
    // deleteUserPermissions
    userPermissionsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.UserPermissionId)
      );
    },
    // userPermissionsUpdateState
    userPermissionsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.UserPermissionId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
