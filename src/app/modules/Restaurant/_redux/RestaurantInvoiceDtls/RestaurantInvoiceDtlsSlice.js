import { createSlice } from "@reduxjs/toolkit";
const initialRestaurantInvoiceDtlsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  restaurantInvoiceDtlForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const restaurantInvoiceDtlsSlice = createSlice({
  name: "restaurantInvoiceDtls",
  initialState: initialRestaurantInvoiceDtlsState,
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
    // getRestaurantInvoiceDtlById
    restaurantInvoiceDtlFetched: (state, action) => {
      state.actionsLoading = false;
      state.restaurantInvoiceDtlForEdit =
        action.payload.restaurantInvoiceDtlForEdit;
      state.error = null;
    },
    // findRestaurantInvoiceDtls
    restaurantInvoiceDtlsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createRestaurantInvoiceDtl
    restaurantInvoiceDtlCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateRestaurantInvoiceDtl
    restaurantInvoiceDtlUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.RestaurantInvoiceDtlId ===
          action.payload.restaurantInvoiceDtl.RestaurantInvoiceDtlId
        ) {
          return action.payload.restaurantInvoiceDtl;
        }
        return entity;
      });
    },
    // deleteRestaurantInvoiceDtl
    restaurantInvoiceDtlDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) =>
          el.RestaurantInvoiceDtlId !== action.payload.RestaurantInvoiceDtlId
      );
    },
    // deleteRestaurantInvoiceDtls
    restaurantInvoiceDtlsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.RestaurantInvoiceDtlId)
      );
    },
    // restaurantInvoiceDtlsUpdateState
    restaurantInvoiceDtlsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.RestaurantInvoiceDtlId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
