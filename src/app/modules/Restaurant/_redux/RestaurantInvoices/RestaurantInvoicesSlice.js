import { createSlice } from "@reduxjs/toolkit";
const initialRestaurantInvoicesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  restaurantInvoiceForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const restaurantInvoicesSlice = createSlice({
  name: "restaurantInvoices",
  initialState: initialRestaurantInvoicesState,
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
    // getRestaurantInvoiceById
    restaurantInvoiceFetched: (state, action) => {
      state.actionsLoading = false;
      state.restaurantInvoiceForEdit = action.payload.restaurantInvoiceForEdit;
      state.error = null;
    },
    // findRestaurantInvoices
    restaurantInvoicesFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createRestaurantInvoice
    restaurantInvoiceCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateRestaurantInvoice
    restaurantInvoiceUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.RestaurantInvoiceId ===
          action.payload.restaurantInvoice.RestaurantInvoiceId
        ) {
          return action.payload.restaurantInvoice;
        }
        return entity;
      });
    },
    // deleteRestaurantInvoice
    restaurantInvoiceDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => el.RestaurantInvoiceId !== action.payload.RestaurantInvoiceId
      );
    },
    // deleteRestaurantInvoices
    restaurantInvoicesDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.RestaurantInvoiceId)
      );
    },
    // restaurantInvoicesUpdateState
    restaurantInvoicesStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.RestaurantInvoiceId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
    // restaurantInvoiceUpdateState
    restaurantInvoiceStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { id, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (id == entity.RestaurantInvoiceId) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
