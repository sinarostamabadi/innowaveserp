import { createSlice } from "@reduxjs/toolkit";
const initialMenuItemAlbumsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  menuItemAlbumForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const menuItemAlbumsSlice = createSlice({
  name: "menuItemAlbums",
  initialState: initialMenuItemAlbumsState,
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
    // getMenuItemAlbumById
    menuItemAlbumFetched: (state, action) => {
      state.actionsLoading = false;
      state.menuItemAlbumForEdit = action.payload.menuItemAlbumForEdit;
      state.error = null;
    },
    // findMenuItemAlbums
    menuItemAlbumsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createMenuItemAlbum
    menuItemAlbumCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateMenuItemAlbum
    menuItemAlbumUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.MenuItemAlbumId ===
          action.payload.menuItemAlbum.MenuItemAlbumId
        ) {
          return action.payload.menuItemAlbum;
        }
        return entity;
      });
    },
    // deleteMenuItemAlbum
    menuItemAlbumDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.MenuItemAlbumId !== action.payload.MenuItemAlbumId
      );
    },
    // deleteMenuItemAlbums
    menuItemAlbumsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.MenuItemAlbumId)
      );
    },
    // menuItemAlbumsUpdateState
    menuItemAlbumsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.MenuItemAlbumId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
