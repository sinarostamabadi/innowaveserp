
import { createSlice } from "@reduxjs/toolkit";
const initialCoffeeInvoiceDiscountsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  coffeeInvoiceDiscountForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const coffeeInvoiceDiscountsSlice = createSlice({
  name: "coffeeInvoiceDiscounts",
  initialState: initialCoffeeInvoiceDiscountsState,
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
    // getCoffeeInvoiceDiscountById  
    coffeeInvoiceDiscountFetched: (state, action) => {
      state.actionsLoading = false;
      state.coffeeInvoiceDiscountForEdit = action.payload.coffeeInvoiceDiscountForEdit;
      state.error = null;
    },
    // findCoffeeInvoiceDiscounts  
    coffeeInvoiceDiscountsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createCoffeeInvoiceDiscount  
    coffeeInvoiceDiscountCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateCoffeeInvoiceDiscount  
    coffeeInvoiceDiscountUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (entity.CoffeeInvoiceDiscountId === action.payload.coffeeInvoiceDiscount.CoffeeInvoiceDiscountId) {
          return action.payload.coffeeInvoiceDiscount;
        }
        return entity;
      });
    },
    // deleteCoffeeInvoiceDiscount  
    coffeeInvoiceDiscountDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.CoffeeInvoiceDiscountId !== action.payload.CoffeeInvoiceDiscountId  
      );
    },
    // deleteCoffeeInvoiceDiscounts  
    coffeeInvoiceDiscountsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.CoffeeInvoiceDiscountId)  
      );
    },
    // coffeeInvoiceDiscountsUpdateState  
    coffeeInvoiceDiscountsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.CoffeeInvoiceDiscountId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
