import { createSlice } from "@reduxjs/toolkit";
const initialRestaurantMenuItemsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  restaurantMenuItemForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const restaurantMenuItemsSlice = createSlice({
  name: "restaurantMenuItems",
  initialState: initialRestaurantMenuItemsState,
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
    // getRestaurantMenuItemById
    restaurantMenuItemFetched: (state, action) => {
      state.actionsLoading = false;
      state.restaurantMenuItemForEdit =
        action.payload.restaurantMenuItemForEdit;
      state.error = null;
    },
    // findRestaurantMenuItems
    restaurantMenuItemsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createRestaurantMenuItem
    restaurantMenuItemCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateRestaurantMenuItem
    restaurantMenuItemUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.RestaurantMenuItemId ===
          action.payload.restaurantMenuItem.RestaurantMenuItemId
        ) {
          return action.payload.restaurantMenuItem;
        }
        return entity;
      });
    },
    // deleteRestaurantMenuItem
    restaurantMenuItemDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.RestaurantMenuItemId !== action.payload.RestaurantMenuItemId
      );
    },
    // deleteRestaurantMenuItems
    restaurantMenuItemsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.RestaurantMenuItemId)
      );
    },
    // restaurantMenuItemsUpdateState
    restaurantMenuItemsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.RestaurantMenuItemId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
