import { createSlice } from "@reduxjs/toolkit";
const initialRolesesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  rolesForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const rolesesSlice = createSlice({
  name: "roleses",
  initialState: initialRolesesState,
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
    // getRolesById
    rolesFetched: (state, action) => {
      state.actionsLoading = false;
      state.rolesForEdit = action.payload.rolesForEdit;
      state.error = null;
    },
    // findRoleses
    rolesesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createRoles
    rolesCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateRoles
    rolesUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.RolesId === action.payload.roles.RolesId) {
          return action.payload.roles;
        }
        return entity;
      });
    },
    // deleteRoles
    rolesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.RolesId !== action.payload.RolesId
      );
    },
    // deleteRoleses
    rolesesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.RolesId)
      );
    },
    // rolesesUpdateState
    rolesesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.RolesId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
