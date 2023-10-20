
import { createSlice } from "@reduxjs/toolkit";
const initialRestaurantsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  restaurantForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const restaurantsSlice = createSlice({
  name: "restaurants",
  initialState: initialRestaurantsState,
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
    // getRestaurantById  
    restaurantFetched: (state, action) => {
      state.actionsLoading = false;
      state.restaurantForEdit = action.payload.restaurantForEdit;
      state.error = null;
    },
    // findRestaurants  
    restaurantsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createRestaurant  
    restaurantCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateRestaurant  
    restaurantUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.RestaurantId === action.payload.restaurant.RestaurantId) {
          return action.payload.restaurant;
        }
        return entity;
      });
    },
    // deleteRestaurant  
    restaurantDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.RestaurantId !== action.payload.RestaurantId  
      );
    },
    // deleteRestaurants  
    restaurantsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.RestaurantId)  
      );
    },
    // restaurantsUpdateState  
    restaurantsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.RestaurantId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
