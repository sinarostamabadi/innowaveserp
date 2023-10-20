
import { createSlice } from "@reduxjs/toolkit";
const initialRestaurantMenuItemIngredientsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  restaurantMenuItemIngredientForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const restaurantMenuItemIngredientsSlice = createSlice({
  name: "restaurantMenuItemIngredients",
  initialState: initialRestaurantMenuItemIngredientsState,
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
    // getRestaurantMenuItemIngredientById  
    restaurantMenuItemIngredientFetched: (state, action) => {
      state.actionsLoading = false;
      state.restaurantMenuItemIngredientForEdit = action.payload.restaurantMenuItemIngredientForEdit;
      state.error = null;
    },
    // findRestaurantMenuItemIngredients  
    restaurantMenuItemIngredientsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createRestaurantMenuItemIngredient  
    restaurantMenuItemIngredientCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateRestaurantMenuItemIngredient  
    restaurantMenuItemIngredientUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.RestaurantMenuItemIngredientId === action.payload.restaurantMenuItemIngredient.RestaurantMenuItemIngredientId) {
          return action.payload.restaurantMenuItemIngredient;
        }
        return entity;
      });
    },
    // deleteRestaurantMenuItemIngredient  
    restaurantMenuItemIngredientDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.RestaurantMenuItemIngredientId !== action.payload.RestaurantMenuItemIngredientId  
      );
    },
    // deleteRestaurantMenuItemIngredients  
    restaurantMenuItemIngredientsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.RestaurantMenuItemIngredientId)  
      );
    },
    // restaurantMenuItemIngredientsUpdateState  
    restaurantMenuItemIngredientsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.RestaurantMenuItemIngredientId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
