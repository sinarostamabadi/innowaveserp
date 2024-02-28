import { createSlice } from "@reduxjs/toolkit";
const initialCoffeeInvoicesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  coffeeInvoiceForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const coffeeInvoicesSlice = createSlice({
  name: "coffeeInvoices",
  initialState: initialCoffeeInvoicesState,
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
    // getCoffeeInvoiceById
    coffeeInvoiceFetched: (state, action) => {
      state.actionsLoading = false;
      state.coffeeInvoiceForEdit = action.payload.coffeeInvoiceForEdit;
      state.error = null;
    },
    // findCoffeeInvoices
    coffeeInvoicesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createCoffeeInvoice
    coffeeInvoiceCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateCoffeeInvoice
    coffeeInvoiceUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.CoffeeInvoiceId ===
          action.payload.coffeeInvoice.CoffeeInvoiceId
        ) {
          return action.payload.coffeeInvoice;
        }
        return entity;
      });
    },
    // deleteCoffeeInvoice
    coffeeInvoiceDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.CoffeeInvoiceId !== action.payload.CoffeeInvoiceId
      );
    },
    // deleteCoffeeInvoices
    coffeeInvoicesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.CoffeeInvoiceId)
      );
    },
    // coffeeInvoicesUpdateState
    coffeeInvoicesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.CoffeeInvoiceId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
