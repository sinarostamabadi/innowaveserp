
import { createSlice } from "@reduxjs/toolkit";
const initialRestaurantMenuItemPricesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  restaurantMenuItemPriceForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const restaurantMenuItemPricesSlice = createSlice({
  name: "restaurantMenuItemPrices",
  initialState: initialRestaurantMenuItemPricesState,
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
    // getRestaurantMenuItemPriceById  
    restaurantMenuItemPriceFetched: (state, action) => {
      state.actionsLoading = false;
      state.restaurantMenuItemPriceForEdit = action.payload.restaurantMenuItemPriceForEdit;
      state.error = null;
    },
    // findRestaurantMenuItemPrices  
    restaurantMenuItemPricesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createRestaurantMenuItemPrice  
    restaurantMenuItemPriceCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateRestaurantMenuItemPrice  
    restaurantMenuItemPriceUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.RestaurantMenuItemPriceId === action.payload.restaurantMenuItemPrice.RestaurantMenuItemPriceId) {
          return action.payload.restaurantMenuItemPrice;
        }
        return entity;
      });
    },
    // deleteRestaurantMenuItemPrice  
    restaurantMenuItemPriceDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.RestaurantMenuItemPriceId !== action.payload.RestaurantMenuItemPriceId  
      );
    },
    // deleteRestaurantMenuItemPrices  
    restaurantMenuItemPricesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.RestaurantMenuItemPriceId)  
      );
    },
    // restaurantMenuItemPricesUpdateState  
    restaurantMenuItemPricesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.RestaurantMenuItemPriceId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
