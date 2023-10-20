
import { createSlice } from "@reduxjs/toolkit";
const initialCoffeeShopDiscountTypesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  coffeeShopDiscountTypeForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const coffeeShopDiscountTypesSlice = createSlice({
  name: "coffeeShopDiscountTypes",
  initialState: initialCoffeeShopDiscountTypesState,
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
    // getCoffeeShopDiscountTypeById  
    coffeeShopDiscountTypeFetched: (state, action) => {
      state.actionsLoading = false;
      state.coffeeShopDiscountTypeForEdit = action.payload.coffeeShopDiscountTypeForEdit;
      state.error = null;
    },
    // findCoffeeShopDiscountTypes  
    coffeeShopDiscountTypesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createCoffeeShopDiscountType  
    coffeeShopDiscountTypeCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateCoffeeShopDiscountType  
    coffeeShopDiscountTypeUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.CoffeeShopDiscountTypeId === action.payload.coffeeShopDiscountType.CoffeeShopDiscountTypeId) {
          return action.payload.coffeeShopDiscountType;
        }
        return entity;
      });
    },
    // deleteCoffeeShopDiscountType  
    coffeeShopDiscountTypeDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.CoffeeShopDiscountTypeId !== action.payload.CoffeeShopDiscountTypeId  
      );
    },
    // deleteCoffeeShopDiscountTypes  
    coffeeShopDiscountTypesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.CoffeeShopDiscountTypeId)  
      );
    },
    // coffeeShopDiscountTypesUpdateState  
    coffeeShopDiscountTypesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.CoffeeShopDiscountTypeId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});