import { createSlice } from "@reduxjs/toolkit";
const initialRestaurantMenuItemAlbumsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  restaurantMenuItemAlbumForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const restaurantMenuItemAlbumsSlice = createSlice({
  name: "restaurantMenuItemAlbums",
  initialState: initialRestaurantMenuItemAlbumsState,
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
    // getRestaurantMenuItemAlbumById
    restaurantMenuItemAlbumFetched: (state, action) => {
      state.actionsLoading = false;
      state.restaurantMenuItemAlbumForEdit =
        action.payload.restaurantMenuItemAlbumForEdit;
      state.error = null;
    },
    // findRestaurantMenuItemAlbums
    restaurantMenuItemAlbumsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createRestaurantMenuItemAlbum
    restaurantMenuItemAlbumCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateRestaurantMenuItemAlbum
    restaurantMenuItemAlbumUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.RestaurantMenuItemAlbumId ===
          action.payload.restaurantMenuItemAlbum.RestaurantMenuItemAlbumId
        ) {
          return action.payload.restaurantMenuItemAlbum;
        }
        return entity;
      });
    },
    // deleteRestaurantMenuItemAlbum
    restaurantMenuItemAlbumDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) =>
          el.RestaurantMenuItemAlbumId !==
          action.payload.RestaurantMenuItemAlbumId
      );
    },
    // deleteRestaurantMenuItemAlbums
    restaurantMenuItemAlbumsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.RestaurantMenuItemAlbumId)
      );
    },
    // restaurantMenuItemAlbumsUpdateState
    restaurantMenuItemAlbumsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (
          ids.findIndex((id) => id === entity.RestaurantMenuItemAlbumId) > -1
        ) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
