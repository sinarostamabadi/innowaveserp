import { createSlice } from "@reduxjs/toolkit";
const initialRestaurantInvoiceDiscountsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  restaurantInvoiceDiscountForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const restaurantInvoiceDiscountsSlice = createSlice({
  name: "restaurantInvoiceDiscounts",
  initialState: initialRestaurantInvoiceDiscountsState,
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
    // getRestaurantInvoiceDiscountById
    restaurantInvoiceDiscountFetched: (state, action) => {
      state.actionsLoading = false;
      state.restaurantInvoiceDiscountForEdit =
        action.payload.restaurantInvoiceDiscountForEdit;
      state.error = null;
    },
    // findRestaurantInvoiceDiscounts
    restaurantInvoiceDiscountsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createRestaurantInvoiceDiscount
    restaurantInvoiceDiscountCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateRestaurantInvoiceDiscount
    restaurantInvoiceDiscountUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.RestaurantInvoiceDiscountId ===
          action.payload.restaurantInvoiceDiscount.RestaurantInvoiceDiscountId
        ) {
          return action.payload.restaurantInvoiceDiscount;
        }
        return entity;
      });
    },
    // deleteRestaurantInvoiceDiscount
    restaurantInvoiceDiscountDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) =>
          el.RestaurantInvoiceDiscountId !==
          action.payload.RestaurantInvoiceDiscountId
      );
    },
    // deleteRestaurantInvoiceDiscounts
    restaurantInvoiceDiscountsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.RestaurantInvoiceDiscountId)
      );
    },
    // restaurantInvoiceDiscountsUpdateState
    restaurantInvoiceDiscountsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (
          ids.findIndex((id) => id === entity.RestaurantInvoiceDiscountId) > -1
        ) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
