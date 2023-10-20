
import { createSlice } from "@reduxjs/toolkit";
const initialMenuItemsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  menuItemForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const menuItemsSlice = createSlice({
  name: "menuItems",
  initialState: initialMenuItemsState,
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
    // getMenuItemById  
    menuItemFetched: (state, action) => {
      state.actionsLoading = false;
      state.menuItemForEdit = action.payload.menuItemForEdit;
      state.error = null;
    },
    // findMenuItems  
    menuItemsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createMenuItem  
    menuItemCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateMenuItem  
    menuItemUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.MenuItemId === action.payload.menuItem.MenuItemId) {
          return action.payload.menuItem;
        }
        return entity;
      });
    },
    // deleteMenuItem  
    menuItemDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.MenuItemId !== action.payload.MenuItemId  
      );
    },
    // deleteMenuItems  
    menuItemsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.MenuItemId)  
      );
    },
    // menuItemsUpdateState  
    menuItemsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.MenuItemId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
