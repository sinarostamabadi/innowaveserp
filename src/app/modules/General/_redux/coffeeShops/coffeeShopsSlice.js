import { createSlice } from "@reduxjs/toolkit";
const initialCoffeeShopsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  coffeeShopForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const coffeeShopsSlice = createSlice({
  name: "coffeeShops",
  initialState: initialCoffeeShopsState,
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
    // getCoffeeShopById
    coffeeShopFetched: (state, action) => {
      state.actionsLoading = false;
      state.coffeeShopForEdit = action.payload.coffeeShopForEdit;
      state.error = null;
    },
    // findCoffeeShops
    coffeeShopsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createCoffeeShop
    coffeeShopCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateCoffeeShop
    coffeeShopUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.CoffeeShopId === action.payload.coffeeShop.CoffeeShopId) {
          return action.payload.coffeeShop;
        }
        return entity;
      });
    },
    // deleteCoffeeShop
    coffeeShopDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.CoffeeShopId !== action.payload.CoffeeShopId
      );
    },
    // deleteCoffeeShops
    coffeeShopsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.CoffeeShopId)
      );
    },
    // coffeeShopsUpdateState
    coffeeShopsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.CoffeeShopId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
