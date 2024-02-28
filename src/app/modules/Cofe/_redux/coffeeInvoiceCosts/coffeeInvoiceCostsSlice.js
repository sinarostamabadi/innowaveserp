import { createSlice } from "@reduxjs/toolkit";
const initialCoffeeInvoiceCostsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  coffeeInvoiceCostForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const coffeeInvoiceCostsSlice = createSlice({
  name: "coffeeInvoiceCosts",
  initialState: initialCoffeeInvoiceCostsState,
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
    // getCoffeeInvoiceCostById
    coffeeInvoiceCostFetched: (state, action) => {
      state.actionsLoading = false;
      state.coffeeInvoiceCostForEdit = action.payload.coffeeInvoiceCostForEdit;
      state.error = null;
    },
    // findCoffeeInvoiceCosts
    coffeeInvoiceCostsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createCoffeeInvoiceCost
    coffeeInvoiceCostCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateCoffeeInvoiceCost
    coffeeInvoiceCostUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.CoffeeInvoiceCostId ===
          action.payload.coffeeInvoiceCost.CoffeeInvoiceCostId
        ) {
          return action.payload.coffeeInvoiceCost;
        }
        return entity;
      });
    },
    // deleteCoffeeInvoiceCost
    coffeeInvoiceCostDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.CoffeeInvoiceCostId !== action.payload.CoffeeInvoiceCostId
      );
    },
    // deleteCoffeeInvoiceCosts
    coffeeInvoiceCostsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.CoffeeInvoiceCostId)
      );
    },
    // coffeeInvoiceCostsUpdateState
    coffeeInvoiceCostsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.CoffeeInvoiceCostId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
