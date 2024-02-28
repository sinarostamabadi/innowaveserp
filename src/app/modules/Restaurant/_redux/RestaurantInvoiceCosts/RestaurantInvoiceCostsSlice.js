import { createSlice } from "@reduxjs/toolkit";
const initialRestaurantInvoiceCostsState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  restaurantInvoiceCostForEdit: undefined,
  lastError: null,
  error: null,
};
export const callTypes = {
  list: "list",
  action: "action",
};
export const restaurantInvoiceCostsSlice = createSlice({
  name: "restaurantInvoiceCosts",
  initialState: initialRestaurantInvoiceCostsState,
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
    // getRestaurantInvoiceCostById
    restaurantInvoiceCostFetched: (state, action) => {
      state.actionsLoading = false;
      state.restaurantInvoiceCostForEdit =
        action.payload.restaurantInvoiceCostForEdit;
      state.error = null;
    },
    // findRestaurantInvoiceCosts
    restaurantInvoiceCostsFetched: (state, action) => {
      const { entities, totalCount } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createRestaurantInvoiceCost
    restaurantInvoiceCostCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload);
    },
    // updateRestaurantInvoiceCost
    restaurantInvoiceCostUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map((entity) => {
        if (
          entity.RestaurantInvoiceCostId ===
          action.payload.restaurantInvoiceCost.RestaurantInvoiceCostId
        ) {
          return action.payload.restaurantInvoiceCost;
        }
        return entity;
      });
    },
    // deleteRestaurantInvoiceCost
    restaurantInvoiceCostDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) =>
          el.RestaurantInvoiceCostId !== action.payload.RestaurantInvoiceCostId
      );
    },
    // deleteRestaurantInvoiceCosts
    restaurantInvoiceCostsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        (el) => !action.payload.ids.includes(el.RestaurantInvoiceCostId)
      );
    },
    // restaurantInvoiceCostsUpdateState
    restaurantInvoiceCostsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.RestaurantInvoiceCostId) > -1) {
          entity.status = status;
        }
        return entity;
      });
    },
  },
});
