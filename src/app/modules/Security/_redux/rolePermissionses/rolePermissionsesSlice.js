import { createSlice } from "@reduxjs/toolkit";
const initialRolePermissionsesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  rolePermissionsForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const rolePermissionsesSlice = createSlice({
  name: "rolePermissionses",
  initialState: initialRolePermissionsesState,
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
    // getRolePermissionsById
    rolePermissionsFetched: (state, action) => {
      state.actionsLoading = false;
      state.rolePermissionsForEdit = action.payload.rolePermissionsForEdit;
      state.error = null;
    },
    // findRolePermissionses
    rolePermissionsesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createRolePermissions
    rolePermissionsCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateRolePermissions
    rolePermissionsUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.RolePermissionsId ===
          action.payload.rolePermissions.RolePermissionsId
        ) {
          return action.payload.rolePermissions;
        }
        return entity;
      });
    },
    // deleteRolePermissions
    rolePermissionsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.RolePermissionsId !== action.payload.RolePermissionsId
      );
    },
    // deleteRolePermissionses
    rolePermissionsesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.RolePermissionsId)
      );
    },
    // rolePermissionsesUpdateState
    rolePermissionsesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.RolePermissionsId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
