import { createSlice } from "@reduxjs/toolkit";
const initialMenuGroupsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  menuGroupForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const menuGroupsSlice = createSlice({
  name: "menuGroups",
  initialState: initialMenuGroupsState,
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
    // getMenuGroupById
    menuGroupFetched: (state, action) => {
      state.actionsLoading = false;
      state.menuGroupForEdit = action.payload.menuGroupForEdit;
      state.error = null;
    },
    // findMenuGroups
    menuGroupsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createMenuGroup
    menuGroupCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateMenuGroup
    menuGroupUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.MenuGroupId === action.payload.menuGroup.MenuGroupId) {
          return action.payload.menuGroup;
        }
        return entity;
      });
    },
    // deleteMenuGroup
    menuGroupDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.MenuGroupId !== action.payload.MenuGroupId
      );
    },
    // deleteMenuGroups
    menuGroupsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.MenuGroupId)
      );
    },
    // menuGroupsUpdateState
    menuGroupsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.MenuGroupId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
