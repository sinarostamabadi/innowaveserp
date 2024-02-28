import { createSlice } from "@reduxjs/toolkit";
const initialRestaurantMenuGroupsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  restaurantMenuGroupForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const restaurantMenuGroupsSlice = createSlice({
  name: "restaurantMenuGroups",
  initialState: initialRestaurantMenuGroupsState,
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
    // getRestaurantMenuGroupById
    restaurantMenuGroupFetched: (state, action) => {
      state.actionsLoading = false;
      state.restaurantMenuGroupForEdit =
        action.payload.restaurantMenuGroupForEdit;
      state.error = null;
    },
    // findRestaurantMenuGroups
    restaurantMenuGroupsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createRestaurantMenuGroup
    restaurantMenuGroupCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateRestaurantMenuGroup
    restaurantMenuGroupUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.RestaurantMenuGroupId ===
          action.payload.restaurantMenuGroup.RestaurantMenuGroupId
        ) {
          return action.payload.restaurantMenuGroup;
        }
        return entity;
      });
    },
    // deleteRestaurantMenuGroup
    restaurantMenuGroupDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) =>
          el.RestaurantMenuGroupId !== action.payload.RestaurantMenuGroupId
      );
    },
    // deleteRestaurantMenuGroups
    restaurantMenuGroupsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.RestaurantMenuGroupId)
      );
    },
    // restaurantMenuGroupsUpdateState
    restaurantMenuGroupsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.RestaurantMenuGroupId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
