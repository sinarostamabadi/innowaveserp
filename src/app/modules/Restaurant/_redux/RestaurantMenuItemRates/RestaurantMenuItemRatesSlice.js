
import { createSlice } from "@reduxjs/toolkit";
const initialRestaurantMenuItemRatesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  restaurantMenuItemRateForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const restaurantMenuItemRatesSlice = createSlice({
  name: "restaurantMenuItemRates",
  initialState: initialRestaurantMenuItemRatesState,
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
    // getRestaurantMenuItemRateById  
    restaurantMenuItemRateFetched: (state, action) => {
      state.actionsLoading = false;
      state.restaurantMenuItemRateForEdit = action.payload.restaurantMenuItemRateForEdit;
      state.error = null;
    },
    // findRestaurantMenuItemRates  
    restaurantMenuItemRatesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createRestaurantMenuItemRate  
    restaurantMenuItemRateCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateRestaurantMenuItemRate  
    restaurantMenuItemRateUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.RestaurantMenuItemRateId === action.payload.restaurantMenuItemRate.RestaurantMenuItemRateId) {
          return action.payload.restaurantMenuItemRate;
        }
        return entity;
      });
    },
    // deleteRestaurantMenuItemRate  
    restaurantMenuItemRateDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.RestaurantMenuItemRateId !== action.payload.RestaurantMenuItemRateId  
      );
    },
    // deleteRestaurantMenuItemRates  
    restaurantMenuItemRatesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.RestaurantMenuItemRateId)  
      );
    },
    // restaurantMenuItemRatesUpdateState  
    restaurantMenuItemRatesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.RestaurantMenuItemRateId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
